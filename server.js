const {transcrever} = require('./claude.js');

const express = require('express');
const app = express();

app.use(express.json());

app.use(express.static('public'));

app.get("/ping", (req, res) => {
    res.send("oi, servidor no ar!");
});

app.post("/transcrever", (req, res) => {
    const resultado = transcrever();
    res.json(resultado);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});