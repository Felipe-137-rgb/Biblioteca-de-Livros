import { useState } from "react";
import { registrar } from "../services/api";

function Register({ irParaLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro("");
    setSucesso("");

    try {
      await registrar({
      email,
      senha,
    });

      setSucesso(
        "Conta criada com sucesso!"
      );

      setTimeout(() => {
        irParaLogin();
      }, 1500);
    } catch (err) {
      setErro(
        err.response?.data?.detail ||
          "Erro ao criar conta."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>📚 Catálogo de Livros</h1>

        <h2>Criar Conta</h2>

        {erro && (
          <div className="erro">
            {erro}
          </div>
        )}

        {sucesso && (
          <div
            style={{
              background: "#22c55e",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {sucesso}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
            required
          />

          <button type="submit">
            Criar Conta
          </button>
        </form>

        <p className="link-auth">
          Já possui conta?

          <br />

          <span onClick={irParaLogin}>
            Entrar
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;