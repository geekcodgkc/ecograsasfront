import React, { useEffect } from "react";
import { useClientsManagementStore } from "../../store";

export default function ClientsTab() {
	const { clients, getClients } = useClientsManagementStore((store) => store);

	useEffect(() => {
		if (!clients) {
			getClients();
		}
	}, [clients]);

	return (
		<div
			className="w-full flex-wrap flex 
            rounded bg-slate-200 
            rounded-md overflow-hidden
            pb-8 mb-8
        "
		>
			<h3
				className="mb-8 pt-4 pb-8 
                text-5xl font-bold 
                text-center text-white 
                bg-teal-400 w-full
            "
			>
				Clientes
			</h3>
			<table
				className="table-auto w-full 
                border-collapse border 
                border-slate-400
                mx-4"
			>
				<thead>
					<tr>
						<th className="border border-slate-300 text-xl">Nombre</th>
						<th className="border border-slate-300 text-xl">RIF</th>
						<th className="border border-slate-300 text-xl">E-mail</th>
						<th className="border border-slate-300 text-xl">Es Unilevel</th>
						<th className="border border-slate-300 text-xl">Controles</th>
					</tr>
				</thead>
				<tbody>
					{clients ? (
						clients.map((client) => {
							return (
								<tr>
									<td
										className="border pl-4 
                                        border-slate-300 p-1 
                                        font-bold
                                    "
									>
										{client.name}
									</td>
									<td
										className="border pl-4 
                                        border-slate-300 p-1 
                                        font-bold
                                    "
									>
										{client.rif}
									</td>
									<td
										className="border pl-4 
                                        border-slate-300 p-1 
                                        font-bold
                                    "
									>
										{client.email}
									</td>
									<td
										className="border pl-4 
                                        border-slate-300 p-1 
                                        font-bold text-center
                                    "
									>
										{client.conditionPrice !== 4 ? "NO" : "SI"}
									</td>
									<td className="p1 border border-slate-300">
										<div
											className="px-2 text-white bg-teal-400 
                                                border-2 border-teal-400 py-2 rounded-md 
                                                cursor-pointer duration-100 hover:bg-slate-200
                                                hover:text-teal-400 text-center font-bold
                                            "
											onClick={() => {}}
											onKeyUp={() => {}}
										>
											Editar
										</div>
									</td>
								</tr>
							);
						})
					) : (
						<h3 className="text-2xl w-full text-center font-bold">
							{" "}
							No hay clientes aun{" "}
						</h3>
					)}
				</tbody>
			</table>
		</div>
	);
}
