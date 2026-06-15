import { useState, useEffect } from "react";

function FormularioLivro({
  onSalvar,
  livroEditando,
}) {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");
  const [isbn, setIsbn] = useState("");

  useEffect(() => {
    if (livroEditando) {
      setTitulo(livroEditando.titulo);
      setAutor(livroEditando.autor);
      setAno(livroEditando.ano);
      setGenero(livroEditando.genero);
      setIsbn(livroEditando.isbn);
    } else {
      limparCampos();
    }
  }, [livroEditando]);

  const limparCampos = () => {
    setTitulo("");
    setAutor("");
    setAno("");
    setGenero("");
    setIsbn("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSalvar({
      titulo,
      autor,
      ano: Number(ano),
      genero,
      isbn,
    });

    limparCampos();
  };

  return (
    <form
      className="formulario"
      onSubmit={handleSubmit}
    >
      <h2>
        {livroEditando
          ? "✏️ Editar Livro"
          : "➕ Novo Livro"}
      </h2>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) =>
          setTitulo(e.target.value)
        }
        required
      />

      <input
        type="text"
        placeholder="Autor"
        value={autor}
        onChange={(e) =>
          setAutor(e.target.value)
        }
        required
      />

      <input
        type="number"
        placeholder="Ano"
        value={ano}
        onChange={(e) =>
          setAno(e.target.value)
        }
        required
      />

      <input
        type="text"
        placeholder="Gênero"
        value={genero}
        onChange={(e) =>
          setGenero(e.target.value)
        }
        required
      />

      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) =>
          setIsbn(e.target.value)
        }
        required
      />

      <button type="submit">
        {livroEditando
          ? "Atualizar Livro"
          : "Cadastrar Livro"}
      </button>
    </form>
  );
}

export default FormularioLivro;