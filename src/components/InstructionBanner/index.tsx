import React from "react";
import "./index.scss";
import { FaArrowRight } from "react-icons/fa6";
import { navigate } from "gatsby";

export default function InstructionsBanner() {
	const handleClick = () => {
		navigate("/Register");
	};

	return (
		<article className="intructionBanner pt-16 pb-12 px-8">
			<h2 className="text-4xl font-black mb-16">
				¿Por qu&eacute; usar nuestros Productos?
			</h2>
			<h3 className="text-2xl font-bold">
				Producimos y entregamos en tiempo r&eacute;cord
				<br /> para asegurar tu constancia
			</h3>
			<p>
				Nuestros productos est&aacute;n hechos con ingredientes de la m&aacute;s
				alta calidad y estamos comprometidos a brindar un excelente servicio al
				cliente. Sabemos que estar&aacute; satisfecho con nuestros productos y
				estamos seguros de que ser&aacute; un cliente habitual.
			</p>
			<p>
				Si tiene alguna pregunta o desea realizar un pedido, comun&iacute;quese
				con nosotros a{" "}
				<a href="mailto:ventas@ecograsas.com">ventas@ecograsas.com</a> o{" "}
				<a href="https://wa.me/+584123273530">0412-3273530</a>. ¡Esperamos con
				inter&eacute;s escuchar de usted!
			</p>
			<button
				type="button"
				className="action-button-1 mt-12"
				id="variant-left"
				onClick={handleClick}
			>
				inicia con nosotros <FaArrowRight />
			</button>
		</article>
	);
}
