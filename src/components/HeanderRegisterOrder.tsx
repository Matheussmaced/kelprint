"use client"

import { ThemeProvider } from "styled-components";
import { MainContainer } from "../styles/StylesHeaderCustomerRegistration";
import { defaultTheme } from "../themes/default";
import { GlobalStyles } from "../styles/global";

export default function HeaderRegisterOrder(){
  return(
  <ThemeProvider theme={defaultTheme}>
  <GlobalStyles />  
   <MainContainer>
      <h3>Registrar pedido</h3>
   </MainContainer>
  </ThemeProvider> 
  )
}