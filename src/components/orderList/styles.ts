import styled from "styled-components";

export const Main = styled.main`
  margin: 1rem auto;
  max-width: 56rem;
  padding: 0 1rem;
  border-radius: 6px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 1rem;
`

export const Alert = styled.div`
  display: flex;
    flex-direction: column;
    gap: 0.8rem;

    width: 45%;
    padding: 1rem 2rem;
    background-color: ${(props) => props.theme["button-orange"]};
    color: ${(props) => props.theme.black};

    border-radius: 6px;

    span{
      display: flex;
      align-items: center;
      width: 100%;
      font-weight: bold;
    }
`

export const Ok = styled.div`
  display: flex;
    flex-direction: column;
    gap: 0.8rem;

    width: 45%;
    padding: 1rem 2rem;
    background-color: ${(props) => props.theme["button-green"]};
    color: ${(props) => props.theme.white};

    border-radius: 6px;

    span{
      display: flex;
      align-items: center;
      width: 100%;
      font-weight: bold;
    }
`

export const Late = styled.div`
  display: flex;
    flex-direction: column;
    gap: 0.8rem;

    width: 45%;
    padding: 1rem 2rem;
    background-color: ${(props) => props.theme["button-red"]};
    color: ${(props) => props.theme.white};

    border-radius: 6px;

    span{
      display: flex;
      align-items: center;
      width: 100%;
      font-weight: bold;
    }
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
  
  button{
    display: flex;
    background-color: transparent;
    border: none;
    align-items: center;
    cursor: pointer;
  }
`