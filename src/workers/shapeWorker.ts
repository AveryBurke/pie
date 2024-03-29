import VornoiMesh from "../static/lloydClass";
import xmldom from "../domparser_bundle";
import renderShapes from "../d3/rednerShapes";
import rotateCoordinates from "../static/rotateCoordinates";
// import { select } from "d3-selection";// gh-pages can't find this, so I have to import all of d3
import * as d3 from "d3";

/**
 * the shape worker manages the chart's shapes.
 * It uses an instance of the VornoiMesh class to generate new positions for each point and it packages data to send to the shape renderer.
 * The renderer uses d3 to create animated transitions which are appended to a document. The the shape worker extacts those transtions from the document and draws them to the canvas
 * 
 * The shape worker also returns data to the caller though the postMessage event, for preserving the data's positions.
 * The return data is an object whose keys are the data ids and whose values are the current coordinates of the respective data points.  
 * The calling funciton can use this obejct to preserve the current locations of the data points.
 */

let vornoi: InstanceType<typeof VornoiMesh>;
let ctx: OffscreenCanvasRenderingContext2D;
let textureWidth = 0;
let textureHeight = 0;
let backgroundRadius = 0;
let shapeRenderer = renderShapes()
let data:Datum[] = []
let arcIndexs:number[] = []
let stagingPositions:number[] = []
let dpi:number = 1
let arcIds:Set<string>;

const shapeWorker: ShapeWorker = self as any

/** Web workers can't access the DOM so this a bundled headless DOM API that exposes just enough API surface for d3 functions to use */
const DOMImplementation = xmldom.DOMImplementation;
let dom: Document = new DOMImplementation().createDocument()

self.addEventListener("message", (eve:MessageEvent<shapeWorkerAction>) => {
  const {type, payload}  = eve.data
  switch (type) {
    case "init": {
      const {radius, textureW, textureH, pixelRatio, canvas, computeCanvas} = payload
      backgroundRadius = radius
      ctx = canvas.getContext("2d")!;
      textureWidth = textureW;
      textureHeight = textureH;
      dpi = pixelRatio
      init(computeCanvas);
      shapeRenderer.data([])
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
    case "update_positions":
      {
        if (vornoi){
          arcIndexs = payload.offsetArcIds;
          arcIds = payload.arcIds
          stagingPositions = [];
          data = payload.data;
          vornoi.renderInChunks(payload.offsets, payload.offsetArcIds)
        }
      }
      break;
    case "update_data_without_moving":{
      data = payload.data;
      shapeRenderer.data(payload.data)
    }
      break;
    case "rotate_slice_positions":{
        data.forEach(d => {
          const [newX, newY] = rotateCoordinates(d.x, d.y, payload.thetas[d.sliceValue]);
          d.x = newX;
          d.y = newY;
        })
        const positions = Object.fromEntries(data.map(d => [d.id, [d.x, d.y]]))
        self.postMessage({positions})
        shapeRenderer.data(data)
    } break;
  }
});

/**
 * a call back to recive new positions from the vornoi mesh
 * the vornoi class will processes and return new positions in chunks. this funciton collects the return values into a staging buffer and calls update data when the stream of incoming data is closed
 * @param param0 the chunk of positions from the voroni class and a flag signaling weather more chunks are to come
 */
function handlePositions({payload, keepOpen}:{payload:Float32Array, keepOpen:boolean}) {
  stagingPositions = stagingPositions.concat(Array.from(payload))
  if (!keepOpen){
    updateData()
  }
}

/**
 * apply the positions in the staging buffer to the data and send the updated data to the renderer
 * @postMessage the new positions by id. The calling function can use these when selectivly changing positions for the data
 */
function updateData(){
  let stagingPositionIndex = 0
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    if (d.shouldMove){
      d.x = stagingPositions[stagingPositionIndex];
      d.y = stagingPositions[stagingPositionIndex + 1];
      stagingPositionIndex += 2
    } 
  }
  const positions = Object.fromEntries(data.map(d => [d.id, [d.x, d.y]]))
  self.postMessage({positions})
  shapeRenderer.data(data);
}

/**
 * selects all children of the class "shape" from the custom data container and draws them to the canvas
 */
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
