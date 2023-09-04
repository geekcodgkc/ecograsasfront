import React from "react";
import ProfileContainer from "../containers/Profile";
import { Helmet } from "react-helmet";

export default function Profile() {
	return (
		<>
			<Helmet>
				<title>{"ecograsas - Prefil personal"}</title>
				<meta
					content={
						"Procesadora Ecograsas es una empresa venezolana especializada en el procesamiento y comercialización de productos de aceite y grasa de palma. Comprometidos con la sostenibilidad y la responsabilidad ambiental, buscamos ofrecer productos de alta calidad mientras minimizamos nuestro impacto ecológico. Nuestra misión es ser líderes en la provisión de productos de aceite y grasa, priorizando la sostenibilidad ambiental. Visualizamos un futuro en el que las prácticas sostenibles y los productos de alta calidad vayan de la mano, contribuyendo a un futuro más verde y sostenible."
					}
					name="description"
				/>
			</Helmet>
			<ProfileContainer />;
		</>
	);
}
