import Link from "next/link";
import styled from "styled-components";

export const Main = styled.main`
 padding: 1rem; 
`
export const TitleContainer = styled.div`
  text-align: center;
  margin-top: 1rem;
`

export const SearchContainer = styled.main`
  max-width: 56.25rem;
  margin: 0 auto;
  display: flex;
  align-items: center;

  text-align: center;

  gap: 1.2rem;
 

  span{
    display: flex;
    align-items: center;
    gap: 0.6rem;
  
    padding: 0.3rem 0.8rem;
    justify-content: center;

    font-size: 1rem;

    border-radius: 5px;

    background-color: ${(props) => props.theme["button-green"]};
    
    color: ${(props) => props.theme.white};

    cursor: pointer;
  }

  input{
    flex: 1;
    padding: 0.3rem;
  }
`

export const SearchBarContainer = styled.div`
  display: flex;
  flex: 1;

  button{
    background-color: transparent;
    border: none;
    padding: 0.3rem;

    cursor: pointer;
  }
`

export const LinkContainer = styled(Link)`
  text-decoration: none;
`