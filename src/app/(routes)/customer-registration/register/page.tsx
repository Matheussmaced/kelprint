"use client"

import { ThemeProvider } from "styled-components";
import { ButtonsContainer, Cancel, FormContainer, LinkContainer, Main, Submit } from "./styles";
import { defaultTheme } from "@/themes/default";
import { GlobalStyles } from "@/styles/global";
import { Save } from "lucide-react";


export default function Register(){
  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
    <Main>
      <p>Registrar usuario</p>

      <FormContainer>
        <form>
          <div>
            <label>Cliente</label>
              <input type="text"/>
          </div>
         
          <div>
            <label>Telefone</label>
              <input type="text"/>
          </div>

      <ButtonsContainer>
        <Submit>
          <Save size={16} />
          <p>Salvar</p>
        </Submit>

        <LinkContainer href="/customer-registration">
        <Cancel>
          <Save size={16} />
          <p>Cancelar</p>
        </Cancel>
        </LinkContainer>
      </ButtonsContainer>
        </form>
      </FormContainer>
    </Main>
    </ThemeProvider>
  )
}