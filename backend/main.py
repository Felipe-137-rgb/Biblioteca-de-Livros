from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from database import engine, get_db
from models import Base, LivroModel, UsuarioModel
from schemas import (
    LivroCriar,
    LivroAtualizar,
    LivroResposta,
    UsuarioCriar,
    UsuarioLogin,
    UsuarioResposta,
    Token
)

from auth import (
    gerar_hash_senha,
    verificar_senha,
    criar_token_acesso,
    get_usuario_atual
)

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Catálogo de Livros")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================================
# AUTENTICAÇÃO
# ==================================

@app.post(
    "/auth/registrar",
    response_model=UsuarioResposta,
    status_code=201
)
def registrar_usuario(
    dados: UsuarioCriar,
    db: Session = Depends(get_db)
):
    usuario = UsuarioModel(
        email=dados.email,
        senha_hash=gerar_hash_senha(dados.senha)
    )

    db.add(usuario)

    try:
        db.commit()
        db.refresh(usuario)

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="E-mail já cadastrado"
        )

    return usuario


@app.post(
    "/auth/login",
    response_model=Token
)
def login(
    dados: UsuarioLogin,
    db: Session = Depends(get_db)
):
    usuario = (
        db.query(UsuarioModel)
        .filter(
            UsuarioModel.email == dados.email
        )
        .first()
    )

    if not usuario:
        raise HTTPException(
            status_code=401,
            detail="Credenciais inválidas"
        )

    if not verificar_senha(
        dados.senha,
        usuario.senha_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Credenciais inválidas"
        )

    token = criar_token_acesso(
        {"sub": usuario.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


@app.get(
    "/auth/perfil",
    response_model=UsuarioResposta
)
def perfil(
    usuario: UsuarioModel = Depends(
        get_usuario_atual
    )
):
    return usuario


# ==================================
# LIVROS
# ==================================

@app.get(
    "/livros",
    response_model=list[LivroResposta]
)
def listar_livros(
    db: Session = Depends(get_db)
):
    return db.query(LivroModel).all()


@app.get(
    "/livros/{livro_id}",
    response_model=LivroResposta
)
def buscar_livro(
    livro_id: int,
    db: Session = Depends(get_db)
):
    livro = (
        db.query(LivroModel)
        .filter(
            LivroModel.id == livro_id
        )
        .first()
    )

    if not livro:
        raise HTTPException(
            status_code=404,
            detail="Livro não encontrado"
        )

    return livro


@app.post(
    "/livros",
    response_model=LivroResposta,
    status_code=201
)
def criar_livro(
    dados: LivroCriar,
    db: Session = Depends(get_db),
    usuario: UsuarioModel = Depends(
        get_usuario_atual
    )
):
    livro = LivroModel(**dados.model_dump())

    db.add(livro)

    try:
        db.commit()
        db.refresh(livro)

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="ISBN já cadastrado"
        )

    return livro


@app.put(
    "/livros/{livro_id}",
    response_model=LivroResposta
)
def atualizar_livro(
    livro_id: int,
    dados: LivroAtualizar,
    db: Session = Depends(get_db),
    usuario: UsuarioModel = Depends(
        get_usuario_atual
    )
):
    livro = (
        db.query(LivroModel)
        .filter(
            LivroModel.id == livro_id
        )
        .first()
    )

    if not livro:
        raise HTTPException(
            status_code=404,
            detail="Livro não encontrado"
        )

    livro.titulo = dados.titulo
    livro.autor = dados.autor
    livro.ano = dados.ano
    livro.genero = dados.genero
    livro.isbn = dados.isbn

    try:
        db.commit()
        db.refresh(livro)

    except IntegrityError:
        db.rollback()

        raise HTTPException(
            status_code=400,
            detail="ISBN já cadastrado"
        )

    return livro


@app.delete(
    "/livros/{livro_id}",
    status_code=204
)
def remover_livro(
    livro_id: int,
    db: Session = Depends(get_db),
    usuario: UsuarioModel = Depends(
        get_usuario_atual
    )
):
    livro = (
        db.query(LivroModel)
        .filter(
            LivroModel.id == livro_id
        )
        .first()
    )

    if not livro:
        raise HTTPException(
            status_code=404,
            detail="Livro não encontrado"
        )

    db.delete(livro)
    db.commit()