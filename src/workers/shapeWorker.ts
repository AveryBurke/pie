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
let backgroundRadius = 0;
let shapeRenderer = renderShapes()
let data:Datum[] = []
let arcIndexs:number[] = []
let dataIds:string[] = []

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
    radius,
    ids
  }: {
    canvas: OffscreenCanvas;
    computeCanvas: OffscreenCanvas;
    stencil: number[];
    offsets: number[];
    offsetArcIds: number[];
    textureW: number;
    textureH: number;
    radius: number;
    ids: string[];
    type: "init" | "update_stencil" | "update_offsets" | "render" | "render_in_chunks" | "draw" | "update_ids";
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
          arcIndexs = offsetArcIds;
          chunk = 0
          vornoi.renderInChunks(offsets, offsetArcIds)
        }
      }
      break;
    case "draw":{
      if (offsets) handlePositions({payload:new Float32Array(offsets), keepOpen:false})
    }
    break;
    case "update_ids":{
      if (ids){
        console.log('ids ', ids)
        dataIds = ids;
      }
    }
    case "render":
      {
        if (vornoi) vornoi.render();
      }
      break;
  }
});

function handlePositions({payload, keepOpen}:{payload:Float32Array, keepOpen:boolean}) {
  console.log({payload, keepOpen, chunk})
  for (let i = 0; i < payload.length; i += 2) {
    /* 
     * ids are sorted and positions are sorted, before they are sent to the shape worker. This has the effect of presisting ids
    */
    const d:Datum = {id:dataIds[Math.floor((i + 1) / 2)] + chunk, x:payload[i], y:payload[i + 1], colorValue:'bob', shapeValue:'bob'}
    data.push(d)
  }
  chunk++;
  if (!keepOpen){
    shapeRenderer.data(data)
    data = []
    chunk = 0;
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
