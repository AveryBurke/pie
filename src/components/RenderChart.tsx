import { select } from "d3-selection";
import React, { useRef, useLayoutEffect, useEffect, useState, useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContex";
import colorPallet from "../static/colorPallet";
import { GenericContext } from "../contexts/Context";
import { AsynContext } from "../contexts/GpuContext";
import useParameterUpdates from "../hooks/useParameterUpdates";
import useFilterUpdates from "../hooks/useFilterUpdates";

type PropsType = {
    ringKey: string
    ringSet: string[]
    sliceKey: string
    sliceSet: string[]
    data: any[]
}

function doNotReRender(prevProps: PropsType, nextProps: PropsType) {
    // console.log(' memo is working')
    const { sliceKey: prevSliceKey, ringKey: prevRingKey } = prevProps
    const { sliceKey: nextSliceKey, ringKey: nextRingKey } = nextProps
    // console.log('should rerender: ', !(prevSliceKey === nextSliceKey && prevRingKey === nextRingKey))
    return prevSliceKey === nextSliceKey && prevRingKey === nextRingKey
}

const GenericChart = (): JSX.Element => {
    // useCountRerenders('render chart')
    // const { sliceKey, sliceSet, ringKey, ringSet, data } = props

    const refDiv = useRef<HTMLDivElement>(null)
    const [render, setRender] = useState(false)
    const { sidebarState } = useContext(SidebarContext)!
    const { state, refChart } = useContext(GenericContext)!
    const { data, parameters: { ring, slice, color } } = state!
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
            if (slice.key) refChart.sliceKey(slice.key)
            if (slice.set) refChart.sliceSet(slice.set)
            refChart.sliceColors(sliceColors)
            if (ring.key) refChart.ringKey(ring.key)
            if (ring.set) refChart.ringSet(ring.set)
            if (color.key) refChart.colorKey(color.key)
            if (color.set) refChart.colorSet(color.set)
            if (color.scale) refChart.colorScale(color.scale)
        }

        //inilzie the chart
        setRender(true)
    }, []
    )

    useLayoutEffect(() => {
        if (render && refChart && select && refDiv && refDiv.current) {
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
