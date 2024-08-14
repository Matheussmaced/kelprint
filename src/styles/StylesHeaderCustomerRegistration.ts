import Link from "next/link";
import styled from "styled-components";

export const MainContainer = styled.main`
  padding: 1.2rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  background-color: ${(props) => props.theme["header-blue"]};
  color: ${(props) => props.theme.white};
  word-spacing: 0.2em;

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

  position: absolute;
  left: 1rem;
`

export const LinkContainer = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;

  left: 1rem;
`