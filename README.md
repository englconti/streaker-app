# STREAKER

Um tracker de hábitos que não cobra nada de você.

Adicione um hábito, marque quando fizer, veja a streak crescer. Só isso.

## Rodando

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

Outros comandos:

```bash
npm test      # testes da lógica de datas e streak
npm run build # build de produção
npm run lint
```

## Como a streak funciona

- A streak conta dias consecutivos e termina em hoje ou em ontem. Ou seja:
  enquanto hoje não acabou, a streak de ontem continua inteira na tela. O app
  não desconta nada só porque você ainda não marcou.
- Pulou um dia inteiro, a streak atual volta a zero — mas o **recorde** fica
  salvo e continua visível.
- Marcar hoje é um botão de liga/desliga: clicou sem querer, clica de novo.
- Clique no nome do hábito para renomear. Enter ou clicar fora salva,
  Escape descarta, e nome em branco simplesmente mantém o antigo. O
  histórico não muda ao renomear.
- A grade mostra os últimos 30 dias, só leitura. Dia não marcado é um quadrado
  apagado, sem vermelho e sem aviso.

## O que este app não tem, de propósito

Notificações, pedido de permissão, badge, som, cor de alerta para dia perdido,
contador de dias perdidos, porcentagem de aderência, modal, toast, confirmação
e texto de culpa. Se um dia isso voltar em um pull request, é regressão.

## Onde ficam os dados

Tudo no `localStorage` do seu navegador, na chave `streaker:v1`. Não há
servidor, conta ou sincronização: nada sai da máquina.

Consequência: **limpar os dados do site apaga o histórico**, e cada navegador
tem a sua própria lista. Ainda não existe exportar/importar.

## Estrutura

```
src/app/         layout, página única e estilos
src/components/  formulário, card do hábito, grade de dias, botão de check
src/lib/         datas, cálculo de streak, persistência (funções puras + testes)
```

`src/lib/dates.ts` e `src/lib/streak.ts` não dependem de React nem do relógio:
o dia de hoje entra como parâmetro, o que deixa a lógica toda testável.

As datas usam sempre o dia **local** (`YYYY-MM-DD` montado com `getFullYear`,
`getMonth`, `getDate`), nunca `toISOString()` — que reporta o dia em UTC e
quebraria a streak à noite em qualquer fuso atrás de Greenwich.
