require('dotenv').config();

const {transcrever, gerarFeedbacks} = require('./claude.js');

const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json({ limit: "10mb" }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

function exigirLogin(req, res, next) {
    if (req.session.autenticado) {
        next();
    } else {
        res.redirect("/login.html");
    }
}

app.post("/login", (req, res) => {
    if (req.body.usuario === process.env.USUARIO && req.body.senha === process.env.SENHA) {
        req.session.autenticado = true;
        res.json({ ok: true });
    } else {
        res.status(401).json({ ok: false });
    }
});

function servirIndex(req, res) {
    res.sendFile(__dirname + "/public/index.html");
}

app.get("/", exigirLogin, servirIndex);
app.get("/index.html", exigirLogin, servirIndex);

app.use(express.static('public'));

app.get("/ping", (req, res) => {
    res.send("oi, servidor no ar!");
});

app.post("/transcrever", (req, res) => {
    const foto = req.body.foto;
    console.log(`recebida imagem "${foto.nome}" do tipo ${foto.tipo} com tamanho ${foto.tamanho} bytes`);

    const resultado = transcrever();
    res.json(resultado);
});

app.post("/gerar-feedbacks", (req, res) => {
    const alunos = req.body.alunos;
    const feedbacks = gerarFeedbacks(alunos);
    res.json(feedbacks);
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});