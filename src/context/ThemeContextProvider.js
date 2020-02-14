import React from "react"
import ThemeContext from "./context"

// Getting dark mode information from OS!
// You need macOS Mojave + Safari Technology Preview Release 68 to test this currently.
const supportsDarkMode = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches === true

class ThemeProvider extends React.Component {
  state = {
    dark: 14,
    language: "php",
    languageArray: ["php", "python", "java", "node"],
  }

  toggleDark = () => {
    let dark = !this.state.dark
    localStorage.setItem("dark", JSON.stringify(dark))
    this.setState({ dark })
  }

  changeLanguage = (e) => {
    console.log("changing language")
    console.log(e)
    let language = this.state.language
    localStorage.setItem("language", JSON.stringify(language))
    this.setState({language: e.value})
  }

  componentDidMount() {
    // Getting dark mode value from localStorage!
    console.log("component did mount")
    const lsDark = JSON.parse(localStorage.getItem("dark"))
    //TODO why does this throw a null error?
    //const languagePref = JSON.parse(localStorage.getItem("language"))


    if (lsDark) {
      this.setState({ dark: lsDark })
    } else if (supportsDarkMode()) {
      this.setState({ dark: true })
    }
    this.setState({language: "php"})
    //console.log(this.state.language)
  }

  render() {
    const { children } = this.props
    const dark = this.state.dark
    const language  = this.state.language
    const languageArray = this.state.languageArray
    const changeLanguageFunc = this.changeLanguage

    return (
      <ThemeContext.Provider
        value={{
          dark,
          language,
          languageArray,
          changeLanguageFunc

          // toggleDark: this.toggleDark,
          // changeLanguage: this.changeLanguage,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export { ThemeProvider }
