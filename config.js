// ============================================================
// ARQUIVO DE CONFIGURAÇÃO CENTRAL — USO EXCLUSIVO DE WAGNER
// Não compartilhar. Não versionar em repositório público.
// ============================================================
//
// CORREÇÃO DE SEGURANÇA (2026-07-24): a chave da Anthropic que estava
// escrita aqui foi REMOVIDA e REGENERADA — este arquivo é commitado no
// GitHub, então a chave ficava exposta pra qualquer pessoa com acesso
// ao repositório. A partir de agora as chamadas à Anthropic passam por
// um proxy no servidor (api/claude.js), que lê ANTHROPIC_API_KEY de
// uma variável de ambiente na Vercel — a chave nunca mais aparece em
// nenhum arquivo do navegador. Isso só funciona acessando o triplo
// pela URL da Vercel (depois de importar este repositório lá), não
// mais abrindo os HTML direto do disco.

const CONFIG = {
  MODEL: "claude-sonnet-4-6",
  MAX_TOKENS: 4096,
  GITHUB_TOKEN: "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",
  GITHUB_OWNER: "sitedasletras",
  GITHUB_REPO: "triploohesigmalbpl",
  // Chave da Stability AI — MIGRADA (2026-07-24): não fica mais aqui, agora
  // é STABILITY_API_KEY na Vercel (variável de ambiente), lida pelos
  // proxies api/gerar-imagem.js e api/stability-imagem.js.
  //
  // Chave do Google Gemini — MIGRADA (2026-07-24): não fica mais aqui, agora
  // é GEMINI_API_KEY na Vercel, lida por api/ia-gratuita.js (biografias/
  // perfis, com fallback pro OpenRouter), api/gemini-avaliar-voz.js
  // (criador_vozes.html) e api/gerar-imagem.js (geração de imagem).
  //
  // Chave do OpenRouter — MIGRADA (2026-07-24): não fica mais aqui, agora é
  // OPENROUTER_API_KEY na Vercel, lida por api/ia-gratuita.js.
  // ⚠ LEMBRETE: chave criada em 20/07/2026, vence em 20/07/2027 (1 ano).
  // Renovar até 05/07/2027 (11,5 meses a partir da criação).
  //
  // Chave do Fish Audio (fish.audio) — MIGRADA (2026-07-24): não fica mais
  // aqui, agora é FISH_AUDIO_API_KEY na Vercel (variável de ambiente), lida
  // pelos proxies api/fishaudio-voice-design.js, api/fishaudio-model.js e
  // api/fishaudio-tts.js. fish_audio.js chama esses proxies em vez da API
  // direta — a chave nunca mais passa pelo navegador.
  //
  // Chave da ElevenLabs (elevenlabs.io) — usada por elevenlabs_music.js pra
  // gerar o áudio de verdade (voz + instrumentação) das músicas do Sigmal
  // Music Studio, a partir da letra/arranjo já aprovados. Chave sem
  // restrição de endpoint (cobre Music, TTS, Voices etc. do Silo Multimídia).
  // Crie a sua em https://elevenlabs.io/app/settings/api-keys e cole aqui.
  ELEVENLABS_API_KEY: "sk_4286e202822b82373be7160eb9b91b6d63d17df50d386196"
  //
  // Chave da OpenAI (platform.openai.com) — não é mais lida daqui: quando
  // configurada, é OPENAI_API_KEY na Vercel, lida por api/gerar-imagem.js
  // (GPT Image 2). PRECISA de cartão cadastrado lá — não tem tier gratuito.
};

window.ANTHROPIC_MODEL      = CONFIG.MODEL;
window.ANTHROPIC_MAX_TOKENS = CONFIG.MAX_TOKENS;
window.GITHUB_TOKEN         = CONFIG.GITHUB_TOKEN;
window.GITHUB_OWNER         = CONFIG.GITHUB_OWNER;
window.GITHUB_REPO          = CONFIG.GITHUB_REPO;
window.ELEVENLABS_API_KEY   = CONFIG.ELEVENLABS_API_KEY;

// FETCH INTERCEPTOR — reescreve chamadas à Anthropic pro proxy seguro
// (api/claude.js), que injeta a chave no servidor. Nenhuma chave passa
// mais pelo navegador.
(function() {
  const _fetch = window.fetch;
  window.fetch = function(url, options) {
    if (typeof url === 'string' && url.includes('api.anthropic.com/v1/messages')) {
      url = '/api/claude';
    }
    return _fetch.call(this, url, options);
  };
})();
