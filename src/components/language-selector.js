import React from 'react';
import Select from 'react-select';
//import { navigate } from '@reach/router';
import { navigate } from "gatsby"
import styled from 'styled-components';
import ThemeContext from "../context/context"

const toggleActive = (e) => {
  console.log("change langauge");
}

const LanguageSelector = ({ languages, lang }) => {

  const mapValues = (val) => {
      return val.map(v => ({
        label: v,
        value: v
      }))
  };

  return (
  <ThemeContext.Consumer>
    {theme => (

      <View>
        <Select placeholder="language" onChange={e => theme.changeLanguageFunc(e)} options={mapValues(theme.languageArray)}/>
      </View>
    )}
  </ThemeContext.Consumer>
  )
}

export default LanguageSelector

// const View = styled.div`
//   background-color: white;
//   display: block;
//   position: fixed;
//   width: auto;
//   z-index: 50;
//   right: 24rem;
//   width: 175px;
//   top: 9rem;
// `
const View = styled.div`
  background-color: white;
  width: auto;
  margin-right: 0px;
  font-family: 'openSans' !important;
  width: 175px;
  display: block;
  padding: 7px 21px 7px 7px;
  float: right;
  text-transform: uppercase;
`
