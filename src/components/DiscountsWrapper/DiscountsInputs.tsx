import React, { useState } from "react";

export default function DiscountsInput() {
	const [open, setOpen] = useState(false);

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
									<input type="text" name="name" />
								</td>
								<td className="p1 border border-slate-300">
									<div className="flex justify-center align-center h-full">
										<input type="checkbox" name="global" />
									</div>
								</td>
								<td className="p1 border border-slate-300">
									<input type="number" name="percent" className="max-w-12" />
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
											setOpen(true);
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
