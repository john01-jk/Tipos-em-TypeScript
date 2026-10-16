# Tipos em TypeScript

Atividade com 10 exercícios sobre os tipos do TypeScript, cada um com um tema do dia a dia.

## Exercícios

| Arquivo | Tema | Conteúdos |
|---|---|---|
| `ex01.ts` | Padaria | anotações, inferência, number, string, boolean |
| `ex02.ts` | Cupom fiscal | template strings, métodos de string, conversões |
| `ex03.ts` | Ficha de paciente | tipos de objeto, `?`, `readonly`, `object` × `Object` × `{}` |
| `ex04.ts` | Lista de compras | arrays, map/filter/reduce, readonly, matrizes |
| `ex05.ts` | Boletim do clima | tuplas, elementos opcionais e rest, tuplas nomeadas |
| `ex06.ts` | App de delivery | enum numérico, enum de string, mapeamento reverso |
| `ex07.ts` | Central de notificações | void, callbacks, return antecipado |
| `ex08.ts` | Formulário de cadastro | union types, tipos literais, null |
| `ex09.ts` | Resposta de uma API | any × unknown, estreitamento, never |
| `ex10.ts` | Estacionamento (projeto integrador) | type aliases e todos os anteriores |

## Como executar

Compilando com a verificação estrita ligada (como pede a atividade):

```
tsc --strict ex01.ts
node ex01.js
```

Ou direto com o Node (versão 22.6 ou mais nova), sem verificar os tipos:

```
node ex01.ts
```

Os exercícios 06 e 10 usam `enum`, então precisam de uma opção extra:

```
node --experimental-transform-types ex06.ts
node --experimental-transform-types ex10.ts
```

## Observações

- Todos os arquivos começam com `export {};`.
- Não uso `any`, a não ser no exercício 09, onde o enunciado pede.
- Os erros provocados de propósito estão comentados nos arquivos, com a mensagem do compilador ao lado.
- As reflexões pedidas estão respondidas em comentários nos exercícios 03, 06, 07, 08 e 10.
- O `tsconfig.json` ativa o modo `strict` para o VS Code mostrar os erros de tipo.
