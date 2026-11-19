import * as livrosService from '../services/livros.service.js';

export async function listar(req, res) {
  try {
    const livros = await livrosService.listarLivros();
    return res.json(livros);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

export async function criar(req, res) {
  try {
    const livro = await livrosService.cadastrarLivro(req.body);
    return res.status(201).json(livro);
  } catch (erro) {
    let status = 400;
    if (erro.status) {
      status = erro.status;
    }
    return res.status(status).json({ erro: erro.message });
  }
}