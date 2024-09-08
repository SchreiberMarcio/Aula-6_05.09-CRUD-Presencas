import styled from "styled-components";
import FundoBiblioteca from "../../assets/Fundobiblioteca.jpeg"; // Certifique-se de que o caminho da imagem está correto

interface ContainerProps {
  flexDirection?: "row" | "column";
  notPadding?: boolean;
  gap?: string;
}

export const FullScreenContainer = styled.section<ContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? "row"};
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: ${(props) => props.gap ?? "14px"};
  width: 100vw; 
  height: 100vh;
  margin: 0; 
  padding: ${(props) => (props.notPadding ? "0" : "70px 0")};

  background: url(${FundoBiblioteca}) no-repeat center center;
  background-size: cover; 

  max-width: 100%; 
  max-height: 100%; 

  h1 {
    font-size: 48px;
    color: white;
  }

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;
