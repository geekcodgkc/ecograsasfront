import React, { useEffect } from "react";
import DashboardContainer from "../containers/DashBoardContainer";
import { Helmet } from "react-helmet";
import { useConfigStore } from "../store/ConfigStore";

export default function Dashboard() {
	const { getConfig, _id } = useConfigStore((store) => store);

	useEffect(() => {
		if (!_id) {
			getConfig();
		}
	}, []);

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
