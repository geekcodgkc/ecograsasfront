import React, { useState } from "react";
import { useUserStore } from "../../store";
import { Link, navigate } from "gatsby";
import "./index.scss";

export default function LoginContainer() {
	const [data, setData] = useState({
		user: "",
		password: "",
	});
	const store = useUserStore((state) => state);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log(data);
		store.login(data, () => navigate("/Profile"));
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const current = {
			...data,
			[e.currentTarget.name]:
				e.target.name !== "user"
					? e.currentTarget.value
					: e.currentTarget.value.toUpperCase(),
		};
		setData(current);
	};

	if (store.token) navigate("/Profile");

	return (
		<div className="flex justify-center w-full max-w-screen-lg mx-auto min-h-screen items-center mt-4">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 shadow-lg p-4 bg-slate-300 w-11/12 max-w-screen-md relative rounded-lg overflow-hidden"
			>
				{store.loading && <div className="loadingScreen" />}
				<h2 className="mb-6 text-center text-3xl font-bold">Inicia Sesion</h2>
				{store.error && (
					<h4 className="text-center text-red-600 text-xl">{store.error}</h4>
				)}
				<h3 className="font-bold">Usuario</h3>
				<input
					type="text"
					value={data.user}
					name="user"
					id="userInput"
					onChange={handleInput}
					placeholder="coloca tu usuario ej.: j-27658945-4"
					className="p-4 rounded-lg"
					autoComplete="username"
				/>
				<label htmlFor="userInput">ingresa usando el rif de tu empresa</label>
				<hr />
				<h3 className="font-bold">Clave de Usuario</h3>
				<input
					type="password"
					value={data.password}
					name="password"
					id="passwordInput"
					autoComplete="current-password"
					onChange={handleInput}
					placeholder="ingresa la clave que se te proporciono"
					className="p-4 rounded-lg"
				/>
				<label htmlFor="passwordInput">
					ingresa con la clave proporcionada
				</label>
				<button
					type="submit"
					className="action-button-1"
					onClick={handleSubmit}
				>
					Iniciar Sesion
				</button>
				<p className="mt-8">
					no tienes cuenta?{" "}
					<Link
						to="/Register"
						className="text-cyan-700 hover:font-bold duration-100"
					>
						registrate aqui
					</Link>
				</p>
			</form>
		</div>
	);
}
