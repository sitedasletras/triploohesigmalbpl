/**
 * FISH AUDIO — cliente de API (triploohesigmalbpl)
 * -------------------------------------------------
 * Ponte pro Fish Audio (fish.audio), usada pra criar timbres de voz ORIGINAIS
 * (nunca clonando celebridade real — ver perfil_vocal.js pra essa discussão)
 * pros 110 personagens do Perfil Vocal (atores do BPL + cantores do Sigmal
 * Music), em dois modos:
 *
 *   1. Por descrição (Voice Design) — sem áudio nenhum, o próprio Fish Audio
 *      gera uma voz nova a partir do texto do arquetipoVocal que já temos.
 *   2. Por áudio de referência (clonagem) — sobe um mp3/wav/m4a (gravação
 *      própria, dublê contratado, etc. — nunca voz de celebridade sem
 *      permissão) e o Fish Audio treina um modelo reutilizável a partir dele.
 *
 * A chamada de verdade pro Fish Audio acontece no servidor (api/claude.js do
 * Fish Audio, por assim dizer): api/fishaudio-voice-design.js,
 * api/fishaudio-model.js e api/fishaudio-tts.js. A chave (FISH_AUDIO_API_KEY)
 * só existe como variável de ambiente na Vercel — nunca chega no navegador.
 *
 * Endpoints reais confirmados direto no código-fonte do SDK oficial
 * (github.com/fishaudio/fish-audio-python/blob/main/src/fish_audio_sdk/apis.py
 * e schemas.py), já que a documentação em docs.fish.audio bloqueia acesso
 * automatizado:
 *   - POST /v1/voice-design  → cria voz a partir de descrição em texto
 *   - POST /model            → clona voz a partir de áudio (multipart)
 *   - POST /v1/tts           → sintetiza fala usando uma voz salva (JSON)
 *
 * NOTA: o schema exato da resposta de /v1/voice-design (como confirmar um
 * dos dois candidatos gerados como voz definitiva) não pôde ser confirmado
 * 100% via código-fonte público — o código abaixo assume o formato mais
 * comum (JSON com um array de candidatos, cada um com campo `_id`). Se a
 * resposta real vier diferente, é só ajustar o parse em
 * `criarVozPorDescricao()` — o resto da ponte não muda.
 */

// Cria uma voz original a partir de uma descrição em texto (Voice Design) —
// nunca clona ninguém real, é sempre uma voz nova. Retorna os candidatos
// gerados pra ouvir antes de escolher qual salvar.
async function criarVozPorDescricao(descricao) {
  const resp = await fetch('/api/fishaudio-voice-design', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: descricao })
  });
  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Fish Audio (voice-design) HTTP ${resp.status}: ${errBody.substring(0, 200)}`);
  }
  const data = await resp.json();
  const candidatos = data.candidates || data.voices || (Array.isArray(data) ? data : [data]);
  return candidatos.map(c => ({ id: c._id || c.id, previewUrl: c.audio_url || c.preview_url || null }));
}

// Clona uma voz a partir de um áudio de referência (Blob/File — mp3, wav,
// m4a) enviado por upload. `transcricao` é opcional mas acelera e melhora a
// precisão (evita o Fish Audio ter que transcrever o áudio sozinho via ASR).
async function criarVozPorAudio(titulo, audioBlob, transcricao) {
  const form = new FormData();
  form.append('title', titulo);
  form.append('type', 'tts');
  form.append('train_mode', 'fast');
  form.append('visibility', 'private');
  form.append('voices', audioBlob, 'referencia.audio');
  if (transcricao) form.append('texts', transcricao);

  const resp = await fetch('/api/fishaudio-model', {
    method: 'POST',
    body: form
  });
  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Fish Audio (clonagem) HTTP ${resp.status}: ${errBody.substring(0, 200)}`);
  }
  const data = await resp.json();
  return { id: data._id || data.id, titulo: data.title || titulo };
}

// Sintetiza fala de verdade usando uma voz já salva (referenceId = o `id`
// devolvido por criarVozPorDescricao/criarVozPorAudio). Retorna um Blob de
// áudio (mp3) pronto pra tocar ou baixar.
async function sintetizarComVozPremium(referenceId, texto) {
  const resp = await fetch('/api/fishaudio-tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texto, reference_id: referenceId, format: 'mp3' })
  });
  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Fish Audio (tts) HTTP ${resp.status}: ${errBody.substring(0, 200)}`);
  }
  return await resp.blob();
}
