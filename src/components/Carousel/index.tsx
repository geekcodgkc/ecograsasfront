import React, { cloneElement, useState, useRef, useEffect } from "react";
import "./index.scss";

interface CarouselProps {
	children: React.ReactElement[];
	elementsPerView?: number;
}

export default function Carousel({
	children,
	elementsPerView = 3,
}: CarouselProps) {
	const [offset, setOffset] = useState(0);
	const [width, setWidth] = useState(0);
	const [step, setStep] = useState(0);
	const elWidth = useRef<HTMLDivElement>(null);
	const Steps: number[] = [];
	const elementsNumber = children.length;

	for (let i = 0; i < Math.ceil(elementsNumber / elementsPerView); i++) {
		Steps.push(i);
	}

	useEffect(() => {
		if (elWidth.current) {
			setWidth(elWidth.current.scrollWidth);
		}
	}, [elWidth]);

	const handleClick = (step: number) => {
		const stepFrom = 0;
		setStep(step);
		if (step === 0) {
			setOffset(0);
			return;
		}
		const singleStep = (width / elementsNumber) * elementsPerView;
		const jump = stepFrom - singleStep * step;
		setOffset(jump);
	};

	return (
		<div className="w-full flex justify-center flex-wrap py-16">
			<div className="w-full h-max">
				<div
					className="relative mx-auto overflow-hidden h-max h-52"
					style={{
						maxWidth: `${
							Math.ceil(width / elementsNumber) * elementsPerView
						}px`,
					}}
					id="carouselParent"
				>
					<div
						className="absolute flex-row container flex"
						id="carouselContainer"
						ref={elWidth}
						style={{ left: `${offset}px` }}
					>
						{children.map((Child) => {
							return cloneElement(Child, {
								className: "bg-black text-white p-12 border-white border-2",
							});
						})}
					</div>
				</div>
			</div>
			<div
				className="w-full flex justify-center gap-2"
				id="buttonsContainerCarousel"
			>
				{Steps.map((_e, i) => {
					return (
						<span
							key={i + 1}
							className={`dot ${step === i ? "dot-active" : ""}`}
							onClick={() => {
								handleClick(i);
							}}
							onKeyDown={(e) => {}}
						/>
					);
				})}
			</div>
		</div>
	);
}
