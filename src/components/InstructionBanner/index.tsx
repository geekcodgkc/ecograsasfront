import React from "react";
import "./index.scss";
import { FaArrowRight } from "react-icons/fa6";

export default function InstructionsBanner() {
	return (
		<article className="intructionBanner pt-16 pb-12 px-8">
			<h2 className="text-4xl font-black mb-16">
				¿Por qu&eacute; usar nuestros Productos?
			</h2>
			<h3 className="text-2xl font-bold">
				Producimos y entregamos en tiempo r&eacute;cord
				<br /> para asegurar tu constancia
			</h3>
			<p>instruction</p>
			<button type="button" className="action-button-1" id="variant-left">
				incia con nosotros <FaArrowRight />
			</button>
		</article>
	);
}
