import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./lib/i18n.ts"
import "pgv-lib/ui/themes/base.css"
import "pgv-lib/ui/themes/dayjsLocales.js"
import { ThemeProvider } from "pgv-lib/ui/themes"
import { SnackbarProvider } from "pgv-lib/ui/snackbar"
import { BrowserRouter } from "react-router-dom"
import i18n from "./lib/i18n"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

const Main = () => {
  return (
    <React.Fragment>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={i18n.language}
      >
        <ThemeProvider i18nLang={i18n.language}>
          <SnackbarProvider maxSnack={5} />
          <App />
        </ThemeProvider>
      </LocalizationProvider>
    </React.Fragment>
  )
}

const Dev = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Dev />)

export default Main
