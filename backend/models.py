from sqlalchemy import Column, Integer, String
from database import Base

class LivroModel(Base):
    __tablename__ = "livros"

    id = Column(Integer, primary_key=True, index=True)

    titulo = Column(String, nullable=False)
    autor = Column(String, nullable=False)
    ano = Column(Integer, nullable=False)
    genero = Column(String, nullable=False)

    isbn = Column(String, nullable=False, unique=True, index=True)


class UsuarioModel(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)

    email = Column(String, unique=True, nullable=False, index=True)

    senha_hash = Column(String, nullable=False)