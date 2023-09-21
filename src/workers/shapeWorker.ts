import VornoiMesh from "../static/lloydClass";

let vornoi: InstanceType<typeof VornoiMesh>;

self.addEventListener("message", (eve) => {
  const {
    type,
    canvas,
    stencil,
    offsets,
  }: {
    canvas: OffscreenCanvas;
    stencil: number[];
    offsets: number[];
    type: "init" | "update_stencil" | "update_offsets" | "rener";
  } = eve.data;
  console.log("msg ", eve.data);
  switch (type) {
    case "init": {
      console.log('calling init with ', canvas)
      const gl = canvas.getContext('webgl2')
      console.log('gl before init ', gl)
      init(canvas);
      break;
    }
    case "update_stencil": {
      if (vornoi) {
        vornoi.updateStencil(stencil);
        vornoi.renderStencil();
      }
    }
    case "update_offsets": {
      if (offsets && vornoi) {
        vornoi.updateOffsets(offsets);
        vornoi.renderVornoi();
      }
    }
    case "rener": {
      if (vornoi) vornoi.render();
    }
  }
});

function init(canvas: OffscreenCanvas) {
  const gl = canvas.getContext("webgl2");
  if (gl) {
    if (!gl!.getExtension("EXT_color_buffer_float")) {
      console.error("voroni error: color extention does not exist");
    }
    vornoi = new VornoiMesh(gl, 512, 512, 100);
  }
}
