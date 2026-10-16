export {};

// ===== Exercício 06: Status do pedido no app de delivery =====

enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

enum FormaPagamento {
  Pix = 'PIX',
  Cartao = 'CARTAO',
  Dinheiro = 'DINHEIRO',
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Pedido cancelado.';
  }
}

function avancar(status: StatusPedido): StatusPedido {
  if (status === StatusPedido.Entregue || status === StatusPedido.Cancelado) {
    return status;
  }
  return (status + 1) as StatusPedido;
}

// Mapeamento reverso: número -> nome (só existe em enum numérico)
console.log(`StatusPedido[2] = ${StatusPedido[2]}`);

// Simulação do pedido do início ao fim
let atual: StatusPedido = StatusPedido.Recebido;
console.log(`[${atual} - ${StatusPedido[atual]}] ${mensagem(atual)}`);
while (atual !== StatusPedido.Entregue) {
  atual = avancar(atual);
  console.log(`[${atual} - ${StatusPedido[atual]}] ${mensagem(atual)}`);
}

const pagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);

// Atribuindo a string direto ao enum de string
// const pagamentoErrado: FormaPagamento = 'PIX';
// Erro TS2322: Type '"PIX"' is not assignable to type 'FormaPagamento'.
// Por quê: enum de string é opaco, o único jeito de ter um FormaPagamento é usar
// um dos membros (FormaPagamento.Pix). O texto 'PIX' é só um string e o TypeScript
// não o trata como equivalente, mesmo com o mesmo valor.
