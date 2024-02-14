import React, { useState } from "react";
import { useConfigStore } from "../../store/ConfigStore";

export default function WeightConfig() {
	const { PriceScales, updateConfig } = useConfigStore((store) => store);
	const [editing, setEditing] = useState(false);
	const [escales, setEscales] = useState([
		{ MinKg: 0, _id: "" },
		{ MinKg: 0, _id: "" },
		{ MinKg: 0, _id: "" },
	]);

	const handleInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
	) => {
		const newValue = [...escales];
		newValue[index].MinKg = parseFloat(e.target.value);
		setEscales(newValue);
	};

	return (
		<div className="flex flex-wrap basis-2/4 bg-slate-200 p-2 max-w-[49%] rounded-md items-start">
			<h3 className="w-full font-bold text-4xl text-center mt-8 ">
				Escalas de precio
			</h3>
			<table className="table-auto w-full border-collapse border border-slate-400">
				<thead>
					<tr>
						<th className="border border-slate-300 text-xl">
							Escala de Precio
						</th>
						<th className="border border-slate-300 text-xl">Peso Minimo</th>
					</tr>
				</thead>
				{PriceScales && escales ? (
					<tbody>
						{PriceScales.map((es, index) => {
							return (
								<tr>
									<td className="border border-slate-300 p-1 font-bold text-center">
										{`Precio ${index + 1}`}
									</td>
									<td className="border border-slate-300 p-1 font-bold text-center">
										{editing ? (
											<input
												type="number"
												name="percent"
												className="pl-2 rounded"
												value={escales[index].MinKg}
												onChange={(e) => {
													handleInput(e, index);
												}}
											/>
										) : (
											`${es.MinKg} Kg`
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				) : (
					<h3>No hay Escalas de Precio aun</h3>
				)}
			</table>
			{editing ? (
				<div className="w-full flex justify-center gap-2">
					<div
						className="
                            px-8 
                            text-white 
                            bg-teal-400 
                            border-2 
                            border-teal-400
                            py-2
                            rounded-md
                            cursor-pointer
                            duration-100
                            hover:bg-slate-200
                            hover:text-teal-400
                        "
						onClick={() => {
							updateConfig(escales);
							setEditing(!editing);
						}}
						onKeyUp={() => {}}
					>
						Guardar
					</div>
					<div
						className="
                            px-8 
                            text-white 
                            bg-red-500 
                            border-2 
                            border-red-500
                            py-2
                            rounded-md
                            cursor-pointer
                            duration-100
                            hover:bg-slate-200
                            hover:text-red-500
                        "
						onClick={() => {
							setEditing(!editing);
						}}
						onKeyUp={() => {}}
					>
						Cancelar
					</div>
				</div>
			) : (
				<div
					className="
                        mx-auto
                        px-8 
                        text-white 
                        bg-teal-400 
                        border-2 
                        border-teal-400
                        py-2
                        rounded-md
                        cursor-pointer
                        duration-100
                        hover:bg-slate-200
                        hover:text-teal-400
                    "
					onClick={() => {
						setEditing(!editing);
						if (PriceScales) {
							const currentScales = [...escales];
							PriceScales.forEach((e, i) => {
								currentScales[i].MinKg = e.MinKg;
								currentScales[i]._id = e._id;
							});
							setEscales(currentScales);
						}
					}}
					onKeyUp={() => {}}
				>
					Editar
				</div>
			)}
		</div>
	);
}
