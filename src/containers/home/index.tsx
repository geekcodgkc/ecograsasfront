import React from "react";
import Hero from "../../components/Hero";
import SectionDouble from "../../components/SectionDouble";
import YoutubeEmbed from "../../components/Youtube";
import { navigate, graphql, useStaticQuery } from "gatsby";
import { BsArrowRight } from "react-icons/bs";
import "./index.scss";
import Carousel from "../../components/Carousel";
import ProductCard from "../../components/ProductCard";
import InstructionsBanner from "../../components/InstructionBanner";
import SellerCard from "../../components/SellerCard";
import EventsCard from "../../components/EventsCard";
import CartWrapper from "../CartWrapper";

interface ProductsInterface {
	descriptionsShort: string;
	productName: string;
	Slug: {
		current: string;
	};
	productImage: {
		asset: {
			resize: {
				src: string;
			};
		};
	};
	_id: string;
}

interface SellersInterface {
	_id: string;
	phone: string;
	name: string;
	email: string;
	profileImage: {
		asset: {
			resize: {
				src: string;
			};
		};
	};
}

interface Receipt {
	id: string;
	title: string;
	metaDescription: string;
	mainImage: {
		asset: {
			_createdAt: string;
			resize: {
				src: string;
			};
		};
	};
	Slug: {
		current: string;
	};
}

const Iframe = () => {
	return (
		<YoutubeEmbed
			src="https://www.youtube.com/embed/r_YGlKihHtk"
			title="YouTube video player"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
			height="100%"
			width="100%"
		/>
	);
};

const Left = () => {
	const sendTo = () => {
		navigate("/Register");
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

interface sanityImageInfo {
	filename: string;
	resize: {
		src: string;
	};
}

export default function Home() {
	const {
		allSanityImageAsset,
		allSanityProducts,
		allSanitySellers,
		allSanityBlogs,
	} = useStaticQuery(queryProductImage);

	/*const farming = allSanityImageAsset.nodes.find(
		(e: sanityImageInfo) => e.filename === "farminBackground.webp",
	);*/

	const products = allSanityImageAsset.nodes.find(
		(e: sanityImageInfo) =>
			e.filename === "assorted-fruits-pastry_23-2147869464.jpg",
	);

	const sellers = allSanityImageAsset.nodes.find(
		(e: sanityImageInfo) =>
			e.filename ===
			"vista-superior-galleta-chispas-chocolate-fondo-naranja.jpg",
	);

	return (
		<CartWrapper>
			<Hero />
			{/*<section className="w-full relative farmin-background">
				<div
					className="background"
					style={{ backgroundImage: `url(${farming.resize.src})` }}
				/>
				<SectionDouble LeftChild={Iframe} RightChild={Left} padding="py-24" />
			</section>*/}
			<section className="w-full pt-16 products-background relative flex justify-center flex-wrap">
				<div
					className="background"
					style={{ backgroundImage: `url(${products.resize.src})` }}
				/>
				<h2 className="text-center font-bold text-2xl">
					Productos Frescos y de Larga Duraci&oacute;n
				</h2>
				<Carousel>
					{allSanityProducts.nodes.map((product: ProductsInterface) => {
						return (
							<ProductCard
								key={product._id}
								title={product.productName}
								description={product.descriptionsShort}
								buttonText="Conoce Mas"
								actionRoute={`/Products/${product.Slug.current}`}
								img={product.productImage.asset.resize.src}
							/>
						);
					})}
				</Carousel>
			</section>
			<section className="w-full">
				<InstructionsBanner />
			</section>
			<section className="w-full flex flex-wrap justify-center gap-x-8 gap-y-16 py-12 sellerSectionBackground relative">
				<div
					className="background"
					style={{ backgroundImage: `url(${sellers.resize.src})` }}
				/>
				<h2 className="text-center font-bold text-4xl w-full">
					Contamos Con un Equipo excelente
				</h2>
				{allSanitySellers.nodes.map((seller: SellersInterface) => {
					return (
						<SellerCard
							key={seller._id}
							name={seller.name}
							phone={seller.phone}
							email={seller.email}
							img={seller.profileImage.asset.resize.src}
						/>
					);
				})}
			</section>
			<section className="mx-auto w-11/12 py-12 justify-center flex flex-wrap gap-x-8 gap-y-16">
				<h2 className="text-center font-bold text-4xl w-full mb-16">
					Nuestras Recetas
				</h2>
				{allSanityBlogs.nodes.map((receipt: Receipt) => {
					return (
						<EventsCard
							key={receipt.id}
							title={receipt.title}
							description={receipt.metaDescription}
							img={receipt.mainImage.asset.resize.src}
							date={receipt.mainImage.asset._createdAt}
							Slug={receipt.Slug.current}
						/>
					);
				})}
			</section>
		</CartWrapper>
	);
}

const queryProductImage = graphql`
	query images {
		allSanityImageAsset(filter: {_createdAt: {gte: "2023-07-20"}}) {
			nodes {
				resize(aspectRatio: 1.78, fit: COVER, format: WEBP, width: 1280, quality: 60) {
					src
				}
				filename
			}
		}
		allSanityProducts(limit: 10) {
			nodes {
				descriptionsShort
				productName
				Slug {
					current
				}
				productImage {
					asset {
						resize(format: WEBP, height: 400, quality: 70, width: 400) {
							src
						}
					}
				}
				_id
			}
		}
		allSanitySellers {
			nodes {
				_id
				phone
				name
				email
				profileImage {
					asset {
						resize(cropFocus: CENTER, format: WEBP, width: 200, height: 200, quality: 50) {
							src
						}
					}
				}
			}
		}
		allSanityBlogs(limit: 2) {
			nodes {
				Slug {
					current
				}
				mainImage {
					asset {
						resize(height: 450, width: 350, quality: 60, format: WEBP) {
							src
						}
						_createdAt(formatString: "D-MM-YYYY")
					}
				}
				title
				id
				metaDescription
			}
		}
	}
`;
