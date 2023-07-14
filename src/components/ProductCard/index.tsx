import React, { useRef, useEffect, useState } from "react";
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
	...rest
}: ProductCardInterface) {
	const [size, setSize] = useState(300);
	const windowSize = useRef<number[]>([window.innerWidth]);

	useEffect(() => {
		if (windowSize.current) {
			setSize(windowSize.current[0]);
		}
	}, [windowSize]);

	const handleButton = () => {
		navigate(`${actionRoute}`);
	};

	return (
		<div className="flex p-4 flex-col cardContainer">
			<h3>titulo de la tarjeta</h3>
			<button type="button" className={"action-button-1"}>
				algo
			</button>
		</div>
	);
}
