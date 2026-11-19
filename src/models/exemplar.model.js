import { ObjectId } from 'mongodb';
import { obterColecao } from '../config/database.js';

const COLECAO = 'exemplares';

export async function buscarTodos() {
  return obterColecao(COLECAO).find().toArray();
}

export async function buscarPorLivroId(livroId) {
  return obterColecao(COLECAO).find({ livroId: String(livroId) }).toArray();
}

export async function buscarPorId(id) {
  return obterColecao(COLECAO).findOne({ _id: new ObjectId(id) });
}

export async function inserir(dados) {
  const resultado = await obterColecao(COLECAO).insertOne(dados);
  return { _id: resultado.insertedId, ...dados };
}

export async function atualizarDisponibilidade(id, disponivel) {
  const filtro = { _id: new ObjectId(id) };
  await obterColecao(COLECAO).updateOne(filtro, { $set: { disponivel: disponivel } });
  return obterColecao(COLECAO).findOne(filtro);
}