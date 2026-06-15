// ============================================================
// ARQUIVO DE CONFIGURAÇÃO CENTRAL — USO EXCLUSIVO DE WAGNER
// Não compartilhar. Não versionar em repositório público.
// ============================================================

const CONFIG = {
  ANTHROPIC_API_KEY: "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", // ← insira sua chave aqui
  MODEL: "claude-sonnet-4-6",
  MAX_TOKENS: 1024
};

// Torna a config disponível globalmente
window.ANTHROPIC_API_KEY = CONFIG.ANTHROPIC_API_KEY;
window.ANTHROPIC_MODEL = CONFIG.MODEL;
window.ANTHROPIC_MAX_TOKENS = CONFIG.MAX_TOKENS;
