"use client"

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../themes/default";
import { GlobalStyles } from "../../../styles/global";
import { Main } from "./styles";

export default function CustomerRegistration(){
  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
    <Main>
      <h1>Registro de cliente</h1>
    </Main>
    </ThemeProvider>
  )
}