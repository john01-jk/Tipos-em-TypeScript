export {};

// ===== Exercício 05: Boletim do clima =====

type Leitura = [cidade: string, temperatura: number];

const leituras: Leitura[] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

const temperaturas: number[] = leituras.map(([, temp]) => temp);
const [minima, maxima] = extremos(temperaturas);
const media: number = temperaturas.reduce((soma, t) => soma + t, 0) / temperaturas.length;
console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

// Tupla com elemento opcional
type Contato = [nome: string, telefone: string, email?: string];
const contato1: Contato = ['Ana Lima', '(69) 3333-0000', 'ana@jornal.com'];
const contato2: Contato = ['Bruno Dias', '(69) 98888-1111'];

function mostrarContato(contato: Contato): void {
  const [nome, telefone, email] = contato;
  console.log(`${nome} | ${telefone} | ${email ?? 'sem e-mail'}`);
}
mostrarContato(contato1);
mostrarContato(contato2);

// Tupla com rest: cidade seguida de qualquer quantidade de temperaturas
type Historico = [cidade: string, ...temperaturas: number[]];
const historico: Historico = ['Curitiba', 10, 12, 14, 11, 13, 12, 14];

function mediaHistorico(h: Historico): number {
  const [, ...temps] = h;
  return temps.reduce((soma, t) => soma + t, 0) / temps.length;
}
console.log(`Média semanal de ${historico[0]}: ${mediaHistorico(historico).toFixed(1)}°C`);

// Tupla somente leitura
const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[1] = 'Manaus';
// Erro TS2540: Cannot assign to '1' because it is a read-only property.
