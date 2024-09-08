// src/interfaces/Livro.ts
export interface Book {
  id: string;
  titulo: string;
  autor: string;
  anoPublicacao: number;
  dataCadastro: Date;
  genero: string;
  descricao: string;
}
