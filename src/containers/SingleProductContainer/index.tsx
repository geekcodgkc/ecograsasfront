import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import CartWrapper from "../CartWrapper";
import "./index.scss";

interface pageContext {
	pageContext: {
		slug: string;
		_id: string;
	};
	data: object;
}

export default function SingleProduct({ pageContext, ...rest }: pageContext) {
	const { slug, _id } = pageContext;

	console.log(_id);

	return (
		<CartWrapper>
			<div className="w-full p-8">
				<h1 className="font-bold text-5xl">singlePage: {slug}</h1>
			</div>
		</CartWrapper>
	);
}

export const query = graphql`
    query posts {
        allSanityProducts {
            nodes {
                Slug {
                    current
                }
                productImage {
                    asset {
                        resize(width: 400, height: 400, format: WEBP, quality: 70) {
                            src
                        }
                    }
                }
                presentation
                descriptionsShort
                productId {
                    current
                }
                productName
                descriptionsFull {
                    children {
                        text
                    }
                }
            }
        }
    }
`;
