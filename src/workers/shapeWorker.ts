import VornoiMesh from "../static/lloydClass";
import xmldom from "../domparser_bundle";
import renderShapes from "../d3/rednerShapes";
import shapes from "../static/shapes";
import rotateCoordinates from "../static/rotateCoordinates";
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
let dpi:number = 1

const DOMImplementation = xmldom.DOMImplementation;
let dom: Document = new DOMImplementation().createDocument()

self.addEventListener("message", (eve:MessageEvent<shapeWorkerAction>) => {
  const {type, payload}  = eve.data
  switch (type) {
    case "init": {
      const {radius, textureW, textureH, pixelRatio, colorScale, canvas, computeCanvas} = payload
      backgroundRadius = radius
      ctx = canvas.getContext("2d")!;
      textureWidth = textureW;
      textureHeight = textureH;
      dpi = pixelRatio
      init(computeCanvas);
      shapeRenderer.data([])
      shapeRenderer.colorSet(chunkColors)
      shapeRenderer.colorValues(colorScale)
      shapeRenderer.shapeSet([shapes('circle', 5)])
      shapeRenderer.shapeValues({"bob":shapes('circle', 5)})
      shapeRenderer.drawShapes(() => draw())
      console.log({d3, shapeRenderer, dom})
      d3.select(dom).call(shapeRenderer)
    }
    break;
    case "update_stencil":
      {
        if (vornoi) {
          vornoi.updateStencil(payload.stencil);
          vornoi.renderStencil();
        }
      }
      break;
    case "update_offsets":
      {
        if (vornoi) {
          vornoi.updateOffsets(payload.offsets, payload.offsetArcIds);
          vornoi.renderVornoi();
        }
      }
      break;
    case "render_in_chunks":
      {
        if (vornoi){
          arcIndexs = payload.offsetArcIds;
          // chunk = 0
          data = []
          vornoi.renderInChunks(payload.offsets, payload.offsetArcIds)
        }
      }
      break;
    case "update_ids":{
        inputData = payload.ids;
    }
    break;
    case "update_color_values":{
      const {colorValues} = payload
        colors = colorValues
        for (let i = 0; i < data.length; i++) {
          if (inputData[i]){
            inputData[i].colorValue = colorValues[i]
          }
          data[i].colorValue = colorValues[i];
        }
      }
    break;
    case "update_color_scale":{
        shapeRenderer.colorValues(payload.colorScale)
        shapeRenderer.data(data)
      
    } break;
    case "rotate_slice_positions":{
        data.forEach(d => {
          const [newX, newY] = rotateCoordinates(d.x, d.y, payload.thetas[d.sliceValue]);
          d.x = newX;
          d.y = newY;
        })
        shapeRenderer.data(data)
    } break;
  }
});

function handlePositions({payload, keepOpen}:{payload:Float32Array, keepOpen:boolean}) {
  // console.log({keepOpen, previouslyPayloadLength})
  for (let i = 0; i < payload.length; i += 2) {
    /* 
     * ids and positions are sorted, before they are sent to the shape worker. This has the effect of presisting ids
    */
    const index = Math.floor((i + 1) / 2) + previouslyPayloadLength/2
    const {id,colorValue,shapeValue, sliceValue, ringValue} = inputData[index]
    const d:Datum = {id, x:payload[i], y:payload[i + 1], colorValue, shapeValue, sliceValue, ringValue}
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
  ctx.clearRect(0, 0, 1280 * dpi, 720 * dpi);
  elements.each(function () {
    const node = d3.select<HTMLElement, Datum>(this).select('path'),
                xCoord = +node.attr('x'),
                yCoord = +node.attr('y'),
                fill = node.attr('fill')
                ctx.fillStyle = fill;
                ctx.strokeStyle = "#FFFFFF"
                ctx.lineWidth = .5
                ctx.setTransform(dpi, 0, 0, dpi,(xCoord * backgroundRadius) + 1280 , -(yCoord  * backgroundRadius) + 720)
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
    vornoi = new VornoiMesh(gl, textureWidth, textureHeight, 100, handlePositions);
  }
}
