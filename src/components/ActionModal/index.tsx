import React, { useState } from "react";
import "./index.scss";
import { useUserStore } from "../../store";
import { useCartStore } from "../../store";
import { navigate } from "gatsby";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ModalProps {
	handleClose: () => void;
}

export default function ActionModal({ handleClose }: ModalProps) {
	const [date, setDate] = useState(new Date());
	const cartStore = useCartStore((state) => state);
	const userStore = useUserStore((state) => state);

	const handlePaymen = () => {
		const cb = () => {
			navigate("/profile");
		};
		if (userStore.userData && userStore._id) {
			cartStore.createOrder(
				userStore._id,
				userStore.userData.address,
				date,
				userStore.userData.conditionPrice,
				cb,
			);
			handleClose();
		}
	};

	return (
		<div className="modalBackground">
			<div className="p-4 bg-slate-50 rounded actionModal">
				<h3 className="font-bold mb-8 text-3xl text-center">
					¿Deseas Crear Esta Orden?
				</h3>
				<label htmlFor="date">Selecciona la fecha de envio</label>
				<DatePicker
					name="date"
					className="w-full mb-8"
					showIcon
					selected={date}
					locale={"es-es"}
					onChange={(d: Date) => {
						setDate(d);
					}}
				/>
				<div className="buttonsContainer">
					<button
						className="action-button-1"
						type="button"
						id="cancelButton"
						onClick={handleClose}
						onKeyDown={() => {}}
					>
						cancelar
					</button>
					<button
						className="action-button-1"
						type="button"
						onClick={handlePaymen}
						onKeyDown={() => {}}
					>
						Crear la orden
					</button>
				</div>
			</div>
		</div>
	);
}
