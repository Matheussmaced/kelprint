import styled from "styled-components";

export const MainContainer = styled.main`
  padding: 1.3rem;
  text-align: center;
  display: flex;
  justify-content: center;

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

    position: absolute;
    right: 1.2rem;

    &:hover{
      transform: scale(1.2);
    }
  }

  
  a{
      text-decoration: none;
    }
`