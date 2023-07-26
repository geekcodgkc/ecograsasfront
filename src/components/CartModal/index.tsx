import React from "react";
import "./index.scss";

interface ModalProps {
	handleClose: () => void;
}

export default function CartModal({ handleClose }: ModalProps) {
	return (
		<div onClick={handleClose} onKeyDown={() => {}}>
			CartModal
		</div>
	);
}
