export {};

// ===== Exercício 04: Lista de compras do mês =====

const itens: { nome: string; preco: number; quantidade: number }[] = [
  { nome: 'Arroz 5kg', preco: 28.9, quantidade: 1 },
  { nome: 'Feijão 1kg', preco: 8.49, quantidade: 2 },
  { nome: 'Leite 1L', preco: 4.99, quantidade: 6 },
  { nome: 'Café 500g', preco: 17.9, quantidade: 1 },
  { nome: 'Sabão em pó', preco: 12.5, quantidade: 1 },
];

// Só map, filter e reduce (sem for)
const nomes: string[] = itens.map((item) => item.nome);
const caros = itens.filter((item) => item.preco > 10);
const total: number = itens.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

console.log(`Itens: ${nomes.join(', ')}`);
console.log(`Acima de R$ 10: ${caros.map((item) => item.nome).join(', ')}`);
console.log(`Total da compra: R$ ${total.toFixed(2)}`);

// Array somente leitura
const categorias: readonly string[] = ['Mercearia', 'Laticínios', 'Limpeza'];
// categorias.push('Bebidas');
// Erro TS2339: Property 'push' does not exist on type 'readonly string[]'.

// Matriz da despensa: cada linha é uma prateleira
const despensa: number[][] = [[2, 0, 1], [4, 4], [1]];
const totalDespensa: number = despensa
  .map((prateleira) => prateleira.reduce((soma, qtd) => soma + qtd, 0))
  .reduce((soma, qtdPrateleira) => soma + qtdPrateleira, 0);
console.log(`Itens na despensa: ${totalDespensa}`);

// Desestruturação: primeiro e segundo item
const [primeiro, segundo] = itens;
console.log(`Primeiro: ${primeiro.nome} | Segundo: ${segundo.nome}`);

// Spread: nova lista com um item extra, sem mexer na original
const novaLista = [...itens, { nome: 'Açúcar 1kg', preco: 5.2, quantidade: 1 }];
console.log(`Lista original: ${itens.length} itens | Nova lista: ${novaLista.length} itens`);
