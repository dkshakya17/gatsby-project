import React from 'react'
import styled from 'styled-components'
//import { ContextProviderComponent } from "../Context"
import { renderNodes } from '../../node-renderer'
import ThemeContext from "../../context/context"

const Page = ({ content, location }) => {
  // Get selected language from url

  var lang =''
  // if(location.search){
  //   console.log('>>>>>>')
  //   // console.log(location.search.replace('?', ''));
  //   lang = location.search.replace('?', '') || content.frontmatter.language_tabs[0]
  // }
  // else{
  //   lang = 'php'
  // }
  //
  // const updateLanguage = (newLang) => {
  //     lang = newLang;
  // }
  //const { foo, baz } = this.context

  return (
    <ThemeContext.Consumer>
      {theme => (
        // <div>
        //   <pre>rohit {theme.dark}</pre>
        //   <pre>Here is dark: {theme.language}</pre>
        // </div>
      <View>
        <Content>{renderNodes(content.htmlAst.children)}</Content>
      </View>
    )}
    </ThemeContext.Consumer>
  )
}
export default Page

const View = styled.div`
  background-color: white;
  display: block;
  margin-left: 270px;
  min-height: 100%;
  padding-bottom: 1rem;
  position: relative;
  z-index: 10;
`

const Content = styled.div`
  display: block;
  position: relative;
  z-index: 30;
  margin-top:11rem;
  overflow-x:hidden;
  &:after {
    content: '';
    display: block;
    clear: both;
  }
`
