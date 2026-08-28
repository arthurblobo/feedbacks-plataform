const {transcrever} = require('./claude.js');

const express = require('express');
const app = express();

app.use(express.json({ limit: "10mb" }));

app.use(express.static('public'));

app.get("/ping", (req, res) => {
    res.send("oi, servidor no ar!");
});

app.post("/transcrever", (req, res) => {
    const fotos = req.body.fotos;

    fotos.forEach(foto => {
        console.log(`recebida imagem "${foto.nome}" do tipo ${foto.tipo} com tamanho ${foto.tamanho} bytes`);
    });

    const resultado = transcrever();
    res.json(resultado);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});