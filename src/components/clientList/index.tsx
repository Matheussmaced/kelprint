import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { Loader, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import { ButtonsContainer, InformationContainerMaster, LinkContainer, Loading, Main, MainFinishedFalse } from "./styles";
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

export default function ClientList({clients:initialClient}:ClientInfoProps){

  const [client, setClient] = useState(initialClient);
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    setClient(initialClient);
  },[initialClient])

  const formatClientId = (id: string) => {
    return id.length > 4 ? `...${id.slice(-4)}` : id;
  }

  const deleteClient = (id: string) => {

    axios.delete(`${BACKEND_URL}/${id}`);

    setClient(client.filter(clients => clients.clientId !== id))
  }

  const editClient = (id: string) => {
    setClientId(id);
  }

  if (!client ||  client.length === 0) {
    return(
      <ThemeProvider theme={defaultTheme}>
        <Loading>
          <Loader width={25} />
          <span>Carregando clientes...</span>
        </Loading>
      </ThemeProvider>
    )
  }
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <>
      {client.map((client, index) => {
          if ((client.clientOrders.map((finish) => finish.finished).includes(false))) {
            return (
              <MainFinishedFalse key={client.clientId}>
                <InformationContainerMaster>
                  <span>{index + 1}</span>
                  <LinkContainer href={`/customer-registration/client/${client.clientId}`}>
                    <span>{client.clientName}</span>
                  </LinkContainer>
                  <span>{client.clientNumber}</span>
                  <span>{formatClientId(client.clientId)}</span>

                  <ButtonsContainer>
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
              </MainFinishedFalse>
            );
          } else {
            return (
              <Main key={client.clientId}>
                <InformationContainerMaster>
                  <span>{index + 1}</span>
                  <LinkContainer href={`/customer-registration/client/${client.clientId}`}>
                    <span>{client.clientName}</span>
                  </LinkContainer>
                  <span>{client.clientNumber}</span>
                  <span>{formatClientId(client.clientId)}</span>
  
                  <ButtonsContainer>
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
              </Main>
            );
          }
          
        })}
      </>
    </ThemeProvider>
  )
}