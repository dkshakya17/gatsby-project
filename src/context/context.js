import React from "react";

const defaultState = {
  dark: 12,
  language: "php",
  languageArray: ["php", "python", "java", "node"],
  changeLanguage: (e) => {
    console.log("update language to ")
    console.log(e)
    this.language = e
  }
  // updateLanguage: (e) => {
  //   console.log("update language to " + e)
  //   this.language = e
  // }
  // languageDefault: ["php", "python"],
  // toggleDark: () => {},
}

const ThemeContext = React.createContext(defaultState)
export default ThemeContext
// Getting dark mode information from OS!
