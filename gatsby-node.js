const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({node, getNode, actions}) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    const rootSlug = "\/".concat(slug.split("/")[1]).concat("\/")
    console.log(rootSlug)
    console.log(slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `rootSlug`,
      value: rootSlug,
    })
  }
  // if (node.internal.type === `MarkdownRemark`) {
  //   const fileNode = getNode(node.parent)
  //   console.log(`\n`, fileNode.relativePath)
  // }
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
              rootSlug
            }
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log(node.fields)
    console.log("testprint")
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        rootSlug: node.fields.rootSlug,
        slug: node.fields.slug,
      },
    })
  })
}
