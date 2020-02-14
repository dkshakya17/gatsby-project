import React from 'react'
import styled from 'styled-components'
import {StaticQuery, Link } from "gatsby"

const linkStyles ={
    lineHeight:' 28px',
    padding: '0 15px 0 15px',
    display:' inline-block',
    overflowX: 'hidden',
    fontFamily: 'openSans',
    whiteSpace: 'normal',
    textOverflow: 'clip',
    textDecoration: 'none',
    color: 'inherit',
    fontSize:'18px',
    padding:'10px',
    fontWeight:'400',
    transitionProperty: 'background',
    transitionTimingFunction: 'linear',
    transitionDuration: '130ms',
    width:'auto',
    ':after': {
      content: `''`,
      position: 'absolute',
      top: '0px',
      width: '4px',
      height: '10px',
      borderRadius:'10px',
  }
}
const activeStyles ={
  color:'#7d44f0',
  position:'relative',
  fontWeight:'600',
}

const drawerSidebar = () => {
  return(
<StaticQuery
      query={drawerQuery}
      render={data => {
        const Content = data.drawer.edges
        return (
          <nav>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <List>
          {Content.map((item, key) =>
              <Item><Link to={item.node.frontmatter.permalink} style={linkStyles}
                activeStyle={activeStyles} >{item.node.frontmatter.subtitle}</Link></Item>
          )}
          </List>
        </nav>
        )
      }}
    />

  )
}

export default drawerSidebar

const List = styled.ul`
  display: block;
  font-family: 'openSans' !important;
  list-style: none;
  margin: 0;
  padding: 15px 0px;
  margin-left: 10%;
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

const drawerQuery = graphql`
query {
  drawer: allMarkdownRemark(
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
}
`