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

app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] - Método: ${req.method} | URL: ${req.url}`);
  next();
});


app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Biblioteca Escolar no ar!' });
});
app.get('/livros', (req, res) => {
  res.json(livros);
});
app.post('/livros', (req, res) => {
  const { titulo, autor } = req.body;
  if (!titulo || !autor) {
    return res.status(400).json({ erro: 'Título e autor são obrigatórios.' });
  }
  const novoLivro = { id: livros.length + 1, titulo, autor };
  livros.push(novoLivro);
  res.status(201).json(novoLivro);
});
app.put('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const livro = livros.find(l => l.id === id);
  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado.' });

  const { titulo, autor } = req.body;
  if (titulo) livro.titulo = titulo;
  if (autor) livro.autor = autor;
  res.json(livro);
});
app.delete('/livros/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = livros.findIndex(l => l.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Livro não encontrado.' });

  livros.splice(index, 1);
  res.status(204).send();
});

