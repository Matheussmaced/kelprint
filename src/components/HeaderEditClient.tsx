"use client"

import { ThemeProvider } from "styled-components";
import { ArrowContainer, LinkContainer, MainContainer } from "../styles/StylesHeaderCustomerRegistration";
import { defaultTheme } from "../themes/default";
import { GlobalStyles } from "../styles/global";
import { ArrowBigLeft } from "lucide-react";

export default function HeaderEditClient(){
  return(
  <ThemeProvider theme={defaultTheme}>
  <GlobalStyles />  
   <MainContainer>
    <LinkContainer href={`/customer-registration`}>
        <ArrowContainer>
            <ArrowBigLeft width={16}/>
          </ArrowContainer>
      </LinkContainer>
      <h3>Editar cliente</h3>
   </MainContainer>
  </ThemeProvider> 
  )
}