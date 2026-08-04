// Proxy server-side pra ElevenLabs Music — mesmo padrão de api/claude.js.
// A chave (ELEVENLABS_API_KEY) fica só como variável de ambiente na Vercel,
// nunca chega ao navegador.
import { validarSessao } from '../lib/sessao.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!(await validarSessao(req))) {
    return res.status(401).json({ error: 'Não autorizado.' });
  }

  const chave = process.env.ELEVENLABS_API_KEY;
  if (!chave) {
    return res.status(500).json({ error: 'ELEVENLABS_API_KEY não configurada no servidor.' });
  }

  const { prompt, musicLengthMs, forceInstrumental, seed, outputFormat } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'Informe "prompt".' });
  }

  const corpo = { prompt, music_length_ms: musicLengthMs };
  if (typeof forceInstrumental === 'boolean') corpo.force_instrumental = forceInstrumental;
  if (seed) corpo.seed = seed;

  try {
    const resposta = await fetch(`https://api.elevenlabs.io/v1/music?output_format=${encodeURIComponent(outputFormat || 'mp3_44100_128')}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'xi-api-key': chave },
      body: JSON.stringify(corpo),
    });

    if (!resposta.ok) {
      const texto = await resposta.text();
      return res.status(resposta.status).json({ error: texto });
    }

    const buffer = Buffer.from(await resposta.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    return res.status(200).send(buffer);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
