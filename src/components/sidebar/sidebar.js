import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const renderTOC = (content, location) => {

  return content.headings.map(element => {
    // stopwords
    if(element.value === "BEGIN_CODE" || element.value === "END_CODE")  {
      return;
    }
    const hashLoc = element.value.replace(/ /g,'-').replace(/[^a-zA-Z-]/g, "").toLowerCase()

    const loc = location.hash || `#`+ content.headings[0].value.replace(/ /g,'-').toLowerCase()
    if (element.depth === 1) {
      return (
        <Item key={element.value} active={`#${hashLoc}`=== loc}>
          <Anchor href={`#${hashLoc}`}>
            {element.value}
          </Anchor>
        </Item>
      )
    }
    return null
  })
}

const TOC = ({ content, location,data }) => {

  return (
    <StaticQuery
      query={query}
      render={data => (
        <View>
          <List>{renderTOC(content, location)}</List>
        </View>
      )}
    />
  )
}

export default TOC

const query = graphql`
  query SiteQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`

const View = styled.div`
  bottom: 0;
  display: block;
  position: fixed;
  background-color: #f7fafc;
  left: 0;
  overflow-y: auto;
  top: 0;
  font-family: 'openSans' !important;
  padding-top:10rem;
  width: 270px;
  border-right: 1px solid #ededed;
  z-index:100;
`
// const Title = styled.h1`
//   color: black;
//   font-size: 20px;
//   padding: 1rem;
//   text-align: center;
// `

const List = styled.ul`
  display: block;
  font-family: 'openSans' !important;
  list-style: none;
  margin: 0;
  padding: 15px 10px;
  //margin-block-start: 1em;
  //margin-block-end: 1em;
  //margin-inline-start: 0px;
  //margin-inline-end: 0px;
  //padding-inline-start: 40px;
`

const Item = styled.li`
  color: ${({ active }) => (active ? '#576fde' : '#4D5D6F')};
  font-weight: ${({ active }) => (active ? '600' : '400')};
  display: list-item;
  text-transform: capitalize;
  font-family: 'openSans' !important;
  font-size: 19px !important;
  &:active,
  &:focus {
    color: #576fde !important;
  }
`
const Anchor = styled.a`
  line-height: 28px;
  padding: 0 15px 0 15px;
  display: block;
  overflow-x: hidden;
  font-family: 'openSans' !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  color: inherit;
  font-size:14px;
  padding:10px;
  transition-property: background;
  transition-timing-function: linear;
  transition-duration: 130ms;
  &:active,
  &:focus {
    color: #576fde !important;
  }
`
