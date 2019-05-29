const p = require('path')

function removeHiddenFiles (pages) {
  return pages.filter((page) => !page.node.fields.slug.startsWith('/_includes'))
}

module.exports = function genericPageGenerator (
  markdownPages,
  boundActionCreators
) {
  const { createPage } = boundActionCreators
  return Promise.all(
    removeHiddenFiles(markdownPages.data.allMarkdownRemark.edges).map(
      ({ node }, idx) =>
        createPage({
          component: p.resolve(`./src/templates/PageTemplate.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            slug: node.fields.slug
          },
          path: node.fields.slug
        })
    )
  )
}
