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

app.get('/leitores', (req, res) => {
  res.json(leitores);
});

app.post('/leitores', (req, res) => {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ erro: 'Nome e email são obrigatórios.' });
  }
  const novoLeitor = { id: leitores.length + 1, nome, email };
  leitores.push(novoLeitor);
  res.status(201).json(novoLeitor);
});

app.put('/leitores/:id', (req, res) => {
  const id = Number(req.params.id);
  const leitor = leitores.find(l => l.id === id);
  if (!leitor) return res.status(404).json({ erro: 'Leitor não encontrado.' });

  const { nome, email } = req.body;
  if (nome) leitor.nome = nome;
  if (email) leitor.email = email;
  res.json(leitor);
});

app.delete('/leitores/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = leitores.findIndex(l => l.id === id);
  if (index === -1) return res.status(404).json({ erro: 'Leitor não encontrado.' });

  leitores.splice(index, 1);
  res.status(204).send();
});

app.get('/exemplares', (req, res) => {
  res.json(exemplares);
});

app.post('/exemplares', (req, res) => {
  const { livroId, codigo } = req.body;
  const livroExiste = livros.some(l => l.id === Number(livroId));
  if (!livroExiste) return res.status(404).json({ erro: 'Livro pai não encontrado.' });

  const novoExemplar = {
    id: exemplares.length + 1,
    livroId: Number(livroId),
    codigo,
    disponivel: true
  };
  exemplares.push(novoExemplar);
  res.status(201).json(novoExemplar);
});

app.get('/exemplares/disponibilidade', (req, res) => {
  const { livroId } = req.query;
  let resultado = exemplares;
  if (livroId) {
    resultado = exemplares.filter(e => e.livroId === Number(livroId));
  }
  res.json(resultado);
});

app.get('/leitores/:id/historico', (req, res) => {
  const leitorId = Number(req.params.id);
  const historico = emprestimos.filter(e => e.leitorId === leitorId);
  res.json(historico);
});

app.post('/emprestimos', (req, res) => {
  const { leitorId, exemplarId } = req.body;

  const leitor = leitores.find(l => l.id === Number(leitorId));
  if (!leitor) return res.status(404).json({ erro: 'Leitor não encontrado.' });

  const exemplar = exemplares.find(e => e.id === Number(exemplarId));
  if (!exemplar) return res.status(404).json({ erro: 'Exemplar não encontrado.' });
  
  if (!exemplar.disponivel) {
    return res.status(400).json({ erro: 'Este exemplar não está disponível.' });
  }
  const hoje = new Date();
  const emprestimosAtivosLeitor = emprestimos.filter(e => e.leitorId === Number(leitorId) && !e.dataDevolucao);
  const temAtraso = emprestimosAtivosLeitor.some(e => new Date(e.dataPrevista) < hoje);
  if (temAtraso) {
    return res.status(403).json({ erro: 'Leitor possui empréstimos em atraso e está bloqueado.' });
  }
  if (emprestimosAtivosLeitor.length >= 3) {
    return res.status(403).json({ erro: 'Limite máximo de 3 empréstimos ativos atingido.' });
  }
  const dataEmprestimo = new Date();
  const dataPrevista = new Date();
  dataPrevista.setDate(dataEmprestimo.getDate() + 7); // Prazo de 7 dias

    const novoEmprestimo = {
    id: emprestimos.length + 1,
    leitorId: Number(leitorId),
    exemplarId: Number(exemplarId),
    dataEmprestimo: dataEmprestimo.toISOString(),
    dataPrevista: dataPrevista.toISOString(),
    dataDevolucao: null,
    multa: 0
  }; 
  exemplar.disponivel = false;
  emprestimos.push(novoEmprestimo);
  res.status(201).json(novoEmprestimo);
});

app.post('/emprestimos/:id/devolver', (req, res) => {
  const emprestimoId = Number(req.params.id);
  const emprestimo = emprestimos.find(e => e.id === emprestimoId);
  if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado.' });
  if (emprestimo.dataDevolucao) return res.status(400).json({ erro: 'Este empréstimo já foi devolvido.' });

  const dataDevolucaoReal = new Date();
  emprestimo.dataDevolucao = dataDevolucaoReal.toISOString();

  const dataPrevista = new Date(emprestimo.dataPrevista);
  if (dataDevolucaoReal > dataPrevista) {
    const diffTime = Math.abs(dataDevolucaoReal - dataPrevista);
    const diasAtraso = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    emprestimo.multa = diasAtraso * 2.00; // R$ 2,00 por dia de atraso
  } else {
    emprestimo.multa = 0;
  }

  const exemplar = exemplares.find(e => e.id === emprestimo.exemplarId);
  if (exemplar) {
    exemplar.disponivel = true;
  }
  res.json({ mensagem: 'Devolução registrada com sucesso!', emprestimo });
});

app.post('/emprestimos/:id/renovar', (req, res) => {
  const emprestimoId = Number(req.params.id);
  const emprestimo = emprestimos.find(e => e.id === emprestimoId);
  if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado.' });
  if (emprestimo.dataDevolucao) return res.status(400).json({ erro: 'Não é possível renovar um livro já devolvido.' });

  const novaDataPrevista = new Date(emprestimo.dataPrevista);
  novaDataPrevista.setDate(novaDataPrevista.getDate() + 7);
  emprestimo.dataPrevista = novaDataPrevista.toISOString();

  res.json({ mensagem: 'Empréstimo renovado com sucesso!', emprestimo });
});

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.server = app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});