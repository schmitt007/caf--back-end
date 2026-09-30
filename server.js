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

app.use(express.static(
    path.join(__dirname, 'CAFE AROMA', 'public')
));

app.use('/img', express.static(
    path.join(__dirname, 'CAFE AROMA', 'img')
));

app.use('/api/cardapio', cardapioRouter);

app.use('/api/produtos', produtosRouter);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});