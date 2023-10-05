import { useEffect, useContext } from "react";
import { GenericContext } from "../contexts/Context";
import { FilterContext } from "../contexts/FilterContext";
import useChartUpdates from './useChartUpdates'

const useParameterUpdate = () => {
    const updateChart = useChartUpdates()
    const { state, dispatch } = useContext(GenericContext)!
    const { filter } = useContext(FilterContext)!
    const { set: filterSet, key: filterKey, selected } = filter
    const passActionToChart = (action: string) => {
        if (updateChart) {
            updateChart(action)
        }
    }

    useEffect(() => {
        if (state.lastChange) {
            const { type, parameter } = state.lastChange
            switch (type) {
                case `reset_parameter`:
                case 'update_parameter_key': {
                    const { key } = state.parameters[parameter!]
                    const set = [...new Set(state.data.map(d => d[key]))]
                    passActionToChart(`update_chart_${parameter}_key`)
                    dispatch({ type: 'update_parameter_set', payload: { parameter: parameter!, set } })
                }
                    break;
                case 'update_parameter_set': {
                    if (parameter){
                        passActionToChart(`update_chart_${parameter}_set`)
                        const { data } = state
                        const { set, key, pallet } = state.parameters[parameter!]
                        const activeFilterValues = filterSet.filter(elem => !selected[elem])
                        const filteredData = data.filter(d => activeFilterValues.includes(d[filterKey]))
                        const counts = Object.fromEntries(set.map(elem => [elem, filteredData.filter(d => d[key] === elem).length]))
                        const values = Object.values(pallet).flat()
                        const scale:{[key:string]:string} = Object.fromEntries(set.map((value, i) => [value, values[i % values.length]]))
                        dispatch({type:"update_parameter_scale", payload: { parameter, scale}})
                    }
                }
                    break
                case 'update_data':
                    passActionToChart('update_chart_data')
                    break
                case 'update_state':
                    console.log('updating state')
                    passActionToChart('update_chart_data')
                    passActionToChart('update_chart_slice_key')
                    passActionToChart('update_chart_slice_set')
                    passActionToChart('update_chart_ring_key')
                    passActionToChart('update_chart_ring_set')
                    break
                default:
                    break;
            }
        }
    }, [state])
}

export default useParameterUpdate