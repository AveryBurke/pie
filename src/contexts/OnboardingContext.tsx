import React, { useReducer, useContext, ReactNode } from "react";
import { GenericContext } from "./Context";
import Joyride from "react-joyride";
import camelToFlat from "../static/camelToFlat";

interface TourState {
	run: boolean;
	sidebarOpen: boolean;
	stepIndex: number;
	steps: Joyride.Step[];
}

interface OnboardValues {
	tourState: TourState;
	dispatch: React.Dispatch<TourState>;
}
const OnboardContext = React.createContext<OnboardValues | { tourState: null; dispatch: null }>({ tourState: null, dispatch: null });

const reducer = (state: TourState, nexState: TourState) => {
	return { ...state, ...nexState };
};

/** onboard a new user. Show the popup and then start the tour */
const OnboardContextProvider = (props: React.PropsWithChildren) => {
	const { state } = useContext(GenericContext);
	const steps: Joyride.Step[] = [
		{
			target: ".sidebar",
			content: "Use the sidebar to change the chart's parameters and data",
			disableBeacon: true,
			disableOverlayClose: true,
			placement: "right",
			// spotlightPadding: 25,
			styles: {
				options: {
					zIndex: 10000,
				},
			},
		},
		{
			target: "#slice_sidebar-component",
			content: "You can adjust or change the chart's slices using the slice controle panel.",
			disableBeacon: true,
			disableOverlayClose: true,
			placement: "right",
			styles: {
				options: {
					zIndex: 10000,
				},
			},
		},
		{
			target: "#slice_select",
			content: (<div>The chart's slices are set to the <span style={{fontWeight:"bold"}}>{camelToFlat(state?.parameters.slice.key!)}</span> column. But you can select another column using this dropdown</div>),
			disableBeacon: true,
			disableOverlayClose: true,
			styles: {
				options: {
					zIndex: 10000,
				},
			},
			placement: "top",
		},
		{
			target: "#slice_controle_panel",
			content: (<div>There are <span style={{fontWeight:'bold'}}>{state?.parameters.slice.set.length}</span> unique values in the <span style={{fontWeight:"bold"}}>{camelToFlat(
				state?.parameters.slice.key!
			)}</span> column. These determin the slices. You can reorder the slices by draging the elements in the controle panel</div>),
			disableBeacon: true,
			disableOverlayClose: true,
			placement: "right",
		},
		{
			target: "#color_sidebar-component",
			content: <div>The users are colored according to their <span style={{fontWeight:"bold"}}>{camelToFlat(
				state?.parameters.color.key!
			)}</span> values. But you can select another column for color-coding. You can also select a shape coding.</div>,
			disableBeacon: true,
			disableOverlayClose: true,
			placement: "right",
		},
		{
			target: "#filter_sidebar-component",
			content:
				"You can also choose a column against which to filter the data. For instance, if you don't wont to see any right handed users selected the chirality column and use the checkbox to remove all right handed users",
			disableBeacon: true,
			disableOverlayClose: true,
			placement: "top",
		},
	];
	const initialState: TourState = { run: false, steps, stepIndex: 0, sidebarOpen: false };
	const [tourState, dispatch] = useReducer(reducer, initialState);
	return <OnboardContext.Provider value={{ tourState, dispatch }}>{props.children}</OnboardContext.Provider>;
};



export { OnboardContext, OnboardContextProvider };
