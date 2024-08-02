import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { ThemeProvider } from "styled-components";
import { ButtonsContainer, InformationContainerMaster, Main } from "./styles";

interface ClientInfoProps {
  clients: {
    clientName: string;
    clientNumber: string;
    clientId: string;
  }[];
}

export default function ClientList({clients}:ClientInfoProps){

  const formatClientId = (id: string) => {
    return id.length > 4 ? `...${id.slice(-4)}` : id;
  }


  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <>
        {clients.map((client, index) => (
          <Main key={client.clientId}>
            <InformationContainerMaster>
              <span>{index + 1}</span>
              <span>{client.clientName}</span>
              <span>{client.clientNumber}</span>
              <span>{formatClientId(client.clientId)}</span>

              <ButtonsContainer>
                <Link href="#">
                  <button>
                    <Pen size={16} />
                  </button>
                </Link>

                <Link href="#">
                  <button>
                    <Trash2 size={16} />
                  </button>
                </Link>
              </ButtonsContainer>
            </InformationContainerMaster>
          </Main>
        ))}
      </>
    </ThemeProvider>
  )
}