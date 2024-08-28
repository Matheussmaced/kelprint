"use client";

import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { useParams } from "next/navigation";
import { ThemeProvider } from "styled-components";
import {
  ButtonDownload,
  ContainerDataClient,
  ContainerInformation,
  Header,
  ImageContainer,
  MainContainer,
} from "./styles";
import { Download } from "lucide-react";

import kelPrintImage from "../../../../../../public/kelprint.jpg";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { BACKEND_URL } from "@/api";

interface Order {
  id: string;
  orderDescription: string;
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

  useEffect(() => {


  const fetchClientAndOrderData = async () => {
    try {
        const response = await axios.get(BACKEND_URL)
        const clients = response.data;

        for(let client of clients){
          const order = client.order.find((o:Order) => o.id === idOrder);
          if(order){
            setOrderData(order);
            setClientData({name: client.name, number: client.number})
            break;
          }
        }
      } catch (error) {
        console.error("Erro ao buscas dados do pedido", error)
      }
    }
    fetchClientAndOrderData();
  }, [idOrder])

  const downloadPDF = () => {
    const capture = document.querySelector(".container") as HTMLElement;
    if (capture) {
      setLoader(true);
      html2canvas(capture, { scale: 3 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Set PDF dimensions
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        // Calculate image aspect ratio
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.max(pdfWidth / imgWidth, pdfHeight / imgHeight);

        // Adjust image width and height in PDF
        const width = imgWidth * ratio - 110;
        const height = imgHeight * ratio -5;

        // Adjust to center and expand as much as possible without distorting
        const x = (pdfWidth - width) / 2;
        const y = (pdfHeight - height) / 2;

        // Add image to PDF
        pdf.addImage(imgData, "PNG", x, y, width, height);
        setLoader(false);
        pdf.save("arquivo.pdf");
      });
    } else {
      console.log("Elemento com a classe 'container' não encontrado");
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <div className="container">
        <MainContainer>
          <Header>
            <ImageContainer src={kelPrintImage} alt="Logo da KelPrint" />
            <span>KelPrint</span>
            <span>Av. Antônio Ricardo</span>
            <span>Aurora-CE</span>
            <span>CNPJ: 123123123123-0</span>
            <span>Email: kellaurora@gmail.com</span>
          </Header>

          <ContainerInformation>
            <span>Informações do cliente</span>
          </ContainerInformation>
          {clientData && (
            <ContainerDataClient>
              <span>Nome do cliente: {clientData.name} </span>
              <span>Número do cliente: {clientData.number} </span>
            </ContainerDataClient>
          )}
          <ContainerInformation>
            <span>Informações do pedido</span>
          </ContainerInformation>

          {orderData && (
            <ContainerDataClient>
              <span>
                Descrição do pedido: {orderData.orderDescription}
              </span>
              <span>Valor total: 1.750,00</span>
              <span>Quantidade de peças: {orderData.amount}</span>
              <span>Tamanhos: {orderData.sizes}</span>
              <span>Tipo da gola: {orderData.typeOfCollar}</span>
              <span>Tipo da malha: {orderData.kindOfFabric}</span>
              <span>
                Comentário: {orderData.comments}
              </span>
              <span>Data de registro: {new Date(orderData.creationTimestamp).toLocaleDateString()}</span>
              <span>Data de entrega: {orderData.deliveryDate}</span>
              <span>Estado do pedido: {orderData.finished ? "Finalizado" : "Em andamento"}</span>
            </ContainerDataClient>
          )}
          </MainContainer>
      </div>
            <ButtonDownload onClick={downloadPDF} disabled={loader}>
              <Download width={19} />
              {loader ? <span>Baixando PDF</span> : <span>Baixar em PDF</span>}
            </ButtonDownload>
    </ThemeProvider>
  );
}
