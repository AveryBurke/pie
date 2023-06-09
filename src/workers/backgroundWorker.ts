import { select } from "d3-selection";
import { interpolate } from "d3-interpolate";
import { arc } from "d3-shape";
import { Queue } from '../static/queue'
import renderBackground from "../d3/renderBackground"
import { svgPathProperties } from "svg-path-properties"
import earcut from "earcut";
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
    path = arc()({ innerRadius: 50, outerRadius: 300, startAngle: 0, endAngle: 97 * Math.PI / 180 })
    poly = [10, 0, 0, 50, 60, 60, 70, 10]
    setContext(ctx: OffscreenCanvasRenderingContext2D) {
        this.ctx = ctx
    }

    setDimensions(w: number, h: number, r: number) {
        this.canvasWidth = w
        this.canvasHeight = h
        this.ratio = r
    }

    draw() {
        const { ctx, canvasWidth, canvasHeight, ratio, path, poly } = this
        if (ctx) {
            ctx.save();
            ctx.clearRect(0, 0, Math.floor(canvasWidth * ratio), Math.floor(canvasHeight * ratio));
            ctx.lineWidth = .75;
            ctx.setTransform(ratio, 0, 0, ratio, Math.floor(canvasWidth * ratio) / 2, Math.floor(canvasHeight * ratio) / 2)
            select(this.dom).selectAll("custom.section").each(function (d: any, i) {
                const path = select(this).select('path'),
                    id = select(this).attr('id'),
                    fill = path.attr('fill'),
                    opacity = +path.attr('opacity'),
                    svgPath = path.attr('d')
                ctx.strokeStyle = '#000000'
                ctx.fillStyle = fill
                ctx.globalAlpha = .9 //<-- make the background a little opaqu so the shapes stand out
                if (svgPath && ctx && !id.includes('_border')) {
                    ctx.stroke(new Path2D(svgPath))
                    ctx.fill(new Path2D(svgPath))
                }
            })
            ctx.globalAlpha = 1
            ctx.stroke()
            ctx.restore()
        }
    }




    generateArcs() {
        const { ringSet, ringHeights, sliceSet, sliceColors, sliceAngles } = this
        return sliceSet.reduce<Section[]>((acc, slice) => {
            if (sliceAngles[slice]) {
                const { startAngle, endAngle } = sliceAngles[slice]!
                const sections = ringSet.reduce<Section[]>((acc, ring, j) => {
                    if (ringHeights[ring]) {
                        const { innerRadius, outerRadius } = ringHeights[ring]!
                        const id = `_${slice}_${ring}`
                        const slicePallet = sliceColors[slice]!
                        const fill = slicePallet[j % slicePallet.length]!
                        const arc = { id, innerRadius, outerRadius, startAngle, endAngle, fill }
                        const border = { id: id + '_border', innerRadius: innerRadius + 5, outerRadius: outerRadius - 5, startAngle: startAngle + 5 * Math.PI / 180, endAngle: endAngle - 5 * Math.PI / 180, fill: 'black' }
                        acc = [...acc, arc, border]
                    }
                    return acc
                }, [])
                acc = [...acc, ...sections]
            }
            return acc
        }, [])

    }

    initChart(ringSet: string[], ringHeights: { [ring: string]: { innerRadius: number, outerRadius: number } }, sliceSet: string[], sliceAngles: { [slice: string]: { startAngle: number, endAngle: number } }, sliceColors: { [slice: string]: string[] }) {
        const queue = new Queue<QueueTask>()
        this.sliceColors = sliceColors
        this.ringSet = ringSet
        this.ringHeights = ringHeights
        this.sliceSet = sliceSet
        this.sliceAngles = sliceAngles
        const initialSections: Section[] = sliceSet.flatMap((slice, i) => {
            const { startAngle, endAngle } = sliceAngles[slice]!
            return ringSet.map((ring, j) => {
                const { innerRadius, outerRadius } = ringHeights[ring]!
                const id = `_${slice}_${ring}`
                const slicePallet = sliceColors[slice]!
                const fill = slicePallet[j % slicePallet.length]!
                return { id, innerRadius, outerRadius, startAngle, endAngle, fill }
            })
        })

        queue.enqueue({ type: "sections", input: initialSections })

        select(this.dom)
            .call(
                this.background
                    .queue(queue)
                    .generator(arc())
                    .interpolator(interpolate)
                    .draw(() => this.draw())
            )
    }

    updateSliceAngles(sliceAngles: { [slice: string]: { startAngle: number, endAngle: number } }) {
        this.sliceAngles = sliceAngles
        this.generateArcs()
    }

    updateSliceSet(sliceSet: string[], sliceAngles: { [slice: string]: { startAngle: number, endAngle: number } }, sliceColors: { [key: string]: string[] }) {
        const { sliceSet: oldSliceSet } = this
        this.sliceSet = sliceSet
        this.sliceColors = sliceColors
        if (oldSliceSet.length === 0) {
            this.sliceAngles = Object.fromEntries(sliceSet.map(slice => [slice, { startAngle: 0, endAngle: 0 }]))
            const startSlices: QueueTask = { type: "sections", input: this.generateArcs() }
            this.background.enqueue(startSlices)
        }
        this.sliceAngles = sliceAngles
        this.getPathPoints()
        const endSlices: QueueTask = { type: "sections", input: this.generateArcs() }
        this.background.enqueue(endSlices)
        this.background.dequeue()
        // this.getPathPoints()
    }

    removeSlices() {
        //enqueue the transition, but don't dequeue it
        const { sliceSet } = this
        const outGointSliceAngles = Object.fromEntries(sliceSet.map(slice => [slice, { startAngle: 2 * Math.PI, endAngle: 2 * Math.PI }]))
        this.sliceAngles = outGointSliceAngles
        const leavingArcs: QueueTask = { type: "sections", input: this.generateArcs() }
        this.background.enqueue({ type: 'duration', input: 400 })
        this.background.enqueue(leavingArcs)
        this.sliceSet = []
    }

    updateRingSet(ringSet: string[], ringHeights: { [ring: string]: { innerRadius: number, outerRadius: number } }) {
        const { ringSet: oldRingSet } = this
        this.ringSet = ringSet
        if (oldRingSet.length === 0) {
            this.background.enqueue({ type: 'duration', input: 400 / ringSet.length })
            const startingHeights = Object.fromEntries(ringSet.map(ring => [ring, { innerRadius: 0, outerRadius: 0 }]))
            this.ringHeights = startingHeights
            this.background.enqueue({ type: 'sections', input: this.generateArcs() })
            ringSet.forEach((ring, i) => {
                const intermediateRingSet = ringSet.slice(i)
                const { innerRadius, outerRadius } = ringHeights[ring]!
                this.ringHeights[ring] = { innerRadius, outerRadius }
                intermediateRingSet.forEach(ring => this.ringHeights[ring] = { innerRadius, outerRadius })
                const arcsWIthRing = this.generateArcs()
                this.background.enqueue({ type: 'sections', input: arcsWIthRing })
            })
        }
        this.ringHeights = ringHeights
        this.background.enqueue({ type: "sections", input: this.generateArcs() })
        this.background.dequeue()
        this.getPathPoints()
    }

    removeRings() {
        const { ringSet } = this
        this.background.enqueue({ type: 'duration', input: 400 / ringSet.length })
        ringSet.forEach((ring, i) => {
            const { outerRadius } = this.ringHeights[ring]!
            this.ringHeights[ring] = { innerRadius: outerRadius, outerRadius }
            const arcsWIthRing = this.generateArcs()
            this.background.enqueue({ type: 'sections', input: arcsWIthRing })
            this.ringSet = ringSet.slice(i)
            delete this.ringHeights[ring]
        })
        this.ringSet = []
    }

    getPathPoints() {
        const { generator } = this
        const sectionCoords: { [id: string]: [number, number][] } = {}
        const sectionVerts: { [id: string]: [number, number][] } = {}
        const arcs = this.generateArcs() //<--NOTE: destrcutring the method from "this" causes an error. look into that
        arcs.forEach(function (d, i) {
            if (d.id.includes('_border')) {
                // triangulate the boarder polygon
                const path = generator(d) || "",
                    num_points = 100,
                    points: number[] = [],
                    pathProperties = new svgPathProperties(path),
                    pathLength = pathProperties.getTotalLength()
                for (let i = 0; i < num_points; ++i) {
                    let { x, y } = pathProperties.getPointAtLength(i * pathLength / (num_points - 1))
                    points.push(x)
                    points.push(y)
                }
                const ears = earcut(points),//<--returns the indexes of x coordinates of the triangle vertices in the points array
                    //fetch the coordiantes of the triangle vertices from the points array
                    vertices = ears.reduce<[number, number][]>((acc, index) => {
                        const i = index * 2
                        return [...acc, [points[i]!, points[i + 1]!]]
                    }, [])
                sectionVerts[d.id] = vertices

                //seed the positions within the boarder polygon
                const coords: [number, number][] = []
                for (let i = 0; i < 200; ++i) {
                    const { startAngle, endAngle, innerRadius, outerRadius, id } = d
                    if (id.includes('_border')) {
                        const randomClampedR = Math.random() * (outerRadius - innerRadius) + innerRadius,
                            randomClampedTheta = (Math.random() * (endAngle - startAngle) + startAngle) - Math.PI / 2,
                            x = Math.cos(randomClampedTheta) * randomClampedR,
                            y = Math.sin(randomClampedTheta) * randomClampedR
                        coords.push([x, y])
                    }
                }
                sectionCoords[d.id] = coords
            }
        })
        self.postMessage({ sectionVerts, sectionCoords })
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
        ringSet,
        ringHeights,
        sliceSet,
        sliceAngles,
        sliceColors
    }:
        {
            type: string,
            canvas?: OffscreenCanvas,
            w?: number,
            h?: number,
            r?: number,
            ringSet?: string[],
            sliceSet?: string[],
            ringHeights?: { [ring: string]: { innerRadius: number, outerRadius: number } }
            sliceAngles?: { [slice: string]: { startAngle: number, endAngle: number } }
            sliceColors?: { [slice: string]: string[] }
        } = msg.data
        
    if (type === 'set_ctx' && canvas) {
        const ctx = canvas.getContext('2d')
        brw.setContext(ctx!)
    }
    if (type === 'set_dimensions' && w && h && r) {
        brw.setDimensions(w, h, r)
    }
    if (type === 'init_chart' && ringSet && ringHeights && sliceSet && sliceAngles && sliceColors) {
        brw.initChart(ringSet, ringHeights, sliceSet, sliceAngles, sliceColors)
    }
    if (type === 'update_slice_set' && sliceSet && sliceAngles && sliceColors) {
        brw.updateSliceSet(sliceSet, sliceAngles, sliceColors)
    }
    if (type === 'update_ring_set' && ringSet && ringHeights) {
        brw.updateRingSet(ringSet, ringHeights)
    }
    if (type === 'remove_rings') {
        brw.removeRings()
    }
    if (type === 'remove_slices') {
        brw.removeSlices()
    }
})