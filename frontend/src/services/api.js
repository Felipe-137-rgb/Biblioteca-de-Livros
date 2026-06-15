import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:8000",
});

// Envia automaticamente o JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Se o token expirar, faz logout automático
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");

      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default api;

// =======================
// AUTH
// =======================

export const login = async (email, senha) => {
  const response = await api.post("/auth/login", {
    email,
    senha,
  });

  return response.data;
};

export const registrar = async (email, senha) => {
  const response = await api.post(
    "/auth/registrar",
    {
      email,
      senha,
    }
  );

  return response.data;
};

// =======================
// LIVROS
// =======================

export const listarLivros = async () =>
  (await api.get("/livros")).data;

export const criarLivro = async (livro) =>
  (await api.post("/livros", livro)).data;

export const atualizarLivro = async (
  id,
  livro
) =>
  (
    await api.put(
      `/livros/${id}`,
      livro
    )
  ).data;

export const removerLivro = async (id) =>
  await api.delete(`/livros/${id}`);