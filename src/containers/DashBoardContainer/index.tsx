import React from "react";
import "./index.scss";
import CartWrapper from "../CartWrapper";
import DiscountsWrapper from "../../components/DiscountsWrapper";
import WeightConfig from "../../components/WeightConfig";
import ClientsTab from "../../components/ClientsTab";

export default function DashboardContainer() {
	return (
		<CartWrapper>
			<div className="w-full max-w-screen-xl mx-auto px-2">
				<h2 className="font-bold text-4xl text-center mt-8 mb-4">
					Dashboard Container
				</h2>
				<div className="flex flex-wrap w-full gap-y-4 justify-around">
					<DiscountsWrapper />
					<WeightConfig />
					<ClientsTab />
				</div>
			</div>
		</CartWrapper>
	);
}
