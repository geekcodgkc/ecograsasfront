import React from "react";
import "./index.scss";
import { FaArrowRight } from "react-icons/fa6";

interface SellerProps {
	phone: string;
	name: string;
	img?: string;
	deparment?: string;
	mail?: string;
}

export default function SellerCard({
	img,
	name,
	phone,
	deparment = "Ventas",
	mail = "ventas@ecograsas.com",
}: SellerProps) {
	return (
		<div className="sellerCardContainer flex flex-col align-center py-8 shadow-md">
			<div className="containerInfo px-16 flex flex-col items-center gap-2">
				<div className="sellerImgContainer">
					{img && <img src={img} alt="text alt" />}
				</div>
				<h3>{name}</h3>
				<h4>Depatamento de: {deparment}</h4>
				<p>
					<a href={`tel:${phone}`}>{phone}</a>
				</p>
			</div>
			<hr />
			<div className="containerInfo px-16 pt-4">
				<a href={`mailto:${mail}`} className="action-button-1">
					envia un correo a {name} <FaArrowRight />
				</a>
			</div>
		</div>
	);
}
