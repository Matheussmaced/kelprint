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

interface clientOrderProps {
  finished: boolean;
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
          // Verifica se há pedidos não finalizados
          const hasUnfinishedOrders = client.clientOrders.some(
            (order) => !order.finished
          );

          // Determina o componente a ser renderizado com base no estado de perigo e nos pedidos
          let ComponentToRender;
          if (dangerClientIds.includes(client.clientId)) {
            ComponentToRender = MainFinishedDanger;
          } else if (hasUnfinishedOrders) {
            ComponentToRender = MainFinishedFalse;
          } else {
            ComponentToRender = Main; // Todos os pedidos estão finalizados
          }

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
                <span>{formatClientId(client.clientId)}</span>

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
