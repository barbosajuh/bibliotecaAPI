import * as leitoresService from '../services/leitores.service.js';

export async function listar(req, res) {
  try {
    const leitores = await leitoresService.listarLeitores();
    return res.json(leitores);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

export async function criar(req, res) {
  try {
    const leitor = await leitoresService.cadastrarLeitor(req.body);
    return res.status(201).json(leitor);
  } catch (erro) {
    let status = 400;
    if (erro.status) {
      status = erro.status;
    }
    return res.status(status).json({ erro: erro.message });
  }
}