import React from "react";
import { DiscountsInterface } from "../../store/ConfigStore";

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
				<input type="checkbox" />
			</td>
		</tr>
	);
}
