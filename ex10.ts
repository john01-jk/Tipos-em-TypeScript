export {};

// ===== Exercício 10: Sistema de estacionamento (projeto integrador) =====

// ----- Type aliases -----
type Placa = string;
type Periodo = [entrada: number, saida: number]; // horas cheias, ex.: [8, 11]

// ----- União discriminada (o campo tipo é o discriminante) -----
type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };
type Veiculo = Carro | Moto | Caminhao;

// ----- Enum -----
enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO',
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

// ----- Função never para os erros -----
function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// ----- Tarifa com verificação exaustiva -----
function calcularTarifa(v: Veiculo, horas: number): number {
  const adicionais = Math.max(horas, 1) - 1;
  switch (v.tipo) {
    case 'carro':
      return 8 + adicionais * 5;
    case 'moto':
      return 4 + adicionais * 2;
    case 'caminhao':
      return 15 + adicionais * 10;
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}
// Teste do never: acrescentei um tipo Van à união, sem tratar no switch:
//   type Van = { readonly placa: Placa; tipo: 'van'; lugares: number };
//   type Veiculo = Carro | Moto | Caminhao | Van;
// Erro TS2322: Type 'Van' is not assignable to type 'never'.
// (na linha: const _naoTratado: never = v;)
// O never garantiu que, ao esquecer um caso, o código não compila: o erro aparece
// exatamente na linha do default, avisando que sobrou um tipo (Van) que o switch
// não tratou. Assim nenhum veículo novo passa sem tarifa. Depois removi a Van.

function horasCobradas(periodo: Periodo): number {
  const [entrada, saida] = periodo;
  return Math.max(saida - entrada, 1); // mínimo de 1 hora
}

function fecharTicket(t: Ticket): Ticket {
  const bruto = calcularTarifa(t.veiculo, horasCobradas(t.periodo));
  const valor = t.selo ? bruto * 0.5 : bruto;
  // novo objeto com spread: o ticket original não é alterado
  return { ...t, valor, situacao: SituacaoTicket.Pago };
}

function registrar(msg: string): void {
  console.log(msg);
}

function formatarTicket(t: Ticket): string {
  const selo = t.selo ? ' (selo -50%)' : '';
  return `[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${horasCobradas(t.periodo)}h - R$ ${(t.valor ?? 0).toFixed(2)}${selo}`;
}

// ----- Entrada externa com unknown -----
function lerVeiculo(json: string): Veiculo {
  let bruto: unknown;
  try {
    bruto = JSON.parse(json);
  } catch {
    return falhar('JSON malformado');
  }

  if (typeof bruto !== 'object' || bruto === null) {
    return falhar('veículo deve ser um objeto');
  }
  if (!('placa' in bruto) || typeof bruto.placa !== 'string') {
    return falhar('campo "placa" inválido');
  }
  if (!('tipo' in bruto) || typeof bruto.tipo !== 'string') {
    return falhar('campo "tipo" inválido');
  }

  const placa: Placa = bruto.placa;
  switch (bruto.tipo) {
    case 'carro':
      if (!('portas' in bruto) || (bruto.portas !== 2 && bruto.portas !== 4)) {
        return falhar('campo "portas" inválido');
      }
      return { placa, tipo: 'carro', portas: bruto.portas };
    case 'moto':
      if (!('cilindradas' in bruto) || typeof bruto.cilindradas !== 'number') {
        return falhar('campo "cilindradas" inválido');
      }
      return { placa, tipo: 'moto', cilindradas: bruto.cilindradas };
    case 'caminhao':
      if (!('eixos' in bruto) || typeof bruto.eixos !== 'number') {
        return falhar('campo "eixos" inválido');
      }
      return { placa, tipo: 'caminhao', eixos: bruto.eixos };
    default:
      return falhar(`tipo "${bruto.tipo}" desconhecido`);
  }
}

// ----- Dados de teste (chegam da cancela como JSON) -----
const entradas: { json: string; periodo: Periodo; selo: boolean }[] = [
  { json: '{"placa":"ABC1D23","tipo":"carro","portas":4}', periodo: [8, 11], selo: false },
  { json: '{"placa":"MOT0A12","tipo":"moto","cilindradas":160}', periodo: [9, 10], selo: false },
  { json: '{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}', periodo: [7, 12], selo: false },
  { json: '{"placa":"XYZ4E56","tipo":"carro","portas":2}', periodo: [14, 16], selo: true },
];

const tickets: Ticket[] = entradas.map((e) => ({
  veiculo: lerVeiculo(e.json),
  periodo: e.periodo,
  selo: e.selo,
  situacao: SituacaoTicket.Aberto,
}));

// ----- Relatório -----
const fechados: Ticket[] = tickets
  .map(fecharTicket)
  .filter((t) => t.situacao === SituacaoTicket.Pago);

fechados.forEach((t) => registrar(formatarTicket(t)));

const faturamento: number = fechados.reduce((soma, t) => soma + (t.valor ?? 0), 0);
console.log(`Faturamento: R$ ${faturamento.toFixed(2)}`);

type Contagem = { carro: number; moto: number; caminhao: number };
const entradasPorTipo: Contagem = fechados.reduce<Contagem>(
  (acc, t) => {
    acc[t.veiculo.tipo] += 1;
    return acc;
  },
  { carro: 0, moto: 0, caminhao: 0 },
);
console.log(
  `Entradas: carro=${entradasPorTipo.carro}, moto=${entradasPorTipo.moto}, caminhao=${entradasPorTipo.caminhao}`,
);

// Veículo inválido vindo da cancela
try {
  lerVeiculo('{"placa":"BIC0001","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) {
    console.log(`Erro ao ler veículo: ${erro.message}`);
  }
}
