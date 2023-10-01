import VornoiMesh from "../static/lloydClass";
import xmldom from "../domparser_bundle";
import renderShapes from "../d3/rednerShapes";
import shapes from "../static/shapes";
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
let shapeRenderer = renderShapes()
let data:Datum[] = []

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
      shapeRenderer.data([])
      shapeRenderer.colorSet(chunkColors)
      shapeRenderer.colorValues({"bob":'#1f78b4'})
      shapeRenderer.shapeSet([shapes('circle', 5)])
      shapeRenderer.shapeValues({"bob":shapes('circle', 5)})
      shapeRenderer.drawShapes(() => draw())

      select(dom).call(shapeRenderer)
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
  for (let i = 0; i < payload.length; i += 2) {
    const d:Datum = {id:`${Math.floor((i + 1) / 2)}`, x:payload[i], y:payload[i + 1], colorValue:'bob', shapeValue:'bob'}
    data.push(d)
  }
  if (!keepOpen){
    shapeRenderer.data(data)
    data = []
  }
}

function draw() {
  const elements = select(dom).selectAll<HTMLElement, any>(`custom.shape`)
  ctx.save();
  ctx.clearRect(0, 0, 1280 * 2, 720 * 2);
  elements.each(function () {
    const node = select<HTMLElement, Datum>(this).select('path'),
                xCoord = +node.attr('x'),
                yCoord = +node.attr('y'),
                fill = node.attr('fill')
                ctx.fillStyle = fill;
                ctx.setTransform(2, 0, 0, 2,(xCoord * backgroundRadius) + 1280 , -(yCoord  * backgroundRadius) + 720)
                ctx.beginPath();
                // ctx.globalAlpha = +node.attr('opacity') // something's up with opacity
                const svgPath = node.attr('d')
                if (svgPath){
                    ctx.fill(new Path2D(svgPath))
                }
  })
  ctx.globalAlpha = 1;
  ctx.restore()
  // if (ctx) {
  //   
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
