"use client"

import { ThemeProvider } from "styled-components";
import { ArrowContainer, LinkContainer, MainContainer } from "../styles/StylesHeaderCustomerRegistration";
import { defaultTheme } from "../themes/default";
import { GlobalStyles } from "../styles/global";
import { ArrowBigLeft } from "lucide-react";

export default function HeaderRegisterOrder(){
  return(
  <ThemeProvider theme={defaultTheme}>
  <GlobalStyles />  
   <MainContainer>
   <LinkContainer href={`javascript:history.back()`}>
      <ArrowContainer>
          <ArrowBigLeft width={16}/>
        </ArrowContainer>
    </LinkContainer>
        <h3>Registrar pedido</h3>
   </MainContainer>
  </ThemeProvider> 
  )
}