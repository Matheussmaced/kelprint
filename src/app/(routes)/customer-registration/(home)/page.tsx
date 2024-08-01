"use client"

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../../themes/default";
import { GlobalStyles } from "../../../../styles/global";
import { LinkContainer, Main, SearchBarContainer, SearchContainer, TitleContainer } from "./styles";
import { CirclePlus, Search } from "lucide-react";
import Link from "next/link";
import ClientList from "@/components/clientList";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { useEffect, useState } from "react";

interface clientInfoProps {
  clientName: string;
  clientNumber: string;
  clientId: string;
}

export default function CustomerRegistration() {
  const [clientInfo, setClientInfo] = useState<clientInfoProps[]>([]);

  async function getClientInfos() {
    try {
      const response = await axios.get(BACKEND_URL);
      
      if (response.data && Array.isArray(response.data)) {
        const clients = response.data.map((client: any) => ({
          clientId: client.clientId,
          clientName: client.name,
          clientNumber: client.number,
        }));

        setClientInfo(clients);
      } else {
        console.error("A resposta da API não está no formato esperado.");
      }
    } catch (error) {
      console.error("Erro ao buscar informações dos clientes:", error);
    }
  }

  useEffect(() => {
    getClientInfos();
  }, []);

  console.log(clientInfo);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />

      <TitleContainer>
        <p>Pesquisar cadastros</p>
      </TitleContainer>

      <Main>
        <SearchContainer>
          <LinkContainer href="/customer-registration/register">
            <span>
              <CirclePlus size={16} />
              <p>Cadastrar</p>
            </span>
          </LinkContainer>
          <SearchBarContainer>
            <input type="text" />
            <button>
              <Search size={16} />
            </button>
          </SearchBarContainer>
        </SearchContainer>

        <ClientList clients={clientInfo} />
      </Main>
    </ThemeProvider>
  );
}
