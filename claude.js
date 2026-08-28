const USAR_MOCK = true;

function transcrever() {
  if (USAR_MOCK) {
    return [
      { nome: "Ana Silva", resposta: "She go to school every day." },
      { nome: "Bruno Costa", resposta: "I have visited Paris last year." },
      { nome: "[nome não identificado]", resposta: "[ilegível]" },
      { nome: "Carla Souza", resposta: "They was playing football." },
      { nome: "Diego Almeida", resposta: "He don't like coffee." }
    ];
  }
}

module.exports = { transcrever };