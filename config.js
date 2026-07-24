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
  STABILITY_API_KEY: "sk-MUyr0gAR6H9JRh8IrfNh0Ppzgz51DdUNxQHGyz7PIBq16W2r",
  // Chave GRATUITA do Google Gemini (tier free, sem cartão de crédito).
  // Pegue a sua em https://aistudio.google.com/apikey e cole aqui.
  // Usada só em biografias/perfis físico-psicológicos (ver ia_gratuita.js) —
  // a escrita das obras continua no Claude acima.
  GEMINI_API_KEY: "AQ.Ab8RN6JB2YdrPdoZLAahyYO5X5L1ZO6evW65V0lemVf074L3aw",
  // Chave GRATUITA do OpenRouter (sem cartão de crédito) — usada como
  // fallback do Gemini em ia_gratuita.js, rodando um modelo Llama gratuito
  // (a Llama API oficial da própria Meta foi desativada em 6/jul/2026).
  // Pegue a sua em https://openrouter.ai/settings/keys e cole aqui.
  // ⚠ LEMBRETE: chave criada em 20/07/2026, vence em 20/07/2027 (1 ano).
  // Renovar até 05/07/2027 (11,5 meses a partir da criação).
  OPENROUTER_API_KEY: "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",
  // Chave do Fish Audio (fish.audio) — usada por fish_audio.js pra criar
  // timbres de voz ORIGINAIS (Voice Design por descrição, ou clonagem a
  // partir de áudio de referência que você mesmo suba) pros personagens do
  // Perfil Vocal. NÃO é gratuita pra uso comercial em volume — veja o plano
  // certo em fish.audio/pricing antes de gerar muitas vozes.
  // Crie a sua em https://fish.audio/app/api-keys/ e cole aqui.
  FISH_AUDIO_API_KEY: "55f45b93fe794f6a8c0e2a5de81ee482",
  // Chave da ElevenLabs (elevenlabs.io) — usada por elevenlabs_music.js pra
  // gerar o áudio de verdade (voz + instrumentação) das músicas do Sigmal
  // Music Studio, a partir da letra/arranjo já aprovados. Chave sem
  // restrição de endpoint (cobre Music, TTS, Voices etc. do Silo Multimídia).
  // Crie a sua em https://elevenlabs.io/app/settings/api-keys e cole aqui.
  ELEVENLABS_API_KEY: "sk_4286e202822b82373be7160eb9b91b6d63d17df50d386196",
  // Chave da OpenAI (platform.openai.com) — usada por fonte_imagem.js pra
  // gerar imagem via GPT Image 2 (capa em qualidade alta, e imagem "mais
  // barata possível" em qualidade baixa assim que essa chave existir).
  // PRECISA de cartão cadastrado lá — não tem tier gratuito de imagem.
  // Crie a sua em https://platform.openai.com/api-keys e cole aqui.
  OPENAI_API_KEY: ""
};

window.ANTHROPIC_MODEL      = CONFIG.MODEL;
window.ANTHROPIC_MAX_TOKENS = CONFIG.MAX_TOKENS;
window.GITHUB_TOKEN         = CONFIG.GITHUB_TOKEN;
window.GITHUB_OWNER         = CONFIG.GITHUB_OWNER;
window.GITHUB_REPO          = CONFIG.GITHUB_REPO;
window.STABILITY_API_KEY    = CONFIG.STABILITY_API_KEY;
window.GEMINI_API_KEY       = CONFIG.GEMINI_API_KEY;
window.OPENROUTER_API_KEY   = CONFIG.OPENROUTER_API_KEY;
window.FISH_AUDIO_API_KEY   = CONFIG.FISH_AUDIO_API_KEY;
window.ELEVENLABS_API_KEY   = CONFIG.ELEVENLABS_API_KEY;
window.OPENAI_API_KEY       = CONFIG.OPENAI_API_KEY;

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
