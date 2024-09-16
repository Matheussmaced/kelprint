import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { Loader, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import {
  ButtonsContainer,
  InformationContainerMaster,
  LinkContainer,
  Loading,
  Main,
  MainFinishedFalse,
  MainFinishedDanger,
  TrashButton,
  PenButton
} from "./styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { format, isToday } from "date-fns"; // Importando função isToday
import { BACKEND_URL } from "@/api";

interface clientOrderProps {
  finished: boolean;
  deliveryDate: string;
}
interface ClientInfoProps {
  clients: {
    clientName: string;
    clientNumber: string;
    clientId: string;
    clientOrders: clientOrderProps[];
  }[];
}

export default function ClientList({ clients: initialClient }: ClientInfoProps) {
  const [client, setClient] = useState(initialClient);
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    setClient(initialClient);
  }, [initialClient]);

  const formatClientId = (id: string) => {
    return id.length > 4 ? `...${id.slice(-4)}` : id;
  };

  const convertToDate = (dateString: string) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const getClosestDeliveryDate = (orders: clientOrderProps[]) => {
    const today = new Date();
    const upcomingDates = orders
      .map(order => convertToDate(order.deliveryDate))
      .filter(date => date >= today);

    if (upcomingDates.length === 0) {
      return null;
    }

    const closestDate = new Date(
      Math.min(...upcomingDates.map(date => date.getTime()))
    );

    return format(closestDate, "dd/MM/yyyy");
  };

  const hasLateOrders = (orders: clientOrderProps[]) => {
    const today = new Date();
    return orders.some(order => !order.finished && convertToDate(order.deliveryDate) < today);
  };

  const hasOrdersForToday = (orders: clientOrderProps[]) => {
    return orders.some(order => isToday(convertToDate(order.deliveryDate)) && !order.finished);
  };

  const deleteClient = (id: string) => {
    const isConfirmed = window.confirm("Tem certeza que deseja excluir este cliente?");
    if (isConfirmed) {
      axios.delete(`${BACKEND_URL}/${id}`);
      setClient(client.filter((clients) => clients.clientId !== id));
    }
  };

  const editClient = (id: string) => {
    setClientId(id);
  };

  if (!client || client.length === 0) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Loading>
          <Loader width={25} />
          <span>Carregando clientes...</span>
        </Loading>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <>
        {client.map((client, index) => {
          const hasUnfinishedOrders = client.clientOrders.some(
            (order) => !order.finished
          );
          const allOrdersFinished = client.clientOrders.every(
            (order) => order.finished
          );
          const hasLateOrder = hasLateOrders(client.clientOrders);
          const hasOrderForToday = hasOrdersForToday(client.clientOrders); // Verifica pedidos para hoje

          let ComponentToRender;
          if (hasLateOrder || hasOrderForToday) {
            ComponentToRender = MainFinishedDanger;
          } else if (hasUnfinishedOrders) {
            ComponentToRender = MainFinishedFalse;
          } else {
            ComponentToRender = Main;
          }

          const closestDeliveryDate = getClosestDeliveryDate(client.clientOrders);

          return (
            <ComponentToRender key={client.clientId}>
              <InformationContainerMaster>
                <span>{index + 1}</span>
                <LinkContainer
                  href={`/customer-registration/client/${client.clientId}`}
                >
                  <span>{client.clientName}</span>
                </LinkContainer>
                <span>{client.clientNumber}</span>
                <span>
                  {
                    hasOrderForToday 
                      ? "Há pedido para hoje"  // Exibe se houver pedidos para hoje
                      : hasLateOrder 
                        ? "Há pedidos atrasados"  // Exibe se houver pedidos atrasados
                        : allOrdersFinished 
                          ? "Nenhum pedido pendente"  // Exibe se todos os pedidos estiverem finalizados
                          : closestDeliveryDate || "Nenhuma data futura"  // Exibe a data mais próxima se houver pedidos pendentes
                  }
                </span>

                <ButtonsContainer>
                  <Link href={`/customer-registration/editClient/${client.clientId}`}>
                    <PenButton>
                      <Pen size={20} onClick={() => editClient(client.clientId)} />
                    </PenButton>
                  </Link>
                  <TrashButton onClick={() => deleteClient(client.clientId)}>
                    <Trash2 size={20} />
                  </TrashButton>
                </ButtonsContainer>
              </InformationContainerMaster>
            </ComponentToRender>
          );
        })}
      </>
    </ThemeProvider>
  );
}
