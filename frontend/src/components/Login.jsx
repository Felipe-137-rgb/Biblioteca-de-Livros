import { useState } from "react";
import { login } from "../services/api";

function Login({ onLogin, irParaRegistro }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErro("");

    try {
      const resposta = await login(email, senha);

      localStorage.setItem(
        "token",
        resposta.access_token
      );

      onLogin();
    } catch (err) {
      setErro(
        err.response?.data?.detail ||
          "Erro ao fazer login."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>📚 Catálogo de Livros</h1>

        <h2>Entrar</h2>

        {erro && (
          <div className="erro">
            {erro}
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
            Entrar
          </button>
        </form>

        <p className="link-auth">
          Não possui conta?

          <br />

          <span onClick={irParaRegistro}>
            Criar conta
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;