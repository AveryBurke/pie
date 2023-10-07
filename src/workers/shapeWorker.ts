import VornoiMesh from "../static/lloydClass";
import xmldom from "../domparser_bundle";
import renderShapes from "../d3/rednerShapes";
import shapes from "../static/shapes";
// import { select } from "d3-selection";// gh-pages can't find this, so I have to import all of d3
import * as d3 from "d3";



let vornoi: InstanceType<typeof VornoiMesh>;
let ctx: OffscreenCanvasRenderingContext2D;
let textureWidth = 0;
let textureHeight = 0;
let chunkColors = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928']
let backgroundRadius = 0;
let shapeRenderer = renderShapes()
let data:Datum[] = []
let arcIndexs:number[] = []
let inputData:Datum[] = []
let colors:string[] = []
let previouslyPayloadLength = 0

const DOMImplementation = xmldom.DOMImplementation;
let dom: Document = new DOMImplementation().createDocument()

self.addEventListener("message", (eve) => {
  const {
    type,
    computeCanvas,
    canvas,
    colorScale,
    colorValues,
    stencil,
    offsets,
    offsetArcIds,
    textureW,
    textureH,
    radius,
    ids
  }: {
    canvas: OffscreenCanvas;
    colorScale: {[key:string]:string},
    computeCanvas: OffscreenCanvas;
    colorValues :string[];
    stencil: number[];
    offsets: number[];
    offsetArcIds: number[];
    textureW: number;
    textureH: number;
    radius: number;
    ids: Datum[];
    type: "init" | "update_stencil" | "update_offsets" | "render" | "render_in_chunks" | "draw" | "update_ids" | "update_color_scale" | "update_color_values" | "update_data_values";
  } = eve.data;
  switch (type) {
    case "init": {
      console.log({colorScale})
      backgroundRadius = radius
      ctx = canvas.getContext("2d")!;
      textureWidth = textureW;
      textureHeight = textureH;
      init(computeCanvas);
      shapeRenderer.data([])
      shapeRenderer.colorSet(chunkColors)
      shapeRenderer.colorValues(colorScale)
      shapeRenderer.shapeSet([shapes('circle', 5)])
      shapeRenderer.shapeValues({"bob":shapes('circle', 5)})
      shapeRenderer.drawShapes(() => draw())
      d3.select(dom).call(shapeRenderer)
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
          // chunk = 0
          data = []
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
        console.log({ids})
        inputData = ids;
      }
    }
    break;
    case "render":
      {
        if (vornoi) vornoi.render();
      }
      break;
    case "update_color_values":{
      if (colorValues){
        colors = colorValues
        for (let i = 0; i < data.length; i++) {
          if (inputData[i]){
            inputData[i].colorValue = colorValues[i]
          }
          data[i].colorValue = colorValues[i];
        }
      }
      console.log("colors updated: ", data)
    }
    break;
    case "update_color_scale":{
      if (colorScale) {
        shapeRenderer.colorValues(colorScale)
        shapeRenderer.data(data)
      }
    } break;
  }
});

function handlePositions({payload, keepOpen}:{payload:Float32Array, keepOpen:boolean}) {
  console.log({keepOpen, previouslyPayloadLength})
  for (let i = 0; i < payload.length; i += 2) {
    /* 
     * ids are sorted and positions are sorted, before they are sent to the shape worker. This has the effect of presisting ids
    */
    const index = Math.floor((i + 1) / 2) + previouslyPayloadLength/2
    const {id,colorValue,shapeValue} = inputData[index]
    const d:Datum = {id, x:payload[i], y:payload[i + 1], colorValue, shapeValue}
    data.push(d)
  }
  previouslyPayloadLength += payload.length;
  if (!keepOpen){
    shapeRenderer.data(data)
    previouslyPayloadLength = 0;
  }
}

function draw() {
  const elements = d3.select(dom).selectAll<HTMLElement, any>(`custom.shape`)
  ctx.save();
  ctx.clearRect(0, 0, 1280 * 2, 720 * 2);
  elements.each(function () {
    const node = d3.select<HTMLElement, Datum>(this).select('path'),
                xCoord = +node.attr('x'),
                yCoord = +node.attr('y'),
                fill = node.attr('fill')
                ctx.fillStyle = fill;
                ctx.strokeStyle = "#FFFFFF"
                ctx.lineWidth = .5
                ctx.setTransform(2, 0, 0, 2,(xCoord * backgroundRadius) + 1280 , -(yCoord  * backgroundRadius) + 720)
                ctx.beginPath();
                // ctx.globalAlpha = +node.attr('opacity') // something's up with opacity
                const svgPath = node.attr('d')
                if (svgPath){
                    ctx.fill(new Path2D(svgPath))
                    ctx.stroke(new Path2D(svgPath))
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
