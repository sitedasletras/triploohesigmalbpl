/**
 * ELEVENLABS MUSIC — cliente de API (triploohesigmalbpl)
 * -------------------------------------------------------
 * Ponte pra ElevenLabs Music (elevenlabs.io), usada pra sintetizar o áudio
 * de verdade (letra + arranjo do Condor Andino / Maestro Aaron) em uma
 * música completa, com voz e instrumentação, a partir de um prompt em texto.
 *
 * Migrado (2026-07-24): a chamada de verdade acontece no servidor
 * (api/elevenlabs-music.js) — a chave (ELEVENLABS_API_KEY) só existe como
 * variável de ambiente na Vercel, nunca chega ao navegador.
 *
 * Preço de referência (pay-as-you-go, pesquisado em jul/2026): ~$0,15/minuto
 * de música gerada — é essa a variável de custo que domina o preço de venda
 * de R$7,50/US$7,50 por música definido com o Wagner.
 */

// Gera uma música completa (voz + instrumentação) a partir de um prompt em
// texto descrevendo a canção (gênero, tom, letra, instrumentação — o próprio
// texto que o Maestro Aaron já produz serve como prompt). `duracaoSegundos`
// é opcional (padrão 3min); a API aceita de 3s a 10min (3.000 a 600.000ms).
// Retorna um Blob de áudio (mp3) pronto pra tocar ou baixar.
async function gerarMusica(promptTexto, duracaoSegundos, opcoes) {
  opcoes = opcoes || {};
  const duracaoMs = Math.min(600000, Math.max(3000, Math.round((duracaoSegundos || 180) * 1000)));

  const corpo = {
    prompt: promptTexto,
    musicLengthMs: duracaoMs,
    outputFormat: opcoes.outputFormat || 'mp3_44100_128',
  };
  if (typeof opcoes.forceInstrumental === 'boolean') corpo.forceInstrumental = opcoes.forceInstrumental;
  if (opcoes.seed) corpo.seed = opcoes.seed;

  const resp = await fetch('/api/elevenlabs-music', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(corpo)
  });
  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`ElevenLabs Music HTTP ${resp.status}: ${errBody.substring(0, 200)}`);
  }
  return await resp.blob();
}
