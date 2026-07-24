/**
 * FONTE DE IMAGEM — triploohesigmalbpl
 * -------------------------------------
 * Antes chamava Stability/Gemini/GPT Image 2 direto do navegador, decidindo
 * sozinho qual API era mais barata olhando quais chaves existiam em
 * window.*. Migrado (2026-07-24): toda a lógica de seleção por custo e
 * fallback agora mora no servidor (api/gerar-imagem.js) — as chaves nunca
 * mais chegam no navegador. Este arquivo virou um cliente fino: só chama o
 * proxy e devolve o mesmo formato de sempre pra quem consome.
 *
 * Preços de referência (jul/2026, ver conversa com Wagner pra fonte):
 *   Stability (stable-image/generate/core) → US$0,035/imagem, fixo
 *   Gemini 2.5 Flash Image (Nano Banana), API paga → US$0,039/imagem
 *   GPT Image 2 (OpenAI) → US$0,006 (baixa) / 0,053 (média) / 0,211 (alta)
 */

function _carregarImagem(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

async function _pedirImagem(prompt, negativePrompt, estrategia) {
  const resp = await fetch('/api/gerar-imagem', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt, negativePrompt, estrategia }),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error || `Geração de imagem HTTP ${resp.status}`);
  const img = await _carregarImagem(data.imagemDataUrl);
  const resultado = { img, fonte: data.fonte, custoUsd: data.custoUsd };
  if (data.aviso) resultado.aviso = data.aviso;
  return resultado;
}

/**
 * Gera 1 imagem pela fonte MAIS BARATA entre as configuradas no servidor,
 * com fallback automático se a primeira falhar.
 */
async function gerarImagemMaisBarata(prompt, negativePrompt) {
  return _pedirImagem(prompt, negativePrompt, 'barata');
}

/**
 * Gera 1 imagem na MELHOR qualidade (GPT Image 2 alta). Se a OpenAI não
 * estiver configurada no servidor, cai pra fonte mais barata disponível
 * como alternativa (avisando no campo `aviso` do retorno).
 */
async function gerarImagemMelhorQualidade(prompt, negativePrompt) {
  return _pedirImagem(prompt, negativePrompt, 'qualidade');
}
