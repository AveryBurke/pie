import { select } from "d3-selection";
import React, { useRef, useLayoutEffect, useEffect, useState, useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContex";
import colorPallet from "../static/colorPallet";
import { GenericContext } from "../contexts/Context";
import { AsynContext } from "../contexts/GpuContext";
import useParameterUpdates from "../hooks/useParameterUpdates";
import useFilterUpdates from "../hooks/useFilterUpdates";

/**
 * initializes the chart from the current state.
 * the chart is made availble as a ref through the context provider {@link ../contexts/Context}.  
 * Updates to the chart are handled by {@link ../hooks/useChartUpdates}
 * @returns a div bound to the chart
 */
const GenericChart = (): JSX.Element => {
    // useCountRerenders('render chart')
    // const { sliceKey, sliceSet, ringKey, ringSet, data } = props

    const refDiv = useRef<HTMLDivElement>(null)
    const [render, setRender] = useState(false)
    const { sidebarState } = useContext(SidebarContext)!
    const { state, refChart } = useContext(GenericContext)!
    const { data, parameters: { ring, slice, color, shape } } = state!
    const sliceColors = Object.fromEntries(slice.set.map((s, i) => [s, colorPallet[i % colorPallet.length]!]))

    useParameterUpdates()
    useFilterUpdates()
    useLayoutEffect(() => {
        //initilize the chart
        if (!render && refChart) {
            refChart.canvasWidth(1280)
            refChart.canvasHeight(720)
            refChart.margin({ top: 120, right: 220, bottom: 0, left: 220 })
            refChart.data(data)
            refChart.sliceColors(sliceColors)
            if (slice.key) refChart.sliceKey(slice.key)
            if (slice.set) refChart.sliceSet(slice.set)
            if (ring.key) refChart.ringKey(ring.key)
            if (ring.set) refChart.ringSet(ring.set)
            if (color.key) refChart.colorKey(color.key)
            if (color.scale) refChart.colorScale(color.scale)
            if (shape.key) refChart.shapeKey(shape.key)
            if (shape.scale) refChart.shapeScale(shape.scale)
        }

        //render the chart
        setRender(true)
    }, []
    )

    useLayoutEffect(() => {
        //if the chart is ready to render
        if (render && refChart && select && refDiv && refDiv.current) {
            //once the chart is initialized bind it to the div
            select(refDiv.current)
                .call(refChart)
        }
    }, [render, refDiv, refDiv.current, select])

    return (
        <div
            className={`${sidebarState}`}
            ref={refDiv}
            key='root'
            id='root'
        >
        </div>
    )

}
// export default React.memo(GenericChart, doNotReRender)
export default GenericChart
