import React from "react";
import "./index.scss";

interface SectionProps {
	LeftChild: React.FC;
	RightChild: React.FC;
	padding?: "string";
	background_image?: string;
}

const styles = {
	backgroundColor: "rgba(0,0,0,0)",
	backgroundImage: "",
	backgroundPosition: "center",
	backgroundRepeat: "round",
};

export default function SectionDouble({
	LeftChild,
	RightChild,
	padding,
	background_image,
}: SectionProps) {
	if (background_image) {
		styles.backgroundImage = `url(${background_image})`;
	}

	return (
		<div
			className="m-auto max-w-screen-xl section-container p-12 justify-center flex flex-wrap gap-12"
			id={padding ? "with-padding" : "no-padding"}
			style={styles}
			data-padding={`${padding}`}
		>
			<div className="left-child aspect-video overflow-hidden rounded-lg">
				{LeftChild && <LeftChild />}
			</div>
			<div className="right-child">{RightChild && <RightChild />}</div>
		</div>
	);
}
