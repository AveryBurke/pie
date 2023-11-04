import React, { useContext, Fragment, useEffect } from "react";
import { OnboardContext } from "../contexts/OnboardingContext";
import { GenericContext } from "../contexts/Context";
import { SidebarContext } from "../contexts/SidebarContex";
import Tour from "./Tour";
import Popup from "./Popup";
import dummyValue from "../static/dummyValue";

/** onboard new users. show the modal and start the tour when the modal closes  */
const Onboard = () => {
	const { tourState, dispatch } = useContext(OnboardContext);
	const { state } = useContext(GenericContext);
    const {sidebarState, setSidebarState} = useContext(SidebarContext)!;
	const { data } = state!;
	const handlePopupClose = () => {
        //open the sidebar to start the tour
        setSidebarState('open')
	};
    useEffect(() => {
        if (sidebarState === 'open'){
            if (dispatch && tourState) dispatch({ ...tourState, stepIndex: 0, run: true });
        }
    },[sidebarState])
	const tableData: any[] = [];
	for (let i = 0; i < 3; i++) {
		tableData.push(data[i]);
	}
	const headers = Object.keys(data[0]).filter((header) => !header.includes(dummyValue));
	const table = makeTable(headers, tableData);
	const modalContent = (
		<Fragment>
			<p key="0">Pie is a demo data visualization app that automatically generates an interactive bullseye plot from tabular data.</p>
			<p key="1">
				A bullseye plot is a data visualization that represents data in concentric rings and slices, making it easy to compare data points across
				different categories.
			</p>
			<p key="2">We don't have a database (yet) so we've generated a table of <span style={{fontWeight:"bold"}}>{data.length} random users</span> and started a random chart for you.</p>
			<p key="3">The first three rows of the data look like this: </p>
			<div className="tableContainer">{table}</div>
		</Fragment>
	);
	return (
		<Fragment>
			<Popup {...{ isOpen: true, onClose: handlePopupClose, hasCloseBtn: true, title: "Welcom to Pie!" }}>{modalContent}</Popup>
			<Tour />
		</Fragment>
	);
};

/** make an HTML style table from data */
function makeTable(headers: string[], rows: any[]) {
	const head = (
		<thead>
			<tr key="header row">
				{headers.map((header) => (
					<th key={header + "_header"}>{header}</th>
				))}
			</tr>
		</thead>
	);
	const bod = (
		<tbody>
			{rows.map((row, i) => (
				<tr key={`row_${i}`}>
					{headers.map((header) => (
						<td key={`row_${i}_` + header}>{row[header]}</td>
					))}
				</tr>
			))}
			{<tr key = "last_row">{headers.map((header,i) => <td key = {`last_td_${i}`}>...</td>)}</tr>}
		</tbody>
	);
	return (
		<table>
			{head}
			{bod}
		</table>
	);
}

// function camelToFlat(s:string) {return s.replace(/[A-Z]/g, " $&"), s[0].toUpperCase() + s.slice(1)}

export default Onboard;
