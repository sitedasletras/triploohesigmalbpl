/* ═══════════════════════════════════════════════════════════
   MOTOR UPLOAD MANUSCRITO v1 — Celeiro Literário / Lapidar
   Widget reutilizável de upload (.txt/.docx/.doc) + leitura do
   texto encaminhado pelo roteador (Preparação da Obra).
   Cada diagramador inclui este script + chama
   CeleiroUploadManuscrito.montar({ ...seletores }) uma vez.
   Depende de mammoth.js já estar carregado no HTML hospedeiro.
   ═══════════════════════════════════════════════════════════ */

(function(root){
'use strict';

async function lerArquivo(file){
  const nome = file.name.toLowerCase();
  if(nome.endsWith('.txt')){
    return await file.text();
  }
  if(nome.endsWith('.docx')){
    if(!root.mammoth) throw new Error('mammoth.js não carregado nesta página.');
    const arrayBuffer = await file.arrayBuffer();
    const resultado = await root.mammoth.extractRawText({ arrayBuffer });
    return resultado.value || '';
  }
  if(nome.endsWith('.doc')){
    // .doc binário antigo: melhor esforço, sem parser dedicado.
    return await file.text().catch(()=> '');
  }
  throw new Error('Formato não suportado. Use TXT, DOC ou DOCX.');
}

// Lê o texto e o resultado do roteamento que a Preparação da Obra
// deixou no localStorage, se o autor veio de lá.
function lerHandoffRoteador(){
  const texto = localStorage.getItem('lapidar_obra_texto') || '';
  let roteamento = null;
  try{ roteamento = JSON.parse(localStorage.getItem('lapidar_obra_roteamento')||'null'); }
  catch(e){ roteamento = null; }
  return { texto, roteamento };
}

// Monta o comportamento de upload num par <input type=file> + textarea,
// já disponíveis no HTML do diagramador.
// opcoes = { inputId, textareaId, statusId, aoCarregar(texto) }
function montar(opcoes){
  const input = document.getElementById(opcoes.inputId);
  const textarea = document.getElementById(opcoes.textareaId);
  const status = opcoes.statusId ? document.getElementById(opcoes.statusId) : null;
  if(!input || !textarea) return;

  input.addEventListener('change', async (e)=>{
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    if(status) status.textContent = 'Lendo arquivo: ' + file.name;
    try{
      const texto = await lerArquivo(file);
      textarea.value = texto;
      if(status) status.textContent = `Arquivo "${file.name}" carregado.`;
      if(typeof opcoes.aoCarregar==='function') opcoes.aoCarregar(texto);
      textarea.dispatchEvent(new Event('input')); // dispara o render automático do diagramador
    }catch(err){
      if(status) status.textContent = 'Erro ao ler arquivo: ' + err.message;
    }
  });

  // Se o autor veio da Preparação da Obra, carrega automaticamente.
  const handoff = lerHandoffRoteador();
  if(handoff.texto){
    textarea.value = handoff.texto;
    if(status){
      status.textContent = handoff.roteamento
        ? `Texto recebido da Preparação da Obra (${handoff.roteamento.nome}).`
        : 'Texto recebido automaticamente.';
    }
    if(typeof opcoes.aoCarregar==='function') opcoes.aoCarregar(handoff.texto);
    // Limpa a chave de texto (não o roteamento, útil pra exibir o motivo)
    // pra não recarregar o mesmo texto numa visita futura sem querer.
    localStorage.removeItem('lapidar_obra_texto');
  }
}

root.CeleiroUploadManuscrito = { lerArquivo, lerHandoffRoteador, montar };

})(typeof window!=='undefined'?window:global);
