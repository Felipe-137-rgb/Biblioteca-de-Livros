function ListaLivros({
  livros,
  onEditar,
  onRemover,
}) {
  if (livros.length === 0) {
    return (
      <div className="sem-livros">
        📚 Nenhum livro cadastrado.
      </div>
    );
  }

  return (
    <div className="lista">
      <h2>📖 Livros Cadastrados</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano</th>
            <th>Gênero</th>
            <th>ISBN</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.id}</td>

              <td>{livro.titulo}</td>

              <td>{livro.autor}</td>

              <td>{livro.ano}</td>

              <td>{livro.genero}</td>

              <td>{livro.isbn}</td>

              <td>
                <button
                  className="btn-editar"
                  onClick={() => onEditar(livro)}
                >
                  ✏️ Editar
                </button>

                <button
                  className="btn-remover"
                  onClick={() =>
                    onRemover(livro.id)
                  }
                >
                  🗑️ Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListaLivros;