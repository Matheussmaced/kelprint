import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { Loader, Pen, TrafficCone, Trash2 } from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import {
  ButtonsContainer,
  InformationContainerMaster,
  LinkContainer,
  Loading,
  Main,
  MainFinishedFalse,
  MainFinishedDanger
} from "./styles";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface clientOrderProps {
  finished: boolean;
  deliveryDate: string; // Adicionei a data de entrega
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
  const [dangerClientIds, setDangerClientIds] = useState<string[]>([]); // Array para armazenar os clientIds perigosos

  useEffect(() => {
    setClient(initialClient);
  }, [initialClient]);

  useEffect(() => {
    // Recupera os dangerClientIds do localStorage ao montar o componente
    const storedDangerClientIds = localStorage.getItem("dangerClientIds");
    if (storedDangerClientIds) {
      setDangerClientIds(JSON.parse(storedDangerClientIds));
    }
  }, []);

  useEffect(() => {
    // Armazena os dangerClientIds no localStorage sempre que eles mudarem
    if (dangerClientIds.length > 0) {
      localStorage.setItem("dangerClientIds", JSON.stringify(dangerClientIds));
    } else {
      localStorage.removeItem("dangerClientIds");
    }
  }, [dangerClientIds]);

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

  const deleteClient = (id: string) => {
    axios.delete(`${BACKEND_URL}/${id}`);
    setClient(client.filter((clients) => clients.clientId !== id));
  };

  const editClient = (id: string) => {
    setClientId(id);
  };

  const toggleDanger = (id: string) => {
    // Alterna o estado de perigo para o clientId específico
    if (dangerClientIds.includes(id)) {
      setDangerClientIds(dangerClientIds.filter((dangerId) => dangerId !== id)); // Remove se já estiver em perigo
    } else {
      setDangerClientIds([...dangerClientIds, id]); // Adiciona o clientId ao array de IDs perigosos
    }
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

          let ComponentToRender;
          if (dangerClientIds.includes(client.clientId)) {
            ComponentToRender = MainFinishedDanger;
          } else if (hasUnfinishedOrders) {
            ComponentToRender = MainFinishedFalse;
          } else {
            ComponentToRender = Main; // Todos os pedidos estão finalizados
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
                    hasLateOrder 
                      ? "Há pedidos atrasados"  // Exibe se houver pedidos atrasados
                      : allOrdersFinished 
                        ? "Nenhum pedido pendente"  // Exibe se todos os pedidos estiverem finalizados
                        : closestDeliveryDate || "Nenhuma data futura"  // Exibe a data mais próxima se houver pedidos pendentes
                  }
                </span>

                <ButtonsContainer>
                  <button onClick={() => toggleDanger(client.clientId)}>
                    <TrafficCone size={18} />
                  </button>
                  <Link href={`/customer-registration/editClient/${client.clientId}`}>
                    <button>
                      <Pen size={16} onClick={() => editClient(client.clientId)} />
                    </button>
                  </Link>
                  <button onClick={() => deleteClient(client.clientId)}>
                    <Trash2 size={16} />
                  </button>
                </ButtonsContainer>
              </InformationContainerMaster>
            </ComponentToRender>
          );
        })}
      </>
    </ThemeProvider>
  );
}
