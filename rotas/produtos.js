import express from 'express';

import produtos from '../data/data_produtos.js';

const router = express.Router();


// GET
router.get('/', (req, res) => {

    res.json(produtos);

});


// POST
router.post('/', (req, res) => {

    const { id, nome, descricao, img, preco } = req.body;

    if (!id || !nome || !descricao || !img || !preco) {

        return res.status(400).json({
            erro: "Todos os campos são obrigatórios!"
        });

    }

    const existeProduto = produtos.some(item => item.id == id);

    if (existeProduto) {

        return res.status(400).json({
            erro: "Produto já cadastrado!"
        });

    }

    const novoProduto = {
        id: Number(id),
        nome,
        descricao,
        img,
        preco: Number(preco)
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);

});


// PUT
router.put('/:id', (req, res) => {

    const id = req.params.id;

    const index = produtos.findIndex(item => item.id == id);

    if (index < 0) {

        return res.status(404).json({
            erro: "Produto não encontrado!"
        });

    }

    const { nome, descricao, img, preco } = req.body;

    produtos[index] = {
        ...produtos[index],
        nome: nome !== undefined ? nome : produtos[index].nome,
        descricao: descricao !== undefined ? descricao : produtos[index].descricao,
        img: img !== undefined ? img : produtos[index].img,
        preco: preco !== undefined ? Number(preco) : produtos[index].preco
    };

    res.json(produtos[index]);

});


// DELETE
router.delete('/:id', (req, res) => {

    const id = req.params.id;

    const index = produtos.findIndex(item => item.id == id);

    if (index < 0) {

        return res.status(404).json({
            erro: "Produto não encontrado!"
        });

    }

    produtos.splice(index, 1);

    res.json({
        mensagem: "Produto deletado com sucesso!"
    });

});


export default router;