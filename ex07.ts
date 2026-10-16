export {};

// ===== Exercício 07: Central de notificações =====

type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return; // return antecipado vazio
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach((d) => enviar(d, mensagem));
}

const aviso = 'Reunião de pais sexta às 19h';
notificarTodos(['ana@escola.com'], aviso, porEmail);
notificarTodos(['joao.resp'], aviso, porApp);
notificarTodos(['(69) 99999-0000'], aviso, porSms);
notificarTodos(['(69) 99999-0000'], 'Aviso muito longo. '.repeat(10), porSms);

// Função void não pode retornar valor
// function teste(): void { return 10; }
// Erro TS2322: Type 'number' is not assignable to type 'void'.

// ----- Reflexão -----
// Isto é aceito mesmo retornando number:
const contar: Notificador = (d, m) => m.length;
console.log(`contar devolveu: ${contar('x', 'abc')}`);
// Por quê: quando o TIPO DE FUNÇÃO tem retorno void, o TypeScript quer dizer
// "quem chama não vai usar o retorno", e não "a função não pode retornar nada".
// Assim dá para passar funções que retornam valor onde se espera um callback
// void (por exemplo, um forEach com arrow function que devolve algo). O valor é
// ignorado. Já uma função declarada com `: void` direto (como teste) é checada
// de forma estrita, por isso o erro acima.
