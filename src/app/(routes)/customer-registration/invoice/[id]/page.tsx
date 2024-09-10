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
import { Download, Loader } from "lucide-react";

import kelPrintImage from "../../../../../../public/kelprint.png";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { Loading } from "@/components/clientList/styles";

interface Order {
  id: string;
  orderDescription: string;
  totalValue: string,
  valuePerUnit: string,
  amount: number;
  sizes: string;
  kindOfFabric: string;
  typeOfCollar: string;
  comments: string;
  deliveryDate: string;
  inputValue: string;
  paymentType: string;
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
  const [loadingData, setLoadingData] = useState(true);
  const [orderData, setOrderData] = useState<Order | null>(null);
  const [clientData, setClientData] = useState<Client | null>(null);

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
      } finally {
        setLoadingData(false);
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

        const width = imgWidth * ratio - 50;
        const height = imgHeight * ratio - 20;

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

  if (loadingData) {
    return (
      <ThemeProvider theme={defaultTheme}>
        <Loading>
          <Loader width={25} />
          <span>Carregando dados...</span>
        </Loading>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <div className="container">
        <MainContainer>
          <Header>
            <ImageContainer src={kelPrintImage} alt="Logo da KelPrint" />
            <span>KelPrint</span>
            <span>Av. Antônio Ricardo, N.º 10 - CENTRO</span>
            <span>Aurora-CE</span>
            <span>CNPJ: 45.904.611/0001-00</span>
            <span>Email: kellaurora@gmail.com</span>
          </Header>

          <ContainerInformation>
            <span>Informações do cliente</span>
          </ContainerInformation>
          {clientData && (
            <ContainerDataClient>
              <span><strong> Nome do cliente:</strong> {clientData.name} </span>
              <span><strong> Número do cliente:</strong> {clientData.number} </span>
            </ContainerDataClient>
          )}
          <ContainerInformation>
            <span>Informações do pedido</span>
          </ContainerInformation>

          {orderData && (
            <ContainerDataClient>
              <span>
                <strong> Descrição do pedido: </strong>{orderData.orderDescription}
              </span>
              <span> <strong>Valor por peça:</strong> {orderData.valuePerUnit} </span>
              <span><strong>Valor total:</strong> {orderData.totalValue} </span>
              <span><strong>Valor de entrada:</strong> {orderData.inputValue} </span>
              <span><strong>Tipo de pagamento:</strong> {orderData.paymentType} </span>          
              <span><strong>Quantidade de peças:</strong> {orderData.amount}</span>
              <span><strong>Tamanhos:</strong> {orderData.sizes}</span>
              <span><strong>Tipo da gola:</strong> {orderData.typeOfCollar}</span>
              <span><strong>Tipo da malha:</strong> {orderData.kindOfFabric}</span>
              <span>
                <strong> Comentário:</strong> {orderData.comments}
              </span>
              <span><strong>Data de registro:</strong> {new Date(orderData.creationTimestamp).toLocaleDateString()}</span>
              <span><strong>Data de entrega:</strong> {orderData.deliveryDate}</span>
              <span><strong>Estado do pedido:</strong> {orderData.finished ? "Finalizado" : "Em andamento"}</span>
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
