// ============================================================
// ARQUIVO DE CONFIGURAÇÃO CENTRAL — USO EXCLUSIVO DE WAGNER
// Não compartilhar. Não versionar em repositório público.
// ============================================================

const CONFIG = {
  ANTHROPIC_API_KEY: "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", // ← substitua pelo valor gerado em console.anthropic.com
  MODEL: "claude-sonnet-4-6",
  MAX_TOKENS: 1024,
  GITHUB_TOKEN: "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",
  GITHUB_OWNER: "sitedasletras",
  GITHUB_REPO: "triploohesigmalbpl"
};

// Torna a config disponível globalmente
window.ANTHROPIC_API_KEY = CONFIG.ANTHROPIC_API_KEY;
window.ANTHROPIC_MODEL = CONFIG.MODEL;
window.ANTHROPIC_MAX_TOKENS = CONFIG.MAX_TOKENS;
window.GITHUB_TOKEN = CONFIG.GITHUB_TOKEN;
window.GITHUB_OWNER = CONFIG.GITHUB_OWNER;
window.GITHUB_REPO = CONFIG.GITHUB_REPO;
