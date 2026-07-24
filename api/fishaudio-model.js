// Proxy server-side pro Fish Audio /model (clonagem de voz a partir de
// áudio) — é upload multipart, então não dá pra deixar o Vercel parsear o
// corpo como JSON: precisa repassar o stream bruto igual chegou, só trocando
// quem assina a chamada (a chave, que só existe aqui).
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const chave = process.env.FISH_AUDIO_API_KEY;
  if (!chave) {
    return res.status(500).json({ error: 'FISH_AUDIO_API_KEY não configurada no servidor.' });
  }

  try {
    const resposta = await fetch('https://api.fish.audio/model', {
      method: 'POST',
      headers: {
        'Content-Type': req.headers['content-type'],
        'Authorization': `Bearer ${chave}`,
      },
      body: req,
      duplex: 'half',
    });

    const texto = await resposta.text();
    res.setHeader('Content-Type', resposta.headers.get('content-type') || 'application/json');
    return res.status(resposta.status).send(texto);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
