import React, { Fragment } from "react";
import RenderChart from "./RenderChart";
import Sidebar from "./Sidebar";
import { SidebarContextProvider } from "../contexts/SidebarContex";
import { GenericContextProvider } from "../contexts/Context";
import { FilterContextProvider } from "../contexts/FilterContext";
const Layout = () => {
    return (
        <Fragment key='parent'>
            <SidebarContextProvider>
                <FilterContextProvider>
                    <GenericContextProvider>
                        <Sidebar key='sidebar' />
                        <RenderChart key = 'child' />
                    </GenericContextProvider>
                </FilterContextProvider>
            </SidebarContextProvider>
        </Fragment>)
}
export default Layout