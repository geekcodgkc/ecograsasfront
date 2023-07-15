import React from "react";
import "./index.scss";

interface EventsPropsInterface {
	date: string;
	hour: string;
	description: string;
	title: string;
	img?: string;
}

export default function EventsCard({
	title,
	description,
	img,
	date,
	hour,
}: EventsPropsInterface) {
	return (
		<article className="eventCardContainer shadow-lg relative">
			<div
				className="backgroundImage"
				style={{
					backgroundImage: `url(${img})`,
				}}
			/>
			<div className="eventCardContentContainer p-4 flex flex-col">
				<div className="timeContainer mb-2">
					<p>{date}</p>
					<p>{hour}</p>
				</div>
				<h3 className="font-bold mb-2 text-lg">{title}</h3>
				<p>{description}</p>
			</div>
		</article>
	);
}
