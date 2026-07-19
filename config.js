// ============================================================
// ARQUIVO DE CONFIGURAÇÃO CENTRAL — USO EXCLUSIVO DE WAGNER
// Não compartilhar. Não versionar em repositório público.
// ============================================================

const CONFIG = {
  ANTHROPIC_API_KEY: "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",
  MODEL: "claude-sonnet-4-6",
  MAX_TOKENS: 4096,
  GITHUB_TOKEN: "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",
  GITHUB_OWNER: "sitedasletras",
  GITHUB_REPO: "triploohesigmalbpl",
  STABILITY_API_KEY: "sk-MUyr0gAR6H9JRh8IrfNh0Ppzgz51DdUNxQHGyz7PIBq16W2r"
};

window.ANTHROPIC_API_KEY    = CONFIG.ANTHROPIC_API_KEY;
window.ANTHROPIC_MODEL      = CONFIG.MODEL;
window.ANTHROPIC_MAX_TOKENS = CONFIG.MAX_TOKENS;
window.GITHUB_TOKEN         = CONFIG.GITHUB_TOKEN;
window.GITHUB_OWNER         = CONFIG.GITHUB_OWNER;
window.GITHUB_REPO          = CONFIG.GITHUB_REPO;
window.STABILITY_API_KEY    = CONFIG.STABILITY_API_KEY;

// FETCH INTERCEPTOR — injeta chave em todas as chamadas Anthropic
(function() {
  const _fetch = window.fetch;
  window.fetch = function(url, options) {
    if (typeof url === 'string' && url.includes('api.anthropic.com')) {
      options = options || {};
      options.headers = Object.assign({}, options.headers, {
        'x-api-key': CONFIG.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      });
    }
    return _fetch.apply(this, arguments);
  };
})();
