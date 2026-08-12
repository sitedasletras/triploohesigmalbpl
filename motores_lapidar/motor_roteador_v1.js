/* ═══════════════════════════════════════════════════════════
   MOTOR ROTEADOR v1 — Celeiro Literário / Lapidar
   Decide para qual diagramador um material deve ser enviado.
   Depende de motor_celeiro_v3.js já estar carregado antes deste script.
   ═══════════════════════════════════════════════════════════ */

(function(root){
'use strict';

if(!root.CeleiroV3){
  console.error('motor_roteador_v1.js precisa do motor_celeiro_v3.js carregado antes.');
  return;
}
const V3 = root.CeleiroV3;

// ═══════════════════════════════════════════════════════════
// 1. DESTINOS — nome do arquivo de cada diagramador
// ═══════════════════════════════════════════════════════════
const DESTINOS = {
  prosa:      { arquivo:'polux_v3.html',      nome:'Pólux',      motivo:'Texto corrido, sem padrão de estrofe.' },
  poesiaLivre:{ arquivo:'castor_v3.html',     nome:'Castor',     motivo:'Poesia sem se encaixar em forma fixa.' },
  soneto:     { arquivo:'apolo_v3.html',      nome:'Apolo',      motivo:'' },
  oriental:   { arquivo:'samurai_v3.html',    nome:'Samurai',    motivo:'' },
  estrofista: { arquivo:'espartano_v3.html',  nome:'Espartano',  motivo:'Novo Movimento Estrofista (marca registrada) — 7 estrofes em losango 1-2-3-4-3-2-1.' },
  cordel:     { arquivo:'quironxada_v3.html', nome:'Qui(RON)xadá', motivo:'Predominância de sextilha e/ou décima.' },
  hibrido:    { arquivo:'centauro_v3.html',   nome:'Centauro',   motivo:'' },
  vazio:      { arquivo:null,                 nome:null,         motivo:'Nenhum texto detectado.' },
};

// ═══════════════════════════════════════════════════════════
// Helpers de bloco: cada "bloco" vira { versos, nVersos, mediaChars }
// ═══════════════════════════════════════════════════════════
// Mesmo padrão usado em motor_celeiro_v3.js pra reconhecer início de fala
// (travessão/hífen + espaço) — um parágrafo de diálogo colado sem linha em
// branco entre falas (comum em texto colado/editado à mão) tem várias
// linhas curtas, exatamente a forma que um bloco de soneto/estrofe também
// tem por contagem pura de linha. Sem checar isso, uma cena de diálogo com
// 14-17 falas virava "soneto monostrófico" pro roteador — bug real: o
// texto ia pro Apolo (diagramador de soneto) em vez do Pólux (prosa),
// aplicando regra de verso numa coisa que é diálogo comum.
const RE_INICIO_FALA=/^[-–—]\s/;
function analisarBloco(b){
  const versos = b.split('\n').map(l=>l.trim()).filter(Boolean);
  const mediaChars = versos.length ? versos.reduce((s,l)=>s+l.length,0)/versos.length : 0;
  const nFala = versos.filter(l=>RE_INICIO_FALA.test(l)).length;
  const pareceDialogo = versos.length>0 && (nFala/versos.length) > 0.4;
  return { versos, nVersos: versos.length, mediaChars, pareceDialogo };
}

// Um bloco "parece" verso curto de forma oriental (haicai/tanka) —
// linhas curtas, sem pontuação de frase encerrando cada linha.
function blocoPareceOriental(analise){
  if(analise.pareceDialogo) return null;
  if(analise.nVersos===3 && analise.mediaChars<=28) return 'haicai_curto';
  if(analise.nVersos===3 && analise.mediaChars>28) return 'sijo';
  if(analise.nVersos===5 && analise.mediaChars<=30) return 'tanka';
  return null;
}

// ═══════════════════════════════════════════════════════════
// 2. SONETO — varre o material procurando uma SEQUÊNCIA de
//    blocos que bate com uma das 4 variantes, em vez de exigir
//    que o documento inteiro seja só isso. Retorna a posição
//    (janela) do soneto encontrado, para não contar esses
//    blocos de novo em outra forma.
// ═══════════════════════════════════════════════════════════
function encontrarJanelaSoneto(analises, usados){
  for(let i=0;i<analises.length;i++){
    if(usados.has(i)) continue;
    // Monostrófico: um bloco só, 14-17 versos — mas só se não parecer um
    // parágrafo de diálogo colado (ver comentário em analisarBloco).
    const n0 = analises[i].nVersos;
    if(n0>=14 && n0<=17 && !usados.has(i) && !analises[i].pareceDialogo){
      return { inicio:i, fim:i, subtipo:'monostrofico', totalVersos:n0 };
    }
    // Janela de 5 blocos primeiro (estrambótico: 4 blocos-base de 14 + 1 extra
    // de 1-3) — precisa vir ANTES da janela de 4 blocos, senão o casamento
    // de 4,4,3,3 "ganha" cedo demais e o 5º bloco nunca é reivindicado.
    if(i+4<analises.length && ![i,i+1,i+2,i+3,i+4].some(k=>usados.has(k))
       && ![i,i+1,i+2,i+3,i+4].some(k=>analises[k].pareceDialogo)){
      const base = [analises[i].nVersos,analises[i+1].nVersos,analises[i+2].nVersos,analises[i+3].nVersos];
      const somaBase = base.reduce((a,b)=>a+b,0);
      const extra = analises[i+4].nVersos;
      const baseValida = (base[0]===4&&base[1]===4&&base[2]===3&&base[3]===3) ||
                          (base[0]===4&&base[1]===4&&base[2]===4&&base[3]===2);
      if(baseValida && somaBase===14 && extra>=1 && extra<=3){
        return { inicio:i, fim:i+4, subtipo:'estrambotico', totalVersos:14+extra };
      }
    }
    // Janelas de 4 blocos (petrarquiano / shakespeariano)
    if(i+3<analises.length && ![i,i+1,i+2,i+3].some(k=>usados.has(k))
       && ![i,i+1,i+2,i+3].some(k=>analises[k].pareceDialogo)){
      const seq = [analises[i].nVersos,analises[i+1].nVersos,analises[i+2].nVersos,analises[i+3].nVersos];
      if(seq[0]===4&&seq[1]===4&&seq[2]===3&&seq[3]===3){
        return { inicio:i, fim:i+3, subtipo:'petrarquiano', totalVersos:14 };
      }
      if(seq[0]===4&&seq[1]===4&&seq[2]===4&&seq[3]===2){
        return { inicio:i, fim:i+3, subtipo:'shakespeariano', totalVersos:14 };
      }
    }
  }
  return null;
}

// ═══════════════════════════════════════════════════════════
// 3. ESTROFISTA — Novo Movimento Estrofista, procura uma
//    sequência de 7 blocos que bate exatamente com o losango.
// ═══════════════════════════════════════════════════════════
function encontrarJanelaEstrofista(analises, usados){
  for(let i=0;i+6<analises.length;i++){
    const janela=[i,i+1,i+2,i+3,i+4,i+5,i+6];
    if(janela.some(k=>usados.has(k))) continue;
    if(janela.some(k=>analises[k].pareceDialogo)) continue;
    const bate = V3.LOSANGO.every((esperado,off)=>analises[i+off].nVersos===esperado);
    if(bate) return { inicio:i, fim:i+6, totalVersos: V3.LOSANGO.reduce((a,b)=>a+b,0) };
  }
  return null;
}

// ═══════════════════════════════════════════════════════════
// 4. ORIENTAL — Samurai. Cada bloco é checado INDIVIDUALMENTE
//    (não faz média do documento inteiro, que gerava falso
//    positivo quando o material tinha outras formas junto).
//    Japonesas: Haicai, Tanka, Senryū, Renga, Mondo, Katauta.
//    Coreana: Sijo.
// ═══════════════════════════════════════════════════════════
function detectarOrientalPorBlocos(analises, usados){
  const candidatos = [];
  analises.forEach((a,i)=>{
    if(usados.has(i)) return;
    const subtipo = blocoPareceOriental(a);
    if(subtipo) candidatos.push({ idx:i, subtipo });
  });
  if(!candidatos.length) return null;
  const naoUsados = analises.length - usados.size;
  if(candidatos.length / (naoUsados||1) < 0.5) return null;
  const subtipo = candidatos[0].subtipo;
  const origem = subtipo==='sijo' ? 'coreana' : 'japonesa';
  return { subtipo, origem, indices: candidatos.map(c=>c.idx) };
}

// Versões "documento inteiro" — usadas quando queremos saber se o
// MATERIAL TODO é uma forma só (não misturado), para o roteamento
// do caso simples (uma forma predominante).
function detectarSoneto(blocosTexto){
  const analises = blocosTexto.map(analisarBloco);
  const usados = new Set();
  const janela = encontrarJanelaSoneto(analises, usados);
  if(!janela) return null;
  const totalBlocos = analises.length;
  const coberto = janela.fim - janela.inicio + 1;
  if(coberto < totalBlocos * 0.8) return null; // janela precisa cobrir quase tudo
  return { subtipo: janela.subtipo, totalVersos: janela.totalVersos };
}

function detectarEstrofista(blocosTexto){
  const analises = blocosTexto.map(analisarBloco);
  if(analises.length!==7) return null;
  const bate = V3.LOSANGO.every((esperado,i)=>analises[i].nVersos===esperado);
  return bate ? { totalVersos: V3.LOSANGO.reduce((a,b)=>a+b,0) } : null;
}

function detectarOriental(blocosTexto){
  const analises = blocosTexto.map(analisarBloco);
  return detectarOrientalPorBlocos(analises, new Set());
}

// ═══════════════════════════════════════════════════════════
// 5. MAPA DE FORMAS — varre o material uma vez, reivindicando
//    blocos pra cada forma encontrada (estrofista, depois soneto,
//    depois oriental, depois cordel, depois prosa). O que sobra
//    sem reivindicar cai em "poesia" genérica. Essa é a MESMA
//    lógica usada tanto pro caso de forma única quanto pro
//    híbrido — corrige os dois bugs achados nos testes.
// ═══════════════════════════════════════════════════════════
function mapearFormas(texto){
  const blocosTexto = V3.normalizar(texto).split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean);
  const blocosTipados = V3.quebrarBlocos(texto);
  const analises = blocosTexto.map(analisarBloco);
  const usados = new Set();
  const formas = new Set();
  const detalhes = {};

  // Estrofista pode aparecer mais de uma vez no material
  let janela;
  while((janela = encontrarJanelaEstrofista(analises, usados))){
    for(let k=janela.inicio;k<=janela.fim;k++) usados.add(k);
    formas.add('estrofista');
    detalhes.estrofista = janela;
  }

  // Soneto: idem, pode haver mais de um
  while((janela = encontrarJanelaSoneto(analises, usados))){
    for(let k=janela.inicio;k<=janela.fim;k++) usados.add(k);
    formas.add('soneto');
    detalhes.soneto = janela;
  }

  // Oriental: checagem por bloco individual, só nos que sobraram
  const oriental = detectarOrientalPorBlocos(analises, usados);
  if(oriental){
    oriental.indices.forEach(i=>usados.add(i));
    formas.add('oriental');
    detalhes.oriental = oriental;
  }

  // Cordel: sextilha/décima entre os blocos ainda livres
  // (tags já vêm prontas de V3.quebrarBlocos, index alinhado com blocosTexto)
  const idxCordel = [];
  blocosTipados.forEach((b,i)=>{
    if(usados.has(i)) return;
    if(b.tipo==='sextilha'||b.tipo==='decima') idxCordel.push(i);
  });
  if(idxCordel.length){ formas.add('cordel'); idxCordel.forEach(i=>usados.add(i)); }

  // Prosa: capítulo/prosa/diálogo entre os blocos ainda livres
  const idxProsa = [];
  blocosTipados.forEach((b,i)=>{
    if(usados.has(i)) return;
    if(b.tipo==='prosa'||b.tipo==='capitulo'||b.tipo==='dialogo') idxProsa.push(i);
  });
  if(idxProsa.length){ formas.add('prosa'); idxProsa.forEach(i=>usados.add(i)); }

  // O que sobrar sem reivindicar (poesia livre / subtítulo isolado)
  // só conta como forma própria se não houver nenhuma outra.
  if(usados.size < blocosTexto.length && formas.size===0){
    formas.add('poesia');
  }

  return { formas: Array.from(formas), detalhes, blocosTexto, blocosTipados };
}

// ═══════════════════════════════════════════════════════════
// 6. CLASSIFICADOR PRINCIPAL — decide o destino final a partir
//    do mapa de formas acima.
// ═══════════════════════════════════════════════════════════
function classificarERotear(texto){
  const textoLimpo = (texto||'').trim();
  if(!textoLimpo) return { ...DESTINOS.vazio, chave:'vazio' };

  const mapa = mapearFormas(textoLimpo);
  const formas = mapa.formas;
  if(!formas.length) return { ...DESTINOS.vazio, chave:'vazio' };

  // ── Regra do autor: híbrido generalizado ──────────────────
  // Duas ou mais formas relevantes juntas (soneto+cordel,
  // haicai+prosa, o que for) = nenhum especialista sozinho
  // dá conta, então vai pro Centauro.
  if(formas.length >= 2){
    return {
      ...DESTINOS.hibrido, chave:'hibrido',
      motivo:`Detectei mais de uma forma no material (${formas.map(nomeForma).join(' + ')}) — nenhum especialista sozinho dá conta, por isso vai para o Centauro.`,
      formasDetectadas: formas,
    };
  }

  const unica = formas[0];

  if(unica==='soneto'){
    const d = mapa.detalhes.soneto;
    return { ...DESTINOS.soneto, chave:'soneto',
      motivo:`Detectei soneto ${nomeSubtipoSoneto(d.subtipo)} — ${d.totalVersos} versos.`,
      subtipo:d.subtipo };
  }
  if(unica==='estrofista'){
    const d = mapa.detalhes.estrofista;
    return { ...DESTINOS.estrofista, chave:'estrofista', totalVersos:d.totalVersos };
  }
  if(unica==='oriental'){
    const d = mapa.detalhes.oriental;
    return { ...DESTINOS.oriental, chave:'oriental',
      motivo:`Detectei forma ${nomeSubtipoOriental(d.subtipo)} (origem ${d.origem}).`,
      subtipo:d.subtipo };
  }
  if(unica==='cordel'){
    return { ...DESTINOS.cordel, chave:'cordel' };
  }
  if(unica==='prosa'){
    return { ...DESTINOS.prosa, chave:'prosa' };
  }
  // sobrou só poesia sem forma nomeada
  return { ...DESTINOS.poesiaLivre, chave:'poesiaLivre' };
}

function nomeForma(f){
  return { soneto:'soneto', estrofista:'Novo Movimento Estrofista', oriental:'oriental',
    cordel:'cordel', prosa:'prosa', poesia:'poesia' }[f] || f;
}

function nomeSubtipoSoneto(s){
  return { petrarquiano:'Petrarquiano/Italiano', shakespeariano:'Shakespeariano/Inglês',
    monostrofico:'Monostrófico', estrambotico:'Estrambótico' }[s] || s;
}
function nomeSubtipoOriental(s){
  return { haicai_curto:'Haicai', sijo:'Sijo', tanka:'Tanka' }[s] || s;
}

// ═══════════════════════════════════════════════════════════
// 6. HANDOFF — salva o texto e o destino no localStorage e
//    devolve a URL pronta pra redirecionar o autor.
// ═══════════════════════════════════════════════════════════
function encaminhar(texto){
  const resultado = classificarERotear(texto);
  if(resultado.arquivo){
    localStorage.setItem('lapidar_obra_texto', texto);
    localStorage.setItem('lapidar_obra_roteamento', JSON.stringify(resultado));
  }
  return resultado;
}

root.CeleiroRoteador = {
  classificarERotear,
  encaminhar,
  mapearFormas,
  detectarSoneto,
  detectarOriental,
  detectarEstrofista,
  DESTINOS,
};

})(typeof window!=='undefined'?window:global);
