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
import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Invoice() {
  const params = useParams();
  const idOrder = params.id;

  const [loader, setLoader] = useState(false);

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
        const width = imgWidth * ratio - 180;
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
          <ContainerDataClient>
            <span>Nome do cliente: Matheus</span>
            <span>Número do cliente: (88) 9.93405-3203</span>
          </ContainerDataClient>

          <ContainerInformation>
            <span>Informações do pedido</span>
          </ContainerInformation>

          <ContainerDataClient>
            <span>
              Descrição do pedido: Camisas feitas para o Juazeiro do Norte, para
              o evento da prefeitura
            </span>
            <span>Valor total: 1.750,00</span>
            <span>Quantidade de peças: 50 unidades</span>
            <span>Tamanhos: 25pm 25mm</span>
            <span>Tipo da gola: gola polo e punho</span>
            <span>Tipo da malha: malha pp</span>
            <span>
              Comentário: A gola tem quer ser de tal forma com tal formato no
              corte
            </span>
            <span>Data de registro: 27/08/2024</span>
            <span>Data de entrega: 20/09/2024</span>
            <span>Estado do pedido: em andamento</span>
          </ContainerDataClient>
          </MainContainer>
      </div>
            <ButtonDownload onClick={downloadPDF} disabled={loader}>
              <Download width={19} />
              {loader ? <span>Baixando PDF</span> : <span>Baixar em PDF</span>}
            </ButtonDownload>
    </ThemeProvider>
  );
}
