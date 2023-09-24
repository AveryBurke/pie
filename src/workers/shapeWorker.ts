import VornoiMesh from "../static/lloydClass";

let vornoi: InstanceType<typeof VornoiMesh>;
let ctx: OffscreenCanvasRenderingContext2D;
let textureWidth = 0;
let textureHeight = 0;
self.addEventListener("message", (eve) => {
  const {
    type,
    computeCanvas,
    canvas,
    stencil,
    offsets,
    offsetArcIds,
    textureW,
    textureH
  }: {
    canvas: OffscreenCanvas;
    computeCanvas: OffscreenCanvas;
    stencil: number[];
    offsets: number[];
    offsetArcIds: number[];
    textureW: number;
    textureH: number;
    type: "init" | "update_stencil" | "update_offsets" | "render";
  } = eve.data;
  console.log("msg type ", eve.data.type);
  switch (type) {
    case "init": {
      ctx = canvas.getContext("2d")!;
      textureWidth = textureW;
      textureHeight = textureH;
      init(computeCanvas);
      break;
    }
    case "update_stencil":
      {
        if (vornoi) {
          vornoi.updateStencil(stencil);
          vornoi.renderStencil();
        }
      }
      break;
    case "update_offsets":
      {
        if (offsets && offsetArcIds && vornoi) {
          vornoi.updateOffsets(offsets, offsetArcIds);
          vornoi.renderVornoi();
        }
      }
      break;
    case "render":
      {
        console.log("shape worker is rendering");
        if (vornoi) vornoi.render();
      }
      break;
  }
});

function handlePositions(position: Float32Array) {
  draw(position);
}

function draw(points: Float32Array) {
  if (ctx) {
    ctx.clearRect(0, 0, Math.floor(1280 * 2), Math.floor(720 * 2));
    for (let i = 0; i < points.length; i += 2) {
      // ctx.clearRect(0, 0, Math.floor(1280 * 2), Math.floor(720 * 2));
      //       ctx.lineWidth = .75;
      //       ctx.setTransform(2, 0, 0, 2, Math.floor(1280 * 2) / 2, Math.floor(720 * 2) / 2)
      ctx.beginPath();
      ctx.arc((points[i] * textureWidth * 1280/720) + 1280, -(points[i + 1]  * textureHeight * (1280/720)) + 720, 10, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill()
    }
  }
}

function init(canvas: OffscreenCanvas) {
  const gl = canvas.getContext("webgl2");
  if (gl) {
    if (!gl!.getExtension("EXT_color_buffer_float")) {
      console.error("voroni error: color extention does not exist");
    }
    vornoi = new VornoiMesh(gl, textureWidth, textureHeight, 100, handlePositions);
  }
}
