/**
 * IA GRATUITA — triploohesigmalbpl
 * ---------------------------------
 * Chamada de texto via Google Gemini (tier gratuito, sem cartão de crédito,
 * modelo gemini-flash-latest — alias que a Google mantém apontando pro
 * flash mais atual, evitando quebrar quando um modelo específico é
 * descontinuado), com fallback automático pro OpenRouter (também
 * gratuito, sem cartão) rodando um modelo Llama, caso o Gemini falhe ou não
 * esteja configurado. Usada só para funções de bastidor que não precisam da
 * qualidade literária do Claude: biografias de heterônimos e perfis
 * físico/psicológicos de personagens. A escolha do heterônimo e a escrita
 * das obras em si continuam no Claude (pago) — só o que é "ficha"/perfil
 * passa a ser gratuito, pra não pesar na conta da API.
 *
 * Migrado (2026-07-24): a lógica de chamar Gemini com fallback pro
 * OpenRouter agora mora no servidor (api/ia-gratuita.js) — as chaves nunca
 * mais chegam no navegador. Este arquivo virou um cliente fino.
 */

async function chamarIAGratuita(systemPrompt, userPrompt, maxTokens = 2000) {
  const resp = await fetch('/api/ia-gratuita', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ systemPrompt, userPrompt, maxTokens }),
  });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error || `IA gratuita HTTP ${resp.status}`);
  return data.texto;
}

// Mesmo utilitário de limpeza de JSON usado em outros arquivos do repo
// (remove cercas ```json), pra parsear resposta estruturada da IA gratuita.
function parseJSONGratuito(texto) {
  const limpo = texto.replace(/```json|```/g, '').trim();
  return JSON.parse(limpo);
}
