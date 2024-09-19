import { Loader } from "lucide-react"
import Link from "next/link"
import styled, { keyframes } from "styled-components"

export const Main = styled.main`
  margin: 1rem auto;
  max-width: 60rem;
  padding: 0 1rem;
  border-radius: 6px;
  border: solid 2px ${(props) => props.theme["button-green"]};

  background-color: ${(props) => props.theme["gray-300"]};
`
const colorizeAndPulse = keyframes`
  0% {
    filter: grayscale(100%);
    transform: scale(1); /* Tamanho original */
  }
  50% {
    filter: grayscale(0%);
    transform: scale(1.05); /* Aumenta ligeiramente o tamanho */
  }
  100% {
    filter: grayscale(100%);
    transform: scale(1); /* Volta ao tamanho original */
  }
`;

// Componente de carregamento que utiliza a imagem com animação
export const LoadingImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem auto;
  flex-direction: column;
  gap: 0.5rem;

  animation: ${colorizeAndPulse} 2s linear infinite alternate; /* Animação em loop alternado com pulso */
  img {
    width: 150px; /* Tamanho da imagem */
    height: auto;
  }

  div{
    display: flex;
    align-items: center;
  }
`;

export const MonthContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  h2 {
    margin: 0;
    font-size: 1.5em;
    color: #333;
  }
`;


export const MainFinishedFalse = styled.main`
  margin: 1rem auto;
  max-width: 60rem;
  padding: 0 1rem;
  border-radius: 6px;

  background-color: ${(props) => props.theme["gray-300"]};
  border: 2px solid ${(props) => props.theme["button-orange"]};
`

export const MainFinishedDanger = styled.main`
  margin: 1rem auto;
  max-width: 60rem;
  padding: 0 1rem;
  border-radius: 6px;

  background-color: ${(props) => props.theme["gray-300"]};
  border: 2px solid ${(props) => props.theme["button-red"]};
`

export const InformationContainerMaster = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  padding: 0.8rem;

  span{
    width: 10rem;
  }
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;

  button{
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`

export const TrashButton = styled.div`
  padding: 0.6rem 0.8rem;
  background-color: ${(props) => props.theme["button-red"]};
  border-radius: 6px;
  color: ${(props) => props.theme.white};

  cursor: pointer;
  transition: 0.5s;

  &:hover{
    transform: scale(1.2);
  }
`

export const PenButton = styled.div`
  padding: 0.6rem 0.8rem;
  background-color: ${(props) => props.theme["header-blue"]};
  border-radius: 6px;
  color: ${(props) => props.theme.white};

  cursor: pointer;
  transition: 0.5s;

  &:hover{
    transform: scale(1.2);
  }
`

export const LinkContainer = styled(Link)`
  text-decoration: none;
  width: 10rem;

  color: ${(props) => props.theme.black};
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const Loading = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 3rem auto;

  animation: ${pulse} 1.5s infinite ease-in-out;

  gap: 0.6rem;
`