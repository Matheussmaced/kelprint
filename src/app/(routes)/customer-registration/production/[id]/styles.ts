import styled from "styled-components";

export const MainContainer = styled.main`
  max-width: 35rem;
  margin: 0.4rem auto;
  border-radius: 1rem;

  border: 1px solid ${(props) => props.theme["gray-300"]};
`

export const ButtonsAddContainers = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  button{
    padding: 0.2rem 0.4rem;
  }
`

export const PlusButton = styled.button`
  background-color: ${(props) => props.theme["button-green"]};
  color: ${(props) => props.theme.white};

  border: none;
  cursor: pointer;
  transition: 0.5s ;

  &:hover{
    transform: scale(1.1);
  }
`

export const MinusButton = styled.button`
    background-color: ${(props) => props.theme["button-red"]};
    color: ${(props) => props.theme.white};

    border: none;
    cursor: pointer;
    transition: 0.5s ;
    
    &:hover{
    transform: scale(1.1);
  }
`

export const ButtonDownload = styled.button`
    display: flex;
    align-items: center;
    gap: 0.3rem;

    padding: 0.3rem;
    margin: 1rem auto;

    cursor: pointer;
    transition: 1s;

    &:hover{
      transform: scale(1.05);
    }
`

export const ContainerDataClient = styled.div`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme["gray-900"]};
  border: 1px solid ${(props) => props.theme["gray-300"]};

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding: 0.8rem;
`