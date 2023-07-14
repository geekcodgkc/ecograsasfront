import React, { cloneElement, useState, useRef, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./index.scss";

interface CarouselProps {
	children: React.ReactElement[];
	//elementsPerView?: number;
}

export default function CarouselComponent({ children }: CarouselProps) {
	const [step, setStep] = useState(0);
	const [maxWidth, setMaxWidth] = useState(800);
	const [height, setHeight] = useState(200);
	const [offset, setOffset] = useState(0);
	const elements = children.length;
	const carouselContainerRef = useRef<HTMLDivElement>(null);

	const genDots = (): [number[], number[]] => {
		const dotsNumber: [number[], number[]] = [[], []];
		[Math.ceil(elements / 3), Math.ceil(elements / 2)].forEach((dot, index) => {
			for (let i = 0; i < dot; i++) {
				dotsNumber[index].push(i);
			}
		});
		return dotsNumber;
	};
	const [dotsLg, dotsTablet] = genDots();

	const handleResize = () => {
		const windowSize = window.innerWidth;
		setOffset(0);
		setStep(0);

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
	};

	window.addEventListener("resize", () => {
		handleResize();
	});

	useEffect(() => {
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
	}, [carouselContainerRef]);

	const handlePage = (i: number) => {
		setStep(i);
		setOffset(maxWidth * i);
	};

	return (
		<div className="flex w-full pt-24 flex-wrap">
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
