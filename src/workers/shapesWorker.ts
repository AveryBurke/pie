import { select } from "d3-selection";
import { arc, symbol, symbolCircle } from "d3-shape";
import renderBackground from "../d3/renderBackground"
// @ts-ignore
import xmldom from "../domparser_bundle";

const DOMImplementation = xmldom.DOMImplementation;

const backgroundWorker: Worker = self as any

class worker {
    background: ReturnType<typeof renderBackground> = renderBackground()
    ctx: OffscreenCanvasRenderingContext2D | null = null
    canvasHeight = 0
    canvasWidth = 0
    dom: Document = new DOMImplementation().createDocument()
    ratio = 2
    generator = arc()
    ringSet: string[] = []
    ringHeights: { [ring: string]: { innerRadius: number, outerRadius: number } } = {}
    sliceSet: string[] = []
    sliceAngles: { [slice: string]: { startAngle: number, endAngle: number } } = {}
    sliceColors: { [slice: string]: string[] } = {}

    setContext(ctx: OffscreenCanvasRenderingContext2D) {
        this.ctx = ctx
    }

    setDimensions(w: number, h: number, r: number) {
        this.canvasWidth = w
        this.canvasHeight = h
        this.ratio = r
    }

    updateCoords(coords: [number, number][]) {
        // console.log('coords: ', coords)
        const r = 5
        const { ctx, canvasWidth, canvasHeight, ratio } = this
        if (ctx) {

            ctx.save();
            ctx.clearRect(0, 0, Math.floor(canvasWidth * ratio), Math.floor(canvasHeight * ratio));
            ctx.lineWidth = .5;
            ctx.fillStyle = '#FF7F50'

            for (let i = 0; i < coords.length; ++i){
                let [x, y] = coords[i]
                ctx.setTransform(ratio, 0, 0, ratio, (x + Math.floor(canvasWidth / 2)) * ratio, (y + Math.floor(canvasHeight / 2)) * ratio)
                const path = symbol(symbolCircle).size((r * r) * Math.PI)() || ""
                ctx.fill(new Path2D(path))
            }
            // for (var i = 0; i < coords.length; i += 3) {
            //     const [a, b, c] = [coords[i], coords[i + 1], coords[i + 2]]
            //     const A = Math.hypot(b[0] - a[0], b[1] - a[1])
            //     const B = Math.hypot(c[0] - b[0], c[1] - b[1])
            //     const C = Math.hypot(a[0] - c[0], a[1] - c[1])
            //     const s = (A + B + C) / 2 
            //     const area = Math.sqrt(s * ((s - A) * (s - B) * (s - C)))
            //     if (area > 0){
            //         ctx.beginPath()
            //         ctx.moveTo(...coords[i])
            //         ctx.lineTo(...coords[i + 1])
            //         ctx.lineTo(...coords[i + 2])
            //         ctx.closePath()
            //         ctx.stroke()
            //     }
            // }
            ctx.stroke()
            ctx.restore()
        }
    }

    draw() {
        const { ctx, canvasWidth, canvasHeight, ratio } = this
        if (ctx) {
            ctx.save();
            ctx.clearRect(0, 0, Math.floor(canvasWidth * ratio), Math.floor(canvasHeight * ratio));
            ctx.lineWidth = .5;
            ctx.setTransform(ratio, 0, 0, ratio, Math.floor(canvasWidth * ratio) / 2, Math.floor(canvasHeight * ratio) / 2)
            ctx.beginPath()
            select(this.dom).selectAll("custom.section").each(function (d: any, i) {
                const path = select(this).select('path'),
                    fill = path.attr('fill'),
                    opacity = +path.attr('opacity'),
                    svgPath = path.attr('d')
                ctx.strokeStyle = '#000000'
                ctx.fillStyle = fill
                ctx.globalAlpha = opacity
                if (svgPath && ctx) {
                    ctx.stroke(new Path2D(svgPath))
                    ctx.fill(new Path2D(svgPath))
                }
            })
            ctx.globalAlpha = 1
            ctx.stroke()
            ctx.restore()
        }
    }

}

const brw = new worker()

self.addEventListener('message', msg => {
    const {
        type,
        canvas,
        w,
        h,
        r,
        coords
    }:
        {
            type: string,
            canvas?: OffscreenCanvas,
            w?: number,
            h?: number,
            r?: number,
            coords: [number, number][]
        } = msg.data

    if (type === 'set_ctx' && canvas) {
        const ctx = canvas.getContext('2d')
        brw.setContext(ctx!)
    }
    if (type === 'set_dimensions' && w && h && r) {
        brw.setDimensions(w, h, r)
    }
    if (type === 'update_coords' && coords) {
        brw.updateCoords(coords)
    }
})

function pointOnLine(v1: [number, number], v2: [number, number]): [number, number] {
    // console.log(v1, v2)
    const scalar = Math.random()
    const [xV1, yV1] = v1
    const [xV2, yV2] = v2
    const distX = xV2 - xV1;
    const distY = yV2 - yV1;
    const x = (distX * scalar) + xV1;
    const y = (distY * scalar) + yV1;

    return [x, y];
}