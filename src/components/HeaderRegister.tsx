"use client"

import { ThemeProvider } from "styled-components";
import { MainContainer } from "../styles/StylesHeaderCustomerRegistration";
import { defaultTheme } from "../themes/default";
import { GlobalStyles } from "../styles/global";

export default function HeaderRegister(){
  return(
  <ThemeProvider theme={defaultTheme}>
  <GlobalStyles />  
   <MainContainer>
      <h3>Cadastro de clientes</h3>
   </MainContainer>
  </ThemeProvider> 
  )
}