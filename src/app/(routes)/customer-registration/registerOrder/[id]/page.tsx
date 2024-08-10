"use client"

import { ThemeProvider } from "styled-components";
import { ButtonsContainer, Cancel, FormContainer, LinkContainer, Main, Submit, Success } from "./styles";
import { defaultTheme } from "@/themes/default";
import { GlobalStyles } from "@/styles/global";
import { Save } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { useState } from "react";
import { useParams } from "next/navigation";

interface FormDataToJsonMapperProps{
  orderDescription: string,
  amount: string,
  sizes: string,
  kindOfFabric: string,
  typeOfCollar: string,
  comments: string,
  deliveryDate: string
}

function formDataToJsonMapper(data: FormDataToJsonMapperProps):string{
  return JSON.stringify(data);
}

export default function RegisterOrder(){
 const [submitMessage, setSubmitMessage] = useState("");

 async function formHandle(e: any, setMessage: any){
  e.preventDefault();

  const formData: FormDataToJsonMapperProps = {
      orderDescription: e.target.orderDescription.value,
      amount: e.target.amount.value,
      sizes: e.target.sizes.value,
      kindOfFabric: e.target.kindOfFabric.value,
      typeOfCollar: e.target.typeOfCollar.value,
      comments: e.target.comments.value,
      deliveryDate:e.target.deliveryDate.value,
  }


  const jsonData = formDataToJsonMapper(formData);

  const axiosConfig = {headers:{"Content-Type": "application/json"}};


  if(formData.orderDescription &&
    formData.amount &&
    formData.sizes &&
    formData.kindOfFabric &&
    formData.typeOfCollar &&
    formData.comments &&
    formData.deliveryDate){
      try {
        axios.post(`${BACKEND_URL}/${clientId}/order`, jsonData, axiosConfig);
        setMessage("Pedido cadastrado com sucesso!")
      } catch (error) {
        setMessage("Erro ao cadastrar o pedido!")
        console.log(error);
      }
  }
}

 const handlerCancel = () => {
  setSubmitMessage("");
 }

 const params = useParams();
 const clientId = params.id;

  return(
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
    <Main>
      <p>Registrar pedido</p>
      {submitMessage && (
        <Success>
        {submitMessage}
      </Success>
      )}
      
      <FormContainer>
        <form onSubmit={async (e) => await formHandle(e, setSubmitMessage)}>
          <div>
            <label>Descrição do pedido</label>
              <input type="text" name="orderDescription"/>
          </div>
         
          <div>
            <label>Quantidade</label>
              <input type="text" name="amount"/>
          </div>

          <div>
            <label>Tamanhos</label>
              <input type="text" name="sizes"/>
          </div>

          <div>
            <label>Tipo do tecido</label>
              <input type="text" name="kindOfFabric"/>
          </div>

          <div>
            <label>Tipo da gola</label>
              <input type="text" name="typeOfCollar"/>
          </div>

          <div>
            <label>Comentários</label>
              <input type="text" name="comments"/>
          </div>

          <div>
            <label>Dia da entrega</label>
              <input type="text" name="deliveryDate"/>
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