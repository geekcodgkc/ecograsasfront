import React from "react";
import "./index.scss";
import { graphql } from "gatsby";
import PostCard from "../../components/PostCard";
import Pagination from "../../components/PaginationComponent";

interface Child {
	text: string;
	_type: string;
}

interface Childrens {
	children: Child[];
}

interface SanityBlogs {
	Slug: { current: string };
	title: string;
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

interface PostsContainerInterface {
	pageContext: {
		currentPage: number;
		numberOfPages: number;
	};
	data: {
		allSanityBlogs: { nodes: SanityBlogs[] };
	};
}

export default function PostsContainer({
	pageContext,
	data,
}: PostsContainerInterface) {
	const { allSanityBlogs: posts } = data;

	return (
		<div className="w-11/12 gap-y-4 mx-auto max-w-screen-lg flex flex-wrap justify center pb-12">
			<h1 className="w-full text-4xl mt-4 font-bold">
				Articulos y Blogs de Ecograsas
			</h1>
			{posts.nodes.map((data, i) => (
				<PostCard key={i + 1} data={data} />
			))}
			<Pagination
				currentPage={pageContext.currentPage}
				totalPages={pageContext.numberOfPages}
				nextPage={`/Blog/${pageContext.currentPage + 1}`}
				prevPage={`/${
					pageContext.currentPage === 1
						? "/Blog"
						: `/Blog/${pageContext.currentPage - 1}`
				}`}
				basePage="/Blog"
			/>
		</div>
	);
}

export const query = graphql`
    query posts($limit: Int, $skip: Int) {
        allSanityBlogs(limit: $limit, skip: $skip) {
            nodes {
                Slug {
                    current
                }
                title
                mainImage {
                    asset {
                        resize(fit: COVER, aspectRatio: 1, format: WEBP, width: 300, quality: 100) {
                            src
                        }
                        title
                    }
                }
                blogPost {
                    children {
                        text
                        _type
                    }
                }
            }
        }
    }
`;
