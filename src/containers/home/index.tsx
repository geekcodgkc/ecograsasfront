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
			<section className="w-full">
				<Carousel>
					<ProductCard
						title="Card Title"
						description="Card description for this card"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Card Title"
						description="Card description for this card"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Card Title"
						description="Card description for this card"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Card Title"
						description="Card description for this card"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Card Title"
						description="Card description for this card"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Card Title"
						description="Card description for this card"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Card Title"
						description="Card description for this card"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Card Title"
						description="Card description for this card"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Card Title"
						description="Card description for this card"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
					<ProductCard
						title="Card Title"
						description="Card description for this card"
						buttonText="vamos al sitio"
						actionRoute="/About"
						img={BackImg}
					/>
				</Carousel>
			</section>
		</>
	);
}
