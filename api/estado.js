// Backup na nuvem do estado do SIGMAL HQ (Calabouço, Masmorra, Paiol,
// Fila, Concursos, Heterônimos, Estúdios, Silo) — usa o mesmo Vercel KV
// já provisionado neste projeto (api/claude.js registra gasto nele).
// Sem isso, o estado inteiro só existia no localStorage do navegador —
// perdia tudo se limpasse os dados, trocasse de máquina ou o disco falhasse.
import { kv } from '@vercel/kv';

const KV_KEY = 'sigmal_hq:estado';

export default async function handler(req, res) {
  const senhaEsperada = process.env.CELEIRO_BACKUP_SENHA;
  if (!senhaEsperada) {
    return res.status(500).json({ erro: 'CELEIRO_BACKUP_SENHA não configurada no servidor.' });
  }
  const senhaRecebida = req.headers['x-celeiro-senha'];
  if (senhaRecebida !== senhaEsperada) {
    return res.status(401).json({ erro: 'Não autorizado.' });
  }

  if (req.method === 'GET') {
    try {
      const estado = await kv.get(KV_KEY);
      return res.status(200).json({ estado: estado || null });
    } catch (e) {
      return res.status(500).json({ erro: 'Falha ao ler o backup na nuvem: ' + e.message });
    }
  }

  if (req.method === 'POST') {
    const estado = req.body;
    if (!estado || typeof estado !== 'object') {
      return res.status(400).json({ erro: 'Corpo inválido — esperado o objeto de estado em JSON.' });
    }
    try {
      await kv.set(KV_KEY, estado);
      return res.status(200).json({ ok: true, salvoEm: new Date().toISOString() });
    } catch (e) {
      return res.status(500).json({ erro: 'Falha ao salvar o backup na nuvem: ' + e.message });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ erro: 'Método não suportado.' });
}
