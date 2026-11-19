import * as livroModel from '../models/livro.model.js';

export async function listarLivros() {
  return livroModel.buscarTodos();
}

export async function cadastrarLivro(dados) {
  const titulo = dados.titulo;
  const autor = dados.autor;

  if (!titulo || titulo.trim().length < 2) {
    const erro = new Error('Título do livro é obrigatório.');
    erro.status = 400;
    throw erro;
  }

  if (!autor || autor.trim().length < 2) {
    const erro = new Error('Autor do livro é obrigatório.');
    erro.status = 400;
    throw erro;
  }

  const novoLivro = {
    titulo: titulo.trim(),
    autor: autor.trim(),
    criadoEm: new Date().toISOString()
  };

  return livroModel.inserir(novoLivro);
}