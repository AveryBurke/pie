import { useEffect, useContext } from "react";
import useChartUpdates from './useChartUpdates'
import { FilterContext } from "../contexts/FilterContext";
const useFilterUpdates = () => {
    const updateChart = useChartUpdates()
    const { filter } = useContext(FilterContext)!
    const passActionToChart = (action: ChartAction) => {
        if (updateChart) {
            updateChart(action)
        }
    }
    useEffect(() => {
        if (filter.lastChange) {
            switch (filter.lastChange) {
                case 'update_filter_selected':
                    passActionToChart('update_chart_data')
                    break
                default:
                    break
            }
        }
    }, [filter])
}

export default useFilterUpdates