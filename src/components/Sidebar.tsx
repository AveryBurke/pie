import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContex";
import GenerateData from "../components/GenerateData";
import SidebarParameterComponent from "./SidebarParameterComponent";
import SidebarFilterComponent from "./SidebarFilterComponent";
import shapes from "../static/shapes";

//note: move sclae generators to their own files

/**
 * creates a function for rendering color-coded divs
 * @param scale an object whose keys are all the members of the parameter's set and whose values are hex colors
 * @returns a function that takes a member of the parameter's set and returns a div with the coresponding background color
 */
const colorScaleGenerator:ScaleGenerator = (scale) => (value, key) =>
	<div key={key} className="scale-container" style={{ backgroundColor: scale[value] }}></div>;

/**
 * creates a function for redering svg shapes inside of containing divs
 * @param scale an object whose keys are all the members of the parameter's set and whose values are svg path data
 * @returns a funciton that takes a member of the parameter's set and returns an svg element with the coresponding shape
 */
const shapeScaleGenerator:ScaleGenerator = (scale) => (value, key) =>
	(
		<div key={key} className="scale-container">
			<svg style={{width:'100%', height:"100%"}}><path style={{transform:"translate(10px,10px)"}} d={shapes(scale[value] as SymbolName, 5.05 )}></path></svg>
		</div>
	);

const Sidebar = () => {
	const { sidebarState, setSidebarState } = useContext(SidebarContext)!;
	const toggleSidebarState = () => {
		setSidebarState(sidebarState === "open" ? "close" : "open");
	};
	return (
		<div className={`sidebar ${sidebarState}`}>
			<div className="pie-holder">
				<div className="pie-hole">
					<h1>&#120503;</h1>
				</div>
			</div>
			<div onClick={toggleSidebarState} className={`sidebar-toggle ${sidebarState}`}>
				{sidebarState === "open" ? <span>&#60;</span> : <span>&#62;</span>}
			</div>
			{/* <GenerateData /> */}
			<SidebarParameterComponent parameter="slice" />
			<SidebarParameterComponent parameter="ring" />
			<SidebarParameterComponent parameter="color" scaleGenerator={colorScaleGenerator} />
			<SidebarParameterComponent parameter="shape" scaleGenerator={shapeScaleGenerator} />
			<SidebarFilterComponent />
		</div>
	);
};
export default Sidebar;
