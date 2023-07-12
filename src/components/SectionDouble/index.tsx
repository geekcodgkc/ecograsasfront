import React from "react";
import "./index.scss";

interface SectionProps {
	LeftChild: React.FC;
	RightChild: React.FC;
	padding?: string;
}

export default function SectionDouble({
	padding = "p-12",
	LeftChild,
	RightChild,
}: SectionProps) {
	return (
		<div
			className={`m-auto max-w-screen-xl section-container justify-center flex flex-wrap gap-12 ${padding}`}
		>
			<div className="left-child aspect-video overflow-hidden rounded-lg">
				{LeftChild && <LeftChild />}
			</div>
			<div className="right-child">{RightChild && <RightChild />}</div>
		</div>
	);
}
