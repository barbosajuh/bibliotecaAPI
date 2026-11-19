import express from 'express';
import livrosRoutes from './routes/livros.routes.js';
import leitoresRoutes from './routes/leitores.routes.js';
import exemplaresRoutes from './routes/exemplares.routes.js';
import emprestimosRoutes from './routes/emprestimos.routes.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const dataHora = new Date().toISOString();
  console.log(`[${dataHora}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ mensagem: 'API da Biblioteca Escolar no ar!' });
});

app.use('/livros', livrosRoutes);
app.use('/leitores', leitoresRoutes);
app.use('/exemplares', exemplaresRoutes);
app.use('/emprestimos', emprestimosRoutes);

export default app;