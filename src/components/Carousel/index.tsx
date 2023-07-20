import React, { useState, useRef, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.scss";
import useGenDots from "./useGendots";

interface CarouselProps {
	children: React.ReactElement[];
}

interface JumpSize {
	lg: number;
	md: number;
}

export default function CarouselComponent({ children }: CarouselProps) {
	const [step, setStep] = useState(0);
	const [offset, setOffset] = useState(0);
	const elements = children.length;
	const carouselContainerRef = useRef<HTMLDivElement>(null);

	const jump: JumpSize = {
		lg: 1321.5,
		md: 881,
	};

	const [dotsLg, dotsTablet] = useGenDots(elements);

	const handlePage = (i: number, size: string) => {
		setStep(i);
		if (size === "lg") {
			setOffset(jump[size] * i);
			return;
		}
		setOffset(jump.md * i);
	};

	return (
		<div className="flex w-full pt-8 flex-wrap" id="carouselComponent">
			<div
				className={"relative carouselContainer"}
				ref={carouselContainerRef}
				id={"carouselContainer"}
			>
				<div
					style={{ left: `-${offset}px` }}
					className={"absolute flex gap-8 carouselElement px-8"}
					id="carouselElement"
				>
					{children}
				</div>
			</div>
			<div className="dotsContainer w-full flex justify-center gap-12">
				<div className="dots-lg">
					{dotsLg.map((dot, i) => {
						return (
							<span
								key={dot}
								className={`pag-dot ${step === i ? "dot-active" : ""}`}
								onClick={() => {
									handlePage(i, "lg");
								}}
								onKeyUp={() => {}}
							>
								{" "}
							</span>
						);
					})}
				</div>
				<div className="dots-M">
					{dotsTablet.map((dot, i) => {
						return (
							<span
								key={dot}
								className={`pag-dot ${step === i ? "dot-active" : ""}`}
								onClick={() => {
									handlePage(i, "md");
								}}
								onKeyUp={() => {}}
							>
								{" "}
							</span>
						);
					})}
				</div>
			</div>
		</div>
	);
}
