"use client"

import { ThemeProvider } from "styled-components";
import { ButtonsContainer, Cancel, FormContainer, LinkContainer, Main, Submit, Success } from "./styles";
import { defaultTheme } from "@/themes/default";
import { GlobalStyles } from "@/styles/global";
import { Save } from "lucide-react";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface FormDataToJsonMapperProps {
  orderDescription: string,
  amount: string,
  sizes: string,
  kindOfFabric: string,
  typeOfCollar: string,
  comments: string,
  deliveryDate: string
}

function formDataToJsonMapper(data: Partial<FormDataToJsonMapperProps>): string {
  return JSON.stringify(data);
}

export default function EditOrder() {
  const [submitMessage, setSubmitMessage] = useState("");
  const [informations, setInformations] = useState<FormDataToJsonMapperProps | null>(null);

  const params = useParams();
  const orderId = params.id;

  useEffect(() => {
    // Carregar os dados existentes do pedido
    async function loadOrderData() {
      try {
        const response = await axios.get(`${BACKEND_URL}/${orderId}/order`);
        setInformations(response.data);
      } catch (error) {
        console.error("Erro ao carregar os dados do pedido:", error);
      }
    }

    loadOrderData();
  }, [orderId]);

  async function formHandle(e: any) {
    e.preventDefault();

    const formData: Partial<FormDataToJsonMapperProps> = {
      orderDescription: e.target.orderDescription.value || informations?.orderDescription,
      amount: e.target.amount.value || informations?.amount,
      sizes: e.target.sizes.value || informations?.sizes,
      kindOfFabric: e.target.kindOfFabric.value || informations?.kindOfFabric,
      typeOfCollar: e.target.typeOfCollar.value || informations?.typeOfCollar,
      comments: e.target.comments.value || informations?.comments,
      deliveryDate: e.target.deliveryDate.value || informations?.deliveryDate,
    };

    const jsonData = formDataToJsonMapper(formData);
    const axiosConfig = { headers: { "Content-Type": "application/json" } };

    try {
      await axios.put(`${BACKEND_URL}/${orderId}/order`, jsonData, axiosConfig);
      setSubmitMessage("Pedido atualizado com sucesso!");
    } catch (error) {
      setSubmitMessage("Erro ao atualizar o pedido!");
      console.error(error);
    }

    setInformations(formData as FormDataToJsonMapperProps);
  }

  const handlerCancel = () => {
    setSubmitMessage("");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Main>
        <p>Informações do pedido</p>
        {submitMessage && (
          <Success>
            {submitMessage}
          </Success>
        )}

        <FormContainer>
          <form onSubmit={async (e) => await formHandle(e)}>
            <div>
              <label>Descrição do pedido</label>
              <input type="text" name="orderDescription" defaultValue={informations?.orderDescription || ""} />
            </div>

            <div>
              <label>Quantidade</label>
              <input type="text" name="amount" defaultValue={informations?.amount || ""} />
            </div>

            <div>
              <label>Tamanhos</label>
              <input type="text" name="sizes" defaultValue={informations?.sizes || ""} />
            </div>

            <div>
              <label>Tipo do tecido</label>
              <input type="text" name="kindOfFabric" defaultValue={informations?.kindOfFabric || ""} />
            </div>

            <div>
              <label>Tipo da gola</label>
              <input type="text" name="typeOfCollar" defaultValue={informations?.typeOfCollar || ""} />
            </div>

            <div>
              <label>Comentários</label>
              <input type="text" name="comments" defaultValue={informations?.comments || ""} />
            </div>

            <div>
              <label>Dia da entrega</label>
              <input type="text" name="deliveryDate" defaultValue={informations?.deliveryDate || ""} />
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
