import Link from "next/link"
import styled from "styled-components"

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