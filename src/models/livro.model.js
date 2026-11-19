import { ObjectId } from 'mongodb';
import { obterColecao } from '../config/database.js';

const COLECAO = 'livros';

export async function buscarTodos() {
  return obterColecao(COLECAO).find().toArray();
}

export async function buscarPorId(id) {
  return obterColecao(COLECAO).findOne({ _id: new ObjectId(id) });
}

export async function inserir(dados) {
  const resultado = await obterColecao(COLECAO).insertOne(dados);
  return { _id: resultado.insertedId, ...dados };
}