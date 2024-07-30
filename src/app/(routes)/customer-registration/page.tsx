"use client"

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../themes/default";
import { GlobalStyles } from "../../../styles/global";
import { Main, SearchBarContainer, SearchContainer, TitleContainer } from "./styles";
import { CirclePlus, Search } from "lucide-react";

export default function CustomerRegistration(){
  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <TitleContainer>
      <p>Pesquisar cadastros</p>
      </TitleContainer>
    
    <Main>
      <SearchContainer>
      <span>
        <CirclePlus size={16} />
        <p>Cadastrar</p>
      </span>
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