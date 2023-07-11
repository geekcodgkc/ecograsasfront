import React from "react";
import { Link } from "gatsby";
import "./index.scss";

export default function Hero() {
	return (
		<header className="hero flex flex-col justify-end p-20 pb-36 gap-4">
			<div className="text-slate-100 flex flex-col gap-2">
				<h3 className="text-5xl font-bold">la mejor calidad</h3>
				<h2 className="text-7xl font-bold">
					Impulsa tus productos con la <br />
					mejor calidad
				</h2>
				<h3 className="mt-4 bg-black/70 max-w-fit p-2">
					Registrate y contacta con nuestro equipo de ventas para optener los
					mejores precios y productos <br /> derivados de las grasas animales y
					aceites de palma, observa nuestros post y blogs con estudios,
					sugerencias y demas ...
				</h3>
			</div>
			<div className="text-slate-100 flex gap-2">
				<span className="p-1 border-solid border-slate-100 rounded border bg-black/70">
					<Link to="/login" className="hover:text-[#60794d]">
						<b>paso:1</b> reg&iacute;strate
					</Link>
				</span>
				<span className="p-1 border-solid border-slate-100 rounded border bg-black/70">
					<b>paso:2</b> obten la verificaci&oacute;n
				</span>
				<span className="p-1 border-solid border-slate-100 rounded border bg-black/70">
					<b>paso:3</b> realiza tu compra
				</span>
			</div>
		</header>
	);
}
