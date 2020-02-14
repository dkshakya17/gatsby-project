import React from 'react'
import '../components/index.module.css'
import Sidebar from '../components/sidebar'
import Page from '../components/page'
import { StaticQuery, graphql } from "gatsby"

export default (location) => (
    <StaticQuery
      query={graphql`
        query Error {
            allMarkdownRemark(
            filter: { fileAbsolutePath: {regex : "\/error/"} },
            ) {
            edges {
                node {
                    headings {
                        value
                        depth
                        }
                        htmlAst
                    }
                }
            }
        }
        `
      }
      render={data => (
          <div>
            <Sidebar location={location.location} content={data.allMarkdownRemark.edges[0].node}/>
            <Page content={data.allMarkdownRemark.edges[0].node} location={location} />
          </div>
      )}
    />
  )
