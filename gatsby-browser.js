/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
//import React from "react"
//import '../components/index.module.css'

const React = require('react')
require('./src/components/index.module.css')
const { ThemeProvider } = require("./src/context/ThemeContextProvider")
require('prismjs/themes/prism-okaidia.css')
require('./src/styles/custom-code-buttons.css')

// exports.shouldUpdateScroll = args => {
//   console.log("updating scroll")
//   console.log(args)
//     return false;
// };
//
// exports.onClientEntry = () => {
//   console.log("We've started!")
// };
//
// exports.onPostPrefetchPathname = args  => {
//   console.log("onPostPrefetchPathname")
//   console.log(args)
//   var p=window.location.hash;
//   console.log(p)
//   window.location.href=p
// };
