import React, { useContext, useState, useEffect, useRef } from "react";
import { initialState } from "../static/initialState";
import { GenericContext } from "../contexts/Context";
import { FilterContext } from "../contexts/FilterContext"
import { dummyValue } from "../static/initialState";
import Sortable from "./SidebarSortable";
import SidebarComponentWrapper from "./SidebarComponentWrapper";
import deepEqual from "deep-equal";
import useCountRenders from "../hooks/useCountRerenders";

const SidebarParameterComponent = ({ parameter }: { parameter: ParameterType }) => {
    const { dispatch, state } = useContext(GenericContext)!
    const { filter } = useContext(FilterContext)!
    const { set: filterSet, selected, key: filterKey } = filter
    const { key, set } = state.parameters[parameter]

    const options = Object.keys(state.data[0]).reduce<{ value: string, label: string }[]>((acc, option) => {
        if (!option.includes(dummyValue)) acc = [{ value: option, label: option }, ...acc]
        return acc
    }, [])

    const handleChange = (key: string) => {
        dispatch({ type: `update_parameter_key`, payload: { parameter, key } })
    }

    const handleSort = (set: string[]) => {
        dispatch({ type: 'update_parameter_set', payload: { parameter, set } })
    }

    const handleReset = () => {
        dispatch({ type: 'reset_parameter', payload: { parameter, initialState } })
    }
    //to do: consider lifting counts and count caluculations into a
    const activeFilterValues = filterSet.filter(elem => selected[elem])
    const filteredData = state.data.filter(d => activeFilterValues.includes(d[filterKey]))
    let initialCounts = Object.fromEntries(set.map(elem => [elem, filteredData.filter(d => d[key] === elem).length]))
    const refCounts = useRef(initialCounts)
    const [counts, setCounts] = useState(Object.fromEntries(set.map(elem => [elem, {currentCount:initialCounts[elem], previousCount:initialCounts[elem]}])))
    useEffect(() => {
        const {lastChange} = filter
        if (lastChange === 'update_filter_selected'){
        const activeFilterValues = filterSet.filter(elem => !selected[elem])
        const filteredData = state.data.filter(d => activeFilterValues.includes(d[filterKey]))
        const newCounts = Object.fromEntries(set.map(elem => [elem, filteredData.filter(d => d[key] === elem).length]))
        setCounts(Object.fromEntries(set.map(elem => [elem, {currentCount:newCounts[elem], previousCount:counts[elem] ? counts[elem].currentCount : newCounts[elem]}])))
    }
    }, [filter, set])
   
    useEffect(() => {console.log(`${parameter} counts `, counts)},[counts])

    const wrapperProps = { handleChange, handleReset, currentKey:key, options, title: parameter, props: { initialValues:set, handleSort, counts }, ControlPanel: Sortable }
    //@ts-ignore
    return (<SidebarComponentWrapper {...wrapperProps} />)
}   
export default SidebarParameterComponent