import React from "react";
import { DiscountsInterface } from "../../store/ConfigStore";
import { CiTrash } from "react-icons/ci";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";

interface DataInterface extends DiscountsInterface {
	index: number;
}

interface DiscountProps {
	data: DataInterface;
}

export default function DiscountsContainer({ data }: DiscountProps) {
	return (
		<tr>
			<td className="font-bold text-lg border border-slate-300 p-1">
				{data.name}
			</td>
			<td className="font-bold border border-slate-300 p-1 text-center">
				{data.global ? "SI" : "NO"}
			</td>
			<td className="border border-slate-300 p-1 font-bold text-center">{`${data.percent}%`}</td>
			<td className="border border-slate-300 p-1">
				<div className="w-full flex justify-between text-2xl">
					<FaArrowAltCircleUp className="duration-100 cursor-pointer hover:text-sky-500" />
					<FaArrowAltCircleDown className="duration-100 cursor-pointer hover:text-teal-400" />
					<CiTrash className="duration-100 cursor-pointer hover:text-red-500" />
				</div>
			</td>
		</tr>
	);
}
