import React from 'react'
import styled from 'styled-components'
import { Link } from "gatsby"

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
const leftSidebar = ({ content }) => {
  return(
    <>
    <View>
    <List>
    {content.map((item, key) =>
        <Item><Link to={item.node.frontmatter.permalink} style={linkStyles}
          activeStyle={activeStyles} >{item.node.frontmatter.subtitle}</Link></Item>
    )}
    </List>
    </View>
    </>
  )
}

export default leftSidebar

const View = styled.div`
  bottom: 0;
  display: block;
  position: fixed;
  left: 0;
  background-color: #fafafa;
  overflow-y: auto;
  top: 0;
  font-family: 'openSans' !important;
  padding-top:7rem;
  width: 300px;
  z-index:100;
`

const List = styled.ul`
  display: block;
  font-family: 'openSans' !important;
  list-style: none;
  margin: 0;
  padding: 15px 0px;
  margin-left: 10%;
  margin-bottom:40px;
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
// const Link = styled.a`
//   line-height: 28px;
//   padding: 0 15px 0 15px;
//   display: block;
//   overflow-x: hidden;
//   font-family: 'openSans' !important;
//   white-space: nowrap;
//   text-overflow: ellipsis;
//   text-decoration: none;
//   color: inherit;
//   font-size:14px;
//   padding:10px;
//   transition-property: background;
//   transition-timing-function: linear;
//   transition-duration: 130ms;
//   &:active,
//   &:focus {
//     color: #7454e6 !important;
//   };
//   &:hover {
//     color: #7454e6 !important;
//   }
// `
