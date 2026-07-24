// Proxy server-side pro Gemini usado em criador_vozes.html — ouve um áudio
// (nativamente, não só texto) e descreve a voz objetivamente. Mesma
// mensagem amigável pro caso comum de limite de cota gratuita (429).
function mensagemErroIA(status, errBody) {
  if (status === 429) {
    return 'Você atingiu o limite gratuito de uso da IA por agora. Espere alguns minutos e tente de novo — se continuar, pode ser o limite diário, aí só volta amanhã. Enquanto isso, dá pra digitar o nome do personagem direto no campo, sem precisar da sugestão.';
  }
  return `Gemini HTTP ${status}: ${errBody.substring(0, 200)}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const chave = process.env.GEMINI_API_KEY;
  if (!chave) {
    return res.status(500).json({ error: 'GEMINI_API_KEY não configurada no servidor.' });
  }

  const { base64, mimeType } = req.body || {};
  if (!base64) {
    return res.status(400).json({ error: 'Informe "base64" (áudio codificado).' });
  }

  const prompt = 'Ouça este áudio com atenção e descreva objetivamente a voz, em português, em um parágrafo curto: gênero aparente, faixa etária aparente, tom/timbre (grave, médio, agudo), energia (calma, enérgica, contida, rouca), e qualquer sotaque ou traço regional perceptível. Não invente nada que não dê pra perceber pelo áudio — se a nota for muito curta ou pouco clara, diga isso explicitamente.';

  try {
    const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${chave}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }, { inline_data: { mime_type: mimeType || 'audio/ogg', data: base64 } }] }],
      }),
    });
    if (!resp.ok) {
      const errBody = await resp.text();
      return res.status(resp.status).json({ error: mensagemErroIA(resp.status, errBody) });
    }
    const data = await resp.json();
    const texto = ((data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) || [])
      .map((p) => p.text || '').join('').trim();
    if (!texto) return res.status(502).json({ error: 'Gemini não retornou descrição (pode ter sido cortado por safety filter)' });
    return res.status(200).json({ texto });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
