import { select } from "d3-selection";
import { pie } from "d3-shape";
import colorPallet from "../static/colorPallet";
import deepEqual from "deep-equal";
import {dummyValue} from "../static/initialState";


function pizzaChart(): typeof chart {

    // All options that should be accessible to caller
    let data: any[],

        //slices
        sliceSet: string[],
        sliceKey: string,
        sliceColors: { [slice: string]: string[] },

        //rings
        ringSet: string[],
        ringKey: string,

        //chart dimensions
        margin: Margin,
        canvasWidth: number,
        canvasHeight: number,

        //webgpu
        device: GPUDevice,

        //update handlers
        //values that the caller can change after the chart is inilized
        updateData: UpdateHandler,
        updateSliceKey: UpdateHandler,
        updateSliceSet: UpdateHandler,
        updateRingKey: UpdateHandler,
        updateRingSet: UpdateHandler


    function chart(selection: d3.Selection<HTMLDivElement, any, any, any>) {
        selection.each(function () {
            //set up the screen
            const root = select(this),
                dpi = window.devicePixelRatio,
                outsideHeight = margin.top + margin.bottom,
                outsideWidth = margin.left + margin.right,
                insideHeight = canvasHeight - outsideHeight,
                insideWidth = canvasWidth - outsideWidth,
                diameterRatio = 0.85,
                pieDiameter = diameterRatio * insideHeight,
                pieRadius = pieDiameter / 2,
                canvas = root.append('canvas'),
                canvas2 = root.append('canvas'),
                canvas3 = root.append('canvas'),
                canvasNode = canvas.node(),
                canvasNode2 = canvas2.node(),
                canvasNode3 = canvas3.node(),
                textureW = 312,
                textureH = 312

            if (canvasNode) {
                canvasNode.style.width = canvasWidth + "px";
                canvasNode.style.height = canvasHeight + "px";
                canvasNode.style.position = 'absolute'
                canvasNode.style.zIndex = "0"
                canvasNode.width = Math.floor(canvasWidth * dpi);
                canvasNode.height = Math.floor(canvasHeight * dpi);
                canvasNode.id = "background"
            }
            /** this canvas is only for the webgl2 context. it's only used for rendering when displaying debug textures */
            if (canvasNode2) {
                canvasNode2.style.width = canvasWidth + "px";
                canvasNode2.style.height = canvasHeight + "px";
                canvasNode2.style.position = 'absolute'
                canvasNode2.style.zIndex = "2"
                canvasNode2.width = Math.floor(canvasWidth * dpi);
                canvasNode2.height = Math.floor(canvasHeight * dpi);
                canvasNode2.id = "compute"
            }

            if (canvasNode3) {
                canvasNode3.style.width = canvasWidth + "px";
                canvasNode3.style.height = canvasHeight + "px";
                canvasNode3.style.position = 'absolute'
                canvasNode3.style.zIndex = "1"
                canvasNode3.width = Math.floor(canvasWidth * dpi);
                canvasNode3.height = Math.floor(canvasHeight * dpi);
                canvasNode3.id = "shapes"
            }


            let ringValue = (d: any) => d[ringKey],
                sliceValue = (d: any) => d[sliceKey],
                ringCount = Object.fromEntries(ringSet.map(ring => [ring, data.filter(d => ringValue(d) === ring).length])),
                sliceCount = Object.fromEntries(sliceSet.map(slice => [slice, data.filter(d => sliceValue(d) === slice).length])),
                ringHeights = ringSet.reduce<{ [key: string]: { innerRadius: number, outerRadius: number } }>((acc, ring, i) => {
                    const height = ringCount[ring]! * (pieRadius / data.length)
                    if (i === 0) {
                        acc[ring] = { innerRadius: 0, outerRadius: height }
                    } else {
                        const prev = ringSet[i - 1]
                        const { outerRadius: prevOuter } = acc[prev!] || { outerRadius: 0 }
                        const outerRadius = height + prevOuter
                        acc[ring] = { innerRadius: prevOuter, outerRadius }
                    }
                    return acc
                }, {}),
                pieGenerator = pie<string>()
                    .value(slice => sliceCount[slice]!)
                    .sort((a: string, b: string) => sliceSet.indexOf(a) - sliceSet.indexOf(b)),
                sliceAngles = Object.fromEntries(pieGenerator(sliceSet).map(p => {
                    const { startAngle, endAngle } = p
                    return [p.data, { startAngle, endAngle }]
                })),
                sliceColorsShouldChange = false,
                vornoiInitialized = false,
                currentSectionVerts:{[id:string]:[number,number][]} = {},
                currentSectionCoords:{[id:string]:[number,number][]} = {}

            const backgroundWorker = new Worker(new URL("../workers/backgroundWorker", import.meta.url), { type: 'module' })
            // const shapesWorker = new Worker(new URL("../workers/shapesWorker", import.meta.url), { type: 'module' })
            const shapeWorker = new Worker(new URL("../workers/shapeWorker", import.meta.url), { type: 'module' })
            const offscreen = canvasNode?.transferControlToOffscreen()
            const offscreen2 = canvasNode2?.transferControlToOffscreen()
            const offscreen3 = canvasNode3?.transferControlToOffscreen()
            // const gl = offscreen2!.getContext("webgl2")
            // if (gl!.getExtension("EXT_color_buffer_float")) {
            //     console.log("voroni error: color extention does not exist");
            //   }
            backgroundWorker.postMessage({ type: 'set_ctx', canvas: offscreen }, [offscreen!])
            backgroundWorker.postMessage({ type: 'set_dimensions', w: canvasWidth, h: canvasHeight, r: dpi })
            backgroundWorker.postMessage({ type: 'init_chart', sliceSet, sliceAngles, ringSet, ringHeights, sliceColors })
            shapeWorker.postMessage({type: "init", computeCanvas:offscreen2, canvas:offscreen3, textureW, textureH, radius:pieDiameter},[offscreen2!, offscreen3!])
            
            // shapesWorker.postMessage({ type: 'set_ctx', canvas: offscreen2 }, [offscreen2!])
            // shapesWorker.postMessage({ type: 'set_dimensions', w: canvasWidth, h: canvasHeight, r: dpi })
            backgroundWorker.addEventListener('message', e => {
                const { sectionVerts, sectionCoords}:{sectionVerts:number[], sectionCoords:[number, number, number][]} = e.data
                // console.log({ sectionVerts, sectionCoords})
                if (sectionVerts && !deepEqual(sectionVerts, currentSectionVerts)) {
                    // currentSectionVerts = sectionVerts
                    /** this is intended to be an array of vec3s of the form (x, y, arc_id) */
                    const vertices:number[] = []
                    for (let i = 0; i < sectionVerts.length; i += 3){
                        /**             x                                    y                      id */
                        // vertices.push((sectionVerts[i] * (720/1280)) / textureW, (sectionVerts[i + 1] * (720/1280)), sectionVerts[i + 2])
                        vertices.push((sectionVerts[i]/pieDiameter) * 2, (sectionVerts[i + 1]/pieDiameter * 2), sectionVerts[i + 2])
                    }
                    shapeWorker.postMessage({type:'update_stencil', stencil:vertices})
                }
                if (sectionCoords && !deepEqual(sectionCoords, currentSectionCoords)) {
                    // console.log(sectionCoords,currentSectionCoords)
                    // currentSectionCoords = sectionCoordsa
                    let offsets:number[] = [];
                    let offsetArcIds:number[] = [];
                    sectionCoords.sort((a,b) => cmp(a[2], b[2]) || cmp(a[0], b[0]) || cmp(a[1], b[1]))
                    const sortedIds:string[] = data.sort((a, b) => cmp(sliceSet.indexOf(sliceValue(a)), sliceSet.indexOf(sliceValue(b))) || cmp(ringSet.indexOf(ringValue(a)), ringSet.indexOf(ringValue(b)))).map(d => d[`${dummyValue}_id`])
                    shapeWorker.postMessage({type:"update_ids", ids:sortedIds})
                    for (let i = 0; i < sectionCoords.length; ++i) {  
                        const coord = sectionCoords[i]   
                        // offsets.push((sectionCoords[i] * (720/1280) * dpi)/textureW, -(sectionCoords[i + 1] * (720/1280) * dpi) / textureH)
                        offsets.push((coord[0]/pieDiameter) * 2, -(coord[1]/pieDiameter * 2))
                        offsetArcIds.push(coord[2])
                    }
                    console.log({offsets})
                    // for (let i = 0; i < sectionCoords.length; i += 3) {     
                    //     offsets.push(sectionCoords[i], sectionCoords[i + 1])
                    //     offsetArcIds.push(sectionCoords[i + 2])
                    // }
                    // shapeWorker.postMessage({type:"draw", offsets})

                    // if (offsetArcIds.length > 100 && offsetArcIds[offsetArcIds.length - 1] > 0){
                        shapeWorker.postMessage({type:"render_in_chunks", offsets, offsetArcIds})
                    // } else {
                        // console.log('rendering')
                        // shapeWorker.postMessage({type:"update_offsets", offsets, offsetArcIds})
                        // shapeWorker.postMessage({type:"render"})
                    // }
                    
                    // voroni.nuclei(nuclei)
                }
                // if (!vornoiInitialized) {
                //     voroni
                //         // .numberOfCycles(50)
                //         .subscribe((results:number[]) => {
                //             const coords:[number, number][] = []
                //             console.log('coords going in ', results)
                //             for (let i = 0; i < results.length; i += 2){
                //                 const x =( (results[i]* 2) - 1) * 1280,
                //                     y = ((results[i + 1] * 2) - 1) * 720
                //                     coords.push([x, y])
                //             }
                //             console.log('coords coming out: ', coords)
                //             shapesWorker.postMessage({type:'update_coords', coords})
                //         })
                //     voroni()
                //     vornoiInitialized = true
                // }
                // console.time('it took this long to get a result from the gpu')
                // voroni.render()
                // console.timeEnd('it took this long to get a result from the gpu')
            })



            updateData = function () {
                const updateSliceCount = Object.fromEntries(sliceSet.map(slice => [slice, data.filter(d => sliceValue(d) === slice).length]))
                const updateRingCount = Object.fromEntries(ringSet.map(ring => [ring, data.filter(d => ringValue(d) === ring).length]))
                const arcCount:{[arc_id:string]:number} = {}
                for (let i = 0; i < sliceSet.length; i++) {
                    const slice = sliceSet[i]
                    for (let j = 0; j < ringSet.length; j++) {
                        const ring = ringSet[j]
                        arcCount[`_${slice}_${ring}`] = data.filter(d => d[sliceKey] === slice && d[ringKey] === ring).length
                    }
                }
                backgroundWorker.postMessage({type:"update_arc_count", arcCount})
                if (!deepEqual(updateSliceCount, sliceCount)) {
                    console.log('calling update slice angles')
                    sliceCount = updateSliceCount
                    updateSliceAngles()
                }
                if (!deepEqual(updateRingCount, ringCount)) {
                    console.log("calling update ring heights")
                    ringCount = updateRingCount
                    updateRingHeights()
                }
            }

            updateSliceKey = function () {
                sliceValue = (d: any) => d[sliceKey]
                backgroundWorker.postMessage({
                    type: 'remove_slices'
                })
                sliceColorsShouldChange = true
            }

            updateSliceSet = function () {
                const arcCount:{[arc_id:string]:number} = {}
                for (let i = 0; i < sliceSet.length; i++) {
                    const slice = sliceSet[i]
                    for (let j = 0; j < ringSet.length; j++) {
                        const ring = ringSet[j]
                        arcCount[`_${slice}_${ring}`] = data.filter(d => d[sliceKey] === slice && d[ringKey] === ring).length
                    }
                }
                backgroundWorker.postMessage({type:"update_arc_count", arcCount})
                if (sliceColorsShouldChange) {
                    updateSliceColors()
                    sliceColorsShouldChange = false
                }
                sliceCount = Object.fromEntries(sliceSet.map(slice => [slice, data.filter(d => sliceValue(d) === slice).length]))
                updateSliceAngles()
            }

            updateRingKey = function () {
                ringValue = (d: any) => d[ringKey]
                backgroundWorker.postMessage({
                    type: 'remove_rings'
                })
            }

            updateRingSet = function () {
                const arcCount:{[arc_id:string]:number} = {}
                for (let i = 0; i < sliceSet.length; i++) {
                    const slice = sliceSet[i]
                    for (let j = 0; j < ringSet.length; j++) {
                        const ring = ringSet[j]
                        arcCount[`_${slice}_${ring}`] = data.filter(d => d[sliceKey] === slice && d[ringKey] === ring).length
                    }
                }
                backgroundWorker.postMessage({type:"update_arc_count", arcCount})
                ringCount = Object.fromEntries(ringSet.map(ring => [ring, data.filter(d => ringValue(d) === ring).length]))
                updateRingHeights()
            }

            // //helper functions
            function updateSliceColors() {
                const previouslyUsed = Object.keys(sliceColors).length
                sliceColors = Object.fromEntries(sliceSet.map((slice, i) => [slice, colorPallet[(i + previouslyUsed) % colorPallet.length]!]))
            }
            function updateSliceAngles() {
                pieGenerator = pie<string>()
                    .value(slice => sliceCount[slice]!)
                    .sort((a: string, b: string) => sliceSet.indexOf(a) - sliceSet.indexOf(b)),
                    sliceAngles = Object.fromEntries(pieGenerator(sliceSet).map(p => {
                        const { startAngle, endAngle } = p
                        return [p.data, { startAngle, endAngle }]
                    }))
                backgroundWorker.postMessage({
                    type: 'update_slice_set',
                    sliceSet,
                    sliceAngles,
                    sliceColors
                })
            }
            function updateRingHeights() {
                ringHeights = ringSet.reduce<{ [key: string]: { innerRadius: number, outerRadius: number } }>((acc, ring, i) => {
                    const height = ringCount[ring]! * (pieRadius / data.length)
                    if (i === 0) {
                        acc[ring] = { innerRadius: 0, outerRadius: height }
                    } else {
                        const prev = ringSet[i - 1]
                        const { outerRadius: prevOuter } = acc[prev!] || { outerRadius: 0 }
                        const outerRadius = height + prevOuter
                        acc[ring] = { innerRadius: prevOuter, outerRadius }
                    }
                    return acc
                }, {})

                backgroundWorker.postMessage({
                    type: 'update_ring_set',
                    ringSet,
                    ringHeights
                })
            }
            function cmp(a:number, b:number) {
                if (a > b) return +1;
                if (a < b) return -1;
                return 0;
            }
            //boot
            updateData()


        })
    }

    chart.data = function (value: any[]) {
        data = value;
        if (typeof updateData === 'function') updateData();
        return chart;
    };


    //slice
    chart.sliceKey = function (value: string) {
        sliceKey = value;
        if (typeof updateSliceKey === 'function') updateSliceKey();
        return chart;
    };

    chart.sliceSet = function (value: string[]) {
        sliceSet = value;
        if (typeof updateSliceSet === 'function') updateSliceSet();
        return chart;
    };

    chart.sliceColors = function (value: { [slice: string]: string[] }) {
        sliceColors = value;
        // if (typeof updateSliceColors === 'function') updateSliceColors();
        return chart;
    };

    //ring
    chart.ringKey = function (value: string) {
        ringKey = value;
        if (typeof updateRingKey === 'function') updateRingKey();
        return chart;
    };

    chart.ringSet = function (value: string[]) {
        ringSet = value
        if (typeof updateRingSet === 'function') updateRingSet();
        return chart;
    };
    

    //measurements
    chart.margin = function (value: Margin) {
        margin = value
        return chart
    }

    chart.margin = function (value: Margin) {
        margin = value
        return chart
    }

    chart.canvasWidth = function (value: number) {
        canvasWidth = value
        return chart
    }

    chart.canvasHeight = function (value: number) {
        canvasHeight = value
        return chart
    }


    return chart;
}
export default pizzaChart 