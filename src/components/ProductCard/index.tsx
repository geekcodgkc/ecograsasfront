import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { FaArrowRightLong } from "react-icons/fa6";
import "./index.scss";

interface ProductCardInterface {
	title: string;
	description: string;
	buttonText?: string;
	actionRoute?: string;
	img?: string;
	style?: object;
}

export default function ProductCard({
	title,
	description,
	buttonText,
	actionRoute,
	img,
}: ProductCardInterface) {
	useEffect(() => {}, []);

	const handleButton = () => {
		navigate(`${actionRoute}`);
	};

	return (
		<div className="cardContainer shadow-lg relative">
			<div
				className="backgroundImage"
				style={{
					backgroundImage: `url(${img})`,
					backgroundPosition: "center",
				}}
			/>
			<div className="cardContentContainer p-4 flex flex-col">
				<h3 className="text-center w-full mb-2 font-bold text-lg">{title}</h3>
				<p className="font-light line-clamp-2">{description}</p>
				<button
					type="button"
					className={"action-button-1"}
					onClick={handleButton}
				>
					{buttonText} <FaArrowRightLong />
				</button>
			</div>
		</div>
	);
}
