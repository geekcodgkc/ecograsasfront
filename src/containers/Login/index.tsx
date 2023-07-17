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
		store.login(data, () => navigate("/"));
	};

	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const current = { ...data, [e.currentTarget.name]: e.currentTarget.value };
		setData(current);
	};

	if (store.token) navigate("/");

	return (
		<div className="flex justify-center w-full max-w-screen-lg mx-auto h-screen items-center">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-4 shadow-lg p-4 w-11/12 max-w-screen-md relative rounded-lg overflow-hidden"
			>
				{store.loading && <div className="loadingScreen" />}
				<h2 className="mb-6 text-center text-3xl font-bold">Inicia Sesion</h2>
				{store.error && (
					<h4 className="text-center text-red-600 text-xl">{store.error}</h4>
				)}
				<h3>usuario</h3>
				<input
					type="text"
					value={data.user}
					name="user"
					id="userInput"
					onChange={handleInput}
					placeholder="coloca tu usuario ej.: j-27658945-4"
					className="p-4"
				/>
				<label htmlFor="userInput">ingresa usando el rif de tu empresa</label>
				<hr />
				<h3>Clave de Usuario</h3>
				<input
					type="password"
					value={data.password}
					name="password"
					id="passwordInput"
					onChange={handleInput}
					placeholder="ingresa la clave que se te proporciono"
					className="p-4"
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
					no tiener cuenta?{" "}
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
