// ============================================================
// ARQUIVO DE CONFIGURAÇÃO CENTRAL — USO EXCLUSIVO DE WAGNER
// Não compartilhar. Não versionar em repositório público.
// ============================================================

const CONFIG = {
  ANTHROPIC_API_KEY: "SUA_CHAVE_AQUI", // ← insira sua chave aqui
  MODEL: "claude-sonnet-4-20250514",
  MAX_TOKENS: 1024
};

// Torna a config disponível globalmente
window.ANTHROPIC_API_KEY = CONFIG.ANTHROPIC_API_KEY;
window.ANTHROPIC_MODEL = CONFIG.MODEL;
window.ANTHROPIC_MAX_TOKENS = CONFIG.MAX_TOKENS;
