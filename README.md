# Catálogo de Livros

Sistema de gerenciamento de livros desenvolvido com FastAPI, React e PostgreSQL.

## Tecnologias Utilizadas

### Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* JWT Authentication
* Passlib (Hash de Senhas)

### Frontend

* React
* Vite
* Axios

## Funcionalidades

* Cadastro de usuários
* Login com autenticação JWT
* Cadastro de livros
* Listagem de livros
* Atualização de livros
* Remoção de livros
* Rotas protegidas por autenticação

## Variáveis de Ambiente

Backend (.env):

```env
DATABASE_URL=sua_url_postgresql
SECRET_KEY=sua_chave_secreta
```

## Executando o Projeto

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Deploy

* Backend: Render
* Frontend: Render
* Banco de Dados: PostgreSQL

## Autor

Felipe Augusto
