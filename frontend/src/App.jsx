import { useEffect, useState } from "react";
import "./App.css";

import FormularioLivro from "./components/FormularioLivro";
import ListaLivros from "./components/ListaLivros";
import Login from "./components/Login";
import Register from "./components/Register";

import {
  listarLivros,
  criarLivro,
  atualizarLivro,
  removerLivro,
} from "./services/api";

function App() {
  const [livros, setLivros] = useState([]);
  const [livroEditando, setLivroEditando] = useState(null);
  const [erro, setErro] = useState("");

  const [logado, setLogado] = useState(
    !!localStorage.getItem("token")
  );

  const [mostrarRegistro, setMostrarRegistro] =
    useState(false);

  useEffect(() => {
    if (logado) {
      carregarLivros();
    }
  }, [logado]);

  const carregarLivros = async () => {
    try {
      const dados = await listarLivros();
      setLivros(dados);
    } catch {
      setErro("Erro ao carregar livros.");
    }
  };

  const handleSalvar = async (livro) => {
    try {
      if (livroEditando) {
        await atualizarLivro(
          livroEditando.id,
          livro
        );

        setLivroEditando(null);
      } else {
        await criarLivro(livro);
      }

      carregarLivros();

    } catch (e) {

      setErro(
        e.response?.data?.detail ||
          "Erro ao salvar livro."
      );

    }
  };

  const handleEditar = (livro) => {
    setLivroEditando(livro);
  };

  const handleRemover = async (id) => {
    if (
      !window.confirm(
        "Deseja remover este livro?"
      )
    ) {
      return;
    }

    try {
      await removerLivro(id);

      carregarLivros();

    } catch {

      setErro("Erro ao remover livro.");

    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setLogado(false);

    setLivroEditando(null);

    setLivros([]);
  };

  if (!logado) {
    if (mostrarRegistro) {
      return (
        <Register
          irParaLogin={() =>
            setMostrarRegistro(false)
          }
        />
      );
    }

    return (
      <Login
        onLogin={() => setLogado(true)}
        irParaRegistro={() =>
          setMostrarRegistro(true)
        }
      />
    );
  }

  return (
    <div className="container">
      <div className="hero">
        <h1>📚 Catálogo de Livros</h1>

        <button
          className="btn-logout"
          onClick={logout}
        >
          🚪 Sair
        </button>
      </div>

      {erro && (
        <div className="erro">
          {erro}
        </div>
      )}

      <FormularioLivro
        onSalvar={handleSalvar}
        livroEditando={livroEditando}
      />

      <ListaLivros
        livros={livros}
        onEditar={handleEditar}
        onRemover={handleRemover}
      />
    </div>
  );
}

export default App;