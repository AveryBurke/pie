import VornoiMesh from "../static/lloydClass";
import xmldom from "../domparser_bundle";
import { select } from "d3-selection";
import { interpolate } from "d3-interpolate";
let vornoi: InstanceType<typeof VornoiMesh>;
let ctx: OffscreenCanvasRenderingContext2D;
let textureWidth = 0;
let textureHeight = 0;
let chunk = 0;
let chunkColors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928']
let celarPrev = true
let backgroundRadius = 0;



const DOMImplementation = xmldom.DOMImplementation;
let dom: Document = new DOMImplementation().createDocument()

self.addEventListener("message", (eve) => {
  const {
    type,
    computeCanvas,
    canvas,
    stencil,
    offsets,
    offsetArcIds,
    textureW,
    textureH,
    radius
  }: {
    canvas: OffscreenCanvas;
    computeCanvas: OffscreenCanvas;
    stencil: number[];
    offsets: number[];
    offsetArcIds: number[];
    textureW: number;
    textureH: number;
    radius: number;
    type: "init" | "update_stencil" | "update_offsets" | "render" | "render_in_chunks" | "draw";
  } = eve.data;
  switch (type) {
    case "init": {
      backgroundRadius = radius
      ctx = canvas.getContext("2d")!;
      textureWidth = textureW;
      textureHeight = textureH;
      init(computeCanvas);
    }
    break;
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
    case "render_in_chunks":
      {
        if (offsets && offsetArcIds && vornoi){
          chunk = 0
          vornoi.renderInChunks(offsets, offsetArcIds)
        }
      }
      break;
    case "draw":{
      if (offsets) handlePositions({payload:new Float32Array(offsets), keepOpen:false})
    }
    break;
    case "render":
      {
        if (vornoi) vornoi.render();
      }
      break;
  }
});

function handlePositions({payload, keepOpen}:{payload:Float32Array, keepOpen:boolean}) {
  draw(payload, keepOpen);
}

function draw(points: Float32Array, keepOpen:boolean) {
  console.log('drawing ', points)
  // if (ctx) {
  //   ctx.save();
  //   if (celarPrev) ctx.clearRect(0, 0, 1280 * 2, 720 * 2);
  //   for (let i = 0; i < points.length; i += 2) {
  //     ctx.setTransform(2,0, 0, 2,(points[i] * backgroundRadius) + 1280 , -(points[i + 1]  * backgroundRadius) + 720)
  //     ctx.lineWidth = .75;
  //     ctx.beginPath();
  //     ctx.arc(0, 0, 5, 0, 2 * Math.PI);
  //     ctx.stroke();
  //     ctx.fillStyle = chunkColors[chunk % chunkColors.length]
  //     ctx.fill()
  //     ctx.fillStyle = "black"
  //     ctx.font = `bold 8px Helvetica, Helvetica, arial, sans-serif`
  //     ctx.fillText(`${Math.floor((i + 1)/2)}`, 0, 0)
  //   }
  //   chunk++
  //   celarPrev = !keepOpen
  //   ctx.restore()
  // }
}

function init(canvas: OffscreenCanvas) {
  const gl = canvas.getContext("webgl2");
  if (gl) {
    if (!gl!.getExtension("EXT_color_buffer_float")) {
      console.error("voroni error: color extention does not exist");
    }
    // let floatExtention = gl.getExtension("EXT_texture_compression_bptc")
    // if (!floatExtention){
    //   console.error("compressed floating point texture not avaiable on this machine")
    // }
    vornoi = new VornoiMesh(gl, textureWidth, textureHeight, 200, handlePositions);
  }
}
