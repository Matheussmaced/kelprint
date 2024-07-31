"use client"

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../../themes/default";
import { GlobalStyles } from "../../../../styles/global";
import { LinkContainer, Main, SearchBarContainer, SearchContainer, TitleContainer } from "./styles";
import { CirclePlus, Search } from "lucide-react";
import Link from "next/link";

export default function CustomerRegistration(){
  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <TitleContainer>
      <p>Pesquisar cadastros</p>
      </TitleContainer>
    
    <Main>
      <SearchContainer>
      <LinkContainer href= "/customer-registration/register">
        <span>
          <CirclePlus size={16} />
          <p>Cadastrar</p>
        </span>
      </LinkContainer>
      <SearchBarContainer>
      <input type="text" />

      <button>
        <Search size={16} />
      </button>
      </SearchBarContainer>
      </SearchContainer>
    </Main>
    </ThemeProvider>
  )
}