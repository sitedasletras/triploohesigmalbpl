// Backup na nuvem do estado do SIGMAL HQ (Calabouço, Masmorra, Paiol,
// Fila, Concursos, Heterônimos, Estúdios, Silo) — usa o mesmo Vercel KV
// já provisionado neste projeto (api/claude.js registra gasto nele).
// Sem isso, o estado inteiro só existia no localStorage do navegador —
// perdia tudo se limpasse os dados, trocasse de máquina ou o disco falhasse.
//
// Também serve de login (?acao=login) — ver lib/sessao.js pro porquê de
// não ser um api/login.js separado.
import { kv } from '@vercel/kv';
import { criarSessao, validarSessao } from '../lib/sessao.js';

const KV_KEY = 'sigmal_hq:estado';

export default async function handler(req, res) {
  if (req.query.acao === 'login') {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ erro: 'Método não suportado.' });
    }
    const senhaEsperada = process.env.CELEIRO_BACKUP_SENHA;
    if (!senhaEsperada) {
      return res.status(500).json({ erro: 'CELEIRO_BACKUP_SENHA não configurada no servidor.' });
    }
    const { senha } = req.body || {};
    if (senha !== senhaEsperada) {
      return res.status(401).json({ ok: false, erro: 'Senha incorreta.' });
    }
    try {
      const token = await criarSessao();
      return res.status(200).json({ ok: true, token });
    } catch (e) {
      return res.status(500).json({ ok: false, erro: 'Falha ao criar sessão: ' + e.message });
    }
  }

  const autenticado = await validarSessao(req);
  if (!autenticado) {
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
