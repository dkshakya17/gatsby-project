import React from 'react'
import YouTube from 'react-youtube';
import styled from 'styled-components'
import Sidebar from '../components/sidebar'
import { Blockquote } from './blockquote'
import { StaticQuery, graphql } from "gatsby"

export default (location) => (
    <StaticQuery
      query={graphql`
        query Video {
            allMarkdownRemark(
            filter: { fileAbsolutePath: {regex : "\/video/"} },
            ) {
            edges {
                node {
                    headings {
                        value
                        depth
                        }
                    }
                }
            }
        }
        `
      }
      render={data => (
          <div>
            <Sidebar location={location} content={data.allMarkdownRemark.edges[0].node}/>
            <View>
                <Heading1>Debugging Signature Mismatch error on Cashfree payment gateway</Heading1>
                <Paragraph>
                    <p>At the time of initiating a test payment if you see “signature mismatch” error, this could be due to any of the two reasons:</p>
                    <ul>
                        <li>You have entered wrong credentials-for test or production.</li>
                        <li>The parameters(orderId, order amount etc) are incorrect or missing</li>
                    </ul>
                    <YouTube
                            videoId="CpE6g4eN_8k"
                        />
                </Paragraph>
            </View>
          </div>
      )}
    />
  )
  const View = styled.div`
  background-color: transparent;
  margin-left:270px;
  font-family: 'openSans' !important;
  margin-top:11rem;
`
const Heading1 = styled.h1`
  background-color: white;
  box-sizing: border-box;
  clear: both;
  color:rgb(87,111,222) !important;
  display: block;
  font-size: 24px;
  line-height: normal;
  font-weight:500;
  padding: 0.5em 28px;
  margin-bottom: 21px;
  margin-right: 50%;
  font-family: 'openSans' !important;
  margin-top: 2em;
  width: 80%;
  &:first-child {
    margin-top: 0px;
    border-top-width: 0;
  }
`

const Paragraph = styled.p`
  display: block;
  box-sizing: border-box;
  font-size:14px;
  color:#4b4b4b !important;
  line-height:1.75rem;
  font-family: 'openSans' !important;
  padding: 0 28px;
  width: 70%;
  ${Blockquote} & {
    width: 100%;
  }
`