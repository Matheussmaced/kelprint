"use client";

import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { useParams } from "next/navigation";
import { ThemeProvider } from "styled-components";

import { Download, Minus, Plus } from "lucide-react";

import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { ButtonDownload, ButtonsAddContainers, ContainerDataClient, MainContainer, MinusButton, PlusButton } from "./styles";

interface Order {
  id: string;
  orderDescription: string;
  totalValue: string;
  valuePerUnit: string;
  amount: number;
  sizes: string;
  kindOfFabric: string;
  typeOfCollar: string;
  comments: string;
  deliveryDate: string;
  finished: boolean;
  creationTimestamp: string;
  updateTimestamp: string;
}

interface Client {
  name: string;
  number: string;
}

export default function Invoice() {
  const params = useParams();
  const idOrder = params.id;

  const [loader, setLoader] = useState(false);
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [clientData, setClientData] = useState<Client | null>(null);
  const [containerCount, setContainerCount] = useState(1); // Estado para gerenciar o número de MainContainers

  useEffect(() => {
    const fetchClientAndOrderData = async () => {
      try {
        const response = await axios.get(BACKEND_URL);
        const clients = response.data;

        for (let client of clients) {
          const order = client.order.find((o: Order) => o.id === idOrder);
          if (order) {
            setOrderData(order);
            setClientData({ name: client.name, number: client.number });
            break;
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do pedido", error);
      }
    };
    fetchClientAndOrderData();
  }, [idOrder]);

  const downloadPDF = () => {
    const capture = document.querySelector(".container") as HTMLElement;
    if (capture) {
      setLoader(true);
      html2canvas(capture, { scale: 3 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
  
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.max(pdfWidth / imgWidth, pdfHeight / imgHeight);
  
        // Inicialize com valores padrão
        let width = imgWidth * ratio;
        let height = imgHeight * ratio;
  
        if (containerCount === 1) {
          // Ajustes para um container
          width = imgWidth * ratio - 480;
          height = imgHeight * ratio - 50;
        } else if (containerCount === 2) {
          // Ajustes para dois containers
          width = imgWidth * ratio - 250;
          height = imgHeight * ratio - 30;
        }
  
        const x = (pdfWidth - width) / 2;
        const y = (pdfHeight - height) / 2;
  
        pdf.addImage(imgData, "PNG", x, y, width, height);
        setLoader(false);
        pdf.save("arquivo.pdf");
      });
    } else {
      console.log("Elemento com a classe 'container' não encontrado");
    }
  };

  const addContainer = () => {
    setContainerCount((prev) => prev + 1);
  };

  const removeContainer = () => {
    if (containerCount > 1) {
      setContainerCount((prev) => prev - 1);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <div className="container">
        {/* Renderizar múltiplos MainContainers com base no estado containerCount */}
        {Array.from({ length: containerCount }).map((_, index) => (
          <MainContainer key={index}>
            {clientData && (
              <ContainerDataClient>
                <span>
                  <strong> Nome do cliente:</strong> {clientData.name}{" "}
                </span>
              </ContainerDataClient>
            )}
            {orderData && (
              <ContainerDataClient>
                <span>
                  <strong>Data de registro:</strong>{" "}
                  {new Date(orderData.creationTimestamp).toLocaleDateString()}
                </span>
                <span>
                  <strong>Data de entrega:</strong> {orderData.deliveryDate}
                </span>
                <span style={{ whiteSpace: "pre-wrap" }}>
                  <strong> Descrição do pedido: </strong>
                  {orderData.orderDescription}
                </span>
                <span>
                  <strong>Quantidade de peças:</strong> {orderData.amount}
                </span>
                <span>
                  <strong>Tamanhos:</strong> {orderData.sizes}
                </span>
                <span>
                  <strong>Tipo da gola:</strong> {orderData.typeOfCollar}
                </span>
                <span>
                  <strong>Tipo da malha:</strong> {orderData.kindOfFabric}
                </span>
                <span style={{ whiteSpace: "pre-wrap" }}>
                  <strong> Comentário:</strong> {orderData.comments}
                </span>
              </ContainerDataClient>
            )}
          </MainContainer>
        ))}
      </div>

      <ButtonsAddContainers>
        <PlusButton onClick={addContainer}> <Plus width={16} /> </PlusButton>
        <MinusButton onClick={removeContainer} disabled={containerCount === 1}>
          <Minus width={16} />
        </MinusButton>
      </ButtonsAddContainers>

      <ButtonDownload onClick={downloadPDF} disabled={loader}>
        <Download width={19} />
        {loader ? <span>Baixando PDF</span> : <span>Baixar em PDF</span>}
      </ButtonDownload>
    </ThemeProvider>
  );
}
