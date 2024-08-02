"use client"

import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../../../../themes/default";
import { GlobalStyles } from "../../../../styles/global";
import { Main, TitleContainer } from "./styles";
import ClientList from "@/components/clientList";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { useEffect, useState } from "react";
import SearchBar from "@/components/searchBar";

interface clientInfoProps {
  clientName: string;
  clientNumber: string;
  clientId: string;
}

export default function CustomerRegistration() {
  const [clientInfo, setClientInfo] = useState<clientInfoProps[]>([]);
  const [filteredClient, setFilteredClient] = useState<clientInfoProps[]>([]);
  const [searchValue, setSearchValue] = useState("");

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
        setFilteredClient(clients);
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

  useEffect(() => {
    const filtered = clientInfo.filter((client) =>
      client.clientName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredClient(filtered);
  }, [searchValue, clientInfo]);

  console.log(clientInfo);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <TitleContainer>
        <p>Pesquisar cadastros</p>
      </TitleContainer>
      <Main>
      <SearchBar onSearch={setSearchValue} />
      <ClientList clients={filteredClient} />
      </Main>
    </ThemeProvider>
  );
}
