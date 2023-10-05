import { useContext } from "react";
import { GenericContext } from "../contexts/Context";
import { FilterContext } from "../contexts/FilterContext";
const useChartUpdates = () => {
    const { refChart, state } = useContext(GenericContext)!
    const { filter } = useContext(FilterContext)!
    const {key:filterKey, set:filterSet, selected:selectedFilterValues } = filter
    return function (action: ChartAction) {
        switch (action) {
            case `update_chart_slice_set`:
                refChart.sliceSet(state.parameters.slice.set)
                break;
            case `update_chart_slice_key`:
                refChart.sliceKey(state.parameters.slice.key)
                break;
            case `update_chart_ring_key`:
                refChart.ringKey(state.parameters.ring.key)
                break
            case `update_chart_ring_set`:
                refChart.ringSet(state.parameters.ring.set)
                break
            case `update_chart_color_key`:
                refChart.colorKey(state.parameters.color.key)
                break
            case 'update_chart_color_set':
                refChart.colorSet(state.parameters.color.set)
                break
            case 'update_chart_color_scale':
                refChart.colorScale(state.parameters.color.scale)
                break;
            case `update_chart_data`:
                const activeFilterValues = filterSet.filter(f => selectedFilterValues[f])
                const filteredData = state.data.filter(d => !activeFilterValues.includes(d[filterKey]))
                refChart.data(filteredData)
                break;
            default:
                break;
        }
    }
}


export default useChartUpdates