/**
 * FONTE DE IMAGEM — triploohesigmalbpl
 * -------------------------------------
 * Escolhe automaticamente de qual API gerar uma imagem, entre as que
 * estiverem configuradas (Stability, Gemini, GPT Image 2), por duas
 * estratégias:
 *
 *   - 'barata'    → sempre a de menor custo real por imagem entre as
 *                   configuradas. Hoje (sem chave da OpenAI) resolve pra
 *                   Stability (~US$0,035), que já é mais barata que o
 *                   Gemini pago (~US$0,039). Assim que window.OPENAI_API_KEY
 *                   existir, passa a preferir o GPT Image 2 em qualidade
 *                   baixa (~US$0,006), sem precisar mexer no código de quem
 *                   consome esta função.
 *   - 'qualidade' → sempre o GPT Image 2 em qualidade alta (~US$0,211,
 *                   melhor resultado que vimos nos testes). Se a chave da
 *                   OpenAI não estiver configurada, cai pra Stability como
 *                   alternativa (com aviso no retorno).
 *
 * Preços de referência (jul/2026, ver conversa com Wagner pra fonte):
 *   Stability (stable-image/generate/core) → US$0,035/imagem, fixo
 *   Gemini 2.5 Flash Image (Nano Banana), API paga → US$0,039/imagem
 *   GPT Image 2 (OpenAI) → US$0,006 (baixa) / 0,053 (média) / 0,211 (alta)
 *
 * Todas as fontes recebem o MESMO prompt (inglês) + negativePrompt (só a
 * Stability usa negativePrompt nativamente — nas outras é embutido no
 * próprio prompt como instrução negativa).
 */

const CUSTO_POR_IMAGEM = {
  stability: 0.035,
  gemini: 0.039,
  gptBaixa: 0.006,
  gptMedia: 0.053,
  gptAlta: 0.211
};

function _fontesDisponiveis() {
  const fontes = [];
  if (window.STABILITY_API_KEY) fontes.push({ id: 'stability', custo: CUSTO_POR_IMAGEM.stability });
  if (window.GEMINI_API_KEY) fontes.push({ id: 'gemini', custo: CUSTO_POR_IMAGEM.gemini });
  if (window.OPENAI_API_KEY) fontes.push({ id: 'gptBaixa', custo: CUSTO_POR_IMAGEM.gptBaixa });
  return fontes;
}

async function _gerarStability(prompt, negativePrompt) {
  const resp = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${window.STABILITY_API_KEY}`, 'Accept': 'image/*' },
    body: (() => {
      const fd = new FormData();
      fd.append('prompt', prompt);
      fd.append('negative_prompt', negativePrompt);
      fd.append('aspect_ratio', '1:1');
      fd.append('output_format', 'jpeg');
      return fd;
    })()
  });
  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.message || `Stability HTTP ${resp.status}`);
  }
  const blob = await resp.blob();
  return URL.createObjectURL(blob);
}

async function _gerarGemini(prompt, negativePrompt) {
  const promptCompleto = `${prompt}. Avoid: ${negativePrompt}`;
  const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${window.GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ role: 'user', parts: [{ text: promptCompleto }] }],
      generationConfig: { responseModalities: ['IMAGE'] }
    })
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error((data.error && data.error.message) || `Gemini HTTP ${resp.status}`);
  const partes = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [];
  const partImagem = partes.find(p => p.inlineData || p.inline_data);
  const inline = partImagem && (partImagem.inlineData || partImagem.inline_data);
  if (!inline || !inline.data) throw new Error('Gemini não devolveu imagem.');
  const mime = inline.mimeType || inline.mime_type || 'image/png';
  return `data:${mime};base64,${inline.data}`;
}

async function _gerarGptImage2(prompt, negativePrompt, qualidade) {
  const promptCompleto = `${prompt}. Avoid: ${negativePrompt}`;
  const resp = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${window.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-image-2', prompt: promptCompleto, size: '1024x1024', quality: qualidade, n: 1 })
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error((data.error && data.error.message) || `GPT Image 2 HTTP ${resp.status}`);
  const b64 = data.data && data.data[0] && data.data[0].b64_json;
  if (!b64) throw new Error('GPT Image 2 não devolveu imagem.');
  return `data:image/png;base64,${b64}`;
}

async function _gerarPorFonte(id, prompt, negativePrompt) {
  if (id === 'stability') return await _gerarStability(prompt, negativePrompt);
  if (id === 'gemini') return await _gerarGemini(prompt, negativePrompt);
  if (id === 'gptBaixa') return await _gerarGptImage2(prompt, negativePrompt, 'low');
  if (id === 'gptMedia') return await _gerarGptImage2(prompt, negativePrompt, 'medium');
  if (id === 'gptAlta') return await _gerarGptImage2(prompt, negativePrompt, 'high');
  throw new Error('Fonte desconhecida: ' + id);
}

function _carregarImagem(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Gera 1 imagem pela fonte MAIS BARATA entre as configuradas, com
 * fallback pra próxima mais barata se a primeira falhar (chave inválida,
 * fora do ar etc). Lança erro só se todas falharem.
 */
async function gerarImagemMaisBarata(prompt, negativePrompt) {
  const fontes = _fontesDisponiveis().sort((a, b) => a.custo - b.custo);
  if (!fontes.length) throw new Error('Nenhuma fonte de imagem configurada (Stability, Gemini ou OpenAI).');

  let ultimoErro = null;
  for (const fonte of fontes) {
    try {
      const url = await _gerarPorFonte(fonte.id, prompt, negativePrompt);
      const img = await _carregarImagem(url);
      return { img, fonte: fonte.id, custoUsd: fonte.custo };
    } catch (e) {
      ultimoErro = e;
    }
  }
  throw new Error(`Todas as fontes de imagem falharam. Último erro (${fontes[fontes.length - 1].id}): ${ultimoErro.message}`);
}

/**
 * Gera 1 imagem na MELHOR qualidade (GPT Image 2 alta). Se a OpenAI não
 * estiver configurada, cai pra fonte mais barata disponível como
 * alternativa (avisando no campo `aviso` do retorno).
 */
async function gerarImagemMelhorQualidade(prompt, negativePrompt) {
  if (window.OPENAI_API_KEY) {
    try {
      const url = await _gerarGptImage2(prompt, negativePrompt, 'high');
      const img = await _carregarImagem(url);
      return { img, fonte: 'gptAlta', custoUsd: CUSTO_POR_IMAGEM.gptAlta };
    } catch (e) {
      // cai pro fallback abaixo
    }
  }
  const resultado = await gerarImagemMaisBarata(prompt, negativePrompt);
  resultado.aviso = 'GPT Image 2 (alta qualidade) indisponível — usada a fonte mais barata como alternativa: ' + resultado.fonte;
  return resultado;
}
