import React from "react";
import { Link } from "gatsby";
import "./index.scss";

export default function NavBar() {
	return (
		<nav className="min-w-full p-4 px-16 justify-between flex-wrap items-center flex">
			<div className="items-center flex">
				<Link to="/" className="font-black duration-150 nav-hover">
					ECOGRASAS
				</Link>
			</div>
			<div className="items-center flex gap-x-4 tracking-widest">
				<Link
					to="/products"
					className="font-medium px-4 duration-150 nav-hover"
				>
					Productos
				</Link>
				<Link to="/about" className="font-medium px-4 duration-150 nav-hover">
					About
				</Link>
				<Link to="/blog" className="font-medium px-4 duration-150 nav-hover">
					Blog
				</Link>
				<button type="button" className="register-button ml-16">
					registrarse
				</button>
			</div>
		</nav>
	);
}
