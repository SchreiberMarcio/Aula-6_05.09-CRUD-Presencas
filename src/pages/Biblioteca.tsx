import { useEffect, useState } from "react";
import { v4 as generateUuid } from "uuid";
import { Button } from "../components/styleds/Button";
import { DefaultLayout } from "../config/layouts/DefaultLayout";
import { Title } from "../components/styleds/Title";
import { ModalExclude } from "../components/ModalExclude";
import { ModalNewBook } from "../components/ModalNewBook";
import { ModalEditBook } from "../components/ModalEditBook";
import { Book } from "../interfaces/Book";
import { ModalDetailsBook } from "../components/ModalDetailsBook";
import { FullScreenContainer } from "../components/styleds/FullScreenContainer";
import { Footer } from "../components/Footer";

export function Biblioteca() {
  const [isOpenModalCadastro, setIsOpenModalCadastro] = useState<boolean>(false);
  const [isOpenModalEditar, setIsOpenModalEditar] = useState<boolean>(false);
  const [isOpenModalExclude, setIsOpenModalExclude] = useState<boolean>(false);
  const [isOpenModalDetalhes, setIsOpenModalDetalhes] = useState<boolean>(false);
  const [idSelected, setIdSelected] = useState<string>("");
  const [BookSelecionado, setBookSelecionado] = useState<Book | null>(null);
  const [Books, setBooks] = useState<Book[]>([]);
  const [searchTerm] = useState<string>("");

  

 
  useEffect(() => {
    const livrosSalvos = localStorage.getItem("livros");
    if (livrosSalvos) {
      console.log("Livros carregados do localStorage:", JSON.parse(livrosSalvos));
      setBooks(JSON.parse(livrosSalvos));
    }
  }, []);

  useEffect(() => {
    console.log("Salvando livros no localStorage:", Books);
    localStorage.setItem("livros", JSON.stringify(Books));
  }, [Books]);

  function openModalCadastro(): void {
    setIsOpenModalCadastro(true);
  }

  function closeModalCadastro(): void {
    setIsOpenModalCadastro(false);
  }

  function openModalEditar(Book: Book): void {
    setBookSelecionado(Book);
    setIsOpenModalEditar(true);
  }

  function closeModalEditar(): void {
    setBookSelecionado(null);
    setIsOpenModalEditar(false);
  }

  function openModalDetalhes(Book: Book): void {
    setBookSelecionado(Book);
    setIsOpenModalDetalhes(true);
  }

  function closeModalDetalhes(): void {
    setBookSelecionado(null);
    setIsOpenModalDetalhes(false);
  }

  function openModalExclude(id: string): void {
    setIsOpenModalExclude(true);
    setIdSelected(id);
  }

  function closeModalExclude(): void {
    setIsOpenModalExclude(false);
    setIdSelected("");
  }

  function handleCadastroBook(Book: Omit<Book, "id" | "dataCadastro">) {
    const novoBook: Book = {
      ...Book,
      id: generateUuid(),
      dataCadastro: new Date(),
    };
    setBooks((prevState) => [...prevState, novoBook]);
  }

  function handleEditarBook(BookAtualizado: Omit<Book, "id" | "dataCadastro">) {
    setBooks((prevState) =>
      prevState.map((Book) =>
        Book.id === BookSelecionado?.id ? { ...Book, ...BookAtualizado } : Book
      )
    );
    closeModalEditar();
  }

  function confirmExclude(): void {
    setBooks((prevState) => prevState.filter((Book) => Book.id !== idSelected));
    closeModalExclude();
  }

  // Função para filtrar os livros com base no título ou autor
  const filteredBooks = Books.filter((book) =>
    book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DefaultLayout>
      <FullScreenContainer flexDirection="column">
        <Title>Biblioteca Encantada de Livrópolis</Title>

        <Button onClick={openModalCadastro}>Adicionar Livro</Button>
        <br />

        

        {filteredBooks.length === 0 ? (
          <p>Nenhum livro encontrado.</p>
        ) : (
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Ano de Publicação</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((Book, index) => (
                <tr key={Book.id}>
                  <td>{index + 1}</td>
                  <td>{Book.titulo}</td>
                  <td>{Book.autor}</td>
                  <td>{Book.anoPublicacao}</td>
                  <td>
                    <Button size="small" onClick={() => openModalDetalhes(Book)}>
                      Ver Detalhes
                    </Button>
                    <Button size="small" onClick={() => openModalEditar(Book)}>
                      Editar
                    </Button>
                    <Button size="small" variant="error" onClick={() => openModalExclude(Book.id)}>
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </FullScreenContainer>

      <ModalNewBook
        isOpen={isOpenModalCadastro}
        onClose={closeModalCadastro}
        onSubmit={handleCadastroBook}
      />

      <ModalEditBook
        isOpen={isOpenModalEditar}
        onClose={closeModalEditar}
        livro={BookSelecionado}
        onSubmit={handleEditarBook}
      />

      <ModalDetailsBook
        isOpen={isOpenModalDetalhes}
        onClose={closeModalDetalhes}
        book={BookSelecionado}
      />

      <ModalExclude
        isOpen={isOpenModalExclude}
        onCancel={closeModalExclude}
        onConfirm={confirmExclude}
      />
      <Footer/>
    </DefaultLayout>
  );
}
