import React from "react";
import Hero from "../../components/Hero";
import SectionDouble from "../../components/SectionDouble";
import YoutubeEmbed from "../../components/Youtube";
import { navigate } from "gatsby";
import { BsArrowRight } from "react-icons/bs";
import "./index.scss";
import Carousel from "../../components/Carousel";
import ProductCard from "../../components/ProductCard";
import BackImg from "../../images/planta-hoja-perenne-tropical-exotica-luz-sol.jpg";
import InstructionsBanner from "../../components/InstructionBanner";
import SellerCard from "../../components/SellerCard";
import EventsCard from "../../components/EventsCard";
import eventImg from "../../images/eventsImg.webp";

const Iframe = () => {
	return (
		<YoutubeEmbed
			src="https://www.youtube.com/embed/r_YGlKihHtk"
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share fullscreen"
			height="100%"
			width="100%"
		/>
	);
};

const Left = () => {
	const sendTo = () => {
		navigate("/Login");
	};

	return (
		<article className="flex flex-col gap-4">
			<h3 className="text-amber-500">Mas de 20 años de experiencia</h3>
			<h2 className="font-bold text-xl">
				Producimos y procesamos para garantizar el mejor sabor de tus comidas y
				postres{" "}
			</h2>
			<p className="text-xs">
				Damos mentoria y asesor&iacute;a para garantizar la mejor utilizacion de
				los productos, desde el momento de la produccion hasta que se optiene el
				resultado final en tus postres y comidas, perfecto para
			</p>
			<ul className="self-center list-disc">
				<li>Panaderos</li>
				<li>Reposteros</li>
				<li>Restaurantes</li>
				<li>y demas ...</li>
			</ul>
			<button type="button" className="action-button-1" onClick={sendTo}>
				registrarse <BsArrowRight />
			</button>
		</article>
	);
};

export default function Home() {
	return (
		<>
			<Hero />
			<section className="w-full farmin-background relative">
				<SectionDouble LeftChild={Iframe} RightChild={Left} padding="py-24" />
			</section>
			<section className="w-full pt-16 products-background relative">
				<h2 className="text-center font-bold text-2xl">
					Productos Frescos y de Larga Duraci&oacute;n
				</h2>
				<Carousel>
					<ProductCard
						title="Manteca Repostera"
						description="con una textura solida a temperatura ambiente y punto de fusion alto y una mayor vida util"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Margarina Untable"
						description="con una textura solida a temperatura ambiente y punto de fusion alto y una mayor vida util"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Aceite RBD de Palma"
						description="con una textura solida a temperatura ambiente y punto de fusion alto y una mayor vida util"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Margarina Multiuso Con Sal"
						description="con una textura solida a temperatura ambiente y punto de fusion alto y una mayor vida util"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Margarina de Palma"
						description="con una textura solida a temperatura ambiente y punto de fusion alto y una mayor vida util"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Margarina de Palma Baja en sal Hojaldre"
						description="con una textura solida a temperatura ambiente y punto de fusion alto y una mayor vida util"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Manteca Vegetal Galletera"
						description="con una textura solida a temperatura ambiente y punto de fusion alto y una mayor vida util"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Manteca Vegetal Galletera Tipo Shortering"
						description="con una textura solida a temperatura ambiente y punto de fusion alto y una mayor vida util"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
				</Carousel>
			</section>
			<section className="w-full">
				<InstructionsBanner />
			</section>
			<section className="w-full flex flex-wrap justify-center gap-x-8 gap-y-16 py-12 sellerSectionBackground relative">
				<h2 className="text-center font-bold text-4xl w-full">
					Contamos Con un Equipo excelente
				</h2>
				<SellerCard name="Julian" phone="+584243251030" />
				<SellerCard name="Maria" phone="+584243251030" />
				<SellerCard name="Elena" phone="+584243251030" />
			</section>
			<section className="mx-auto w-11/12 py-12 justify-center flex flex-wrap gap-x-8 gap-y-16">
				<h2 className="text-center font-bold text-4xl w-full mb-16">
					Proximos Eventos
				</h2>
				<EventsCard
					img={eventImg}
					title="Taller de Reposteria"
					description="mejores practicas e utilizacion de nuestros productos"
					date="22/09/2023"
					hour="9:30 AM"
				/>
				<EventsCard
					img={eventImg}
					title="Taller de Reposteria"
					description="mejores practicas e utilizacion de nuestros productos"
					date="22/09/2023"
					hour="9:30 AM"
				/>
				<EventsCard
					img={eventImg}
					title="Taller de Reposteria"
					description="mejores practicas e utilizacion de nuestros productos"
					date="22/09/2023"
					hour="9:30 AM"
				/>
			</section>
		</>
	);
}
