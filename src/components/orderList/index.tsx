import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { Check, CircleSlash2, FileText, Loader, Pen, Scissors, Trash2 } from "lucide-react";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { useEffect, useState } from "react";
import { Alert, ButtonContainer, DocButton, EditButtons, Main, Ok, OkButton, OkButtonRed, PenButton, TrashButton } from "./styles";
import Link from "next/link";
import { Loading } from "../clientList/styles";

interface OrderProps {
  id: string,
  orderDescription: string;
  amount: number;
  totalValue: string,
  valuePerUnit: string,
  sizes: string;
  kindOfFabric: string;
  typeOfCollar: string ;
  comments: string;
  creationTimestamp: string;
  deliveryDate: string ;
  finished: boolean;
}

interface ClientProps {
  orders: OrderProps[];
}

export default function OrderList({ clientId, searchValue} : any) {
  const [client, setClient] = useState<ClientProps | null>(null);
  const [filteredOrders, setFilteredOrders] = useState<OrderProps[]>([]);
  
  async function getClientInfos() {
    try {
      const response = await axios.get(`${BACKEND_URL}/${clientId}`);
      if (response.data) {
        setClient({ orders: response.data.order });
        setFilteredOrders(response.data.order);
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

  useEffect(() => {
    if (client && searchValue) {
      const filtered = client.orders.filter(order =>
        order.orderDescription.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.kindOfFabric.toLowerCase().includes(searchValue.toLowerCase()) ||
        order.sizes.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else if (client) {
      setFilteredOrders(client.orders);
    }
  }, [searchValue, client]);

  if (!client || !client.orders) {
    return(
      <ThemeProvider theme={defaultTheme}>
        <Loading>
          <Loader width={25} />
          <span>Carregando pedidos...</span>
        </Loading>
      </ThemeProvider>
    )
  }

  const formatterDate = Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  });

  const deleteOrder = (id: string) => {
    axios.delete(`${BACKEND_URL}/${id}/order`);
    setFilteredOrders(filteredOrders.filter(order => order.id !== id));
  };

  const checkOrder = (id: string, condition: boolean) => {
    try {
      axios.put(`${BACKEND_URL}/${id}/order`, {"finished": condition})

      setFilteredOrders(prevOrders => 
        prevOrders.map(order =>
          order.id === id ? {...order, finished: condition} : order
        )
      )
    } catch (error) {
      console.error("Erro ao atualizar o status do pedido", error);
    }

  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Main>
        {filteredOrders.map((order, index) => (
          order.finished ? 
            <Ok key={index}>
              <span>Pedido de número: {index + 1}</span>
              <span>Descrição: {order.orderDescription}</span>
              <span>Valor por unidade: {order.valuePerUnit} </span>
              <span>Valor total: {order.totalValue} </span>
              <span>Quantidade: {order.amount}</span>
              <span>Tamanhos: {order.sizes}</span>
              <span>Tipo de tecido: {order.kindOfFabric}</span>
              <span>Tipo da gola: {order.typeOfCollar}</span>
              <span>Comentário: {order.comments}</span>
              <span>Data do pedido: {formatterDate.format(new Date(order.creationTimestamp))}</span>
              <span>Data de entrega: {order.deliveryDate}</span>
              <span>Andamento do pedido: Finalizado</span>

              <ButtonContainer>
                <EditButtons>
                  <TrashButton onClick={() => deleteOrder(order.id)}>
                    <Trash2 width={16} />
                  </TrashButton>
                  <Link href={`/customer-registration/editOrder/${order.id}`}>
                    <PenButton>
                      <Pen width={16} />
                    </PenButton>
                  </Link>
                  <Link href={`/customer-registration/invoice/${order.id}`}>
                    <DocButton>
                      <FileText width={19} />
                    </DocButton>
                  </Link>
                  <Link href={`/customer-registration/production/${order.id}`}>
                    <DocButton>
                      <Scissors width={19} />
                    </DocButton>
                  </Link>
                </EditButtons>
                  <OkButtonRed onClick={() => checkOrder(order.id, false)}>
                    <CircleSlash2 width={16}/>
                  </OkButtonRed>
              </ButtonContainer>
            </Ok>
          :
            <Alert key={index}>
              <span>Pedido de número: {index + 1}</span>
              <span>Descrição: {order.orderDescription}</span>
              <span>Valor por unidade: {order.valuePerUnit} </span>
              <span>Valor total: {order.totalValue} </span>
              <span>Quantidade: {order.amount}</span>
              <span>Tamanhos: {order.sizes}</span>
              <span>Tipo de tecido: {order.kindOfFabric}</span>
              <span>Tipo da gola: {order.typeOfCollar}</span>
              <span>Comentário: {order.comments}</span>
              <span>Data do pedido: {formatterDate.format(new Date(order.creationTimestamp))}</span>
              <span>Data de entrega: {order.deliveryDate}</span>
              <span>Andamento do pedido: em andamento</span>
              <ButtonContainer>
                <EditButtons>
                  <TrashButton onClick={() => deleteOrder(order.id)}>
                    <Trash2 width={16} />
                  </TrashButton>
                  <Link href={`/customer-registration/editOrder/${order.id}`}>
                    <PenButton>
                      <Pen width={16} />
                    </PenButton>
                  </Link>
                  <Link href={`/customer-registration/invoice/${order.id}`}>
                    <DocButton>
                      <FileText width={19} />
                    </DocButton>
                  </Link>
                </EditButtons>
                  <OkButton onClick={() => checkOrder(order.id, true)}>
                    <Check width={16}/>
                  </OkButton>
              </ButtonContainer>
            </Alert>
        ))}
      </Main>
    </ThemeProvider>
  )
}
