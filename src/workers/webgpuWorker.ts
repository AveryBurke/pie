import vertexShader from "../static/shaders/vertexShader";
import createCone from "../static/createCone";

let adapter: GPUAdapter | null = null;
let device: GPUDevice | null = null;
let ctx: GPUCanvasContext | null = null;
let canvasFormat: GPUTextureFormat | null = null;

self.addEventListener("message", (eve) => {
  const {
    type,
    canvas,
    vertices,
  }: { canvas: OffscreenCanvas; vertices: Float32Array, type:"init" | "draw" } = eve.data;
  console.log("msg ",eve.data)
  switch (type) {
    case "init": {
      init(canvas);
      break;
    }

    case "draw": {
        runSimulation(vertices);
    }
  }
});

async function init(canvas: OffscreenCanvas) {
  adapter = await navigator.gpu.requestAdapter();
  device = await adapter!.requestDevice();
  ctx = canvas.getContext("webgpu");
  canvasFormat = navigator.gpu.getPreferredCanvasFormat();
  if (ctx) {
    ctx.configure({
      device,
      format: canvasFormat,
    });
  }
}

function runSimulation(vertices: Float32Array) {
  if (device && canvasFormat && ctx) {
    const vertexBuffer = device.createBuffer({
      label: "Background vertices",
      size: vertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    device.queue.writeBuffer(vertexBuffer, 0, vertices);

    const vertexBufferLayout: GPUVertexBufferLayout = {
      arrayStride: 8,
      attributes: [
        {
          format: "float32x2",
          offset: 0,
          shaderLocation: 0, // Position, see vertex shader
        },
      ],
    };

    const backgroundShaderModule = device.createShaderModule(vertexShader);

    const backgroundPipeline = device.createRenderPipeline({
      label: "Background pipeline",
      layout: "auto",
      vertex: {
        module: backgroundShaderModule,
        entryPoint: "vertexMain",
        buffers: [vertexBufferLayout],
      },
      fragment: {
        module: backgroundShaderModule,
        entryPoint: "fragmentMain",
        targets: [
          {
            format: canvasFormat,
          },
        ],
      },
      primitive:{
        topology:"triangle-strip"
      }
    });

    const encoder = device.createCommandEncoder();
    const renderPass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: ctx!.getCurrentTexture().createView(),
          loadOp: "clear",
          clearValue: { r: 0, g: 0, b: 0.4, a: 1.0 },
          storeOp: "store",
        },
      ],
    });
    renderPass.setPipeline(backgroundPipeline);
    renderPass.setVertexBuffer(0, vertexBuffer);
    renderPass.draw(vertices.length / 2); // 6 vertices
    renderPass.end();
    device.queue.submit([encoder.finish()]);
  }
}

export {};
