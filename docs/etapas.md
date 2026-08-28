# Roteiro de construção

Projeto: gerador de feedback de atividades de inglês.

Regra geral: só passe para a etapa seguinte quando o critério de
pronto da atual estiver cumprido. Faça um commit ao fim de cada
etapa.

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

## Etapa 4 — Primeira resposta da API

**Construir:** o servidor chama a API da Anthropic com um texto
fixo (algo como "responda apenas OK") e devolve a resposta para a
página.

**Instalar:** `npm install @anthropic-ai/sdk dotenv`

**Criar:** o arquivo `.env` com sua chave. Confirme antes que o
`.gitignore` já tem a linha `.env`.

**Aprender:** o que é uma variável de ambiente, por que a chave
fica no servidor, o que é um SDK.

**Pronto quando:** você clica no botão e uma resposta escrita
pelo Claude aparece na página. Este é o marco mais importante do
projeto.

**Commit:** `etapa 4: integração com a api`

---

## Etapa 5 — Uma imagem

**Construir:** trocar o texto fixo por uma imagem enviada pelo
formulário. Uma só, por enquanto.

**Aprender:** o que é base64, por que a imagem precisa virar
texto para trafegar, como o `FileReader` funciona no navegador.

**Pronto quando:** você envia a foto de uma atividade e o Claude
descreve ou transcreve o que está nela.

**Commit:** `etapa 5: envio de imagem`

---

## Etapa 6 — Várias imagens, com redimensionamento

**Construir:** aceitar até 20 fotos. Antes de enviar, o navegador
reduz cada imagem. Enviar uma de cada vez, mostrando o progresso
("3 de 18").

**Aprender:** por que arquivos grandes quebram o envio, o que é o
elemento `canvas`, o que significa código assíncrono.

**Pronto quando:** você envia 5 fotos de uma vez, vê o progresso
avançar e recebe as 5 respostas.

**Commit:** `etapa 6: lote de imagens com redimensionamento`

---

## Etapa 7 — Os prompts de verdade

**Construir:** o botão "Transcrever" usa o prompt de extração e
mostra a tabela numa área editável, para conferência. O botão
"Gerar feedbacks" pega a tabela revisada e aplica o prompt de
feedback.

Os dois prompts estão em `prompts.md`.

**Aprender:** o que é um system prompt, por que separar
transcrição de geração, por que a conferência humana no meio
importa.

**Pronto quando:** o fluxo completo funciona com fotos reais e o
resultado é bom o suficiente para sua amiga usar.

**Commit:** `etapa 7: prompts de transcrição e feedback`

---

## Etapa 8 — Login

**Construir:** uma senha única, validada no servidor. Sem
cadastro, sem banco de dados. A senha fica no `.env`.

**Aprender:** por que validar no servidor e não no navegador, o
que é uma sessão.

**Pronto quando:** sem a senha, ninguém passa da primeira tela.

**Commit:** `etapa 8: autenticação`

---

## Etapa 9 — Deploy

**Construir:** subir para o Cloudflare ou Render. A chave vira
variável de ambiente na plataforma, nunca vai junto com o código.

**Antes:** configurar o limite de gasto mensal no Console da
Anthropic.

**Aprender:** a diferença entre rodar local e em produção, o que
é uma variável de ambiente na nuvem.

**Pronto quando:** sua amiga acessa de outro computador, faz
login e gera os feedbacks dela.

**Commit:** `etapa 9: deploy`

---

## Depois

Escrever o `README.md` explicando o problema real e a solução.
É o que transforma o repositório em portfólio.

Ideias para crescer, se fizer sentido: salvar o histórico por
turma para comparar meses, exportar os feedbacks em PDF,
permitir mais de uma turma.