import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { Pen, Trash2 } from "lucide-react";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { useEffect, useState } from "react";
import { Alert, ButtonContainer, Main, Ok } from "./styles";

interface OrderProps {
  orderDescription: string;
  amount: number;
  sizes: string;
  kindOfFabric: string;
  typeOfCollar: string | null;
  comments: string;
  creationTimestamp: string;
  deliveryDate: string | null;
  finished: boolean;
}

interface ClientProps {
  orders: OrderProps[];
}

export default function OrderList({ clientId} :any) {
  const [client, setClient] = useState<ClientProps | null>(null);
  const [ordersClient, setOrdersClient] = useState<OrderProps | null>(null);

  async function getClientInfos() {
    try {
      const response = await axios.get(`${BACKEND_URL}/${clientId}`);
      console.log(response)
      if (response.data) {
        setClient({
          orders: response.data.order,
        });
        
      } else {
        console.error("A resposta da API não está no formato esperado.");
      }
    } catch (error) {
      console.error("Erro ao buscar informações do cliente:", error);
    } 
  }

  useEffect(() => {
    getClientInfos();
  }, [clientId]);

  if (!client || !client.orders) {
    return <div>Loading...</div>;
  }

  const formatterDate = Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Main>
        {client.orders.map((order, index) => (
            order.finished == true ? 
              <Ok key={index}>
                <span>Pedido de número: {index + 1}</span>
                <span>Descrição: {order.comments}</span>
                <span>Quantidade: {order.amount}</span>
                <span>Tamanhos: {order.sizes}</span>
                <span>Tipo de tecido: {order.kindOfFabric}</span>
                <span>Tipo da gola: {order.typeOfCollar}</span>
                <span>Comentário: {order.comments}</span>
                <span>Data do pedido: {formatterDate.format(new Date(order.creationTimestamp))}</span>
                <span>Data de entrega: {order.deliveryDate}</span>
                <span>Andamento do pedido: Finalizado</span>

                <ButtonContainer>
                  <button>
                    <Trash2 width={16} color="white" />
                  </button>
                  <button>
                    <Pen width={16} color="white" />
                  </button>
                </ButtonContainer>
              </Ok>
              :
              <Alert key={index}>
                <span>Pedido de número: {index + 1}</span>
                <span>Descrição: {order.comments}</span>
                <span>Quantidade: {order.amount}</span>
                <span>Tamanhos: {order.sizes}</span>
                <span>Tipo de tecido: {order.kindOfFabric}</span>
                <span>Tipo da gola: {order.typeOfCollar}</span>
                <span>Comentário: {order.comments}</span>
                <span>Data do pedido: {formatterDate.format(new Date(order.creationTimestamp))}</span>
                <span>Data de entrega: {order.deliveryDate}</span>
                <span>Andamento do pedido: em andamento</span>
                <ButtonContainer>
                  <button>
                    <Trash2 width={16} />
                  </button>
                  <button>
                    <Pen width={16} />
                  </button>
                </ButtonContainer>
              </Alert>
        ))}
      </Main>
    </ThemeProvider>
  )
}