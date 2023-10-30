import React, { useContext, useState, useEffect, useRef, useCallback, PropsWithChildren } from "react";
import { initialState } from "../static/initialState";
import { GenericContext } from "../contexts/Context";
import { FilterContext } from "../contexts/FilterContext";
import { dummyValue } from "../static/initialState";
import Sortable from "./SidebarSortable";
import SidebarComponentWrapper from "./SidebarComponentWrapper";

/**
 * for a given parameter create a sidebar component {@link ./SidebarComponentWrapper} with an optional extra visula guide
 * @param param0 the parameter and the optional generator funciton for the visual guide
 * @returns a sidebar component with a sortable controle panel and approprate update hanlders
 */
const SidebarParameterComponent = ({ parameter, scaleGenerator }: PropsWithChildren<SidebarParameterComponentProps>) => {
	const { dispatch, state } = useContext(GenericContext);
	if (dispatch && state) {
		const { filter } = useContext(FilterContext)!;
		const { set: filterSet, selected, key: filterKey } = filter;
		const { key, set, scale } = state.parameters[parameter];

		const options = Object.keys(state.data[0]).reduce<{ value: string; label: string }[]>((acc, option) => {
			if (!option.includes(dummyValue)) acc = [{ value: option, label: option }, ...acc];
			return acc;
		}, []);

		const handleChange = (key: string) => {
            /**
             * @type {ActionUpdateParameterKey}
             */
			dispatch({ type: `update_parameter_key`, payload: { parameter, key } });
		};

		const handleSort = (set: string[]) => {
            /** 
             * @type {ActionUpdateParameterSet}
             */
			dispatch({ type: "update_parameter_set", payload: { parameter, set } });
		};

		const handleReset = () => {
            /**
             * @type {ActionResetParameter}
             */
			dispatch({ type: "reset_parameter", payload: { parameter, initialState } });
		};

		const activeFilterValues = filterSet.filter((elem) => selected[elem]);
		const filteredData = state.data.filter((d) => activeFilterValues.includes(d[filterKey]));
		let initialCounts = Object.fromEntries(set.map((elem) => [elem, filteredData.filter((d) => d[key] === elem).length]));
		const [counts, setCounts] = useState(
			Object.fromEntries(set.map((elem) => [elem, { currentCount: initialCounts[elem], previousCount: initialCounts[elem] }]))
		);
        //listen to the filter, if the filter was updated then recalculate the counts for this paramter
		useEffect(() => {
			const { lastChange } = filter;
			if (lastChange === "update_filter_selected") {
				const activeFilterValues = filterSet.filter((elem) => !selected[elem]);
				const filteredData = state.data.filter((d) => activeFilterValues.includes(d[filterKey]));
				const newCounts = Object.fromEntries(set.map((elem) => [elem, filteredData.filter((d) => d[key] === elem).length]));
				setCounts(
					Object.fromEntries(
						set.map((elem) => [elem, { currentCount: newCounts[elem], previousCount: counts[elem] ? counts[elem].currentCount : newCounts[elem] }])
					)
				);
			}
		}, [filter, set]);
        // if a scale generator was passed then create the function that will generate a div for each element of the set
		const optionalDivs =
			useCallback(() => {
				if (scaleGenerator) {
					return scaleGenerator(scale);
				}
			}, [scale])() || null;
		const props: ComponenetPropsType = { initialValues: set, handleSort, counts, optionalDivs };
		const wrapperProps: SidebarComponentWrapperProps = { handleChange, handleReset, currentKey: key, options, title: parameter, props, ControlPanel: Sortable };

		return <SidebarComponentWrapper {...wrapperProps} />;
	}
	return <div></div>;
};
export default SidebarParameterComponent;
