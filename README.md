# Feedback de Inglês

Ferramenta web que transforma fotos de atividades de inglês corrigidas à mão em feedback individual para cada aluno, gerado por IA.

## O problema

Uma professora de inglês corrige atividades de turmas inteiras à mão. Depois da correção, ainda falta a parte mais demorada: escrever um retorno individual pra cada aluno — o que acertou, o que errou, e como melhorar. Feito manualmente, isso consome horas que poderiam ir para o preparo de aula.

## A solução

A professora tira fotos das atividades, envia pela página, revisa a transcrição extraída pela IA (etapa importante: erro de transcrição vira feedback errado) e gera o feedback de cada aluno com um clique. O texto final pode ser copiado direto para envio.

## Como funciona

1. **Login** — acesso restrito por usuário e senha, sem cadastro público.
2. **Upload** — até várias fotos de atividades por vez, com redimensionamento automático no navegador antes do envio (evita travar em fotos grandes de celular).
3. **Transcrição** — a IA lê cada foto e extrai nome, questão e resposta do aluno numa tabela editável.
4. **Conferência** — a professora corrige diretamente na tabela qualquer erro de leitura antes de seguir.
5. **Geração de feedback** — a partir da tabela revisada, a IA escreve um feedback individual por aluno, com tom ajustável por usuário logado (ex: mais acolhedor para crianças, mais direto para turmas de ensino médio).

## Stack

- **Frontend**: HTML, CSS e JavaScript puro (sem framework)
- **Backend**: Node.js + Express
- **IA**: API da Anthropic (Claude), com visão computacional para leitura das fotos
- **Sessão**: `express-session`, autenticação simples via `.env`
- **Deploy**: Render

## Acesso

O projeto está no ar em **[feedbacks-plataform.onrender.com](https://feedbacks-plataform.onrender.com)**, hospedado no Render. O acesso é restrito: só entra quem tem usuário e senha.

### Rodando localmente (desenvolvimento)

```
npm install
```

Crie um arquivo `.env` na raiz com:

```
USUARIO_1=...
SENHA_1=...
USUARIO_2=...
SENHA_2=...
SESSION_SECRET=...
ANTHROPIC_API_KEY=...
```

```
node server.js
```

Acesse `localhost:3000`.

## Notas de projeto

O `docs/etapas.md` documenta o roteiro de construção passo a passo, e o `docs/prompts.md` traz os prompts usados na integração com a IA — incluindo o histórico de ajustes feitos depois dos primeiros testes com fotos reais.
