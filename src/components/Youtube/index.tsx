import React from "react";

interface embedProps {
	src: string;
	title: string;
	allow: string;
	height: string;
	width: string;
}

export default function YoutubeEmbed({
	src,
	title = "titulo del video",
	allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share fullscreen",
	height = "100%",
	width = "100%",
}: embedProps) {
	if (!src) {
		return <div />;
	}

	return (
		<iframe
			src={src}
			title={title}
			allow={allow}
			style={{
				height,
				width,
			}}
			allowFullScreen
		/>
	);
}
