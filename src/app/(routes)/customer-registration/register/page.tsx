"use client"

import { ThemeProvider } from "styled-components";
import { ButtonsContainer, Cancel, FormContainer, LinkContainer, Main, Submit } from "./styles";
import { defaultTheme } from "@/themes/default";
import { GlobalStyles } from "@/styles/global";
import { Save } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/api";



export default function Register(){

  function formDataToJsonMapper(name:string, number:string){
    let formatedData = {
      name: name,
      number: number,
    }

    return JSON.stringify(formatedData);
  }

 async function formHandle(e:any){
  e.preventDefault();

  const nameClient = e.target.name.value;
  const numberClient = e.target.number.value;

  const jsonData = formDataToJsonMapper(nameClient, numberClient);

  const axiosConfig = {headers:{"Content-Type": "application/json"}};

  axios.post(BACKEND_URL, jsonData, axiosConfig);
 }

  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
    <Main>
      <p>Registrar usuario</p>

      <FormContainer>
        <form onSubmit={async (e) => await formHandle(e)}>
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