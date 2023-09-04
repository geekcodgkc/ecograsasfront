import React from "react";
import "./index.scss";
import { navigate } from "gatsby";

interface EventsPropsInterface {
	date: string;
	description: string;
	title: string;
	img?: string;
	Slug: string;
}

export default function EventsCard({
	title,
	description,
	img,
	date,
	Slug,
}: EventsPropsInterface) {
	return (
		<article
			className="eventCardContainer shadow-lg relative"
			onClick={() => {
				navigate(`/posts/${Slug.toLocaleLowerCase()}`);
			}}
			onKeyDown={() => {}}
		>
			<div
				className="backgroundImage"
				style={{
					backgroundImage: `url(${img})`,
				}}
			/>
			<div className="eventCardContentContainer p-4 flex flex-col">
				<div className="timeContainer mb-2">
					<p>{date}</p>
				</div>
				<h3 className="font-bold mb-2 text-lg">{title}</h3>
				<p>{description}</p>
			</div>
		</article>
	);
}
