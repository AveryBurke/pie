import VornoiMesh from "../static/lloydClass";

let vornoi: InstanceType<typeof VornoiMesh>;
let ctx: OffscreenCanvasRenderingContext2D | null;

self.addEventListener("message", (eve) => {
  const {
    type,
    canvas,
    stencil,
    offsets,
    offsetArcIds,
  }: {
    canvas: OffscreenCanvas;
    stencil: number[];
    offsets: number[];
    offsetArcIds:number[];
    type: "init" | "update_stencil" | "update_offsets" | "render";
  } = eve.data;
  console.log('msg type ', eve.data.type)
  switch (type) {
    case "init": {
      init(canvas);
      break;
    }
    case "update_stencil": {
      if (vornoi) {
        vornoi.updateStencil(stencil);
        vornoi.renderStencil();
      }
    }
    break;
    case "update_offsets": {
      if (offsets && offsetArcIds && vornoi) {
        vornoi.updateOffsets(offsets, offsetArcIds);
        vornoi.renderVornoi();
      }
    }
    break;
    case "render": {
      console.log('shape worker is rendering')
      if (vornoi) vornoi.render();
    }
    break;
  }
});

function handlePositions(position:Float32Array) {
  console.log({position})
}

function draw(points:number[]){
  if (ctx){
    // console.log('should draw', points)
  }
}

function init(canvas: OffscreenCanvas) {
  const gl = canvas.getContext("webgl2");
  if (gl) {
    if (!gl!.getExtension("EXT_color_buffer_float")) {
      console.error("voroni error: color extention does not exist");
    }
    vornoi = new VornoiMesh(gl, 512, 512, 100, handlePositions);
  }
}
