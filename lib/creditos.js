// Estimativa de gasto das APIs pagas por token — mesmo padrão usado no
// Instituto Cultural Celeiro Literário, implementado aqui de forma
// independente (sem nenhuma referência de código entre os dois
// projetos). Não existe endpoint oficial de "saldo restante" na
// Anthropic — só dá pra registrar o que a gente mesmo gasta a cada
// chamada e comparar com o valor que o usuário informou ter carregado.
// Preço por milhão de tokens, em USD. Ajustar aqui se a Anthropic
// mudar a tabela.
const PRECOS_USD_POR_MILHAO = {
  claude: { entrada: 3.00, saida: 15.00 }, // família Claude Sonnet 4
};

function calcularCustoUSD(api, tokensEntrada, tokensSaida) {
  const precos = PRECOS_USD_POR_MILHAO[api];
  if (!precos) return 0;
  const entrada = (Number(tokensEntrada) || 0) / 1e6 * precos.entrada;
  const saida = (Number(tokensSaida) || 0) / 1e6 * precos.saida;
  return entrada + saida;
}

// Nunca deve derrubar a resposta principal da API — se o KV falhar,
// só perde o registro de custo daquela chamada, não a resposta pro usuário.
async function registrarGasto(kv, api, tokensEntrada, tokensSaida) {
  try {
    const custo = calcularCustoUSD(api, tokensEntrada, tokensSaida);
    if (custo > 0) {
      await kv.incrbyfloat(`apicredito:gasto:${api}`, custo);
    }
  } catch (e) {
    console.error(`Falha ao registrar gasto estimado de ${api}:`, e.message);
  }
}

const LIMIAR_ALERTA = 0.20; // avisa quando sobrar 20% ou menos do orçamento informado

function montarEstimativa(nome, orcamento, gasto) {
  const saldo = orcamento - gasto;
  const percUsado = orcamento > 0 ? gasto / orcamento : null;
  const alerta = orcamento > 0 && saldo / orcamento <= LIMIAR_ALERTA;
  return {
    nome,
    tipo: 'estimativa',
    orcamentoUSD: Number(orcamento.toFixed(4)),
    gastoEstimadoUSD: Number(gasto.toFixed(4)),
    saldoEstimadoUSD: Number(saldo.toFixed(4)),
    percUsado,
    alerta,
  };
}

async function obterStatusCreditos(kv) {
  const [orcClaude, gastoClaude] = await Promise.all([
    kv.get('apicredito:orcamento:claude'),
    kv.get('apicredito:gasto:claude'),
  ]);

  return {
    atualizadoEm: new Date().toISOString(),
    apis: [
      montarEstimativa('Anthropic (Claude)', parseFloat(orcClaude) || 0, parseFloat(gastoClaude) || 0),
    ],
  };
}

export {
  calcularCustoUSD,
  registrarGasto,
  obterStatusCreditos,
  PRECOS_USD_POR_MILHAO,
};
