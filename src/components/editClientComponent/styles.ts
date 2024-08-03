import Link from "next/link";
import styled from "styled-components";

export const Main = styled.main`
 padding: 1rem;
 text-align: center;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 25rem;
  margin: 0 auto;

  div{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    margin: 1rem 0;

    gap: 1rem;
  }

  label {
      margin-right: 1rem;
      flex: 0 0 30%;
      text-align: right;
    }

  input{
    padding: 0.2rem;
    width: 70%;
  }
`

export const Submit = styled.button`
  padding: 0.5rem 1rem;
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
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.5rem;
`

export const Cancel = styled(Submit)`
  background-color: ${(props) => props.theme["button-red"]};
`

export const LinkContainer = styled(Link)`
  text-decoration: none;

  width: 100%;
`

export const Success = styled.div`
  background-color: ${(props) => props.theme["header-blue"]};
  color: ${(props) => props.theme.white};

  font-weight: bold;

  padding: 0.5rem;
  margin: 0.3rem auto;

  width: 19rem;
  border-radius: 6px;
`