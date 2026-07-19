/**
 * IA GRATUITA — triploohesigmalbpl
 * ---------------------------------
 * Chamada de texto via Google Gemini (tier gratuito, sem cartão de crédito,
 * modelo gemini-2.5-flash). Usada só para funções de bastidor que não
 * precisam da qualidade literária do Claude: biografias de heterônimos e
 * perfis físico/psicológicos de personagens. A escolha do heterônimo e a
 * escrita das obras em si continuam no Claude (pago) — só o que é
 * "ficha"/perfil passa a ser gratuito, pra não pesar na conta da API.
 *
 * Pegue uma chave gratuita em https://aistudio.google.com/apikey e cole em
 * config.js, no campo GEMINI_API_KEY.
 */

async function chamarIAGratuita(systemPrompt, userPrompt, maxTokens = 2000) {
  const apiKey = window.GEMINI_API_KEY || '';
  if (!apiKey) {
    throw new Error('Configure GEMINI_API_KEY em config.js (chave gratuita em aistudio.google.com/apikey)');
  }
  const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: { maxOutputTokens: maxTokens }
    })
  });
  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Gemini HTTP ${resp.status}: ${errBody.substring(0, 200)}`);
  }
  const data = await resp.json();
  const texto = ((data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [])
    .map(p => p.text || '').join('').trim();
  if (!texto) throw new Error('Gemini retornou resposta vazia (pode ter sido cortada por safety filter ou limite de tokens)');
  return texto;
}

// Mesmo utilitário de limpeza de JSON usado em outros arquivos do repo
// (remove cercas ```json), pra parsear resposta estruturada da IA gratuita.
function parseJSONGratuito(texto) {
  const limpo = texto.replace(/```json|```/g, '').trim();
  return JSON.parse(limpo);
}
