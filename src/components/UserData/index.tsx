import React, { useEffect } from "react";
import "./index.scss";
import { useOrderStore, useUserStore } from "../../store";
import moment from "moment";

interface productsInterface {
	product: {
		_id: string;
		id: string;
		name: string;
		prices: {
			p1: number;
			p2: number;
			p3: number;
			p4: number;
		};
		presentation: string;
		status: boolean;
	};
	price: number;
	qty: number;
	_id: string;
}

interface orderInterface {
	_id: string;
	orderNumber: number;
	createdAt: string;
	shippingDate: string;
	shippingAddress: string;
	client: {
		zone: {
			State: string;
			area: string;
			ZIPCode: string;
		};
	};
	products: productsInterface[];
	orderTotal: number;
	iva: number;
	orderBase: number;
	status: number;
}

export default function UserData() {
	const store = useOrderStore((state) => state);
	const { _id } = useUserStore((state) => state);

	useEffect(() => {
		if (_id) {
			store.getOrders(_id);
		}
	}, []);

	if (store.error) {
		return (
			<div className="OrdersContainer w-error w-full p-8 pb-12 bg-slate-300 rounded-lg shadow-lg">
				<h1 className="ErrorMessage font-bold text-2xl">
					Hubo un errror al intentar cargar las ordernes intenta mas tarde
				</h1>
				<div className="w-full flex justify-center">
					<button
						className="action-button-1"
						type="button"
						onKeyDown={() => {}}
						onClick={() => {
							if (_id) {
								store.getOrders(_id);
							}
						}}
					>
						reintentar
					</button>
				</div>
			</div>
		);
	}

	if (store.loading) {
		return <h1>Cargando ...</h1>;
	}

	return (
		<div className="OrdersContainer w-full p-2 bg-slate-300 rounded-lg shadow-lg">
			{store.orders && store.orders.length === 0 ? (
				<h2 className="w-full text-center font-bold text-2xl my-12">
					No Tienes ordendes a&uacute;n
				</h2>
			) : (
				store.orders?.map((order: orderInterface) => {
					return (
						<div
							className="OrderCardContainer w-full bg-slate-50 rounded-lg p-2"
							key={order._id}
						>
							<div className="orderInfo">
								<h4>
									Numero de orden:{" "}
									<b>{order.orderNumber.toString().padStart(8, "0")}</b>
								</h4>
								<h4>
									fecha de la order:{" "}
									<b>{moment(order.createdAt).format("DD-MM-YYYY")}</b>
								</h4>
								<h4>
									fecha de envio:{" "}
									<b>{moment(order.shippingDate).format("DD-MM-YYYY")}</b>
								</h4>
								<h4>
									direccion de envio: <b>{order.shippingAddress}</b>
								</h4>
								<h4>
									zona:{" "}
									<b>
										{`
								${order.client.zone.State} 
								${order.client.zone.area}, 
								codigo postal: ${order.client.zone.ZIPCode} 
							`}
									</b>
								</h4>
								<h4>
									Base Imponible: <b>{order.orderBase.toFixed(2)}</b>
								</h4>
								<h4>
									IVA: <b>{order.iva.toFixed(2)}</b>
								</h4>
								<h4>
									Total: <b>{order.orderTotal.toFixed(2)}</b>
								</h4>
								<h4
									className={`${
										order.status === 1
											? "proccess"
											: order.status === 2
											? "send"
											: "pending"
									}`}
								>
									Estatus de la order:{" "}
									<b>
										{order.status === 1
											? "Procesado"
											: order.status === 2
											? "Enviado"
											: "Pendiente"}
									</b>
								</h4>
							</div>
							<div className="orderDetails">
								<table className="bg-slate-200 p-4">
									<tr className="headRow">
										<th>
											<h3 className="p-2">cantidad</h3>
										</th>
										<th>
											<h3 className="p-2">Nombre</h3>
										</th>
										<th>
											<h3 className="p-2">precio unitario</h3>
										</th>
										<th>
											<h3 className="p-2">total</h3>
										</th>
									</tr>
									{order.products.map((productItem) => {
										const { qty, price, _id } = productItem;

										if (!productItem.product) {
											return (
												<tr key={_id} className="headRow">
													<td className="p-2 text-center">{qty}</td>
													<td className="p-2 text-center">
														nombre no disponible
													</td>
													<td className="p-2 text-center">{price}</td>
													<td className="p-2 text-center">{price * qty}</td>
												</tr>
											);
										}

										return (
											<tr key={_id} className="headRow">
												<td className="p-2 text-center">{qty}</td>
												<td className="p-2 text-center">
													{productItem.product.name}
												</td>
												<td className="p-2 text-center">{price.toFixed(2)}</td>
												<td className="p-2 text-center">
													{(price * qty).toFixed(2)}
												</td>
											</tr>
										);
									})}
								</table>
							</div>
						</div>
					);
				})
			)}
		</div>
	);
}
