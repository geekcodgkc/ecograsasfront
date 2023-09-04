import React from "react";
import "./index.scss";
import { Link } from "gatsby";

interface Child {
	text: string;
	_type: string;
}

interface Childrens {
	children: Child[];
}

interface PostCardInterface {
	data: {
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
	};
}

export default function PostCard({ data }: PostCardInterface) {
	const blogContent = data.blogPost.slice(0, 3);

	return (
		<article className="shadow-xl postCardContainer w-full flex flex-wrap gap-2 rounded-lg p-4 bg-slate-300">
			<div className="Img max-w-content rounded-lg">
				<Link to={`/posts/${data.Slug.current}`}>
					<img alt={data.title} src={data.mainImage.asset.resize.src} />
				</Link>
			</div>
			<div className="description flex-1 flex flex-wrap gap-4 flex-col">
				<Link to={`/posts/${data.Slug.current}`}>
					<h3 className="font-bold text-2xl break-words hover:text-slate-50 duration-150">
						{data.title}
					</h3>
				</Link>
				<p className="blogContent line-clamp-6">
					{blogContent.map((childrens, i) => {
						return (
							<React.Fragment key={i + 10}>
								{childrens.children.map((child, i) => (
									<span key={i + 1}>{child.text}</span>
								))}
							</React.Fragment>
						);
					})}
				</p>
			</div>
		</article>
	);
}
