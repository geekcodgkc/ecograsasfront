import React from "react";
import { Helmet } from "react-helmet";
import "./index.scss";

export default function AboutContainer() {
	return (
		<div className="min-h-screen w-full max-w-screen-lg p-2 pb-12 px-8 mx-auto bg-slate-50 aboutContainer">
			<Helmet>
				<title>{"ecograsas - sobre nosotros"}</title>
				<meta
					content={
						"Procesadora Ecograsas es una empresa venezolana especializada en el procesamiento y comercialización de productos de aceite y grasa. Comprometidos con la sostenibilidad y la responsabilidad ambiental, buscamos ofrecer productos de alta calidad mientras minimizamos nuestro impacto ecológico. Nuestra misión es ser líderes en la provisión de productos de aceite y grasa, priorizando la sostenibilidad ambiental. Visualizamos un futuro en el que las prácticas sostenibles y los productos de alta calidad vayan de la mano, contribuyendo a un futuro más verde y sostenible."
					}
					name="description"
				/>
			</Helmet>
			<h2 className="text-3xl font-bold text-center mb-12 mt-4">
				Sobre Procesadora Ecograsas
			</h2>
			<p>
				Procesadora Ecograsas es una empresa venezolana ubicada en Portuguesa.
				Con un fuerte compromiso con la sostenibilidad y la responsabilidad
				ambiental, la empresa se especializa en el procesamiento y
				comercialización de productos de aceite y grasa. Procesadora Ecograsas
				busca brindar a sus clientes productos de alta calidad mientras minimiza
				su huella ecológica.
			</p>
			<h3 className="text-2xl font-bold mb-4">Misi&oacute;n</h3>
			<p>
				En Procesadora Ecograsas, nuestra misión es ser una empresa líder en la
				provisión de productos de aceite y grasa, ofreciendo una calidad
				excepcional mientras priorizamos la sostenibilidad ambiental. Nos
				esforzamos por satisfacer las necesidades de nuestros clientes al tiempo
				que minimizamos el impacto en el planeta. A través de procesos
				innovadores y prácticas responsables, buscamos contribuir a un futuro
				más verde y sostenible.
			</p>
			<p>Nuestra misión se puede resumir en los siguientes puntos clave:</p>
			<ul>
				<li>
					<p>
						Brindar productos de aceite y grasa de alta calidad para satisfacer
						las diversas necesidades de nuestros clientes.
					</p>
				</li>
				<li>
					<p>
						Minimizar nuestro impacto ambiental a través de prácticas
						sostenibles y una gestión responsable de los recursos.
					</p>
				</li>
				<li>
					<p>
						Innovar y mejorar continuamente nuestros procesos para garantizar la
						eficiencia y reducir el desperdicio.
					</p>
				</li>
				<li>
					<p>
						Fomentar una cultura de conciencia y responsabilidad ambiental entre
						nuestros empleados y partes interesadas.
					</p>
				</li>
				<li>
					<p>
						Contribuir al desarrollo de un futuro más verde y sostenible para
						nuestra comunidad y el planeta.
					</p>
				</li>
			</ul>
			<h3 className="text-2xl font-bold mb-4">Visi&oacute;n</h3>
			<p>
				Procesadora Ecograsas visualiza un futuro en el que las prácticas
				sostenibles y los productos de alta calidad vayan de la mano. Nuestra
				visión es ser una empresa líder en la industria del aceite y la grasa,
				reconocida por nuestro compromiso con la responsabilidad ambiental y la
				satisfacción del cliente.
			</p>
			<p>Nuestra visión se puede resumir en los siguientes puntos clave:</p>
			<ul>
				<li>
					<p>
						Brindar productos de aceite y grasa de alta calidad para satisfacer
						las diversas necesidades de nuestros clientes.
					</p>
				</li>
				<li>
					<p>
						Ser reconocidos como un proveedor confiable y confiable de productos
						de aceite y grasa, conocido por su calidad excepcional y su
						sostenibilidad ambiental.
					</p>
				</li>
				<li>
					<p>
						Expandir nuestras operaciones y llegar a nuevos mercados manteniendo
						nuestro enfoque en prácticas sostenibles y una gestión responsable
						de los recursos.
					</p>
				</li>
				<li>
					<p>
						Invertir continuamente en investigación y desarrollo para innovar y
						mejorar nuestros productos y procesos, manteniéndonos a la
						vanguardia de las tendencias de la industria y las demandas de los
						clientes.
					</p>
				</li>
				<li>
					<p>
						Fomentar alianzas sólidas y colaboraciones con organizaciones y
						partes interesadas afines para impulsar cambios positivos en la
						industria.
					</p>
				</li>
				<li>
					<p>
						Contribuir al bienestar de nuestros empleados, comunidad y medio
						ambiente, creando un impacto positivo y sostenible.
					</p>
				</li>
			</ul>
			<p>
				Al mantenernos fieles a nuestra misión y visión, Procesadora Ecograsas
				tiene como objetivo marcar la diferencia en la industria del aceite y la
				grasa y contribuir a un futuro más sostenible para todos.
			</p>
		</div>
	);
}
