// Proxy server-side pro Fish Audio Voice Design — cria voz nova a partir de
// descrição em texto. Mesmo padrão de api/claude.js: a chave só existe aqui,
// nunca chega ao navegador.
import { validarSessao } from '../lib/sessao.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!(await validarSessao(req))) {
    return res.status(401).json({ error: 'Não autorizado.' });
  }

  const chave = process.env.FISH_AUDIO_API_KEY;
  if (!chave) {
    return res.status(500).json({ error: 'FISH_AUDIO_API_KEY não configurada no servidor.' });
  }

  try {
    const resposta = await fetch('https://api.fish.audio/v1/voice-design', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${chave}`,
      },
      body: JSON.stringify(req.body),
    });

    const texto = await resposta.text();
    res.setHeader('Content-Type', resposta.headers.get('content-type') || 'application/json');
    return res.status(resposta.status).send(texto);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
