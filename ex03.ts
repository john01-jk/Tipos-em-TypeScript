export {};

// ===== Exercício 03: Ficha de paciente =====

// Tipo de objeto escrito direto na anotação (sem type nem interface)
const paciente: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'Pedro Souza', telefone: '(69) 99999-0000' },
};

// Segundo paciente: só os campos obrigatórios. Uso typeof para reaproveitar o tipo acima
const paciente2: typeof paciente = {
  cpf: '987.654.321-00',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false,
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  const alergias =
    p.alergias && p.alergias.length > 0
      ? `Alergias: ${p.alergias.join(', ')}`
      : 'Sem alergias registradas';
  return `${p.nome}, ${p.idade} anos. ${alergias}`;
}

console.log(resumo(paciente));
console.log(resumo(paciente2));

// Erro 1: cpf é readonly
// paciente.cpf = '000.000.000-00';
// Erro TS2540: Cannot assign to 'cpf' because it is a read-only property.

// Erro 2: peso não existe no tipo do paciente
// paciente.peso = 70;
// Erro TS2339: Property 'peso' does not exist on type '{ readonly cpf: string; nome: string; idade: number; plano: boolean; alergias?: string[] | undefined; contatoEmergencia?: { nome: string; telefone: string; } | undefined; }'.

// ----- Reflexão: object × Object × {} -----
let dados: object = paciente;
// console.log(dados.nome);
// Erro TS2339: Property 'nome' does not exist on type 'object'.
// Por que dá erro: o tipo object só diz "isto é um valor não primitivo" (objeto,
// array, função...). Ele não diz quais propriedades existem, então o compilador
// não deixa ler dados.nome. Eu perdi a informação do tipo ao atribuir paciente a object.

// {} significa "qualquer valor que não seja null nem undefined", então aceita 10
// (number, string, boolean, objetos...).
let x: {} = 10;
// object só aceita valores não primitivos, e 10 é um primitivo, então dá erro:
// let y: object = 10;
// Erro TS2322: Type 'number' is not assignable to type 'object'.
