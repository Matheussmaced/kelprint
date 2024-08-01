"use client"

import { ThemeProvider } from "styled-components";
import { ButtonsContainer, Cancel, FormContainer, LinkContainer, Main, Submit, Success } from "./styles";
import { defaultTheme } from "@/themes/default";
import { GlobalStyles } from "@/styles/global";
import { Save } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { useState } from "react";

function formDataToJsonMapper(name:string, number:string){
  let formatedData = {
    name: name,
    number: number,
  }

  return JSON.stringify(formatedData);
}

function nameError() {
  return alert("Nome de cliente obrigatório");
}

function numberError() {
  return alert("Número de cliente obrigatório");
}

async function formHandle(e: any, setMessage: any){
  e.preventDefault();

  const nameClient = e.target.name.value;
  const numberClient = e.target.number.value;

  const jsonData = formDataToJsonMapper(nameClient, numberClient);

  const axiosConfig = {headers:{"Content-Type": "application/json"}};

  if(nameClient == ""){
    nameError();
  }
  if (numberClient == ""){
    numberError();
  }

  if(nameClient !== "" && numberClient !== ""){
    try {
      axios.post(BACKEND_URL, jsonData, axiosConfig);
      setMessage("Cliente cadastrado com sucesso!")
    } catch (error) {
      setMessage("Erro ao cadastrar o cliente!")
      console.log(error);
    }
  }
}

export default function Register(){

 const [submitMessage, setSubmitMessage] = useState("");

 const handlerCancel = () => {
  setSubmitMessage("");
 }

  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
    <Main>
      <p>Registrar usuario</p>
      {submitMessage && (
        <Success>
        {submitMessage}
      </Success>
      )}
      
      <FormContainer>
        <form onSubmit={async (e) => await formHandle(e, setSubmitMessage)}>
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

        <LinkContainer href="/customer-registration" onSubmit={handlerCancel}>
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