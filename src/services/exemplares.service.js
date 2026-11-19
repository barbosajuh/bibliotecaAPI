import * as exemplarModel from '../models/exemplar.model.js';

export async function listarExemplares() {
  return exemplarModel.buscarTodos();
}

export async function consultarDisponibilidade(livroId) {
  if (!livroId) {
    const erro = new Error('Informe o livroId para consultar a disponibilidade.');
    erro.status = 400;
    throw erro;
  }

  const exemplares = await exemplarModel.buscarPorLivroId(livroId);
  const disponiveis = exemplares.filter((item) => item.disponivel === true);

  return {
    livroId: String(livroId),
    totalExemplares: exemplares.length,
    quantidadeDisponiveis: disponiveis.length,
    exemplares: exemplares
  };
}

export async function cadastrarExemplar(dados) {
  const livroId = dados.livroId;
  const codigo = dados.codigo;

  if (!livroId) {
    const erro = new Error('livroId é obrigatório.');
    erro.status = 400;
    throw erro;
  }

  let codigoFinal = `EX-${Date.now()}`;
  if (codigo && String(codigo).trim().length > 0) {
    codigoFinal = String(codigo).trim();
  }

  const novoExemplar = {
    livroId: String(livroId),
    codigo: codigoFinal,
    disponivel: true
  };

  return exemplarModel.inserir(novoExemplar);
}