// ============================================================
// ARQUIVO DE CONFIGURAÇÃO CENTRAL — USO EXCLUSIVO DE WAGNER
// Não compartilhar. Não versionar em repositório público.
// Adicionar ao .gitignore: config.js
// ============================================================

const CONFIG = {
  ANTHROPIC_API_KEY: "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",
  MODEL: "claude-sonnet-4-6",
  MAX_TOKENS: 1024,
  GITHUB_TOKEN: "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",
  GITHUB_OWNER: "sitedasletras",
  GITHUB_REPO: "triploohesigmalbpl",
  STABILITY_API_KEY: "sk-pyLW73TPKqi8GhK6nU0hiEF1rCnhY8OmFhgFD6WJbJ2uPnEH"
};

// Torna a config disponível globalmente
window.ANTHROPIC_API_KEY   = CONFIG.ANTHROPIC_API_KEY;
window.ANTHROPIC_MODEL     = CONFIG.MODEL;
window.ANTHROPIC_MAX_TOKENS = CONFIG.MAX_TOKENS;
window.GITHUB_TOKEN        = CONFIG.GITHUB_TOKEN;
window.GITHUB_OWNER        = CONFIG.GITHUB_OWNER;
window.GITHUB_REPO         = CONFIG.GITHUB_REPO;
window.STABILITY_API_KEY   = CONFIG.STABILITY_API_KEY;
