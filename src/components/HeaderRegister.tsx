"use client"

import { ThemeProvider } from "styled-components";
import { ArrowContainer, LinkContainer, MainContainer } from "../styles/StylesHeaderCustomerRegistration";
import { defaultTheme } from "../themes/default";
import { GlobalStyles } from "../styles/global";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";
import { BACKEND_URL } from "@/api";

export default function HeaderRegister(){
  return(
  <ThemeProvider theme={defaultTheme}>
  <GlobalStyles />  
   <MainContainer>
    <LinkContainer href={`/customer-registration`}>
      <ArrowContainer>
          <ArrowBigLeft width={16}/>
        </ArrowContainer>
    </LinkContainer>
      <h3>Cadastro de clientes</h3>
   </MainContainer>
  </ThemeProvider> 
  )
}