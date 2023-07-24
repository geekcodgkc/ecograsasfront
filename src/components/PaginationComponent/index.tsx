import React from "react";
import { navigate } from "gatsby";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import "./index.scss";

interface paginationProps {
	currentPage: number;
	totalPages: number;
	nextPage: string;
	prevPage: string;
	basePage: string;
}

const genPage = (buttonsNumber: number, current: number, reversed: boolean) => {
	const buttons = [];
	for (let i = 0; i < buttonsNumber; i++) {
		reversed ? buttons.push(current - i) : buttons.push(current + i);
	}
	return reversed ? buttons.reverse() : buttons;
};

export default function Pagination({
	currentPage,
	totalPages,
	nextPage,
	prevPage,
	basePage,
}: paginationProps) {
	const dots =
		currentPage === totalPages
			? genPage(3, currentPage, true)
			: currentPage === totalPages - 1
			? genPage(3, currentPage - 1, false)
			: genPage(3, currentPage, false);

	if (totalPages === 1)
		return (
			<div className="mx-auto flex gap-4 PaginationContainer mt-8">
				<span className="disabled">
					<AiOutlineDoubleLeft />
				</span>
				<span>1</span>
				<span className="disabled">
					<AiOutlineDoubleRight />
				</span>
			</div>
		);

	const handleNext = () => {
		if (currentPage === totalPages) return;
		navigate(nextPage);
	};

	const handlePrev = () => {
		if (currentPage === 1) return;
		navigate(prevPage);
	};

	const handleBasePath = (path: number) => {
		if (path === currentPage) return;
		navigate(`${basePage}/${path}`);
	};

	return (
		<div className="mx-auto flex gap-4 PaginationContainer mt-8">
			<span
				className={`${currentPage === 1 ? "disabled" : ""}`}
				onClick={handlePrev}
				onKeyDown={() => {}}
			>
				<AiOutlineDoubleLeft />
			</span>
			{dots.map((e, i) => (
				<span
					key={i + 1}
					onClick={() => {
						handleBasePath(e);
					}}
					onKeyDown={() => {}}
				>
					{e}
				</span>
			))}
			<span
				className={`${currentPage === totalPages ? "disabled" : ""}`}
				onClick={handleNext}
				onKeyDown={() => {}}
			>
				<AiOutlineDoubleRight />
			</span>
		</div>
	);
}
