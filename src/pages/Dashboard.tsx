import React, { useEffect } from "react";
import DashboardContainer from "../containers/DashBoardContainer";
import { Helmet } from "react-helmet";
import { useConfigStore } from "../store/ConfigStore";
import { useUserStore } from "../store";
import { navigate } from "gatsby";

export default function Dashboard() {
	const isBrowser = typeof window !== "undefined";
	const store = isBrowser && useUserStore((state) => state);
	const { getConfig, _id } = useConfigStore((store) => store);

	if (store && store.token === null) {
		navigate("/Login");
	}

	if (store && !store.isSuper) {
		navigate("/Profile");
	}

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
