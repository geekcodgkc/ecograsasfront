import React, { useState, useEffect } from "react";
import { navigate, Link } from "gatsby";
import { useUserStore } from "../../store";
import "./index.scss";
import { zones } from "../../store/UserStore";

export default function RegisterContainer() {
	const [data, setData] = useState({
		rif: "",
		name: "",
		address: "",
		email: "",
		zone: "",
		phone: "",
		contact: "",
		password: "",
	});
	const [zone, setZone] = useState("");
	const [confirm, setConfirm] = useState("");
	const [show, setShow] = useState(false);

	const store = useUserStore((state) => state);

	useEffect(() => {
		if (!store.zones) {
			store.getZones();
		}
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		store.register(data, () => navigate("/Profile"));
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === "zone") {
			setZone(e.target.value);
			return;
		}
		const current = { ...data, [e.currentTarget.name]: e.currentTarget.value };
		setData(current);
	};

	const handleConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirm(e.target.value);
	};

	const handleOption = (zone: zones, value: string) => {
		const current = { ...data, zone: zone._id };
		setData(current);
		setZone(value);
		setShow(false);
	};

	if (store.token) navigate("/");

	return (
		<div className="flex flex-col justify-center w-full max-w-screen-lg mx-auto min-h-screen items-center pt-8">
			<p className="my-8">
				ya tienes una cuenta?{" "}
				<Link
					to="/Login"
					className="text-cyan-700 hover:font-bold duration-100"
				>
					inicia sesion aqui
				</Link>
			</p>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 shadow-lg p-4 w-11/12 max-w-screen-md relative rounded-lg overflow-hidden bg-slate-300"
			>
				{store.loading && <div className="loadingScreen" />}
				<h2 className="mb-6 text-center text-3xl font-bold">
					Reg&iacute;strate
				</h2>
				{store.error && (
					<h4 className="text-center text-red-600 text-xl">{store.error}</h4>
				)}
				<h3 className="font-bold">Rif de la empresa</h3>
				<input
					type="text"
					value={data.rif}
					name="rif"
					id="userInput"
					onChange={handleInput}
					placeholder="coloca tu usuario ej.: j-27658945-4"
					className="p-4 rounded-lg"
				/>
				<label className="mb-4" htmlFor="userInput">
					el rif de tu empresa sera utilizado como tu nombre de usuario
				</label>
				<h3 className="font-bold">Nombre de la Empresa</h3>
				<input
					type="text"
					value={data.name}
					name="name"
					id="nameInput"
					onChange={handleInput}
					placeholder="indica el nombre de tu empresa ej: empresa.ca"
					className="p-4 rounded-lg"
				/>
				<label className="mb-4" htmlFor="nameInput">
					ingresa el nombre de tu empresa
				</label>
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
				<div className="w-full flex flex-col flex-wrap">
					<h3 className="font-bold mb-4">Zona / Codigo Postal</h3>
					<input
						type="text"
						name="zone"
						id="zoneInput"
						onChange={handleInput}
						placeholder="selecciona tu zona"
						className="p-4 rounded-lg"
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
					{show && (
						<div className="w-full relative optionsRelative">
							<div className="optionsContainer bg-slate-100">
								{store.zones?.map((zone) => {
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
				<h3 className="font-bold">Clave</h3>
				<input
					type="password"
					value={data.password}
					name="password"
					id="passwordInput"
					onChange={handleInput}
					placeholder="ingresa la clave con la que iniciaras sesion"
					className="p-4 rounded-lg"
				/>
				<label className="mb-4" htmlFor="passwordInput">
					crea la clave de tu usuario
				</label>
				<h3 className="font-bold">
					Confirma tu Clave{" "}
					{data.password !== confirm && (
						<small className="text-red-600">
							ambas claves deben de coincidir
						</small>
					)}
				</h3>
				<input
					type="password"
					value={confirm}
					name="password"
					id="passwordInput"
					onChange={handleConfirm}
					minLength={8}
					placeholder="ingresa nuevamente tu clave"
					className="p-4 rounded-lg"
				/>
				<label className="mb-4" htmlFor="passwordInput">
					ingresa nuevamente tu clave para ser verificada
				</label>
				<button
					type="submit"
					className="action-button-1 mb-8"
					onClick={handleSubmit}
				>
					Registrarse
				</button>
			</form>
		</div>
	);
}
