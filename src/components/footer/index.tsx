import React from "react";
import { Link } from "gatsby";
import { AiFillInstagram } from "react-icons/ai";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import "./index.scss";

export default function Footer() {
	return (
		<footer className="min-w-full bg-lime-500 pt-10 flex flex-wrap justify-around">
			<div className="ml-6 socials-container">
				<h2 className="font-bold text-3xl mb-4">
					Impulsando los mejores
					<br /> productos
				</h2>
				<h3 className="font-bold text-1xl mb-4">contactanos en ...</h3>
				<div className="flex flex-row socialsIcons gap-3 items-center text-3xl">
					<Link
						target="_blank"
						className="duration-100 hover:text-slate-100"
						to="https://instagram.com"
					>
						<AiFillInstagram className="" />
					</Link>
					<Link
						target="_blank"
						className="duration-100 hover:text-slate-100"
						to="https://facebook.com"
					>
						<BsFacebook />
					</Link>
					<Link
						target="_blank"
						className="duration-100 hover:text-slate-100"
						to="mailto:test@test.net"
					>
						<GrMail />
					</Link>
					<Link
						target="_blank"
						className="duration-100 hover:text-slate-100"
						to="https://youtube.com"
					>
						<BsYoutube />
					</Link>
				</div>
			</div>
			<header className="w-full flex justify-items-stretch max-w-[650px] flex-wrap links-container">
				<div className="basis-1/2 flex flex-col" id="quick-links">
					<h3 className="font-bold text-3xl mb-4">Informaci&oacute;n</h3>
					<ul className="w-full">
						<li>
							<Link
								className="hover:text-slate-100 font-medium duration-100"
								to="/About"
							>
								sobre nosotros
							</Link>
						</li>
						<li>
							<Link
								className="hover:text-slate-100 font-medium duration-100"
								to="/Contact"
							>
								equipo de ventas
							</Link>
						</li>
						<li>
							<Link
								className="hover:text-slate-100 font-medium duration-100"
								to="/Privacy"
							>
								politicas de privacidad
							</Link>
						</li>
					</ul>
				</div>
				<div className="basis-1/2 flex flex-col" id="quick-links">
					<h3 className="font-bold text-3xl mb-4">Enlaces R&aacute;pidos</h3>
					<ul className="w-full">
						<li>
							<Link
								className="hover:text-slate-100 font-medium duration-100"
								to="/Login"
							>
								incia sesion / registrarse
							</Link>
						</li>
						<li>
							<Link
								className="hover:text-slate-100 font-medium duration-100"
								to="/Contact"
							>
								contactos
							</Link>
						</li>
						<li>
							<Link
								className="hover:text-slate-100 font-medium duration-100"
								to="/Blog"
							>
								post
							</Link>
						</li>
					</ul>
				</div>
			</header>
			<div className="min-w-full flex justify-center bg-black p-2 mt-12">
				<h3 style={{ color: "white" }}>created by geekcod</h3>
			</div>
		</footer>
	);
}
