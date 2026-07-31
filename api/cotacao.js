// Proxy de cotação USD → BRL, pra converter os gastos em Claude (cobrados
// em dólar) pra reais na tela do Escritório. Usa a AwesomeAPI (pública,
// brasileira, sem necessidade de chave) e guarda em cache no Vercel KV por
// 1 hora, pra não bater na API externa a cada carregamento da tela.
import { kv } from '@vercel/kv';

const CHAVE_KV = 'cotacao:usdbrl';
const TTL_MS = 60 * 60 * 1000; // 1 hora

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ erro: 'Método não suportado.' });
  }

  try {
    const cache = await kv.get(CHAVE_KV);
    if (cache && cache.valor && (Date.now() - cache.timestamp) < TTL_MS) {
      return res.status(200).json({ usdbrl: cache.valor, atualizadoEm: cache.atualizadoEm, fonte: 'cache' });
    }

    const resposta = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    const dados = await resposta.json();
    const valor = parseFloat(dados?.USDBRL?.bid);
    if (!valor) throw new Error('Cotação indisponível na fonte externa.');

    const registro = { valor, timestamp: Date.now(), atualizadoEm: new Date().toISOString() };
    await kv.set(CHAVE_KV, registro);
    return res.status(200).json({ usdbrl: valor, atualizadoEm: registro.atualizadoEm, fonte: 'live' });
  } catch (e) {
    // Se a fonte externa falhar, tenta devolver o último valor em cache
    // (mesmo vencido) em vez de deixar a tela sem nenhuma cotação.
    try {
      const cache = await kv.get(CHAVE_KV);
      if (cache && cache.valor) {
        return res.status(200).json({ usdbrl: cache.valor, atualizadoEm: cache.atualizadoEm, fonte: 'cache-vencido' });
      }
    } catch (_) {}
    return res.status(500).json({ erro: 'Falha ao obter cotação: ' + e.message });
  }
}
