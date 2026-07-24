// Proxy server-side pro Fish Audio TTS — mesmo padrão de api/claude.js. A
// chave (FISH_AUDIO_API_KEY) fica só como variável de ambiente na Vercel,
// nunca chega ao navegador.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const chave = process.env.FISH_AUDIO_API_KEY;
  if (!chave) {
    return res.status(500).json({ error: 'FISH_AUDIO_API_KEY não configurada no servidor.' });
  }

  try {
    const resposta = await fetch('https://api.fish.audio/v1/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${chave}`,
      },
      body: JSON.stringify(req.body),
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
