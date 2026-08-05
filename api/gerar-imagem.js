// Proxy server-side pra geração de imagem — migração de fonte_imagem.js.
// Só duas fontes por decisão explícita (2026-07-30): Stability (paga, fixa
// em US$0,035/imagem) como primeira opção, com fallback automático pro
// Pollinations (grátis, sem chave, sempre disponível) se a Stability não
// estiver configurada ou falhar — inclusive por causa do problema bancário
// em aberto. Gemini e GPT Image 2 saíram da rotação; `estrategia` continua
// aceito no corpo da requisição por compatibilidade com quem ainda manda
// ('barata'/'qualidade'), mas não muda mais o resultado — só existe uma
// fonte paga agora, não tem "qualidade" pra escolher.
import { validarSessao } from '../lib/sessao.js';

const CUSTO_STABILITY = 0.035;

async function gerarStability(prompt, negativePrompt) {
  const fd = new FormData();
  fd.append('prompt', prompt);
  fd.append('negative_prompt', negativePrompt || '');
  fd.append('aspect_ratio', '1:1');
  fd.append('output_format', 'jpeg');

  const resp = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`, 'Accept': 'image/*' },
    body: fd,
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || `Stability HTTP ${resp.status}`);
  }
  const buffer = Buffer.from(await resp.arrayBuffer());
  return `data:image/jpeg;base64,${buffer.toString('base64')}`;
}

// Pollinations é uma URL pública gerada na hora, sem chave e sem chamada
// server-side — o navegador carrega direto via <img src>.
function gerarUrlPollinations(prompt, negativePrompt) {
  const promptCompleto = negativePrompt ? `${prompt}. Avoid: ${negativePrompt}` : prompt;
  const seed = Math.floor(Math.random() * 999999);
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(promptCompleto)}?width=1024&height=1024&seed=${seed}&nologo=true`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!(await validarSessao(req))) {
    return res.status(401).json({ error: 'Não autorizado.' });
  }

  const { prompt, negativePrompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'Informe "prompt".' });
  }

  if (process.env.STABILITY_API_KEY) {
    try {
      const imagemDataUrl = await gerarStability(prompt, negativePrompt);
      return res.status(200).json({ imagemDataUrl, fonte: 'stability', custoUsd: CUSTO_STABILITY });
    } catch (e) {
      // cai pro Pollinations abaixo — não retorna erro só por a Stability ter falhado.
    }
  }

  const imagemDataUrl = gerarUrlPollinations(prompt, negativePrompt);
  return res.status(200).json({ imagemDataUrl, fonte: 'pollinations', custoUsd: 0 });
}
