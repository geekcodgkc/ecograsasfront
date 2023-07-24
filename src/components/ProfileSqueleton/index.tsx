import React from "react";
import "./index.scss";

export default function ProfileSqueleton() {
	return (
		<div className="w-full max-w-screen-xl mx-auto w-11/12 p-2">
			<header className="w-full flex flex-wrap justify-between items-center headerSqueletonContainer py-8">
				<div className="flex flex-wrap items-center gap-8 animate-pulse">
					<div className="profileSkeleton bg-slate-400" />
					<div className="nameSkeleton rounded-lg bg-slate-400" />
				</div>
				<button
					type="button"
					disabled
					className="action-button-1 animate-pulse"
				>
					cerrar sesion
				</button>
			</header>
			<div className="w-full flex flex-wrap gap-8 animate-pulse justify-between">
				<div className="infoSqueleton bg-slate-200 shadow-xl rounded-lg">
					<div className="bar bg-slate-400" />
					<div className="bar bg-slate-400" />
					<div className="bar bg-slate-400" />
				</div>
				<div className="sellerSqueleton bg-slate-200 shadow-xl rounded-lg">
					<header>
						<div className="profileSkeleton bg-slate-400" />
						<div className="bar bg-slate-400" />
					</header>
					<div className="bar bg-slate-400" />
					<div className="bar bg-slate-400" />
				</div>
			</div>
		</div>
	);
}
