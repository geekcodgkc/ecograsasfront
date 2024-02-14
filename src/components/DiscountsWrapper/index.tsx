import React from "react";
import { useConfigStore } from "../../store/ConfigStore";
import DiscountsContainer from "./Discount";
import DiscountsInput from "./DiscountsInputs";

export default function DiscountsWrapper() {
	const { Discounts } = useConfigStore((store) => store);

	return (
		<div className="flex flex-wrap basis-2/4 gap-y-4 bg-slate-200 p-2 max-w-[49%] rounded-md">
			<h3 className="w-full font-bold text-4xl text-center mt-8 mb-4">
				Descuentos
			</h3>
			<table className="table-auto w-full border-collapse border border-slate-400">
				<thead>
					<tr>
						<th className="border border-slate-300 text-xl">Nombre</th>
						<th className="border border-slate-300 text-xl">Es Global</th>
						<th className="border border-slate-300 text-xl">Porcentaje</th>
						<th className="border border-slate-300 text-xl">Controles</th>
					</tr>
				</thead>
				{Discounts ? (
					<tbody>
						{Discounts.map((discount, i) => {
							return (
								<DiscountsContainer
									data={{ ...discount, index: i }}
									key={`${i}${Math.random()}`}
								/>
							);
						})}
					</tbody>
				) : (
					<h3>no hay descuentos configurados</h3>
				)}
			</table>
			<DiscountsInput />
		</div>
	);
}
