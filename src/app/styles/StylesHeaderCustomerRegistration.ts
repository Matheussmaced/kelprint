import styled from "styled-components";

export const MainContainer = styled.main`
  padding: 1.2rem;
  text-align: center;

  background-color: ${(props) => props.theme["header-blue"]};
  color: ${(props) => props.theme.white};
  word-spacing: 0.2em;

`