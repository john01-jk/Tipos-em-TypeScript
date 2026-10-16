export {};

// ===== Exercício 08: Formulário de cadastro =====

// 1) Código do cliente: number | string
const codigo: number | string = 'CLI-0042';

function formatarCodigo(c: number | string): string {
  if (typeof c === 'number') {
    // aqui o TypeScript sabe que c é number
    return `CLI-${String(c).padStart(4, '0')}`;
  }
  // aqui c é string: pego só os dígitos e completo com zeros
  return `CLI-${c.replace(/\D/g, '').padStart(4, '0')}`;
}

// 2) Tipo literal
type Tamanho = 'P' | 'M' | 'G' | 'GG';
let tamanho: Tamanho = 'M';
// tamanho = 'XG';
// Erro TS2322: Type '"XG"' is not assignable to type 'Tamanho'.

// 3) Frete por região
function calcularFrete(regiao: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'): number {
  switch (regiao) {
    case 'norte':
      return 25;
    case 'nordeste':
      return 20;
    case 'centro-oeste':
      return 18;
    case 'sudeste':
      return 12;
    case 'sul':
      return 15;
  }
}

// 4) Complemento pode ser null
function formatarEndereco(rua: string, numero: number, complemento: string | null): string {
  return `${rua}, ${numero} - ${complemento ?? '(sem complemento)'}`;
}

// 5) Telefone só com dígitos
function limparTelefone(tel: string | number): string {
  const texto = typeof tel === 'number' ? String(tel) : tel;
  return texto.replace(/\D/g, '');
}

// 6) Inferência de literais
const r = 'sul';
console.log(`Frete para o ${r}: R$ ${calcularFrete(r).toFixed(2)}`);

let r2 = 'sul';
// calcularFrete(r2);
// Erro TS2345: Argument of type 'string' is not assignable to parameter of type '"norte" | "nordeste" | "centro-oeste" | "sudeste" | "sul"'.
// Por quê: com const, o valor nunca muda, então o TypeScript infere o tipo literal
// 'sul'. Com let, a variável pode receber outro texto depois, então o tipo é
// alargado (widening) para string, que não cabe nos literais aceitos pela função.
// Correção com as const:
let r3 = 'sul' as const;
console.log(`Frete com let + as const: R$ ${calcularFrete(r3).toFixed(2)}`);

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${tamanho}`);
console.log(`Código vindo como número: ${formatarCodigo(42)}`);
console.log(`Entrega: ${formatarEndereco('Rua das Flores', 100, null)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
console.log(`Telefone (número): ${limparTelefone(69999990000)}`);
