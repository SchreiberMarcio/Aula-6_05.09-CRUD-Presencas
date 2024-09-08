// src/components/ModalNewBook.tsx
import { useState } from "react";
import { Button } from "./styleds/Button";
import { Input } from "./styleds/Input";

interface ModalCadastroLivroProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: {
    titulo: string;
    autor: string;
    anoPublicacao: number;
    genero: string;
    descricao: string;
  }) => void;
}

export function ModalNewBook({
  isOpen,
  onClose,
  onSubmit,
}: ModalCadastroLivroProps) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState<number | string>("");
  const [genero, setGenero] = useState("");
  const [descricao, setDescricao] = useState("");

  const anoAtual = new Date().getFullYear();

  function handleSubmit(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (parseInt(anoPublicacao as string) > anoAtual) {
      alert("O ano de publicação não pode ser no futuro.");
      return;
    }

    onSubmit({
      titulo,
      autor,
      anoPublicacao: parseInt(anoPublicacao as string),
      genero,
      descricao,
    });
    onClose(); // Fecha o modal após o envio
  }

  if (!isOpen) return null; // Retorna null se o modal não estiver aberto

  return (
    <div style={modalStyle}>
      <h2>Cadastrar Livro</h2>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
        <Input
          type="number"
          placeholder="Ano de Publicação"
          value={anoPublicacao}
          onChange={(e) => setAnoPublicacao(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Gênero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <Button type="submit">Cadastrar</Button>
        <Button type="button" onClick={onClose}>
          Cancelar
        </Button>
      </form>
    </div>
  );
}


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
