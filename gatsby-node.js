const path = require("path");
const axios = require("axios");

const api = axios.create({
	baseURL: "https://api.geekcod.com/api-v1/",
	headers: {
		Authorization:
			"Bearer 3egUxGRb1x2ekiHreBshswQpsEL0QsgOtSYcMYiiOoPx7PtU70EYpHdJ6vALOisb",
	},
});

exports.createPages = async ({ graphql, actions }) => {
	const { data } = await graphql(`
        query posts {
            allSanityBlogs {
                nodes {
                    Slug {
                        current
                    }
                }
            }
        }
    `);

	const { data: productsData } = await graphql(`
		query posts {
			allSanityProducts {
				nodes {
					Slug {
						current
					}
					productImage {
						asset {
							resize(width: 300, height: 300, format: WEBP, quality: 70) {
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
				}
			}
		}
	`);

	const { data: products } = await api.get("/products");
	const productsMap = {};
	const actives = products.filter((product) => product.status === true);

	actives.forEach((product) => {
		productsMap[`${product.id}`] = product;
	});

	const productsMaped = productsData.allSanityProducts.nodes.map((p) => ({
		...p,
		...productsMap[`${p.productId.current}`],
	}));

	const maxPaginationNumber = 5;
	const posts = data.allSanityBlogs.nodes;
	const PagesArray = [];
	const numberOfPages = Math.ceil(posts.length / maxPaginationNumber);

	for (let i = 0; i < numberOfPages; i++) {
		PagesArray.push(PagesArray.length + 1);
	}

	PagesArray.forEach((_node, i) => {
		actions.createPage({
			path: i === 0 ? "/blog/" : `/Blog/${i + 1}`,
			component: path.resolve("./src/containers/Posts/index.tsx"),
			context: {
				limit: maxPaginationNumber,
				skip: maxPaginationNumber * i,
				numberOfPages,
				currentPage: i + 1,
			},
		});
	});

	posts.forEach((node) => {
		actions.createPage({
			path: `/posts/${node.Slug.current.toLocaleLowerCase()}`,
			component: path.resolve("./src/containers/BlogPost/index.tsx"),
			context: {
				slug: node.Slug.current,
			},
		});
	});

	productsMaped.forEach((node) => {
		actions.createPage({
			path: `/products/${node.Slug.current.toLocaleLowerCase()}`,
			component: path.resolve(
				"./src/containers/SingleProductContainer/index.tsx",
			),
			context: {
				slug: node.Slug.current,
				_id: node._id,
				productData: {
					prices: node.prices,
					id: node.id,
				},
			},
		});
	});

	actions.createPage({
		path: "/products",
		component: path.resolve("./src/containers/Products/index.tsx"),
		context: {
			sanityProducts: productsMaped,
		},
	});

	const ProductCategories = {};

	productsMaped.forEach((p) => {
		if (!ProductCategories[p.department]) {
			ProductCategories[p.department] = [p];
			return;
		}
		ProductCategories[p.department].push(p);
	});

	Object.keys(ProductCategories).forEach((Categorie) => {
		actions.createPage({
			path: `/products/categorias/${Categorie.toLocaleLowerCase()}`,
			component: path.resolve("./src/containers/ProductsCategories/index.tsx"),
			context: {
				sanityProducts: ProductCategories[Categorie],
			},
		});
	});
};
