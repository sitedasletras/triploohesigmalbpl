// Painel do Escritório — devolve o total estimado já gasto na Anthropic
// (Claude), calculado chamada a chamada em api/claude.js e acumulado no
// mesmo Vercel KV do backup de estado (api/estado.js). Protegido com a
// mesma senha do backup (CELEIRO_BACKUP_SENHA / x-celeiro-senha) pra não
// expor dado financeiro pra qualquer um que ache a URL.
//
// Também serve a cotação USD→BRL (?cotacao=1) — junto neste mesmo arquivo,
// e não em api/cotacao.js separado, porque o plano Hobby da Vercel limita
// a 12 Serverless Functions por deploy e o projeto já estava no limite.
// A cotação não precisa de senha (não é dado sensível).
import { kv } from '@vercel/kv';
import { obterGastoTotal } from '../lib/creditos.js';
import { validarSessao } from '../lib/sessao.js';

const CHAVE_KV_COTACAO = 'cotacao:usdbrl';
const TTL_MS_COTACAO = 60 * 60 * 1000; // 1 hora

async function handleCotacao(req, res) {
  try {
    const cache = await kv.get(CHAVE_KV_COTACAO);
    if (cache && cache.valor && (Date.now() - cache.timestamp) < TTL_MS_COTACAO) {
      return res.status(200).json({ usdbrl: cache.valor, atualizadoEm: cache.atualizadoEm, fonte: 'cache' });
    }

    const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const dados = await resposta.json();
    const valor = parseFloat(dados?.USDBRL?.bid);
    if (!valor) throw new Error('Cotação indisponível na fonte externa.');

    const registro = { valor, timestamp: Date.now(), atualizadoEm: new Date().toISOString() };
    await kv.set(CHAVE_KV_COTACAO, registro);
    return res.status(200).json({ usdbrl: valor, atualizadoEm: registro.atualizadoEm, fonte: 'live' });
  } catch (e) {
    try {
      const cache = await kv.get(CHAVE_KV_COTACAO);
      if (cache && cache.valor) {
        return res.status(200).json({ usdbrl: cache.valor, atualizadoEm: cache.atualizadoEm, fonte: 'cache-vencido' });
      }
    } catch (_) {}
    return res.status(500).json({ erro: 'Falha ao obter cotação: ' + e.message });
  }
}

async function handleGasto(req, res) {
  const autenticado = await validarSessao(req);
  if (!autenticado) {
    return res.status(401).json({ erro: 'Não autorizado.' });
  }

  try {
    const gastoClaudeUSD = await obterGastoTotal(kv, 'claude');
    return res.status(200).json({ gastoClaudeUSD, atualizadoEm: new Date().toISOString() });
  } catch (e) {
    return res.status(500).json({ erro: 'Falha ao ler o gasto acumulado: ' + e.message });
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ erro: 'Método não suportado.' });
  }

  if (req.query.cotacao) return handleCotacao(req, res);
  return handleGasto(req, res);
}
