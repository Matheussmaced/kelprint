"use client"

import { ThemeProvider } from "styled-components";
import { ArrowContainer, LinkContainer, MainContainer } from "../styles/GlobalHeaderStyles";
import { defaultTheme } from "../themes/default";
import { GlobalStyles } from "../styles/global";
import { ArrowBigLeft, LogIn } from "lucide-react";
import { removeTokenLogin } from "./logInFunction";

export default function HeaderOrder(){
  return(
  <ThemeProvider theme={defaultTheme}>
  <GlobalStyles />  
   <MainContainer>
    <LinkContainer href={`/customer-registration`}>
        <ArrowContainer>
            <ArrowBigLeft width={16}/>
          </ArrowContainer>
      </LinkContainer>
      <h3>Pedidos</h3>

      <a href="/" onClick={() => removeTokenLogin()}>
        <button >
          Sair
          <LogIn width={16} />
        </button> 
      </a>
   </MainContainer>
  </ThemeProvider> 
  )
}