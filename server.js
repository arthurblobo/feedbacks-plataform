require('dotenv').config();

const {transcrever, gerarFeedbacks} = require('./claude.js');

const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.json({ limit: "20mb" }));

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

const usuariosValidos = [
    { usuario: process.env.USUARIO_1, senha: process.env.SENHA_1 },
    { usuario: process.env.USUARIO_2, senha: process.env.SENHA_2 }
];

app.post("/login", (req, res) => {
    const valido = usuariosValidos.some(
        u => u.usuario === req.body.usuario && u.senha === req.body.senha
    );

    if (valido) {
        req.session.autenticado = true;
        req.session.usuario = req.body.usuario;
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

app.post("/transcrever", async (req, res) => {
    try {
        const foto = req.body.foto;
        console.log(`recebido arquivo "${foto.nome}" do tipo ${foto.tipo} com tamanho ${foto.tamanho} bytes`);

        const tabela = await transcrever(foto);
        res.json({ tabela });
    } catch (erro) {
        console.error("Erro ao transcrever:", erro);
        res.status(500).json({ erro: "Falha ao transcrever a imagem." });
    }
});

app.post("/gerar-feedbacks", async (req, res) => {
    try {
        const { tema, conteudo, tabela } = req.body;
        const feedbacks = await gerarFeedbacks(tema, conteudo, tabela, req.session.usuario);
        res.json({ feedbacks });
    } catch (erro) {
        console.error("Erro ao gerar feedbacks:", erro);
        res.status(500).json({ erro: "Falha ao gerar feedbacks." });
    }
});

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});