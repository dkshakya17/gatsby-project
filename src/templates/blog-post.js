import React from "react"
import SEO from '../components/seo'
import { graphql } from "gatsby"
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Footer from '../components/footer'
import LeftSidebar from '../components/leftSidebar'
import RightSidebar from '../components/rightSidebar'
import Innerpage from "../components/page/innerpage"
import InnerHeader from "../components/innerHeader"

export default ({ data }) => {
  const post = data.main
  const leftSidebar = data.leftSidebar.edges
  const rightSidebar = data.rightSidebar.headings
  return (
    <>
    <SEO title={post.frontmatter.title} keywords="backend, mobile, development, server, code, subscription, mandate, sdk"/>
    <InnerHeader/>
    <Grid container>
    <Hidden only={['sm', 'xs']}>
      <Grid item  md={3}>
        <LeftSidebar content={leftSidebar} />
      </Grid>
      </Hidden>
      <Grid item xs={12} md={7}>
        <Innerpage content={post} />
      </Grid>
      <Hidden only={['sm', 'xs']}>
      <Grid item  md={2}>
        <RightSidebar content={rightSidebar} />
      </Grid>
      </Hidden>
    </Grid>
    <Footer/>
    </>
  )
}



export const query = graphql`
  query($slug: String!, $rootSlug: String!) {

    main: markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      frontmatter {
        title
      }
    }
    leftSidebar: allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: $rootSlug}},
      sort: {fields: [frontmatter___sortOrder], order: ASC } ) {
      edges {
        node {
          id
          frontmatter {
            subtitle
            sortOrder
            permalink
          }
        }
      }
    }
    rightSidebar: markdownRemark(fields: { slug: { eq: $slug } }) {
      headings{
      	value
        depth
      }
    }
  }
`
