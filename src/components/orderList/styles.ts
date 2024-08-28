import styled from "styled-components";

export const Main = styled.main`
  margin: 1rem auto;
  max-width: 56rem;
  padding: 0 1rem;
  border-radius: 6px;
  height: 100%;

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
    background-color: ${(props) => props.theme["gray-300"]};
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
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  
  button{
    display: flex;
    border: none;
    align-items: center;
    cursor: pointer;
  }

 
`

export const EditButtons = styled.div`
  display: flex;
  gap: 1rem;
`

export const TrashButton = styled.button`
  background-color: ${(props) => props.theme["button-red"]};
  color: ${(props) => props.theme.white};

  padding: 0.3rem 0.5rem;
  border-radius: 5px;
`

export const PenButton = styled.button`
  background-color: ${(props) => props.theme["header-blue"]};
  color: ${(props) => props.theme.white};

  padding: 0.3rem 0.5rem;
  border-radius: 5px;
`

export const DocButton = styled.button`
  background-color: ${(props) => props.theme.white};
  color: ${(props) => props.theme.black};

  padding: 0.3rem 0.5rem;
  border-radius: 5px;
`

export const OkButton = styled.button`
  background-color: ${(props) => props.theme["button-green"]};
  color: ${(props) => props.theme.white};

  padding: 0.3rem 0.5rem;
  border-radius: 5px;
`

export const OkButtonRed = styled.button`
background-color: ${(props) => props.theme["button-red"]};
color: ${(props) => props.theme.white};

padding: 0.3rem 0.5rem;
border-radius: 5px;
`