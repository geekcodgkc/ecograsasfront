import React from "react";
import "./index.scss";

export default function NotVerifiedBanner() {
	return (
		<div className="w-full max-w-screen-lg mt-4 h-full flex flex-col justify-center items-center gap-12 padding-8 bg-slate-300 rounded-xl mx-auto shadow-xl">
			<h1 className="font-bold text-4xl">Parece que aun no estas verificado</h1>
			<p className="max-w-screen-md text-justify helperText">
				Para poder acceder a tu zona de usuario y realizar compras debes de
				estar verificado
				<br />
				<br />
				este proceso puede tardas hasta 24h despues de que te registres
				<br />
				<br />
				si se esta tardando mas de lo esperado o tienes alguna pregunta no dudes
				en contactarnos a{" "}
				<a href="mailto:ventas@ecograsas.com">ventas@ecograsas.com</a> o llama
				al numero de telefono <a href="tel:+582587664725">+58 258-766-4725</a>
			</p>
		</div>
	);
}
