import React, { useMemo, useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import "./index.scss";
import { useUserStore } from "../../store";
import { zones } from "../../store/UserStore";

interface ModalProps {
	closeAction: () => void;
}

export default function UpdateProfileModal({ closeAction }: ModalProps) {
	const store = useUserStore((store) => store);
	const [zone, setZone] = useState("");
	const [zonesArray, setZonesArray] = useState<zones[] | null>(null);
	const [show, setShow] = useState(false);
	const [data, setData] = useState({
		email: "",
		address: "",
		contact: "",
		phone: "",
		zone: "",
	});

	useEffect(() => {
		if (!store.zones) {
			store.getZones();
		}
	}, [store.zones]);

	useMemo(() => {
		if (store.zones) {
			const filter = store.zones.filter((zones) => {
				const zoneData = `${zones.area} - codigo postal: ${zones.ZIPCode} - estado: ${zones.State}`;
				return zoneData.toLocaleLowerCase().includes(zone.toLocaleLowerCase());
			});

			setZonesArray(filter);
		}
		if (store.userData) {
			setData({
				email: store.userData.email,
				address: store.userData.address,
				contact: store.userData.contact,
				phone: store.userData.phone[0],
				zone: store.userData.zone._id,
			});
		}
	}, [store.zones, zone, store.userData]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setZone(e.target.value);
	};

	const handleOption = (zone: zones, value: string) => {
		const current = { ...data, zone: zone._id };
		setData(current);
		setZone(value);
		setShow(false);
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const current = { ...data, [e.currentTarget.name]: e.currentTarget.value };
		setData(current);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (store.id) {
			store.updateUserData(data, store.id);
		}
		closeAction();
	};

	return (
		<div className="ModalContainer">
			<IoCloseCircleSharp className="closeButton" onClick={closeAction} />
			<form
				className="flex flex-col gap-4 shadow-lg p-4 w-11/12 max-w-screen-md relative rounded-lg overflow-hidden bg-slate-300"
				onSubmit={handleSubmit}
			>
				<div className="w-full flex flex-col flex-wrap">
					<h3 className="font-bold mb-4">Zona / Codigo Postal</h3>
					<input
						type="text"
						name="zone"
						id="zoneInput"
						onChange={handleSearch}
						placeholder={`${store.userData?.zone.area} - codigo postal ${store.userData?.zone.ZIPCode} - estado: ${store.userData?.zone.State}`}
						className="p-4 rounded-lg"
						autoComplete="zona"
						value={zone}
						onFocus={() => {
							setShow(true);
						}}
						onBlur={() => {
							setTimeout(() => {
								setShow(false);
							}, 100);
						}}
					/>
					{show && store.zones && (
						<div className="w-full relative optionsRelative">
							<div className="optionsContainer bg-slate-100">
								{zonesArray?.map((zone) => {
									const value = `${zone.area} - codigo postal: ${zone.ZIPCode} - estado: ${zone.State}`;
									return (
										<div
											key={zone._id}
											className="optionItem p-4 hover:bg-slate-300"
											onClick={() => {
												handleOption(zone, value);
											}}
											onKeyDown={() => {}}
										>
											<h3>{value}</h3>
										</div>
									);
								})}
							</div>
						</div>
					)}
					<label className="my-4" htmlFor="zoneInput">
						esta zona nos dara mas informacion para los envios
					</label>
				</div>
				<h3 className="font-bold">Correo Electronico</h3>
				<input
					type="email"
					value={data.email}
					name="email"
					id="emailInput"
					onChange={handleInput}
					placeholder="indica el correo de tu empresa ej: compras@mail.com"
					className="p-4 rounded-lg"
				/>
				<label className="mb-4" htmlFor="emailInput">
					ingresa el correo de tu empresa
				</label>
				<h3 className="font-bold">Direccion</h3>
				<input
					type="text"
					value={data.address}
					name="address"
					id="addressInput"
					onChange={handleInput}
					placeholder="direccion de la empresa"
					className="p-4 rounded-lg"
				/>
				<label className="mb-4" htmlFor="addressInput">
					esta direccion sera utilizada para calcular los despachos de los
					productos
				</label>
				<h3 className="font-bold">Telfono de Contacto</h3>
				<input
					type="phone"
					value={data.phone}
					name="phone"
					id="phoneInput"
					onChange={handleInput}
					placeholder="numero de telefono ej: +58 424 0606 737"
					className="p-4 rounded-lg"
				/>
				<label className="mb-4" htmlFor="phoneInput">
					numero de telefono ej: +58 424 0606 737
				</label>
				<h3 className="font-bold">Persona de Contacto</h3>
				<input
					type="contact"
					value={data.contact}
					name="contact"
					id="contactInput"
					onChange={handleInput}
					placeholder="indica el nombre de la persona de contacto"
					className="p-4 rounded-lg"
				/>
				<label className="mb-4" htmlFor="contactInput">
					el nombre de la persona con la que contactaremos a la hora de
					planificar las compras y despachos
				</label>
				<button
					type="submit"
					className="action-button-1 mb-8"
					onClick={handleSubmit}
				>
					actualizar
				</button>
			</form>
		</div>
	);
}
