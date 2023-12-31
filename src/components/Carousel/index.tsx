import React, { useState, useRef, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.scss";
import genDots from "./useGendots";

interface CarouselProps {
	children: React.ReactElement[];
}

export default function CarouselComponent({ children }: CarouselProps) {
	const [step, setStep] = useState(0);
	const [maxWidth, setMaxWidth] = useState(800);
	const [height, setHeight] = useState(200);
	const [offset, setOffset] = useState(0);
	const elements = children.length;
	const carouselContainerRef = useRef<HTMLDivElement>(null);

	const isBrowser = () => typeof window !== "undefined";

	const [dotsLg, dotsTablet] = genDots(elements);

	const handleResize = () => {
		const windowSize = isBrowser() && window.innerWidth;
		setOffset(0);
		setStep(0);

		if (typeof windowSize === "number") {
			if (windowSize < 1440) {
				if (carouselContainerRef.current) {
					const width = carouselContainerRef.current.scrollWidth;
					const widthContainer = (width / elements) * 2;
					setMaxWidth(widthContainer);
				}
				return;
			}
			if (carouselContainerRef.current) {
				const width = carouselContainerRef.current.scrollWidth;
				const widthContainer = (width / elements) * 3;
				setMaxWidth(widthContainer);
			}
		}
	};

	isBrowser() &&
		window.addEventListener("resize", () => {
			handleResize();
		});

	useEffect(() => {
		if (isBrowser()) {
			if (carouselContainerRef.current) {
				const width = carouselContainerRef.current.scrollWidth;
				const contentHeight = carouselContainerRef.current.scrollHeight;
				const divider = window.innerWidth < 1440 ? 2 : 3;
				const widthContainer = (width / elements) * divider;
				setMaxWidth(widthContainer);
				setHeight(contentHeight);
			}

			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}
	}, [carouselContainerRef]);

	const handlePage = (i: number) => {
		setStep(i);
		setOffset(maxWidth * i);
	};

	return (
		<div className="flex w-full pt-24 flex-wrap" id="carouselComponent">
			<div
				className={"relative carouselContainer"}
				style={{
					maxWidth: `${maxWidth}px`,
					width: `${maxWidth}px`,
					minHeight: `${height}px`,
				}}
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
									handlePage(i);
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
									handlePage(i);
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
