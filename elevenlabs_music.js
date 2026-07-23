/**
 * ELEVENLABS MUSIC — cliente de API (triploohesigmalbpl)
 * -------------------------------------------------------
 * Ponte pra ElevenLabs Music (elevenlabs.io), usada pra sintetizar o áudio
 * de verdade (letra + arranjo do Condor Andino / Maestro Aaron) em uma
 * música completa, com voz e instrumentação, a partir de um prompt em texto.
 *
 * Endpoint confirmado direto no SDK oficial em Python
 * (github.com/elevenlabs/elevenlabs-python/blob/main/src/elevenlabs/music/raw_client.py),
 * já que a documentação em elevenlabs.io bloqueia acesso automatizado a partir
 * deste ambiente:
 *   - POST /v1/music → gera a música (corpo JSON: prompt, music_length_ms,
 *     model_id, seed, force_instrumental, etc.; output_format vai como query
 *     string). Resposta: bytes de áudio brutos (stream), não JSON.
 * Base: https://api.elevenlabs.io · Autenticação: header xi-api-key: <chave>
 *
 * Preço de referência (pay-as-you-go, pesquisado em jul/2026): ~$0,15/minuto
 * de música gerada — é essa a variável de custo que domina o preço de venda
 * de R$7,50/US$7,50 por música definido com o Wagner.
 */

const ELEVENLABS_BASE = 'https://api.elevenlabs.io';

// Não lança erro se a chave não existir no navegador — mesmo raciocínio do
// fish_audio.js: no Celeiro Literário (site público) a chamada real vai
// passar por um proxy server-side, nunca pela chave no cliente. Só no
// triploohesigmalbpl (uso interno) a chave mesmo fica no navegador.
function _elevenLabsHeaders(extra) {
  const chave = window.ELEVENLABS_API_KEY || '';
  const base = chave ? { 'xi-api-key': chave } : {};
  return Object.assign(base, extra || {});
}

// Gera uma música completa (voz + instrumentação) a partir de um prompt em
// texto descrevendo a canção (gênero, tom, letra, instrumentação — o próprio
// texto que o Maestro Aaron já produz serve como prompt). `duracaoSegundos`
// é opcional (padrão 3min); a API aceita de 3s a 10min (3.000 a 600.000ms).
// Retorna um Blob de áudio (mp3) pronto pra tocar ou baixar.
async function gerarMusica(promptTexto, duracaoSegundos, opcoes) {
  opcoes = opcoes || {};
  const duracaoMs = Math.min(600000, Math.max(3000, Math.round((duracaoSegundos || 180) * 1000)));
  const outputFormat = opcoes.outputFormat || 'mp3_44100_128';

  const corpo = {
    prompt: promptTexto,
    music_length_ms: duracaoMs
  };
  if (typeof opcoes.forceInstrumental === 'boolean') corpo.force_instrumental = opcoes.forceInstrumental;
  if (opcoes.seed) corpo.seed = opcoes.seed;

  const resp = await fetch(`${ELEVENLABS_BASE}/v1/music?output_format=${encodeURIComponent(outputFormat)}`, {
    method: 'POST',
    headers: _elevenLabsHeaders({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(corpo)
  });
  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`ElevenLabs Music HTTP ${resp.status}: ${errBody.substring(0, 200)}`);
  }
  return await resp.blob();
}
