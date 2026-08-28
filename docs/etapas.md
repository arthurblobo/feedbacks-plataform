# Roteiro de construção

Projeto: gerador de feedback de atividades de inglês.

Regra geral: só passe para a etapa seguinte quando o critério de
pronto da atual estiver cumprido. Faça um commit ao fim de cada
etapa.

**Estado atual:** sem crédito na API. Todo o desenvolvimento
local (etapas 1 a 8) usa mock. A integração real é o primeiro
passo da etapa 9, imediatamente antes do deploy.

**Antes de colocar crédito:** teste a leitura de folhas reais no
chat do Claude. O mock valida a construção; só a leitura real
valida a ideia.

---

## Etapa 1 — A página, sem funcionar

**Construir:** `public/index.html` com um título, um campo de
upload de arquivos (aceitando múltiplos), dois campos de texto
(tema da atividade e conteúdo cobrado) e dois botões
("Transcrever" e "Gerar feedbacks").

**Aprender:** estrutura básica de HTML, o que são tags, o que faz
um `<input type="file">`.

**Pronto quando:** você abre o arquivo no navegador com dois
cliques e vê o formulário. Nada precisa funcionar ao clicar.

**Commit:** `etapa 1: formulário html`

---

## Etapa 2 — O servidor diz "oi"

**Construir:** `server.js` que sobe um servidor com Express e
responde uma mensagem de texto quando você acessa
`localhost:3000`.

**Instalar:** `npm install express`

**Aprender:** o que é um servidor, o que é uma rota, o que
significa "escutar na porta 3000". Por que o terminal fica
travado enquanto ele roda (não travou: está rodando).

**Pronto quando:** você digita `node server.js`, abre
`localhost:3000` no navegador e vê sua mensagem.

**Commit:** `etapa 2: servidor express respondendo`

---

## Etapa 3 — Os dois se conversam

**Construir:** o servidor passa a entregar o `index.html` da
etapa 1. O botão da página chama o servidor e mostra a resposta
na tela.

**Aprender:** o que é servir arquivos estáticos, o que é `fetch`,
a diferença entre o código que roda no navegador e o que roda no
servidor.

**Pronto quando:** você acessa `localhost:3000`, vê seu
formulário, clica no botão e algo vindo do servidor aparece na
página.

**Commit:** `etapa 3: frontend e backend conectados`

---

## Etapa 4 — A rota de transcrição, com mock

**Construir:** o arquivo `claude.js` com a função `transcrever()`
e a flag `USAR_MOCK`. Por enquanto ela devolve uma tabela fixa,
escrita à mão por você. No `server.js`, uma rota
`POST /transcrever` que chama essa função. O botão "Transcrever"
da página chama a rota e mostra o resultado.

**Aprender:** diferença entre GET e POST, o que é JSON, como o
navegador envia dados no corpo de uma requisição, o que faz
`module.exports`.

**A descobrir sozinho:** como o Express lê o corpo de um POST
(procure `express.json()`); como fazer `fetch` mandar POST (ele
aceita um segundo argumento); como ler uma resposta JSON (existe
um irmão do `.text()`).

**Sugestão para o mock:** escreva uma tabela com 5 alunos e
inclua um `[ilegível]` e um `[nome não identificado]`. Testar só
com dado perfeito esconde problemas.

**Pronto quando:** você clica em "Transcrever" e a tabela falsa
aparece na página.

**Commit:** `etapa 4: rota de transcrição com mock`

---

## Etapa 5 — A imagem chega ao servidor

**Construir:** o formulário envia a imagem selecionada para o
servidor. O servidor confirma que recebeu, imprimindo no console
o tamanho e o tipo do arquivo. A resposta continua vindo do mock.

**Aprender:** o que é base64, por que a imagem precisa virar
texto para trafegar, como o `FileReader` funciona no navegador.

**Pronto quando:** você seleciona uma foto, clica no botão, e o
terminal do servidor imprime algo como "recebida imagem de
340 KB". A tabela falsa continua aparecendo na tela.

**Commit:** `etapa 5: envio de imagem para o servidor`

---

## Etapa 6 — Várias imagens, com redimensionamento

**Construir:** aceitar até 20 fotos. Antes de enviar, o navegador
reduz cada imagem. Enviar uma de cada vez, mostrando o progresso
("3 de 18").

**Aprender:** por que arquivos grandes quebram o envio, o que é o
elemento `canvas`, o que significa código assíncrono.

**Pronto quando:** você envia 5 fotos de uma vez, vê o progresso
avançar e o servidor confirma o recebimento das 5.

**Commit:** `etapa 6: lote de imagens com redimensionamento`

---

## Etapa 7 — Polir a interface

Ainda com mock.

**Construir:** CSS para deixar a página apresentável. A área
editável onde a professora confere a transcrição antes de gerar
os feedbacks. Botão de copiar em cada feedback. Mensagens de erro
legíveis quando algo falha.

**Aprender:** noções de CSS, o que é um `<textarea>`, como copiar
para a área de transferência pelo navegador.

**Pronto quando:** você mostra a tela para sua amiga e ela
entende o que fazer sem você explicar.

**Commit:** `etapa 7: interface finalizada`

---

## Etapa 8 — Login

**Construir:** uma senha única, validada no servidor. Sem
cadastro, sem banco de dados. A senha fica no `.env`.

**Aprender:** por que validar no servidor e não no navegador, o
que é uma sessão.

**Pronto quando:** sem a senha, ninguém passa da primeira tela.

**Commit:** `etapa 8: autenticação`

---

## Etapa 9 — Integração real e deploy

Esta é a única etapa que exige crédito na API. Faça na ordem.

### 9a — Trocar o mock pela API, ainda local

**Instalar:** `npm install @anthropic-ai/sdk dotenv`

**Criar:** o `.env` com a chave. Confirme antes que o
`.gitignore` já tem a linha `.env`.

**Construir:** dentro do `claude.js`, a chamada real usando os
prompts de `prompts.md`. Trocar `USAR_MOCK` para `false`.

**Aprender:** o que é uma variável de ambiente, por que a chave
fica no servidor, o que é um SDK, o que é um system prompt.

**Espere quebrar aqui.** A resposta real vem em formato
diferente do mock que você inventou: pode ter texto antes da
tabela, colunas com nome ligeiramente diferente, quebras de linha
em outro lugar. Ajustar isso é trabalho normal, e é muito mais
fácil no seu terminal do que na nuvem.

**Se algum arquivo além do `claude.js` precisar mudar muito**, a
separação da etapa 4 não ficou boa. Vale revisar.

**Pronto quando:** o fluxo completo funciona local, com fotos
reais, e o resultado é bom o suficiente para sua amiga usar.

**Commit:** `etapa 9a: integração com a api`

### 9b — Subir

**Antes:** configurar o limite de gasto mensal no Console da
Anthropic e desligar o auto-reload.

**Construir:** subir para o Cloudflare ou Render. A chave vira
variável de ambiente na plataforma, nunca vai junto com o código.

**Aprender:** a diferença entre rodar local e em produção, o que
é uma variável de ambiente na nuvem.

**Pronto quando:** sua amiga acessa de outro computador, faz
login e gera os feedbacks dela.

**Commit:** `etapa 9b: deploy`

---

## Depois

Escrever o `README.md` explicando o problema real e a solução.
É o que transforma o repositório em portfólio.

Ideias para crescer, se fizer sentido: salvar o histórico por
turma para comparar meses, exportar os feedbacks em PDF,
permitir mais de uma turma.