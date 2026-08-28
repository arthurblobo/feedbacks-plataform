const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/ping", (req, res) => {
    res.send("oi, servidor no ar!");
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});