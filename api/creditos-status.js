// Painel do Escritório — devolve o total estimado já gasto na Anthropic
// (Claude), calculado chamada a chamada em api/claude.js e acumulado no
// mesmo Vercel KV do backup de estado (api/estado.js). Protegido com a
// mesma senha do backup (CELEIRO_BACKUP_SENHA / x-celeiro-senha) pra não
// expor dado financeiro pra qualquer um que ache a URL.
import { kv } from '@vercel/kv';
import { obterGastoTotal } from '../lib/creditos.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ erro: 'Método não suportado.' });
  }

  const senhaEsperada = process.env.CELEIRO_BACKUP_SENHA;
  if (!senhaEsperada) {
    return res.status(500).json({ erro: 'CELEIRO_BACKUP_SENHA não configurada no servidor.' });
  }
  const senhaRecebida = req.headers['x-celeiro-senha'];
  if (senhaRecebida !== senhaEsperada) {
    return res.status(401).json({ erro: 'Não autorizado.' });
  }

  try {
    const gastoClaudeUSD = await obterGastoTotal(kv, 'claude');
    return res.status(200).json({ gastoClaudeUSD, atualizadoEm: new Date().toISOString() });
  } catch (e) {
    return res.status(500).json({ erro: 'Falha ao ler o gasto acumulado: ' + e.message });
  }
}
