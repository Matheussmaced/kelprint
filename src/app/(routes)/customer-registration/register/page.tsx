"use client"

import { ThemeProvider } from "styled-components";
import { ButtonsContainer, Cancel, FormContainer, LinkContainer, Main, Submit } from "./styles";
import { defaultTheme } from "@/themes/default";
import { GlobalStyles } from "@/styles/global";
import { Save } from "lucide-react";


export default function Register(){

 function formHandle(e:any){
  e.preventDefault();

  const nameClient = e.target.name.value;
  const numberClient = e.target.number.value;

  console.log(nameClient, numberClient);
 }

  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
    <Main>
      <p>Registrar usuario</p>

      <FormContainer>
        <form onSubmit={function(e){formHandle(e)}}>
          <div>
            <label>Cliente</label>
              <input type="text" name="name"/>
          </div>
         
          <div>
            <label>Telefone</label>
              <input type="text" name="number"/>
          </div>

      <ButtonsContainer>
        <Submit type="submit">
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