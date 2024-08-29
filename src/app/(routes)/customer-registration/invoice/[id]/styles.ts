import Image from "next/image";
import styled from "styled-components";

export const MainContainer = styled.main`
  max-width: 35rem;
  margin: 2rem auto;
  padding: 0.5rem 0rem 0rem;
  border-radius: 1rem;

  border: 1px solid ${(props) => props.theme["gray-300"]};
`

export const ButtonDownload = styled.button`
    display: flex;
    align-items: center;
    gap: 0.3rem;

    padding: 0.3rem;
    margin: 0 auto;

    cursor: pointer;
    transition: 1s;

    &:hover{
      transform: scale(1.05);
    }
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  text-align: center;
  gap: 0.4rem;
  
  margin: 0 auto 0.5rem;
  
`

export const ImageContainer = styled(Image)`
  display: flex;
  align-items: center;
  width: 11.25rem;
  height: 85px;
  border-radius: 1.2rem;

  margin: 0 auto 0.5rem;
`

export const ContainerInformation = styled.div`
  background-color: ${(props) => props.theme["button-orange"]};
  font-weight: bolder;

  padding: 0.8rem;
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