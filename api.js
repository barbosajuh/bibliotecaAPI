import express from 'express';

const app = express();
const PORTA = 3000;

app.use(express.json());

let livros = [
  { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien' },
  { id: 2, titulo: 'Dom Casmurro', autor: 'Machado de Assis' }
];

let exemplares = [
  { id: 1, livroId: 1, codigo: 'EX-001', disponivel: true },
  { id: 2, livroId: 1, codigo: 'EX-002', disponivel: false },
  { id: 3, livroId: 2, codigo: 'EX-003', disponivel: true }
];

let leitores = [
  { id: 1, nome: 'Ana Clara Forti Garcia', email: 'ana@email.com' },
  { id: 2, nome: 'Luiz Felipe Freitas Ribeiro', email: 'luiz@email.com' }
];

let emprestimos = [];