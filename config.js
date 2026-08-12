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
  // Chave do GitHub (GITHUB_TOKEN) — MIGRADA (2026-07-24): não fica mais
  // aqui, agora é GITHUB_TOKEN na Vercel, lida por api/github-contents.js
  // (proxy único, com repositórios permitidos fixos: triploohesigmalbpl,
  // CeleiroLiterario e OHE-PECANHA). Todas as páginas que escreviam direto
  // na API do GitHub agora chamam esse proxy.
  //
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
  // Chave da ElevenLabs — MIGRADA (2026-07-24): não fica mais aqui, agora é
  // ELEVENLABS_API_KEY na Vercel, lida por api/elevenlabs-music.js.
  //
  // Chave da OpenAI (platform.openai.com) — não é mais lida daqui: quando
  // configurada, é OPENAI_API_KEY na Vercel, lida por api/gerar-imagem.js
  // (GPT Image 2). PRECISA de cartão cadastrado lá — não tem tier gratuito.
};

window.ANTHROPIC_MODEL      = CONFIG.MODEL;
window.ANTHROPIC_MAX_TOKENS = CONFIG.MAX_TOKENS;

// FETCH INTERCEPTOR — reescreve chamadas à Anthropic pro proxy seguro
// (api/claude.js), que injeta a chave no servidor. Nenhuma chave passa
// mais pelo navegador.
//
// Também injeta o token de sessão (guardado no localStorage pelo login do
// Quartel General, index.html) em toda chamada aos proxies de API paga —
// sem isso, qualquer um com a URL da Vercel usava a chave do servidor de
// graça, mesmo sem nunca ter feito login (AUDITORIA 2026-08-04).
const CAMINHOS_PROXY_PAGO = [
  '/api/claude', '/api/gerar-imagem', '/api/stability-imagem',
  '/api/elevenlabs-music', '/api/fishaudio-tts', '/api/fishaudio-model',
  '/api/fishaudio-voice-design', '/api/gemini-avaliar-voz', '/api/ia-gratuita',
  '/api/github-contents',
];
(function() {
  const _fetch = window.fetch;
  window.fetch = function(url, options) {
    if (typeof url === 'string' && url.includes('api.anthropic.com/v1/messages')) {
      url = '/api/claude';
    }
    if (typeof url === 'string' && CAMINHOS_PROXY_PAGO.some(p => url.startsWith(p))) {
      options = options || {};
      if (!(options.headers instanceof Headers)) {
        options.headers = options.headers || {};
        if (!options.headers['x-celeiro-senha']) {
          options.headers['x-celeiro-senha'] = localStorage.getItem('sigmal_hq_token') || '';
        }
      }
    }
    return _fetch.call(this, url, options);
  };
})();
