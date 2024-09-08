import { Link } from "react-router-dom";
import { DefaultLayout } from "../config/layouts/DefaultLayout";
import { Button } from "../components/styleds/Button";
import { FullScreenContainer } from "../components/styleds/FullScreenContainer";




export function Home() {
  return (
    <DefaultLayout>
      <FullScreenContainer>
        
        <h1>Bem vindo a Biblioteca mágica de livros</h1>
        <Link to="/Biblioteca">
          <Button>Adicionar livro</Button>
        </Link>
      </FullScreenContainer>
      
    </DefaultLayout>
  );
}

