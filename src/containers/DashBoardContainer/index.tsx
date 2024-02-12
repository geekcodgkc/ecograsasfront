import React from "react";
import "./index.scss";
import CartWrapper from "../CartWrapper";

export default function DashboardContainer() {
	return (
		<CartWrapper>
			<div className="w-full max-w-screen-xl mx-auto px-2">
				<h2>Dashboard Container</h2>
			</div>
		</CartWrapper>
	);
}
