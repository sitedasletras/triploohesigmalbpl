// Estimativa de gasto das APIs pagas por token — mesmo padrão usado no
// Instituto Cultural Celeiro Literário, implementado aqui de forma
// independente (sem nenhuma referência de código entre os dois
// projetos). Não existe endpoint oficial de "saldo restante" na
// Anthropic — só dá pra registrar o que a gente mesmo gasta a cada
// chamada e comparar com o valor que o usuário informou ter carregado.
// Preço por milhão de tokens, em USD. Ajustar aqui se a Anthropic
// mudar a tabela.
const PRECOS_USD_POR_MILHAO = {
  // família Claude Sonnet 4 — cacheEscrita e cacheLeitura cobrem prompt
  // caching (cache_creation_input_tokens / cache_read_input_tokens),
  // usado no Gerador de Livro do Calabouço pra baratear o system prompt
  // repetido em cada fragmento.
  claude: { entrada: 3.00, saida: 15.00, cacheEscrita: 3.75, cacheLeitura: 0.30 },
};

// Aceita o objeto `usage` cru devolvido pela Messages API da Anthropic
// (input_tokens, output_tokens, cache_creation_input_tokens, cache_read_input_tokens).
function calcularCustoUSD(api, usage) {
  const precos = PRECOS_USD_POR_MILHAO[api];
  if (!precos || !usage) return 0;
  const entrada = (Number(usage.input_tokens) || 0) / 1e6 * precos.entrada;
  const saida = (Number(usage.output_tokens) || 0) / 1e6 * precos.saida;
  const cacheEscrita = (Number(usage.cache_creation_input_tokens) || 0) / 1e6 * (precos.cacheEscrita ?? precos.entrada);
  const cacheLeitura = (Number(usage.cache_read_input_tokens) || 0) / 1e6 * (precos.cacheLeitura ?? precos.entrada);
  return entrada + saida + cacheEscrita + cacheLeitura;
}

// Nunca deve derrubar a resposta principal da API — se o KV falhar,
// só perde o registro de custo daquela chamada, não a resposta pro usuário.
// Retorna o custo calculado (mesmo se o registro no KV falhar) pra que o
// chamador possa devolver o valor real gasto naquela chamada pro cliente.
async function registrarGasto(kv, api, usage) {
  const custo = calcularCustoUSD(api, usage);
  try {
    if (custo > 0) {
      await kv.incrbyfloat(`apicredito:gasto:${api}`, custo);
    }
  } catch (e) {
    console.error(`Falha ao registrar gasto estimado de ${api}:`, e.message);
  }
  return custo;
}

async function obterGastoTotal(kv, api) {
  const gasto = await kv.get(`apicredito:gasto:${api}`);
  return parseFloat(gasto) || 0;
}

export {
  calcularCustoUSD,
  registrarGasto,
  obterGastoTotal,
  PRECOS_USD_POR_MILHAO,
};
