import React, { useRef } from "react";
import useIntersectionObserver from "@react-hook/intersection-observer";

interface embedProps {
	src: string;
	title: string;
	allow: string;
	height?: string;
	width?: string;
}

export default function YoutubeEmbed({
	src,
	title = "titulo del video",
	allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share fullscreen",
}: embedProps) {
	if (!src) {
		return <div />;
	}

	const containerRef = useRef<HTMLDivElement | null>(null);
	const lockRef = useRef(false);
	const { isIntersecting } = useIntersectionObserver(containerRef, {});
	if (isIntersecting) {
		lockRef.current = true;
	}

	return (
		<div
			style={{
				overflow: "hidden",
				paddingTop: "56.25%",
				position: "relative",
				width: "100%",
			}}
			ref={containerRef}
		>
			{lockRef.current && (
				<iframe
					style={{
						bottom: 0,
						height: "100%",
						left: 0,
						position: "absolute",
						right: 0,
						top: 0,
						width: "100%",
					}}
					src={src}
					title={title}
					allow={allow}
					allowFullScreen
				/>
			)}
		</div>
	);
}
