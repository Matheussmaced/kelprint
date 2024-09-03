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
  gap: 0.4rem;

  button{
    background-color: transparent;
    border: none;
    cursor: pointer;
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