import React from "react";
import { graphql } from "gatsby";
import "./index.scss";

interface Child {
	text: string;
	_type: string;
}

interface Childrens {
	children: Child[];
	style: string;
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
	blogPost: Childrens[];
}

interface BlogPostsInterface {
	pageContext: {
		slut: string;
	};
	data: {
		sanityBlogs: SanityBlogs;
	};
}

export default function BlogPostsContainer({
	pageContext,
	data,
}: BlogPostsInterface) {
	console.log(data);
	const { sanityBlogs: post } = data;

	return (
		<div className="BlogPostContainer w-11/12 mx-auto max-w-screen-md center py-12">
			<h2 className="text-3xl font-bold w-full text-center">{post.title}</h2>
			<img src={post.mainImage.asset.resize.src} alt={post.title} />
			<div className="w-full mx-auto max-w-screen-sm">
				{post.blogPost.map((textEl, i) => {
					if (textEl.style === "normal") {
						return (
							<p className="my-8 text-justify">
								{textEl.children[0].text}
								<br />
							</p>
						);
					}
					return (
						<h3 className="text-2xl my-8 font-bold w-full text-center">
							{textEl.children[0].text}
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
			blogPost {
				children {
					text
				}
				style
			}
			title
			mainImage {
				asset {
					resize(
					aspectRatio: 1
					fit: COVER
					format: WEBP
					quality: 70
					width: 400
					height: 400
					) {
						src
					}
				}
			}
		}
	}
`;
