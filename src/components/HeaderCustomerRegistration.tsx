"use client"

import { ThemeProvider } from "styled-components";

import { defaultTheme } from "../themes/default";
import { GlobalStyles } from "../styles/global";
import { MainContainer } from "@/styles/HeaderCustomerRegistrationStyles";
import { LogIn } from "lucide-react";
import { removeTokenLogin } from "./LogIn";

export default function HeaderCustomerRegistration(){

  return(
  <ThemeProvider theme={defaultTheme}>
  <GlobalStyles />  
   <MainContainer>
      <h3>Registro de clientes</h3>
   
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