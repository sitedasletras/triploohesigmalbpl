// Proxy server-side pra Stability AI — usado pelos módulos que querem
// especificamente Stability (não a seleção multi-fonte de
// api/gerar-imagem.js). Recebe {prompt, negativePrompt} em JSON e devolve a
// imagem (bytes), igual a chamada direta que existia antes — só que a
// chave agora só existe aqui.
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const chave = process.env.STABILITY_API_KEY;
  if (!chave) {
    return res.status(500).json({ error: 'STABILITY_API_KEY não configurada no servidor.' });
  }

  const { prompt, negativePrompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'Informe "prompt".' });
  }

  try {
    const fd = new FormData();
    fd.append('prompt', prompt);
    fd.append('negative_prompt', negativePrompt || '');
    fd.append('aspect_ratio', '1:1');
    fd.append('output_format', 'jpeg');

    const resposta = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${chave}`, 'Accept': 'image/*' },
      body: fd,
    });

    if (!resposta.ok) {
      const erro = await resposta.json().catch(() => ({}));
      return res.status(resposta.status).json({ error: erro.message || `Stability HTTP ${resposta.status}` });
    }

    const buffer = Buffer.from(await resposta.arrayBuffer());
    res.setHeader('Content-Type', 'image/jpeg');
    return res.status(200).send(buffer);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
