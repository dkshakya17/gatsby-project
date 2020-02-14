import React from 'react'
import styled from 'styled-components'

import LanguageSelector from './language-selector'
import ThemeContext from "../context/context"


const CodeBox = ({ content, lang }) => {
  const languages = content.frontmatter.language_tabs
  const langObjArr = [];
  languages.forEach(function(e,i){
    var temp = {};
    temp.value = e;
    temp.label = e;
    langObjArr.push(temp);
  });

  return (
    <ThemeContext.Consumer>
    {theme => (
      <View>
        <LanguageSelector languages={langObjArr} lang={theme.language} />
      </View>
    )}
    </ThemeContext.Consumer>
  )
}

export default CodeBox

// const View = styled.div`
//   background-color: transparent;
//   bottom: 0;
//   display: block;
//   font-size: 14px;
//   position: absolute;
//   right: 0;
//   top: 8rem;
//   width: 100%;
// `
const View = styled.div`
  background-color: transparent;
  float: right;
  margin-left: auto;
`
