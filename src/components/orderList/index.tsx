import { GlobalStyles } from "@/styles/global";
import { defaultTheme } from "@/themes/default";
import { Pen, Trash2 } from "lucide-react";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { BACKEND_URL } from "@/api";
import { useEffect, useState } from "react";
import { Alert, ButtonContainer, Main, Ok } from "./styles";


export default function OrderList(){
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Main>
        <Alert>
          <span>
            Descrição: pedido tal coisa asdasdasd asdadsad asdasd asd
          </span>
          <span>
            Quantidade: 5
          </span>
          <span>
            Tamanhos: 2M, 5M, 6M
          </span>
          <span>
            Tipo de tecido: Helanca
          </span>
          <span>
            Tipo da gola: Gola polo
          </span>
          <span>
            Comentário: Vai ser de tal forma, com tal arte
          </span>
          <span>
            Data do pedido: 10/05
          </span>
          <span>
            Data de entrega: 25/05
          </span>
          <span>
            Andamento do pedido: Aguardando entrega
          </span>
          <ButtonContainer>
            <button>
              <Trash2 width={16} />
            </button>
            <button>
              <Pen width={16} />
            </button>
          </ButtonContainer>
        </Alert>

        <Ok>
          <span>
            Descrição: pedido tal coisa asdasdasd asdadsad asdasd asd
          </span>
          <span>
            Quantidade: 5
          </span>
          <span>
            Tamanhos: 2M, 5M, 6M
          </span>
          <span>
            Tipo de tecido: Helanca
          </span>
          <span>
            Tipo da gola: Gola polo
          </span>
          <span>
            Comentário: Vai ser de tal forma, com tal arte
          </span>
          <span>
            Data do pedido: 10/05
          </span>
          <span>
            Data de entrega: 25/05
          </span>
          <span>
            Andamento do pedido: Aguardando entrega
          </span>
          <ButtonContainer>
            <button>
              <Trash2 width={16} />
            </button>
            <button>
              <Pen width={16} />
            </button>
          </ButtonContainer>
        </Ok>
      </Main>
    </ThemeProvider>
  )
}