// Proxy server-side pra geração de imagem — migração de fonte_imagem.js.
// Antes, o navegador decidia sozinho qual API era mais barata (olhando quais
// chaves existiam em window.*) e chamava ela direto. Agora essa decisão e
// as chamadas acontecem aqui, com as chaves só em variável de ambiente.
const CUSTO_POR_IMAGEM = {
  stability: 0.035,
  gemini: 0.039,
  gptBaixa: 0.006,
  gptMedia: 0.053,
  gptAlta: 0.211,
};

function fontesDisponiveis() {
  const fontes = [];
  if (process.env.STABILITY_API_KEY) fontes.push({ id: 'stability', custo: CUSTO_POR_IMAGEM.stability });
  if (process.env.GEMINI_API_KEY) fontes.push({ id: 'gemini', custo: CUSTO_POR_IMAGEM.gemini });
  if (process.env.OPENAI_API_KEY) fontes.push({ id: 'gptBaixa', custo: CUSTO_POR_IMAGEM.gptBaixa });
  return fontes;
}

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

async function gerarGemini(prompt, negativePrompt) {
  const promptCompleto = `${prompt}. Avoid: ${negativePrompt || ''}`;
  const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: promptCompleto }] }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error((data.error && data.error.message) || `Gemini HTTP ${resp.status}`);
  const partes = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
  const partImagem = partes.find((p) => p.inlineData || p.inline_data);
  const inline = partImagem && (partImagem.inlineData || partImagem.inline_data);
  if (!inline || !inline.data) throw new Error('Gemini não devolveu imagem.');
  const mime = inline.mimeType || inline.mime_type || 'image/png';
  return `data:${mime};base64,${inline.data}`;
}

async function gerarGptImage2(prompt, negativePrompt, qualidade) {
  const promptCompleto = `${prompt}. Avoid: ${negativePrompt || ''}`;
  const resp = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-image-2', prompt: promptCompleto, size: '1024x1024', quality: qualidade, n: 1 }),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error((data.error && data.error.message) || `GPT Image 2 HTTP ${resp.status}`);
  const b64 = data.data && data.data[0] && data.data[0].b64_json;
  if (!b64) throw new Error('GPT Image 2 não devolveu imagem.');
  return `data:image/png;base64,${b64}`;
}

async function gerarPorFonte(id, prompt, negativePrompt) {
  if (id === 'stability') return gerarStability(prompt, negativePrompt);
  if (id === 'gemini') return gerarGemini(prompt, negativePrompt);
  if (id === 'gptBaixa') return gerarGptImage2(prompt, negativePrompt, 'low');
  if (id === 'gptMedia') return gerarGptImage2(prompt, negativePrompt, 'medium');
  if (id === 'gptAlta') return gerarGptImage2(prompt, negativePrompt, 'high');
  throw new Error('Fonte desconhecida: ' + id);
}

// Fonte mais barata entre as configuradas, com fallback pra próxima se a
// primeira falhar. Lança erro só se todas falharem.
async function gerarMaisBarata(prompt, negativePrompt) {
  const fontes = fontesDisponiveis().sort((a, b) => a.custo - b.custo);
  if (!fontes.length) throw new Error('Nenhuma fonte de imagem configurada no servidor (STABILITY_API_KEY, GEMINI_API_KEY ou OPENAI_API_KEY).');

  let ultimoErro = null;
  for (const fonte of fontes) {
    try {
      const imagemDataUrl = await gerarPorFonte(fonte.id, prompt, negativePrompt);
      return { imagemDataUrl, fonte: fonte.id, custoUsd: fonte.custo };
    } catch (e) {
      ultimoErro = e;
    }
  }
  throw new Error(`Todas as fontes de imagem falharam. Último erro: ${ultimoErro.message}`);
}

// Melhor qualidade (GPT Image 2 alta); cai pra mais barata se a OpenAI não
// estiver configurada ou falhar.
async function gerarMelhorQualidade(prompt, negativePrompt) {
  if (process.env.OPENAI_API_KEY) {
    try {
      const imagemDataUrl = await gerarGptImage2(prompt, negativePrompt, 'high');
      return { imagemDataUrl, fonte: 'gptAlta', custoUsd: CUSTO_POR_IMAGEM.gptAlta };
    } catch (e) {
      // cai pro fallback abaixo
    }
  }
  const resultado = await gerarMaisBarata(prompt, negativePrompt);
  resultado.aviso = 'GPT Image 2 (alta qualidade) indisponível — usada a fonte mais barata como alternativa: ' + resultado.fonte;
  return resultado;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, negativePrompt, estrategia } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'Informe "prompt".' });
  }

  try {
    const resultado = estrategia === 'qualidade'
      ? await gerarMelhorQualidade(prompt, negativePrompt)
      : await gerarMaisBarata(prompt, negativePrompt);
    return res.status(200).json(resultado);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}
