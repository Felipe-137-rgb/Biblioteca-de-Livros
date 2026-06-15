from pydantic import BaseModel

# =========================
# LIVROS
# =========================

class LivroBase(BaseModel):
    titulo: str
    autor: str
    ano: int
    genero: str
    isbn: str

class LivroCriar(LivroBase):
    pass

class LivroAtualizar(LivroBase):
    pass

class LivroResposta(LivroBase):
    id: int

    class Config:
        from_attributes = True


# =========================
# USUÁRIOS
# =========================

class UsuarioCriar(BaseModel):
    email: str
    senha: str

class UsuarioLogin(BaseModel):
    email: str
    senha: str

class UsuarioResposta(BaseModel):
    id: int
    email: str

    class Config:
        from_attributes = True


# =========================
# TOKEN JWT
# =========================

class Token(BaseModel):
    access_token: str
    token_type: str