import React, { useContext, useEffect } from "react";
import { GenericContext } from "../contexts/Context";
import { FilterContext } from "../contexts/FilterContext";
import { dummyValue } from "../static/initialState";
import Selectable from "./SidebarSelectable";
import SidebarComponentWrapper from "./SidebarComponentWrapper";

const SidebarFilterComponent = () => {
    const { filterDispatch, filter } = useContext(FilterContext)!
    const { state } = useContext(GenericContext)!
    const { key, set, selected } = filter
    const options = Object.keys(state.data[0]).reduce<{ value: string, label: string }[]>((acc, option) => {
        if (!option.includes(dummyValue)) acc = [{ value: option, label: option }, ...acc]
        return acc
    }, [])

    useEffect(() => {
        const set = [...new Set(state.data.map(d => d[key]))]
        filterDispatch({ type: 'update_filter_set', payload: { set } })
        const selected = Object.fromEntries(set.map(elem => [elem, false]))
        filterDispatch({ type: 'update_filter_selected', payload: { selected } })
    }, [key])

    const handleChange = (key: string) => {
        filterDispatch({ type: `update_filter_key`, payload: { key } })
    }

    const handleSelect = (selected: { [key: string]: boolean }) => {
        filterDispatch({ type: 'update_filter_selected', payload: { selected } })
    }

    const handleReset = () => {
        filterDispatch({ type: 'update_filter_key', payload: {  key: `${dummyValue}_filter_key` } })
    }
    const wrapperProps = {
        handleChange,
        handleReset,
        currentKey:key,
        options,
        title: 'filter',
        props: { initialValues: set, handleSelect, selected }, ControlPanel: Selectable
    }
    //@ts-ignore
    return (<SidebarComponentWrapper {...wrapperProps} />)
}
export default SidebarFilterComponent