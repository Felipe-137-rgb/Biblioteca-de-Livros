import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://biblioteca-de-livros.onrender.com",
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

export const login = async (dados) => {
  const response = await api.post("/auth/login", dados);
  return response.data;
};

export const registrar = async (dados) => {
  const response = await api.post("/auth/registrar", dados);
  return response.data;
};

// =======================
// LIVROS
// =======================

export const listarLivros = async () => {
  const response = await api.get("/livros");
  return response.data;
};

export const criarLivro = async (livro) => {
  const response = await api.post("/livros", livro);
  return response.data;
};

export const atualizarLivro = async (id, livro) => {
  const response = await api.put(`/livros/${id}`, livro);
  return response.data;
};

export const removerLivro = async (id) => {
  const response = await api.delete(`/livros/${id}`);
  return response.data;
};