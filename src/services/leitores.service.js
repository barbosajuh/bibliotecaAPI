import * as leitorModel from '../models/leitor.model.js';

export async function listarLeitores() {
  return leitorModel.buscarTodos();
}

export async function cadastrarLeitor(dados) {
  const nome = dados.nome;
  const email = dados.email;

  if (!nome || nome.trim().length < 2) {
    const erro = new Error('Nome do leitor é obrigatório.');
    erro.status = 400;
    throw erro;
  }

  if (!email || email.trim().length < 5) {
    const erro = new Error('Email do leitor é obrigatório.');
    erro.status = 400;
    throw erro;
  }

  const novoLeitor = {
    nome: nome.trim(),
    email: email.trim(),
    criadoEm: new Date().toISOString()
  };

  return leitorModel.inserir(novoLeitor);
}