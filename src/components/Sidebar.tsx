import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContex";
import GenerateData from "../components/GenerateData";
import SidebarParameterComponent from "./SidebarParameterComponent";
import SidebarFilterComponent from "./SidebarFilterComponent";

const Sidebar = () => {
  const {sidebarState, setSidebarState} = useContext(SidebarContext)!
  const toggleSidebarState = () => {
    setSidebarState(sidebarState === 'open' ? 'close' : 'open')
  }
  return (
    <div className={`sidebar ${sidebarState}`}>
      <div className="pie-holder"><div className="pie-hole"><h1>&#120503;</h1></div></div>
      <div onClick={toggleSidebarState} className={`sidebar-toggle ${sidebarState}`}>
        {sidebarState === 'open' ? <span>&#60;</span> : <span>&#62;</span>}
      </div>
      <GenerateData />
      <SidebarParameterComponent parameter="slice"/>
      <SidebarParameterComponent parameter="ring"/>
      <SidebarFilterComponent />
    </div>
  )
};
export default Sidebar;