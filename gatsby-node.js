const path = require("path");

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

	console.log("building pages");

	const maxPaginationNumber = 5;
	const posts = data.allSanityBlogs.nodes;
	const PagesArray = [];
	const numberOfPages = Math.ceil(posts.length / maxPaginationNumber);

	for (let i = 0; i < numberOfPages; i++) {
		PagesArray.push(PagesArray.length + 1);
	}

	PagesArray.forEach((_node, i) => {
		actions.createPage({
			path: i === 0 ? "/Blog/" : `/Blog/${i + 1}`,
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
			path: `/Posts/${node.slug.current}`,
			component: path.resolve("./src/containers/Blogpost/index.tsx"),
			context: {
				slug: node.slug.current,
			},
		});
	});
};
