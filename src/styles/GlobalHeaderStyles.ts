import Link from "next/link";
import styled from "styled-components";

export const MainContainer = styled.main`
  padding: 1.2rem;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  background-color: ${(props) => props.theme["header-blue"]};
  color: ${(props) => props.theme.white};
  word-spacing: 0.2em;

  button {
    background-color: transparent;
    border: none;
    color: ${(props) => props.theme.white};
    display: flex;
    align-items: center;

    gap: 0.2rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover{
      transform: scale(1.2);
    }
  }

  a{
      text-decoration: none;
    }
`

export const ArrowContainer = styled.div`
  width: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme["header-blue"]};
  cursor: pointer;

  transition: 0.3s;

    &:hover{
      transform: scale(1.2);
    }
`

export const LinkContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`