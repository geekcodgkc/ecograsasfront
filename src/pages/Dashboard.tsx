import React from "react";
import DashboardContainer from "../containers/DashBoardContainer";
import { Helmet } from "react-helmet";

export default function Dashboard() {
	return (
		<>
			<Helmet>
				<title>{"ecograsas - Dashboard"}</title>
				<meta content={"Dasboard de ecograsas"} />
			</Helmet>
			<DashboardContainer />
		</>
	);
}
