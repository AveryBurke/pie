import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContex";
import GenerateData from "../components/GenerateData";
import SidebarParameterComponent from "./SidebarParameterComponent";
import SidebarFilterComponent from "./SidebarFilterComponent";
import shapes from "../static/shapes";

const colorScaleGenerator = (scale: { [key: string]: string }) => (value: string, key: string) =>
	<div key={key} style={{ width: "20px", height: "20px", justifySelf: "center", borderRadius: "10%", backgroundColor: scale[value] }}></div>;
const shapeScaleGenerator = (scale: { [key: string]: string }) => (value: string, key: string) =>
	(
		<div key={key} style={{ width: "20px", height: "20px", justifySelf: "center", borderRadius: "10%", backgroundColor: "whitesmoke" }}>
			<svg style={{ width: "100%", height: "100%" }}>
				<path style={{ transform: "translate(10px,10px)", fill: "none", stroke: "black" }} d={shapes(scale[value] as SymbolName, 5.05)}></path>
			</svg>
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
			<SidebarParameterComponent {...{ parameter: "slice" }} />
			<SidebarParameterComponent {...{ parameter: "ring" }} />
			<SidebarParameterComponent {...{ parameter: "color", scaleGenerator: colorScaleGenerator }} />
			<SidebarParameterComponent {...{ parameter: "shape", scaleGenerator: shapeScaleGenerator }} />
			<SidebarFilterComponent />
		</div>
	);
};
export default Sidebar;
