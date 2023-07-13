import React from "react";

interface ProductCardInterface {
	number: string;
}

export default function ProductCard({ number, ...rest }: ProductCardInterface) {
	return (
		<div {...rest}>
			<h4 style={{ textAlign: "center" }}>ProductCard {number}</h4>
		</div>
	);
}
