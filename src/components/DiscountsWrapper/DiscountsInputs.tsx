import React, { useState } from "react";
import { useConfigStore } from "../../store/ConfigStore";

export default function DiscountsInput() {
	const [open, setOpen] = useState(false);
	const [percent, setPercent] = useState(0);
	const [nameValue, setNameValue] = useState("");
	const [isGlobal, setIsGlobal] = useState(false);

	const { addDiscounts } = useConfigStore((store) => store);

	return (
		<div className="w-full mb-6 flex flex-wrap">
			{open ? (
				<>
					<table className="table-auto w-full">
						<thead>
							<tr>
								<th className="border border-slate-300 text-xl">Nombre</th>
								<th className="border border-slate-300 text-xl">Es Global</th>
								<th className="border border-slate-300 text-xl">Porcentaje</th>
								<th className="border border-slate-300 text-xl"> </th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="p1 border border-slate-300">
									<input
										placeholder="nombre del descuento"
										type="text"
										name="name"
										className="pl-2 rounded"
										value={nameValue}
										onChange={(e) => {
											setNameValue(e.target.value);
										}}
									/>
								</td>
								<td className="p1 border border-slate-300">
									<div className="flex justify-center align-center h-full">
										<input
											type="checkbox"
											name="global"
											className="p1"
											checked={isGlobal}
											onChange={() => {
												setIsGlobal(!isGlobal);
											}}
										/>
									</div>
								</td>
								<td className="p1 border border-slate-300">
									<input
										type="number"
										name="percent"
										className="pl-2 rounded"
										onChange={(e) => {
											const value = parseFloat(e.target.value);
											setPercent(value);
										}}
									/>
								</td>
								<td className="p1 border border-slate-300">
									<div
										className=" 
                                    px-2 
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
											setPercent(0);
											setIsGlobal(false);
											setNameValue("");
											setOpen(false);
										}}
										onKeyUp={() => {}}
									>
										cancelar
									</div>
								</td>
							</tr>
						</tbody>
					</table>
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
                        mt-4
                        "
						onClick={() => {
							if (nameValue.length < 1 || percent === 0) {
								alert(
									"rellena todos los campos para guardar el nuevo descuento",
								);
								return;
							}
							addDiscounts({
								name: nameValue,
								percent,
								global: isGlobal,
							});
							setPercent(0);
							setIsGlobal(false);
							setNameValue("");
							setOpen(false);
						}}
						onKeyUp={() => {}}
					>
						Guardar
					</div>
				</>
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
						setOpen(true);
					}}
					onKeyUp={() => {}}
				>
					Agregar Descuento
				</div>
			)}
		</div>
	);
}
