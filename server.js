import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import cardapioRouter from './rotas/cardapio.js';
import produtosRouter from './rotas/produtos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Imagens
app.use('/img', express.static(path.join(__dirname, 'img')));

// Rotas
app.use('/api/cardapio', cardapioRouter);
app.use('/api/produtos', produtosRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});