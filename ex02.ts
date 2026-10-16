export {};

// ===== Exercício 02: Cupom fiscal =====

const nomeDigitado: string = ' maria da silva ';
const palavrasMinusculas: string[] = ['da', 'de', 'do'];

function formatarNome(nome: string): string {
  // trim tira os espaços das pontas; split + filter tira os espaços duplicados
  const palavras: string[] = nome
    .trim()
    .split(' ')
    .filter((p) => p !== '');

  return palavras
    .map((p) => {
      const minuscula = p.toLowerCase();
      if (palavrasMinusculas.includes(minuscula)) {
        return minuscula;
      }
      return minuscula.charAt(0).toUpperCase() + minuscula.slice(1);
    })
    .join(' ');
}

// Conversões: o leitor de código de barras manda texto
const precoLido: string = '12.40';
const quantidadeLida: string = '3un';
const preco: number = Number(precoLido);
// Number('3un') daria NaN, por isso uso parseInt, que lê até achar uma letra
const quantidade: number = parseInt(quantidadeLida, 10);

const clienteFidelidade: boolean = true;
const subtotal: number = preco * quantidade;
const desconto: number = clienteFidelidade ? subtotal * 0.05 : 0;
const total: number = subtotal - desconto;

const numeroCupom: number = 42;

const cupom: string = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${total.toFixed(2)}`;

console.log(cupom);
