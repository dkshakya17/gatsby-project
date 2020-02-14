import React from 'react'
import styled from 'styled-components'
import { renderNodes } from '../../node-renderer'
import ThemeContext from "../../context/context"

const Innerpage = ({ content, location }) => {
  
  return (
    <ThemeContext.Consumer>
      {theme => (
      <View>
        <Content>{renderNodes(content.htmlAst.children)}</Content>
      </View>
    )}
    </ThemeContext.Consumer>
  )
}
export default Innerpage

const View = styled.div`
  background-color: white;
  display: block;
  min-height: 1000px;
  padding-bottom: 2rem;
  position: relative;
  z-index: 10;
  max-width: 90%;
  margin:0 auto;
`

const Content = styled.div`
  display: block;
  position: relative;
  z-index: 30;
  margin-top:0;
  overflow-x:hidden;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`
