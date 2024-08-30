"use client"

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "@/themes/default";
import { GlobalStyles } from "@/styles/global";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { ButtonsContainer, Cancel, FormContainer, LinkContainer, Main, Submit, Success } from "./styles";
import axios from "axios";
import { BACKEND_URL } from "@/api";

interface clientInfoProps {
  clientName: string;
  clientNumber: string;
}

function formDataToJsonMapper(name:string, number:string){
  let formatedData = {
    name: name,
    number: number,
  }
  return JSON.stringify(formatedData);
}

export default function EditClientComponent( {idClient} : any ){

 const [submitMessage, setSubmitMessage] = useState("");
 const [clientData, setClientData] = useState<{name: string, number: string} | null>(null)

 useEffect(() => {
  async function fetchClientData() {
    try {
      const response = await axios.get(`${BACKEND_URL}/${idClient}`);
      setClientData(response.data);
    } catch (error) {
      console.log("Erro ao buscar dados do cliente:", error);
    }
  }

  fetchClientData();
}, [idClient]);

 async function formHandle(e: any){
  e.preventDefault();

  const nameClient = e.target.name.value || clientData?.name;
  const numberClient = e.target.number.value || clientData?.number;

  const jsonData = formDataToJsonMapper(nameClient, numberClient);
  const configAxios = {headers:{"Content-Type": "application/json"}} 
  
  if(nameClient || numberClient){
    try {
      await axios.put(`${BACKEND_URL}/${idClient}`, jsonData, configAxios)
      setSubmitMessage("Cliente atualizado com sucesso!");
    } catch (error) {
      setSubmitMessage("Erro ao atualizar cliente!");
      console.log(error);
    }
  }
 }

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
        <form onSubmit={async (e) => await formHandle(e)}>
          <div>
            <label>Cliente</label>
              <input type="text" name="name"  defaultValue={clientData?.name || ""} />
          </div>
         
          <div>
            <label>Telefone</label>
              <input type="text" name="number" defaultValue={clientData?.number || ""}/>
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