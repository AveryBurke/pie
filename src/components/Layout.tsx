import React, { Fragment } from "react";
import RenderChart from "./RenderChart";
import Sidebar from "./Sidebar";
import Onboard from "./Onboard";
import { SidebarContextProvider } from "../contexts/SidebarContex";
import { GenericContextProvider } from "../contexts/Context";
import { FilterContextProvider } from "../contexts/FilterContext";
import { OnboardContextProvider } from "../contexts/OnboardingContext";
const Layout = () => {
	return (
		<Fragment key="parent">
			<SidebarContextProvider>
				<FilterContextProvider>
					<GenericContextProvider>
						<OnboardContextProvider>
							<Onboard />
						</OnboardContextProvider>
						<Sidebar key="sidebar" />
						<RenderChart key="child" />
					</GenericContextProvider>
				</FilterContextProvider>
			</SidebarContextProvider>
		</Fragment>
	);
};
export default Layout;
