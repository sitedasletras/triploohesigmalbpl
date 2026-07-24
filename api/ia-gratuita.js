// Proxy server-side pra IA gratuita (Gemini com fallback pro Llama via
// OpenRouter) — usada só pra biografias/perfis, não pra escrita das obras
// (isso continua no Claude, api/claude.js). Mesma lógica que existia no
// navegador, só que as chaves agora ficam só aqui.
async function chamarGemini(apiKey, systemPrompt, userPrompt, maxTokens) {
  const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      generationConfig: { maxOutputTokens: maxTokens },
    }),
  });
  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Gemini HTTP ${resp.status}: ${errBody.substring(0, 200)}`);
  }
  const data = await resp.json();
  const texto = ((data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [])
    .map((p) => p.text || '').join('').trim();
  if (!texto) throw new Error('Gemini retornou resposta vazia (pode ter sido cortada por safety filter ou limite de tokens)');
  return texto;
}

async function chamarOpenRouter(apiKey, systemPrompt, userPrompt, maxTokens) {
  const resp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'meta-llama/llama-3.3-70b-instruct:free',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: maxTokens,
    }),
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { systemPrompt, userPrompt, maxTokens } = req.body || {};
  if (!userPrompt) {
    return res.status(400).json({ error: 'Informe "userPrompt".' });
  }
  const tokens = maxTokens || 2000;

  const chaveGemini = process.env.GEMINI_API_KEY;
  const chaveOpenRouter = process.env.OPENROUTER_API_KEY;
  let erroGemini = null;

  if (chaveGemini) {
    try {
      const texto = await chamarGemini(chaveGemini, systemPrompt || '', userPrompt, tokens);
      return res.status(200).json({ texto, fonte: 'gemini' });
    } catch (e) {
      erroGemini = e;
    }
  }

  if (chaveOpenRouter) {
    try {
      const texto = await chamarOpenRouter(chaveOpenRouter, systemPrompt || '', userPrompt, tokens);
      return res.status(200).json({ texto, fonte: 'openrouter' });
    } catch (e) {
      return res.status(502).json({
        error: `Gemini${erroGemini ? ' (' + erroGemini.message + ')' : ' não configurado'} e OpenRouter falharam. OpenRouter: ${e.message}`,
      });
    }
  }

  if (erroGemini) return res.status(502).json({ error: erroGemini.message });
  return res.status(500).json({ error: 'Configure GEMINI_API_KEY e/ou OPENROUTER_API_KEY no servidor (variáveis de ambiente da Vercel).' });
}
