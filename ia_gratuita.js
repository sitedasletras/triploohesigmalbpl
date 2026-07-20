/**
 * IA GRATUITA — triploohesigmalbpl
 * ---------------------------------
 * Chamada de texto via Google Gemini (tier gratuito, sem cartão de crédito,
 * modelo gemini-2.5-flash), com fallback automático pro OpenRouter (também
 * gratuito, sem cartão) rodando um modelo Llama, caso o Gemini falhe ou não
 * esteja configurado. Usada só para funções de bastidor que não precisam da
 * qualidade literária do Claude: biografias de heterônimos e perfis
 * físico/psicológicos de personagens. A escolha do heterônimo e a escrita
 * das obras em si continuam no Claude (pago) — só o que é "ficha"/perfil
 * passa a ser gratuito, pra não pesar na conta da API.
 *
 * Por que Llama via OpenRouter e não direto da Meta: a Llama API oficial da
 * própria Meta (llama.developer.meta.com) foi desativada em 6/jul/2026 — o
 * OpenRouter hospeda o mesmo modelo aberto com tier gratuito próprio
 * (20 req/min, 50 req/dia sem nunca ter comprado crédito).
 *
 * Chaves gratuitas:
 *   Gemini      → https://aistudio.google.com/apikey       → GEMINI_API_KEY
 *   OpenRouter  → https://openrouter.ai/settings/keys       → OPENROUTER_API_KEY
 * Cole as duas em config.js. Sem nenhuma configurada, a função lança erro
 * explicando o que falta.
 */

async function chamarIAGratuita(systemPrompt, userPrompt, maxTokens = 2000) {
  const chaveGemini = window.GEMINI_API_KEY || '';
  let erroGemini = null;

  if (chaveGemini) {
    try {
      return await _chamarGemini(chaveGemini, systemPrompt, userPrompt, maxTokens);
    } catch (e) {
      erroGemini = e;
    }
  }

  const chaveOpenRouter = window.OPENROUTER_API_KEY || '';
  if (chaveOpenRouter) {
    try {
      return await _chamarOpenRouter(chaveOpenRouter, systemPrompt, userPrompt, maxTokens);
    } catch (e) {
      throw new Error(`Gemini${erroGemini ? ' (' + erroGemini.message + ')' : ' não configurado'} e OpenRouter falharam. OpenRouter: ${e.message}`);
    }
  }

  if (erroGemini) throw erroGemini;
  throw new Error('Configure GEMINI_API_KEY e/ou OPENROUTER_API_KEY em config.js (ambos gratuitos, sem cartão de crédito — veja aistudio.google.com/apikey e openrouter.ai/settings/keys)');
}

async function _chamarGemini(apiKey, systemPrompt, userPrompt, maxTokens) {
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

async function _chamarOpenRouter(apiKey, systemPrompt, userPrompt, maxTokens) {
  const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.3-70b-instruct:free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: maxTokens
    })
  });
  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`OpenRouter HTTP ${resp.status}: ${errBody.substring(0, 200)}`);
  }
  const data = await resp.json();
  const texto = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || '').trim();
  if (!texto) throw new Error('OpenRouter (Llama) retornou resposta vazia');
  return texto;
}

// Mesmo utilitário de limpeza de JSON usado em outros arquivos do repo
// (remove cercas ```json), pra parsear resposta estruturada da IA gratuita.
function parseJSONGratuito(texto) {
  const limpo = texto.replace(/```json|```/g, '').trim();
  return JSON.parse(limpo);
}
