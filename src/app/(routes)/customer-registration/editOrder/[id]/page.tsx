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
  totalValue: string,
  valuePerUnit: string,
  sizes: string,
  kindOfFabric: string,
  typeOfCollar: string,
  comments: string,
  deliveryDate: string,
  paymentType: string,
  inputValue: string
}

function formDataToJsonMapper(data: Partial<FormDataToJsonMapperProps>): string {
  return JSON.stringify(data);
}

export default function EditClientOrder() {
  const [submitMessage, setSubmitMessage] = useState("");
  const [orderData, setOrderData] = useState<FormDataToJsonMapperProps | null>(null);

  const params = useParams();
  const clientId = params.id;

  console.log(clientId, "order id")

  useEffect(() => {
    async function loadOrderData() {
      try {
        const response = await axios.get(`${BACKEND_URL}/${clientId}/order`);
        setOrderData(response.data);
      } catch (error) {
        console.error("Erro ao carregar os dados do pedido:", error);
      }
    }

    loadOrderData();
  }, [clientId]);

  async function formHandle(e: any) {
    e.preventDefault();

    const formData: Partial<FormDataToJsonMapperProps> = {
      orderDescription: e.target.orderDescription.value || orderData?.orderDescription,
      amount: e.target.amount.value || orderData?.amount,
      sizes: e.target.sizes.value || orderData?.sizes,
      kindOfFabric: e.target.kindOfFabric.value || orderData?.kindOfFabric,
      typeOfCollar: e.target.typeOfCollar.value || orderData?.typeOfCollar,
      comments: e.target.comments.value || orderData?.comments,
      deliveryDate: e.target.deliveryDate.value || orderData?.deliveryDate,
      totalValue: e.target.totalValue.value || orderData?.totalValue,
      valuePerUnit: e.target.valuePerUnit.value || orderData?.valuePerUnit,
      inputValue: e.target.inputValue.value || orderData?.inputValue,
      paymentType: e.target.paymentType.value || orderData?.paymentType,
    };

    const jsonData = formDataToJsonMapper(formData);
    const axiosConfig = { headers: { "Content-Type": "application/json" } };

    try {
      await axios.put(`${BACKEND_URL}/${clientId}/order`, jsonData, axiosConfig);
      setSubmitMessage("Pedido atualizado com sucesso!");
    } catch (error) {
      setSubmitMessage("Erro ao atualizar o pedido!");
      console.error(error);
    }

    setOrderData(formData as FormDataToJsonMapperProps);
  }

  const handlerCancel = () => {
    setSubmitMessage("");
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Main>
        <p>Informações do pedido do cliente</p>
        {submitMessage && (
          <Success>
            {submitMessage}
          </Success>
        )}

        <FormContainer>
          <form onSubmit={formHandle}>
            <div>
              <label>Descrição do pedido</label>
              <input type="text" name="orderDescription" defaultValue={orderData?.orderDescription || ""} />
            </div>

            <div>
              <label>Valor por unidade</label>
              <input type="text" name="valuePerUnit" defaultValue={orderData?.valuePerUnit || ""} />
            </div>

            <div>
              <label>Valor total</label>
              <input type="text" name="totalValue" defaultValue={orderData?.totalValue || ""} />
            </div>

            <div>
              <label>Entrada</label>
              <input type="text" name="inputValue" defaultValue={orderData?.inputValue || ""}/>
            </div>

            <div>
              <label>Tipo de pagamento</label>
              <input type="text" name="paymentType" defaultValue={orderData?.paymentType || ""}/>
            </div>

            <div>
              <label>Quantidade</label>
              <input type="text" name="amount" defaultValue={orderData?.amount || ""} />
            </div>

            <div>
              <label>Tamanhos</label>
              <input type="text" name="sizes" defaultValue={orderData?.sizes || ""} />
            </div>

            <div>
              <label>Tipo do tecido</label>
              <input type="text" name="kindOfFabric" defaultValue={orderData?.kindOfFabric || ""} />
            </div>

            <div>
              <label>Tipo da gola</label>
              <input type="text" name="typeOfCollar" defaultValue={orderData?.typeOfCollar || ""} />
            </div>

            <div>
            <label>Comentários</label>
              <textarea
                defaultValue={orderData?.comments || ""}
                name="comments"
                rows={4}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                  }
                }}
              />
            </div>

            <div>
              <label>Dia da entrega</label>
              <input type="text" name="deliveryDate" defaultValue={orderData?.deliveryDate || ""} />
            </div>

            <ButtonsContainer>
              <Submit type="submit">
                <Save size={16} />
                <p>Salvar</p>
              </Submit>

              <LinkContainer href="/customer-registration" onClick={handlerCancel}>
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
