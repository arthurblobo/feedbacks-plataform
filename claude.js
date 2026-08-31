const Anthropic = require('@anthropic-ai/sdk');

const USAR_MOCK = false;

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function extrairTexto(resposta) {
  const blocoDeTexto = resposta.content.find(bloco => bloco.type === "text");
  return blocoDeTexto ? blocoDeTexto.text : "";
}

const PROMPT_TRANSCRICAO = `Você vai receber a foto de uma atividade de inglês de uma
criança. A atividade ainda não foi corrigida.

Extraia em formato de tabela Markdown:
Nome | Questão | O que o aluno escreveu

Regras:
- Transcreva apenas o que está visível. Não corrija, não
  complete, não interprete, não diga se a resposta está certa
  ou errada.
- Se algo estiver ilegível, escreva [ilegível] naquela célula.
- Se não conseguir identificar o nome do aluno, escreva
  [nome não identificado].
- Não gere feedback nenhum nesta etapa.

Responda apenas com a tabela, sem texto antes ou depois.`;

const PROMPT_FEEDBACK = `Você é uma professora experiente de inglês para crianças e
adolescentes. Sua especialidade é dar feedback que motiva em vez
de desanimar.

CONTEXTO
- Tema da atividade: {TEMA}
- Conteúdo cobrado: {CONTEUDO}

DADOS
{TABELA}

TAREFA
Para cada aluno, gere um feedback contendo:
1. Um ponto forte real, baseado no que ele acertou
2. O erro principal, explicado de forma simples, com o certo x
   errado usando a frase que o próprio aluno escreveu
3. Uma sugestão prática de estudo para esse ponto

REGRAS
- Português, no máximo 5 linhas por aluno
- Fale com o aluno usando "você"
- {TOM}
- Não invente erros que não estão nos dados
- Ignore linhas marcadas como [ilegível]

FECHAMENTO
Depois dos feedbacks individuais, adicione:
- VISÃO DA TURMA: os 3 erros mais frequentes
- PRIORIDADE: o que revisar na próxima aula, em ordem`;

async function transcrever(foto) {
  if (USAR_MOCK) {
    return `Nome | Questão | O que o aluno escreveu
Ana Silva | 1 | She go to school every day.
[nome não identificado] | 2 | [ilegível]`;
  }

  const base64SemPrefixo = foto.conteudo.split(",")[1];

  const resposta = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 2048,
    system: PROMPT_TRANSCRICAO,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: foto.tipo,
              data: base64SemPrefixo
            }
          }
        ]
      }
    ]
  });

  return extrairTexto(resposta);
}

const TONS_POR_USUARIO = {
  "duda.fernandes": "Tom encorajador e acolhedor, cuidado extra para não desanimar crianças, sem comparar alunos entre si",
  "ana.clara": "Tom direto e objetivo, sem infantilizar — os alunos são majoritariamente do ensino médio, então pode ser mais cru, sem precisar suavizar tanto"
};

const TOM_PADRAO = "Tom encorajador, sem comparar alunos entre si";

async function gerarFeedbacks(tema, conteudo, tabela, usuario) {
  if (USAR_MOCK) {
    return `Ana Silva: Bom trabalho usando o vocabulário do tema! Só repare que o verbo "go" precisa de "s" na terceira pessoa: "she goes", não "she go". Tente reescrever a frase treinando essa regra.

VISÃO DA TURMA: erro mais comum foi a concordância verbal na terceira pessoa.
PRIORIDADE: revisar o "s" da terceira pessoa do presente simples.`;
  }

  const tom = TONS_POR_USUARIO[usuario] || TOM_PADRAO;

  const prompt = PROMPT_FEEDBACK
    .replace("{TEMA}", tema)
    .replace("{CONTEUDO}", conteudo)
    .replace("{TABELA}", tabela)
    .replace("{TOM}", tom);

  const resposta = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 2048,
    messages: [
      { role: "user", content: prompt }
    ]
  });

  return extrairTexto(resposta);
}

module.exports = { transcrever, gerarFeedbacks };
