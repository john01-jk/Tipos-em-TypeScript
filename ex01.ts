export {};

// ===== Exercício 01: Caixa da padaria =====

// 1) Variáveis com anotação de tipo explícita
const nomeProduto1: string = 'Pão francês';
const precoUnitario1: number = 0.75;
let quantidade1: number = 12;

const nomeProduto2: string = 'Bolo de cenoura';
const precoUnitario2: number = 18.5;
const quantidade2: number = 2;

// 2) Sem anotação: o TypeScript infere o tipo pelo valor inicial
let aberta = true;
// Passando o mouse no VS Code aparece: let aberta: boolean
// Tipo inferido: boolean (se fosse const, o tipo inferido seria o literal true)

// 3) Cálculos
const subtotal1: number = precoUnitario1 * quantidade1;
const subtotal2: number = precoUnitario2 * quantidade2;
const total: number = subtotal1 + subtotal2;

// 4) Separador numérico (só deixa o número mais legível, o valor é o mesmo)
const paesVendidosNoAno: number = 1_250_000;

// 5) Hexadecimal: 0x1A é 1*16 + 10 = 26 em decimal
const codigoCategoria: number = 0x1a;

console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesVendidosNoAno}`);
console.log(`Categoria: ${codigoCategoria}`);

// 6) Provocando um erro: quantidade1 é number, não aceita texto
// quantidade1 = 'doze';
// Erro TS2322: Type 'string' is not assignable to type 'number'.
