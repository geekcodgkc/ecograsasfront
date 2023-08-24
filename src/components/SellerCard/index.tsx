import React from "react";
import "./index.scss";
import { FaArrowRight } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";

interface SellerProps {
	phone: string;
	name: string;
	img?: string;
	deparment?: string;
	email?: string;
}

export default function SellerCard({
	img,
	name,
	phone,
	deparment = "Ventas",
	email = "ventas@ecograsas.com",
}: SellerProps) {
	return (
		<>
			<div className="sellerCardContainer bg-slate-100 flex flex-col align-center py-8 shadow-md">
				<div className="containerInfo px-16 flex flex-col items-center gap-2">
					<div className="sellerImgContainer">
						{img && (
							<img
								src={img}
								loading="lazy"
								alt="text alt"
								width={150}
								height={150}
							/>
						)}
						{!img && <FaUserAlt />}
					</div>
					<h3>{name}</h3>
					<h4>Departamento de: {deparment}</h4>
					<p className="font-bold hover:text-stone-500 underline decoration-2">
						<a
							href={`https://wa.me/${phone}`}
							target="_blank"
							referrerPolicy="no-referrer"
						>
							{phone}
						</a>
					</p>
				</div>
				<hr />
				<div className="containerInfo px-16 pt-4">
					<a href={`mailto:${email}`} className="action-button-1">
						envia un correo a {name.split(" ")[0]} <FaArrowRight />
					</a>
				</div>
			</div>
		</>
	);
}
