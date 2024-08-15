import Link from "next/link";
import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 1rem;
  text-align: center;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 25rem;
  padding: 2rem;

  border-radius: 10px;

 border: solid 2px ${(props) => props.theme["header-blue"]};

  
  div {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    margin: 1rem 0;
    gap: 0.3rem;

  }

  input {
    padding: 0.7rem;
    width: 100%;
  }

  label{
    position: relative;
    right: 9rem;
  }


`;

export const Submit = styled.button`
  padding: 0.8rem 1.3rem;
  display: flex;
  gap: 0.3rem;
  text-align: center;
  justify-content: center;

  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme["button-green"]};
  border: none;
  border-radius: 6px;

  cursor: pointer;
  width: 100%;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LinkContainer = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

