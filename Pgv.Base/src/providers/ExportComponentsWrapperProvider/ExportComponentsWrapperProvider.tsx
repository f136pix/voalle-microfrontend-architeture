import React from "react"
import { ThemeProvider } from "pgv-lib/ui/themes"
import { SnackbarProvider } from "pgv-lib/ui/snackbar"
import "pgv-lib/ui/themes/base.css"
import "pgv-lib/ui/themes/dayjsLocales.js"
import i18n from "lib/i18n"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

export const ExportComponentsWrapperProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={i18n.language}
    >
      <ThemeProvider i18nLang={i18n.language}>
        <SnackbarProvider maxSnack={5} />
        {children}
      </ThemeProvider>
    </LocalizationProvider>
  )
}
