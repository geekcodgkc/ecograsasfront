import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import "./index.scss";
import { TiThMenu } from "react-icons/ti";
import { AiFillCloseCircle } from "react-icons/ai";
import { useUserStore } from "../../store";
import { BiUserCircle } from "react-icons/bi";

export default function NavBar() {
	const [open, setOpen] = useState(false);
	const state = useUserStore((state) => state);

	const sendTo = () => {
		setOpen(false);
		navigate("/Register");
	};

	const handleOpen = () => {
		setOpen(!open);
	};

	return (
		<nav className="min-w-full p-4 px-16 justify-center flex" id="nav">
			<div className="justify-between flex-wrap items-center flex w-full max-w-screen-2xl">
				<div className="items-center flex">
					<Link to="/" className="font-black duration-150 nav-hover">
						ECOGRASAS
					</Link>
				</div>
				<div className="items-center flex gap-x-4 tracking-widest page-links">
					<Link
						to="/Products"
						className="font-medium px-4 duration-150 nav-hover"
					>
						Productos
					</Link>
					<Link to="/About" className="font-medium px-4 duration-150 nav-hover">
						About
					</Link>
					<Link to="/Blog" className="font-medium px-4 duration-150 nav-hover">
						Blog
					</Link>
					{state.token ? (
						<div
							className="userButton"
							onClick={() => {
								navigate("/Profile");
							}}
							onKeyDown={() => {}}
						>
							{state.name} <BiUserCircle />
						</div>
					) : (
						<button
							type="button"
							className="register-button ml-16"
							onClick={sendTo}
						>
							registrarse
						</button>
					)}
				</div>
				<button
					type="button"
					className="text-2xl sideNavOpen"
					onClick={handleOpen}
				>
					<TiThMenu />
				</button>
				<aside
					className={`bg-slate-100 flex flex-col side-nav h-full p-8 pt-2 fixed items-end shadow-2xl shadow-black ${
						open ? "nav-open" : "nav-close"
					}`}
				>
					<button type="button" className="close-button" onClick={handleOpen}>
						<AiFillCloseCircle className="text-2xl mb-8" />
					</button>
					<div className="flex flex-col items-start gap-6 w-full">
						{state.token ? (
							<div
								className="userButton"
								onClick={() => {
									navigate("/Profile");
									setOpen(false);
								}}
								onKeyDown={() => {}}
							>
								{state.name} <BiUserCircle />
							</div>
						) : (
							<button
								type="button"
								className="register-button"
								onClick={sendTo}
							>
								registrarse
							</button>
						)}
						<Link
							onClick={handleOpen}
							to="/Products"
							className="font-medium duration-150 nav-hover"
						>
							Productos
						</Link>
						<Link
							onClick={handleOpen}
							to="/About"
							className="font-medium duration-150 nav-hover"
						>
							About
						</Link>
						<Link
							onClick={handleOpen}
							to="/Blog"
							className="font-medium duration-150 nav-hover"
						>
							Blog
						</Link>
						{state.token && (
							<button
								onClick={() => {
									state.logout();
								}}
								type="button"
								className="register-button"
							>
								cerrar sesion
							</button>
						)}
					</div>
				</aside>
			</div>
		</nav>
	);
}
