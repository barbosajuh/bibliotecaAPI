import * as exemplaresService from '../services/exemplares.service.js';

export async function listar(req, res) {
  try {
    const exemplares = await exemplaresService.listarExemplares();
    return res.json(exemplares);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

export async function disponibilidade(req, res) {
  try {
    const resultado = await exemplaresService.consultarDisponibilidade(req.query.livroId);
    return res.json(resultado);
  } catch (erro) {
    let status = 400;
    if (erro.status) {
      status = erro.status;
    }
    return res.status(status).json({ erro: erro.message });
  }
}

export async function criar(req, res) {
  try {
    const exemplar = await exemplaresService.cadastrarExemplar(req.body);
    return res.status(201).json(exemplar);
  } catch (erro) {
    let status = 400;
    if (erro.status) {
      status = erro.status;
    }
    return res.status(status).json({ erro: erro.message });
  }
}