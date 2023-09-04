import React from "react";
import { Link, graphql } from "gatsby";
import "./index.scss";
import { Helmet } from "react-helmet";

interface Child {
	text: string;
	_type: string;
	marks: string[];
}

interface MarkDef {
	href: string;
	_key: string;
	_type: string;
}

interface Childrens {
	children: Child[];
	style: string;
	markDefs: [] | MarkDef[];
}

interface SanityBlogs {
	Slug: { current: string };
	title: string;
	_createdAt: string;
	mainImage: {
		asset: {
			resize: {
				src: string;
			};
			title: string | null;
		};
	};
	_rawBlogPost: Childrens[];
	metaDescription: string;
	metaTitle: string;
}

interface BlogPostsInterface {
	pageContext: {
		slut: string;
	};
	data: {
		sanityBlogs: SanityBlogs;
	};
}

export default function BlogPostsContainer({ data }: BlogPostsInterface) {
	const { sanityBlogs: post } = data;
	const postData = post._rawBlogPost;

	return (
		<div className="BlogPostContainer w-full mx-auto max-w-screen-lg center py-12 bg-slate-50">
			<Helmet>
				<title>{`Ecograsas: ${post.metaTitle}`}</title>
				<meta name="description" content={post.metaDescription} />
			</Helmet>
			<h2 className="text-3xl font-bold w-full text-center">{post.title}</h2>
			<img
				src={post.mainImage.asset.resize.src}
				alt={post.title}
				width="500px"
				height="500px"
			/>
			<div className="w-full mx-auto max-w-screen-sm">
				{postData.map((textEl, i) => {
					if (textEl.style === "normal") {
						return (
							<p className="my-8 text-justify" key={i + 1}>
								{textEl.children.map((text) => {
									const link = textEl.markDefs.filter(
										(m) => m._key === text.marks[0],
									);
									if (text.marks.length > 0 && link.length > 0) {
										return (
											<a
												href={link[0].href}
												className="blogLink"
												key={text.marks[0]}
											>
												{text.text}
											</a>
										);
									}
									return `${text.text}`;
								})}
								<br />
							</p>
						);
					}
					return (
						<h3
							key={i + 1}
							className="text-2xl my-8 font-bold w-full text-center"
						>
							{textEl.children.map((text) => {
								const link = textEl.markDefs.filter(
									(m) => m._key === text.marks[0],
								);
								if (text.marks.length > 0 && link.length > 0) {
									return (
										<a
											href={link[0].href}
											className="blogLink"
											key={text.marks[0]}
										>
											{text.text}
										</a>
									);
								}
								return `${text.text}`;
							})}
							<br />
						</h3>
					);
				})}
			</div>
		</div>
	);
}

export const query = graphql`
	query posts($slug: String) {
		sanityBlogs(Slug: {current: {eq: $slug}}) {
			Slug {
				current
			}
			_createdAt(fromNow: true, locale: "es")
			_rawBlogPost
			metaDescription
			metaTitle
			title
			mainImage {
				asset {
					resize(
					aspectRatio: 1
					fit: COVER
					format: WEBP
					quality: 70
					width: 500
					height: 500
					) {
						src
					}
				}
			}
		}
	}
`;
