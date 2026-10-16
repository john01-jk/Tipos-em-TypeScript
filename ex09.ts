export {};

// ===== Exercício 09: Lendo a resposta de uma API de clima =====

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// 1) Versão com any: o compilador deixa passar qualquer coisa
function lerComAny(json: string): void {
  const dados: any = JSON.parse(json);
  console.log(`${dados.cidade}: ${dados.temperatura.toFixed(1)}°C`);
}
// lerComAny(respostaQuebrada);
// Erro só na execução: TypeError: dados.temperatura.toFixed is not a function
// (temperatura é o texto "quente", e texto não tem toFixed). O compilador não avisou.

// 3) Função never: nunca retorna, sempre lança
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// 2) Versão segura com unknown
function lerClima(json: string): { cidade: string; temperatura: number } {
  let bruto: unknown;
  try {
    bruto = JSON.parse(json);
  } catch (erro: unknown) {
    if (erro instanceof SyntaxError) {
      falhar('JSON malformado');
    }
    throw erro;
  }

  if (typeof bruto !== 'object' || bruto === null) {
    falhar('JSON malformado');
  }
  if (!('cidade' in bruto) || typeof bruto.cidade !== 'string') {
    falhar('campo "cidade" inválido');
  }
  if (!('temperatura' in bruto) || typeof bruto.temperatura !== 'number') {
    falhar('campo "temperatura" inválido');
  }

  return { cidade: bruto.cidade, temperatura: bruto.temperatura };
}

// 4) e 5) try/catch com erro unknown, testando as três respostas
for (const resposta of [respostaOk, respostaQuebrada, respostaInvalida]) {
  try {
    const clima = lerClima(resposta);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    } else {
      console.log('Erro desconhecido');
    }
  }
}
