// src/components/ModalDetalhesLivro.tsx
import { Button } from "./styleds/Button";
import { Book } from "../interfaces/Book";


interface ModalDetalhesLivroProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

export function ModalDetailsBook({
  isOpen,
  onClose,
  book,
}: ModalDetalhesLivroProps) {
  if (!isOpen || !book) return null; 

  return (
    <div style={modalStyle}>
      <h2>Detalhes do Livro</h2>
      <p>
        <strong>ID:</strong> {book.id}
      </p>
      <p>
        <strong>Título:</strong> {book.titulo}
      </p>
      <p>
        <strong>Autor:</strong> {book.autor}
      </p>
      <p>
        <strong>Ano de Publicação:</strong> {book.anoPublicacao}
      </p>
      <p>
        <strong>Gênero:</strong> {book.genero}
      </p>
      <p>
        <strong>Descrição:</strong> {book.descricao}
      </p>
      <p>
        <strong>Data de Cadastro:</strong>{" "}
        {book.dataCadastro.toLocaleDateString()}
      </p>
      <Button onClick={onClose}>Fechar</Button>
    </div>
  );
}

// Estilos básicos para o modal
const modalStyle = {
  background: "black",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  position: "fixed" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
};
