/**
 * motor_celeiro_v3.js — Motor Central de Diagramação
 * Diagramadores (portado do Celeiro Literário)
 *
 * Diagramadores suportados:
 *   polux      — Prosa literária (romance, conto, crônica, ensaio)
 *   castor     — Poesia livre, narrativa, odes
 *   centauro   — Híbrido (prosa + poesia)
 *   apolo      — Sonetos (forma fixa)
 *   samurai    — Haicai (5/7/5)
 *   espartano  — Estrofista (losango 1/2/3/4/3/2/1)
 *   quironxada — Cordel (folheto tradicional)
 *   hercules   — Infantil, receitas, didático, técnico
 *
 * Exporta: window.CeleiroV3
 */
(function(global){
'use strict';

// ═══════════════════════════════════════════════════════════
// 1. FORMATOS DE PÁGINA
// ═══════════════════════════════════════════════════════════
const FORMATOS = {
  'A5':    { nome:'A5',         w:420, h:595,  wCm:14.8, hCm:21.0  },
  '14x21': { nome:'14×21 cm',  w:397, h:595,  wCm:14.0, hCm:21.0  },
  '16x23': { nome:'16×23 cm',  w:454, h:652,  wCm:16.0, hCm:23.0  },
  '6x9':   { nome:'6×9 pol',   w:432, h:648,  wCm:15.2, hCm:22.9  },
  'A4':    { nome:'A4',         w:595, h:842,  wCm:21.0, hCm:29.7  },
  // Samurai — quadrado A5
  'quadrado15': { nome:'15×15 cm', w:425, h:425, wCm:15.0, hCm:15.0 },
  // Quironxadá — cordel tradicional
  'cordel':     { nome:'Cordel 11×16', w:312, h:454, wCm:11.0, hCm:16.0 },
  // Hércules — infantil
  'infantil':   { nome:'Infantil 20×20', w:567, h:567, wCm:20.0, hCm:20.0 },
  'infanto':    { nome:'Infanto-Juvenil A5+', w:453, h:623, wCm:16.0, hCm:22.0 },
};

// ═══════════════════════════════════════════════════════════
// 2. MARGENS (em px, baseadas em cm×3.7795)
// ═══════════════════════════════════════════════════════════
const MARGENS = {
  estreita: { mT:43, mB:43, mI:46, mE:34 },
  normal:   { mT:52, mB:58, mI:57, mE:43 },
  ampla:    { mT:64, mB:70, mI:68, mE:51 },
  tecnica:  { mT:57, mB:62, mI:62, mE:51 },
  haicai:   { mT:80, mB:80, mI:60, mE:60 }, // muito espaço em branco
  // 1cm em cima/baixo/fora — exceção proposital ao padrão de 2cm ("grafica",
  // abaixo). O cordel é feito pra impressão caseira, e a montagem já foi
  // calibrada pra encaixar 4 estrofes de sextilha (6 versos) por página
  // nesse espaço; com 2cm a conta não fecha mais. Margem INTERNA (mI, lado
  // da lombada/grampo) subiu de 1cm pra 1,5cm — 1cm deixava a lombada
  // "comer" o texto e prejudicar a leitura perto da dobra.
  cordel:   { mT:38, mB:38, mI:57, mE:38 },
  // 2cm em cima/baixo/fora — padrão que gráficas profissionais recomendam
  // como "excelente ponto de partida" pra impressão de livro (verificado
  // contra o guia de diagramação da Galeria Gráfica & Editora). Margem
  // INTERNA (mI, lado da lombada) subiu de 2cm pra 2,5cm — mesmo motivo do
  // cordel: a lombada come um pouco do espaço, então perto dela precisa de
  // uma folga maior que as outras três margens pra não prejudicar a
  // leitura. 94px ÷ 37.7952755906 (96 DPI) ≈ 2,49cm; 76px ≈ 2,01cm.
  grafica:  { mT:76, mB:76, mI:94, mE:76 },
};

// ═══════════════════════════════════════════════════════════
// 3. PRESETS DOS DIAGRAMADORES
// ═══════════════════════════════════════════════════════════
const PRESETS = {
  polux: {
    nome:'Pólux', tipo:'prosa',
    formatoPadrao:'16x23', margemPadrao:'grafica',
    fonte:"Georgia,'Times New Roman',serif", tamanhoFonte:12,
    // paragraphGap era 0 — parágrafo só tinha o recuo de primeira linha
    // como respiro, sem espaço vertical real entre um parágrafo e outro.
    entrelinha:1.52, capitular:'classic', hifenizacao:true,
    ornamentos:true, recuo:1.2, paragraphGap:0.8,
    formatos:['A5','14x21','16x23','6x9'],
  },
  castor: {
    nome:'Castor', tipo:'poesia',
    formatoPadrao:'A5', margemPadrao:'grafica',
    fonte:"Georgia,'Times New Roman',serif", tamanhoFonte:11,
    entrelinha:1.6, capitular:'none', hifenizacao:false,
    ornamentos:true, recuo:0, paragraphGap:1.2,
    alinhPoesia:'left',
    formatos:['A5','14x21','16x23','6x9'],
  },
  centauro: {
    nome:'Centauro', tipo:'hibrido',
    formatoPadrao:'16x23', margemPadrao:'grafica',
    fonte:"Georgia,'Times New Roman',serif", tamanhoFonte:12,
    entrelinha:1.5, capitular:'classic', hifenizacao:true,
    ornamentos:true, recuo:1.2, paragraphGap:0.35,
    alinhPoesia:'center',
    formatos:['A5','14x21','16x23','6x9'],
  },
  apolo: {
    nome:'Apolo', tipo:'soneto',
    formatoPadrao:'14x21', margemPadrao:'grafica',
    fonte:"'Times New Roman',Georgia,serif", tamanhoFonte:11,
    entrelinha:1.8, capitular:'none', hifenizacao:false,
    ornamentos:true, recuo:0, paragraphGap:1.5,
    alinhPoesia:'center',
    formatos:['A5','14x21','16x23','6x9'],
  },
  samurai: {
    nome:'Samurai', tipo:'haicai',
    formatoPadrao:'quadrado15', margemPadrao:'grafica',
    fonte:"Georgia,'Times New Roman',serif", tamanhoFonte:11,
    entrelinha:2.0, capitular:'none', hifenizacao:false,
    ornamentos:false, recuo:0, paragraphGap:0,
    composicoesPorPagina:1,
    formatos:['quadrado15','A5','14x21'],
  },
  espartano: {
    nome:'Espartano', tipo:'estrofista',
    formatoPadrao:'A5', margemPadrao:'grafica',
    fonte:"Georgia,'Times New Roman',serif", tamanhoFonte:11,
    entrelinha:1.8, capitular:'none', hifenizacao:false,
    ornamentos:false, recuo:0, paragraphGap:0,
    modoEstrofista:'livre', // 'classico' ou 'livre'
    formatos:['A5','14x21','16x23','6x9'],
  },
  quironxada: {
    nome:'Quironxadá', tipo:'cordel',
    formatoPadrao:'cordel', margemPadrao:'cordel',
    fonte:"Georgia,'Times New Roman',serif", tamanhoFonte:11,
    entrelinha:1.3, capitular:'none', hifenizacao:false,
    ornamentos:false, recuo:0, paragraphGap:0.8,
    alinhPoesia:'left',
    // Páginas válidas: 8,16,24,32,40,48,56,64
    paginasValidas:[8,16,24,32,40,48,56,64],
    formatos:['cordel','A5','16x23'],
  },
  hercules: {
    nome:'Hércules', tipo:'tecnico',
    formatoPadrao:'A5', margemPadrao:'grafica',
    fonte:"Arial,Helvetica,sans-serif", tamanhoFonte:11,
    entrelinha:1.45, capitular:'none', hifenizacao:true,
    ornamentos:false, recuo:0, paragraphGap:0.6,
    formatos:['infantil','infanto','A5','14x21','16x23','A4'],
  },
};

// ═══════════════════════════════════════════════════════════
// 4. NORMALIZAÇÃO E LIMPEZA
// ═══════════════════════════════════════════════════════════
function normalizar(t){
  return String(t||'')
    .replace(/\r\n/g,'\n').replace(/\r/g,'\n')
    .replace(/\t/g,' ').replace(/[ ]+$/gm,'')
    .replace(/\n{4,}/g,'\n\n\n').trim();
}

function escapar(s){
  return String(s||'').replace(/[&<>"']/g,m=>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
}

function correcaoLeve(t){
  return normalizar(t)
    // Só espaço/tab antes da pontuação, não \n\n — isso evitava juntar um
    // parágrafo ao próximo sempre que o próximo começasse com um desses
    // sinais (ex.: uma linha de imagem em Markdown começa com "!").
    .replace(/[ \t]+([,\.!?;:])/g,'$1')
    .replace(/\.{4,}/g,'...')
    .replace(/!!+/g,'!').replace(/\?\?+/g,'?')
    // Mesmo cuidado aqui — sem isso, um parágrafo de diálogo que começa
    // com "--" (comum em prosa) grudava no parágrafo anterior.
    .replace(/[ \t]*--[ \t]*/g,' — ');
}

function correcaoMedia(t){
  return correcaoLeve(t)
    .replace(/\ba gente fomos\b/gi,'a gente foi')
    .replace(/\bpra mim fazer\b/gi,'para eu fazer')
    .replace(/\bmais eu\b/g,'mas eu');
}

// ═══════════════════════════════════════════════════════════
// 5. HIFENIZAÇÃO PT-BR
// ═══════════════════════════════════════════════════════════
const PREFIXOS_HIFENIZACAO = [
  'des','trans','sub','super','inter','intra','extra','contra',
  'sobre','entre','semi','anti','auto','re','pre','pro','bi','tri',
  'multi','micro','macro','pseudo','neo','meta',
];
const VOGAIS = /[aeiouáéíóúâêôãõàäëïöü]/i;

// Encontros consonantais que o português NUNCA separa (a consoante dupla
// fica inteira com a vogal seguinte: "li-vro", nunca "liv-ro") — todos os
// outros pares de consoante (a maioria: rc, rn, rd, ss, nt, lm...) são
// separáveis e o hífen tem que cair ENTRE as duas, não antes das duas.
const CLUSTERS_INSEPARAVEIS = new Set([
  'bl','br','cl','cr','dr','fl','fr','gl','gr','pl','pr','tl','tr','vl','vr',
  'lh','nh','ch',
]);

function hifenizarPalavra(palavra){
  if(palavra.length<=4) return palavra;
  if(/[A-ZÁÉÍÓÚ]{3,}/.test(palavra)) return palavra; // siglas
  if(/\d/.test(palavra)) return palavra;
  for(const p of PREFIXOS_HIFENIZACAO){
    if(palavra.toLowerCase().startsWith(p)&&palavra.length>p.length+3){
      return palavra.slice(0,p.length)+'\u00AD'+palavra.slice(p.length);
    }
  }
  let r='';
  let i=0;
  while(i<palavra.length-2){
    r+=palavra[i];
    const v1=VOGAIS.test(palavra[i]),v2=VOGAIS.test(palavra[i+1]),v3=VOGAIS.test(palavra[i+2]);
    if(v1&&!v2&&v3&&i>0){
      r+='\u00AD';
    }else if(v1&&!v2&&!v3&&i+3<palavra.length&&VOGAIS.test(palavra[i+3])&&i>0){
      // Duas consoantes entre vogais: só gruda as duas com a vogal seguinte
      // (hífen antes das duas, "li-vro") quando o par é realmente
      // inseparável. No caso comum (par separável — "pa-rcial" antes desta
      // correção, sempre errado por 1 letra), consome a 1ª consoante aqui
      // e o hífen cai depois dela: "par-cial", não "pa-rcial".
      if(!CLUSTERS_INSEPARAVEIS.has((palavra[i+1]+palavra[i+2]).toLowerCase())){
        i++;
        r+=palavra[i];
      }
      r+='\u00AD';
    }
    i++;
  }
  r+=palavra.slice(r.replace(/\u00AD/g,'').length);
  return r;
}

// Linhas de marcação estrutural (delimitadores de página especial e o
// marcador de imagem de fundo) — nunca hifenizadas, mesma lógica de
// RE_IMAGEM abaixo: são sintaxe, não prosa, e podem carregar URL que um
// hífen invisível no meio corromperia.
const RE_MARCADOR_PAGINA=/^:::pagina\b|^:::\s*$|^::fundo\[\]/;

function hifenizarTexto(texto){
  // Linha de imagem em Markdown carrega uma URL (às vezes um data: URI
  // em base64) que não pode ganhar hífen invisível no meio — corromperia
  // os bytes da imagem. Pula a linha inteira nesse caso.
  return texto.split('\n').map(linha=>{
    const t=linha.trim();
    return (RE_IMAGEM.test(t)||RE_MARCADOR_PAGINA.test(t))
      ? linha
      : linha.replace(/\b([a-záéíóúâêôãõàäëïöü]{6,})\b/gi,p=>hifenizarPalavra(p));
  }).join('\n');
}

// ═══════════════════════════════════════════════════════════
// 6. DETECÇÃO DE BLOCOS
// ═══════════════════════════════════════════════════════════
const RE_CAPITULO=/^(cap[íi]tulo|cap\.|parte\s+|livro\s+|canto\s+|conto\s+|poema\s+|prólogo|epílogo|epilogo|prologo)\b/i;

// Separa "CAPÍTULO 1 — O Homem que Caiu no Mapa" em rótulo ("CAPÍTULO 1")
// e título do capítulo ("O Homem que Caiu no Mapa"), pra renderizar os
// dois com hierarquia visual distinta em vez de uma linha só — sem
// isso, capítulos com título longo quebravam de linha no meio do texto
// corrido, misturando rótulo e título na mesma fonte/tamanho.
const RE_ROTULO_CAPITULO=/^((?:cap[íi]tulo|cap\.|parte|livro|canto|conto|poema|pr[óo]logo|ep[íi]logo)[^—–:]*?)\s*[—–:]\s*(.+)$/i;
function _dividirRotuloETitulo(conteudo){
  const m=conteudo.match(RE_ROTULO_CAPITULO);
  if(m) return {rotulo:m[1].trim(), titulo:m[2].trim()};
  return {rotulo:conteudo.trim(), titulo:''};
}
const RE_TITULO_HAICAI=/^[—–\-\*\#]+\s*(.+)$|^([A-ZÁÉÍÓÚ][^.!?]{2,40})$/;

// Imagem embutida no miolo: ![legenda opcional](url "LARGURAxALTURA")
// A largura/altura vem de fora (o Barracao de Polimento mede a imagem
// de verdade antes de gerar essa linha) pra paginar sem precisar
// carregar a imagem de forma assincrona.
const RE_IMAGEM=/^!\[([^\]]*)\]\(\s*(\S+?)(?:\s+"(\d+)x(\d+)")?\s*\)$/;

function parseImagem(bloco){
  const m=RE_IMAGEM.exec(bloco.trim());
  if(!m) return null;
  return {
    legenda:m[1]||'',
    url:m[2],
    largura:m[3]?parseInt(m[3],10):null,
    altura:m[4]?parseInt(m[4],10):null,
  };
}

// Módulos cujo preset é puramente prosa/texto técnico (PRESETS[x].tipo
// 'prosa' ou 'tecnico') nunca devem classificar um bloco como verso —
// um parágrafo de romance às vezes chega com quebras de linha internas
// (o rascunho da IA "enrola" a frase em linhas curtas em vez de uma
// linha só), e a heurística de "linhas curtas = poesia" abaixo tomava
// isso por haicai/cordel/poesia e renderizava sem recuo, uma linha
// visual por quebra — o parágrafo virava vários pedaços soltos na página.
const MODULOS_SO_PROSA=new Set(['polux','hercules']);

function tipoBlocoGeral(bloco, modulo){
  // Se hifenização já rodou, o bloco pode ter hífens invisíveis (­)
  // partindo palavras como "Ca­pí­tu­lo" — isso quebra RE_CAPITULO e os
  // testes de comprimento de linha. Classificação precisa ser cega a
  // hifenização: usa o texto sem os hífens invisíveis só pra decidir o tipo.
  const blocoSemHifen=bloco.replace(/\u00AD/g,'');
  const ls=blocoSemHifen.split('\n').map(l=>l.trim()).filter(Boolean);
  if(!ls.length) return 'vazio';
  if(ls.length===1&&RE_IMAGEM.test(ls[0])) return 'imagem';
  if(RE_CAPITULO.test(ls[0])) return 'capitulo';
  if(ls.length===1&&ls[0].length<60&&!/[.!?]$/.test(ls[0])) return 'subtitulo';
  if(/^[-–—]\s/.test(ls[0])) return 'dialogo';
  if(MODULOS_SO_PROSA.has(modulo)) return 'prosa';
  // sextilha (cordel): 6 linhas com até 70 chars cada
  if(ls.length===6&&ls.every(l=>l.length<=72)) return 'sextilha';
  // décima (cordel): 10 linhas
  if(ls.length===10&&ls.every(l=>l.length<=72)) return 'decima';
  // poesia: linhas curtas predominantes
  if(ls.length>=2&&ls.filter(l=>l.length<=72).length/ls.length>0.65) return 'poesia';
  return 'prosa';
}

// Módulos onde diálogo direto pode aparecer misturado com narração —
// exclui os puramente em verso (castor/poesia, quironxadá/cordel), onde
// uma linha começando com travessão pode ser recurso poético legítimo,
// não fala de personagem.
const MODULOS_COM_DIALOGO=new Set(['polux','centauro','hercules']);
const RE_INICIO_FALA=/^[-–—]\s/;

// Separa em blocos próprios qualquer fala que veio colada à narração (ou
// a outra fala) por uma quebra de linha simples em vez de parágrafo
// (linha em branco) — comum no rascunho gerado pela IA. Sem isso, o
// parágrafo inteiro (narração + falas) virava um só bloco de prosa; a
// classificação olha só a 1ª linha pra decidir o tipo, então a fala no
// meio não virava 'dialogo' — virava só mais uma linha "enrolada" do
// parágrafo de narração, sem recuo zero nem respiro de parágrafo
// próprios (bug real visto numa geração: fala colada direto embaixo da
// narração, sem parecer início de parágrafo nenhum).
function _separarFalaColada(blocosBrutos){
  const saida=[];
  blocosBrutos.forEach(bloco=>{
    // Página especial (objeto, não string) passa direto — não tem fala
    // pra separar, é conteúdo atômico.
    if(typeof bloco!=='string'){ saida.push(bloco); return; }
    const linhas=bloco.split('\n');
    let atual=[linhas[0]];
    for(let i=1;i<linhas.length;i++){
      if(RE_INICIO_FALA.test(linhas[i])){
        saida.push(atual.join('\n'));
        atual=[linhas[i]];
      }else{
        atual.push(linhas[i]);
      }
    }
    saida.push(atual.join('\n'));
  });
  return saida;
}

// ─── PÁGINA ESPECIAL (dedicatória, epígrafe, "in memoriam" etc.) ──────
// Sintaxe:
//   :::pagina fundo=#0a0a0a texto=#f0e8d0 alinhamento=centro
//   Texto da página, pode ter
//   vários parágrafos — inclusive linha em branco entre eles.
//   :::
// Extraído do texto bruto ANTES da quebra normal por linha em branco
// (que ia cortar o conteúdo do meio da página especial em vários blocos
// soltos) — cada ocorrência vira um bloco atômico só, com página própria
// garantida na paginação (ver paginar()).
const RE_PAGINA_ESPECIAL=/^:::pagina([^\n]*)\n([\s\S]*?)\n:::[ \t]*$/gim;

function _parseOpcoesFence(str){
  const opts={};
  String(str||'').replace(/(\w+)=("[^"]*"|\S+)/g,(_,k,v)=>{
    opts[k]=v.replace(/^"|"$/g,'');
    return '';
  });
  return opts;
}

// Separa o texto bruto em segmentos, na ordem em que aparecem: strings
// (texto normal, ainda por quebrar em parágrafos) e objetos {pagina:true,
// conteudo, opts} (página especial, já atômica).
function _extrairPaginasEspeciais(texto){
  const segmentos=[];
  let ultimo=0, m;
  RE_PAGINA_ESPECIAL.lastIndex=0;
  while((m=RE_PAGINA_ESPECIAL.exec(texto))){
    if(m.index>ultimo) segmentos.push(texto.slice(ultimo,m.index));
    segmentos.push({pagina:true,conteudo:m[2].trim(),opts:_parseOpcoesFence(m[1])});
    ultimo=RE_PAGINA_ESPECIAL.lastIndex;
  }
  if(ultimo<texto.length) segmentos.push(texto.slice(ultimo));
  return segmentos;
}

// ─── IMAGEM DE FUNDO (atrás do texto corrido) ─────────────────────────
// Sintaxe: ::fundo[](url){opacidade:0.12}
// Marcador de altura zero — não ocupa espaço na paginação, só anexa uma
// imagem de fundo (o texto normal flui por cima dela) à página onde cai.
const RE_FUNDO_PAGINA=/^::fundo\[\]\(\s*(\S+?)\s*\)(?:\{([^}]*)\})?\s*$/;

function parseFundoPagina(bloco){
  const m=RE_FUNDO_PAGINA.exec(bloco.trim());
  if(!m) return null;
  const opts=_parseOpcoesFence((m[2]||'').replace(/,/g,' ').replace(/:/g,'='));
  return { url:m[1], opacidade:opts.opacidade?parseFloat(opts.opacidade):0.12 };
}

function quebrarBlocos(texto, modulo){
  // brutos mistura strings (texto normal, ainda por quebrar em
  // parágrafo) com objetos {pagina:true,...} (página especial, atômica)
  // — mantém a ordem original de aparição no texto colado.
  let brutos=[];
  _extrairPaginasEspeciais(normalizar(texto)).forEach(seg=>{
    if(typeof seg!=='string'){ brutos.push(seg); return; }
    brutos=brutos.concat(seg.split(/\n\s*\n/).map(b=>b.trim()).filter(Boolean));
  });

  if(modulo==='samurai') return quebrarHaicai(brutos.filter(b=>typeof b==='string'));
  if(modulo==='espartano') return quebrarEstrofista(brutos.filter(b=>typeof b==='string'));
  if(modulo==='apolo') return quebrarSoneto(brutos.filter(b=>typeof b==='string'));

  if(MODULOS_COM_DIALOGO.has(modulo)) brutos=_separarFalaColada(brutos);

  return brutos.map((item,i)=>{
    const id=`B${String(i+1).padStart(4,'0')}`;
    if(typeof item!=='string'){
      return { id, ordem:i+1, tipo:'pagina_especial', conteudo:item.conteudo, opts:item.opts||{}, palavras:0 };
    }
    const fundo=parseFundoPagina(item);
    if(fundo) return { id, ordem:i+1, tipo:'fundo_pagina', conteudo:item, fundo, palavras:0 };
    return {
      id, ordem:i+1,
      tipo:tipoBlocoGeral(item, modulo),
      conteudo:item,
      palavras:(item.match(/\b[\wÀ-ÿ'-]+\b/g)||[]).length,
    };
  });
}

// ─── HAICAI ───────────────────────────────────────────────
function quebrarHaicai(blocos){
  return blocos.map((conteudo,i)=>{
    if(RE_IMAGEM.test(conteudo.trim())){
      return { id:`H${String(i+1).padStart(3,'0')}`, ordem:i+1, tipo:'imagem', conteudo, palavras:0 };
    }
    const ls=conteudo.split('\n').map(l=>l.trim()).filter(Boolean);
    let tipo='haicai';
    let titulo='';
    let versos=ls;
    // Se primeira linha parece título (em maiúsculas ou precedida de —)
    if(ls.length>3&&(RE_TITULO_HAICAI.test(ls[0])||ls[0].length<30)){
      titulo=ls[0]; versos=ls.slice(1);
    }
    // Validar 3 linhas
    if(versos.length!==3) tipo='haicai_invalido';
    return {
      id:`H${String(i+1).padStart(3,'0')}`,
      ordem:i+1, tipo, conteudo, titulo, versos,
      palavras:(conteudo.match(/\b[\wÀ-ÿ'-]+\b/g)||[]).length,
    };
  });
}

// ─── ESTROFISTA ───────────────────────────────────────────
// Losango: 1/2/3/4/3/2/1 versos por estrofe
const LOSANGO=[1,2,3,4,3,2,1];

function quebrarEstrofista(blocos){
  // Cada bloco separado por linha em branco = uma estrofe.
  // Uma imagem inserida no meio não conta pra posição no losango — só
  // as estrofes de verdade avançam o contador, senão uma imagem entre
  // estrofes desalinha a posição de todas as que vêm depois dela.
  let posicaoReal=-1;
  return blocos.map((conteudo,i)=>{
    if(RE_IMAGEM.test(conteudo.trim())){
      return { id:`E${String(i+1).padStart(3,'0')}`, ordem:i+1, tipo:'imagem', conteudo, palavras:0, valido:true };
    }
    posicaoReal++;
    const versos=conteudo.split('\n').map(l=>l.trim()).filter(Boolean);
    const posicao=posicaoReal%7; // posição no losango (0=topo, 3=centro, 6=base)
    const esperado=LOSANGO[posicao];
    const valido=versos.length===esperado;
    let papel='';
    if(posicao===0) papel='semente';
    else if(posicao===3) papel='climax';
    else if(posicao===6) papel='sintese';
    else if(posicao<3) papel='desenvolvimento';
    else papel='resolucao';
    return {
      id:`E${String(i+1).padStart(3,'0')}`,
      ordem:i+1, tipo:'estrofe',
      posicaoLosango:posicao,
      versosEsperados:esperado,
      versos, valido, papel, conteudo,
      palavras:(conteudo.match(/\b[\wÀ-ÿ'-]+\b/g)||[]).length,
    };
  });
}

// ─── SONETO ───────────────────────────────────────────────
// Estrutura: 2 quartetos + 2 tercetos
function quebrarSoneto(blocos){
  // Tenta detectar estrutura 4/4/3/3
  const resultado=[];
  let idx=0;
  blocos.forEach((conteudo,i)=>{
    if(RE_IMAGEM.test(conteudo.trim())){
      resultado.push({ id:`S${String(i+1).padStart(3,'0')}`, ordem:i+1, tipo:'imagem', conteudo, palavras:0 });
      return;
    }
    const versos=conteudo.split('\n').map(l=>l.trim()).filter(Boolean);
    let tipo='estrofe_soneto';
    let nome='';
    if(versos.length===4&&idx<2){ nome=idx===0?'Primeiro Quarteto':'Segundo Quarteto'; idx++; }
    else if(versos.length===3){ nome=idx===2?'Primeiro Terceto':'Segundo Terceto'; idx++; }
    else tipo='estrofe_livre'; // soneto com estrutura diferente
    resultado.push({
      id:`S${String(i+1).padStart(3,'0')}`,
      ordem:i+1, tipo, nome, versos, conteudo,
      palavras:(conteudo.match(/\b[\wÀ-ÿ'-]+\b/g)||[]).length,
    });
  });
  return resultado;
}

// ─── CORDEL ───────────────────────────────────────────────
function validarCordel(paginas){
  const validas=[8,16,24,32,40,48,56,64];
  const prox=validas.find(v=>v>=paginas)||64;
  const folhas=prox/8;
  return { paginasNecessarias:prox, folhas, valido:validas.includes(paginas) };
}

// ═══════════════════════════════════════════════════════════
// 7. CLASSIFICAÇÃO DA OBRA
// ═══════════════════════════════════════════════════════════
function classificarObra(blocos){
  if(!blocos.length) return 'vazio';
  const total=blocos.length;
  const nPoesia=blocos.filter(b=>['poesia','sextilha','decima','haicai'].includes(b.tipo)).length;
  const nCap=blocos.filter(b=>b.tipo==='capitulo').length;
  const nSext=blocos.filter(b=>b.tipo==='sextilha'||b.tipo==='decima').length;
  if(nSext/total>.5) return 'cordel';
  if(nPoesia/total>.75) return 'poesia';
  if(nPoesia/total>.25&&nCap>=1) return 'hibrido';
  return 'prosa';
}

// ═══════════════════════════════════════════════════════════
// 8. PAGINAÇÃO
// ═══════════════════════════════════════════════════════════

// Estimativa por fórmula (caracteres por linha) — usada só como
// contingência fora do navegador (sem `document`, medição real é
// impossível). Dentro do app, quem decide altura é medirAlturaReal().
function estimarAlturaFormula(bloco, cfg, fmt){
  const largUtil=fmt.w-(cfg.mI||57)-(cfg.mE||43);
  const fs=cfg.tamanhoFonte||12;
  const lh=cfg.entrelinha||1.52;
  const fsPx=fs*1.333;
  const cpl=Math.max(20,Math.floor(largUtil/(fsPx*0.52)));
  let linhas=0;
  bloco.conteudo.split('\n').forEach(l=>{
    linhas+=Math.max(1,Math.ceil(Math.max(1,l.trim().length)/cpl));
  });
  const extra=bloco.tipo==='capitulo'?60:bloco.tipo==='subtitulo'?30:16;
  return Math.ceil(linhas*fsPx*lh+extra);
}

// Medidor real: um <div> fora da tela, com exatamente a mesma largura/
// fonte/entrelinha/hifenização da área de conteúdo da página, onde
// renderizamos o HTML de cada bloco pra ler a altura de verdade
// (scrollHeight) — a mesma técnica que o navegador vai usar quando a
// página for exibida. Isso substitui a estimativa por fórmula, que não
// tinha como saber quebra de linha, hifenização ou largura real do texto.
let _medidor=null;
function _obterMedidor(){
  if(_medidor) return _medidor;
  if(typeof document==='undefined') return null;
  _medidor=document.createElement('div');
  _medidor.style.cssText='position:absolute;visibility:hidden;pointer-events:none;left:-99999px;top:0;';
  document.body.appendChild(_medidor);
  return _medidor;
}

function _configurarMedidor(medidor, cfg, largUtil){
  medidor.style.width=largUtil+'px';
  medidor.style.fontFamily=cfg.fonte||"Georgia,'Times New Roman',serif";
  medidor.style.fontSize=(cfg.tamanhoFonte||12)+'pt';
  medidor.style.lineHeight=String(cfg.entrelinha||1.52);
  medidor.style.hyphens=cfg.hifenizacao?'auto':'manual';
  medidor.style.webkitHyphens=medidor.style.hyphens;
  medidor.style.wordBreak='break-word';
  medidor.lang='pt-BR';
}

function estimarAltura(bloco, cfg, fmt, aplicaCapitular_){
  const largUtil=fmt.w-(cfg.mI||57)-(cfg.mE||43);
  if(bloco.tipo==='imagem'){
    const altUtilPagina=fmt.h-(cfg.mT||52)-(cfg.mB||58);
    const img=parseImagem(bloco.conteudo);
    const razao=(img&&img.largura&&img.altura)?img.altura/img.largura:0.66; // 3:2 se não vier medida
    const legendaAlt=(img&&img.legenda)?24:0;
    const altTotal=largUtil*razao+legendaAlt+16;
    // Imagem não passa da altura útil da página — se o cálculo estourar,
    // ela ocupa a página inteira disponível em vez de vazar pra próxima.
    return Math.ceil(Math.min(altTotal,altUtilPagina));
  }
  const medidor=_obterMedidor();
  if(!medidor) return estimarAlturaFormula(bloco,cfg,fmt);
  _configurarMedidor(medidor,cfg,largUtil);
  // Quem chama (paginar(), pelo bloco identificado em
  // _identificarBlocosCapitulares) pode pedir a medição já COM a
  // capitular aplicada — sem isso, a estimativa ficava pequena demais
  // (a letra capitular estreita as primeiras linhas, empurrando o
  // parágrafo pra mais linhas do que o texto "reto" precisaria), e com a
  // grade de linhas isso já não era mais um resíduo pequeno: dava pra
  // estourar a página inteira e disparar uma cascata de correção que ia
  // longe demais. Sem esse parâmetro, mede sem capitular (comportamento
  // de sempre, usado nos outros blocos).
  medidor.innerHTML=renderizarBloco(bloco,cfg,!!aplicaCapitular_);
  const altura=medidor.scrollHeight;
  return altura||estimarAlturaFormula(bloco,cfg,fmt);
}

// Rede de segurança: depois que a paginação decide onde cada bloco vai,
// remonta o HTML real de cada página (com capitular de verdade aplicado,
// exatamente como renderizarPagina() vai desenhar) e mede de novo. Se a
// altura real ultrapassar o espaço disponível, a página entra nos alertas
// — o texto NUNCA fica cortado silenciosamente atrás do overflow:hidden;
// se sobrar algo, o usuário é avisado exatamente em qual página.
function detectarOverflowPaginas(paginas, cfg, fmt){
  const medidor=_obterMedidor();
  if(!medidor) return [];
  const altUtil=fmt.h-(cfg.mT||52)-(cfg.mB||58);
  const largUtil=fmt.w-(cfg.mI||57)-(cfg.mE||43);
  _configurarMedidor(medidor,cfg,largUtil);
  const overflow=[];
  paginas.forEach(pag=>{
    let capApl=false;
    const abreCap=pag.blocos.length>0&&pag.blocos[0].tipo==='capitulo';
    const podeCap=pag.numero===1||abreCap;
    const html=pag.blocos.map(b=>{
      const aplica=(!capApl&&podeCap&&b.tipo==='prosa'&&cfg.capitular&&cfg.capitular!=='none');
      if(b.tipo==='prosa') capApl=true;
      return renderizarBloco(b,cfg,aplica);
    }).join('');
    medidor.innerHTML=html;
    // pequena tolerância de arredondamento entre medições sucessivas
    if(medidor.scrollHeight>altUtil+2){
      overflow.push({pagina:pag.numero,alturaReal:medidor.scrollHeight,alturaDisponivel:altUtil});
    }
  });
  return overflow;
}

// Tipos de bloco cujo texto pode ser dividido no meio (por palavra
// inteira) quando não cabe todo no espaço restante da página — o mesmo
// que qualquer editor de texto faz com um parágrafo que atravessa uma
// quebra de página. Formas fechadas (poesia, haicai, estrofe, soneto,
// capítulo, subtítulo, imagem) nunca são divididas: cortar um verso no
// meio destrói a forma.
const TIPOS_DIVISIVEIS=new Set(['prosa','dialogo']);

// Espaço mínimo pra valer a pena dividir um bloco (~1 linha) — abaixo
// disso, a divisão deixaria só uma linha órfã na página atual; melhor
// mandar o bloco inteiro pra próxima página, como antes. Era 2 linhas
// até aqui — jogava até quase 2 linhas de espaço fora toda vez que um
// parágrafo terminava perto do fim da página (visto numa diagramação
// real com vãos em branco maiores do que deveria). Baixado pra 1 linha;
// se isso deixar uma linha órfã sozinha na página, corrigirViuvasOrfas()
// já cuida de mover ela pra página seguinte depois.
function _alturaMinimaDivisao(cfg){
  const fs=cfg.tamanhoFonte||12;
  const lh=cfg.entrelinha||1.52;
  return fs*1.333*lh;
}

// Divide o texto de um bloco em duas partes, por palavra inteira, de
// forma que a primeira caiba em `alturaDisponivel` (medição real via
// DOM, igual estimarAltura()). Retorna null se não há medidor, se o
// bloco cabe inteiro, ou se nem uma palavra cabe.
function _dividirTextoPorAltura(bloco, cfg, fmt, alturaDisponivel){
  const medidor=_obterMedidor();
  if(!medidor) return null;
  const largUtil=fmt.w-(cfg.mI||57)-(cfg.mE||43);
  _configurarMedidor(medidor,cfg,largUtil);

  const tokens=bloco.conteudo.split(/(\s+)/); // mantém espaços/quebras originais
  const cabe=(n)=>{
    const parcial={...bloco,conteudo:tokens.slice(0,n).join('')};
    medidor.innerHTML=renderizarBloco(parcial,cfg,false);
    return medidor.scrollHeight<=alturaDisponivel;
  };
  if(cabe(tokens.length)) return null; // cabe inteiro, não precisa dividir

  let lo=0, hi=tokens.length;
  while(lo<hi){
    const mid=Math.ceil((lo+hi)/2);
    if(cabe(mid)) lo=mid; else hi=mid-1;
  }
  if(lo===0) return null; // nem uma palavra cabe

  const texto1=tokens.slice(0,lo).join('').trimEnd();
  const texto2=tokens.slice(lo).join('').trimStart();
  if(!texto1||!texto2) return null;

  return {
    parte1:{...bloco,conteudo:texto1},
    parte2:{...bloco,conteudo:texto2,_continuacao:true},
  };
}

// ═══════════════════════════════════════════════════════════
// 8.5 GRADE DE LINHAS (prosa)
// ═══════════════════════════════════════════════════════════
// A abordagem antiga (estimar a altura do parágrafo inteiro e só dividir
// quando ele não coubesse) tinha dois problemas visto numa geração real:
// a altura de cada bloco é medida isoladamente e depois SOMADA
// (pag.alturaUsada), então erro de arredondamento acumula entre blocos; e
// a divisão de última hora só era tentada quando o espaço restante já dava
// pra pelo menos ~1 linha, mas por causa do acúmulo o espaço real podia
// ser bem menor que isso no momento da decisão — o parágrafo inteiro
// então ia pra próxima página, jogando fora o espaço que sobrou (visto
// numa página real que parou 120px antes da borda, por exemplo).
//
// A grade de linhas resolve isso na raiz: quebra cada parágrafo de prosa
// comum nas linhas visuais REAIS dele (via medição real, mesma técnica de
// sempre) ANTES de paginar. Cada linha vira um bloco atômico de altura
// fixa e conhecida (alturaLinha) — paginar() só empilha linhas até a
// página encher, sem estimativa nem divisão nenhuma. Toda página normal
// passa a usar o número máximo de linhas que cabem no formato, do
// primeiro ao último capítulo, em vez de parar por acaso de onde o
// parágrafo termina.
//
// Fica de fora da grade o parágrafo que abre cada capítulo (o que recebe
// a letra capitular) — a capitular muda a quebra das primeiras linhas de
// um jeito que complicaria a detecção, e é só 1 parágrafo por capítulo;
// esse continua usando a estimativa por bloco inteiro, como antes.

// Mede a altura real de UMA linha de corpo de texto.
function _medirAlturaLinha(cfg, fmt){
  const medidor=_obterMedidor();
  if(!medidor) return (cfg.tamanhoFonte||12)*1.333*(cfg.entrelinha||1.52);
  const largUtil=fmt.w-(cfg.mI||57)-(cfg.mE||43);
  _configurarMedidor(medidor,cfg,largUtil);
  medidor.innerHTML='<p style="margin:0;text-align:justify;">x</p>';
  return medidor.scrollHeight;
}

// "Top" (posição vertical) do caractere na posição `offset` de um nó de
// texto já renderizado — usado pra descobrir em que linha visual cada
// caractere caiu.
//
// Usa o ÚLTIMO rect (não o primeiro) de propósito: no caractere logo depois
// de uma quebra de linha causada por hífen suave (­), o Chromium devolve
// DOIS rects pra esse único caractere — um "sobra" fantasma ainda grudado
// no fim da linha anterior (mesma posição do hífen visível) e o rect real
// dele já na linha nova. `rects[0]` pegava sempre o fantasma, fazendo a
// busca binária achar que esse caractere ainda estava na linha de cima —
// cortando a palavra um ou mais caracteres DEPOIS do hífen (ex.: "segmento"
// virando "segmen"/"to", sem hífen visível nenhum ali). O último rect é
// sempre o real nesse caso, e continua sendo o único/correto nos casos
// normais (só 1 rect por caractere).
function _topDoCaractere(range, textNode, offset){
  const fim=Math.min(offset+1, textNode.length);
  if(offset>=fim) return null;
  range.setStart(textNode, offset);
  range.setEnd(textNode, fim);
  const rects=range.getClientRects();
  return rects.length ? rects[rects.length-1].top : null;
}

// Divide um nó de texto já renderizado em linhas visuais (array de
// {start,end} em offsets de caractere) por busca binária por linha — bem
// mais rápido que testar caractere por caractere em parágrafos longos.
function _linhasVisuaisDoNo(textNode){
  const total=textNode.length;
  if(total===0) return [];
  const range=document.createRange();
  const linhas=[];
  let inicio=0;
  while(inicio<total){
    const topInicio=_topDoCaractere(range,textNode,inicio);
    let lo=inicio, hi=total-1;
    while(lo<hi){
      const mid=Math.ceil((lo+hi)/2);
      const t=_topDoCaractere(range,textNode,mid);
      if(t!==null&&Math.abs(t-topInicio)<1) lo=mid; else hi=mid-1;
    }
    linhas.push({start:inicio,end:lo+1});
    inicio=lo+1;
  }
  return linhas;
}

// Quebra um bloco de prosa (parágrafo único) em micro-blocos de UMA linha
// visual cada. Retorna null se o parágrafo é 1 linha só (não precisa
// quebrar) ou se não há DOM disponível pra medir.
function _dividirProsaEmLinhas(bloco, cfg, fmt){
  const medidor=_obterMedidor();
  if(!medidor) return null;
  const largUtil=fmt.w-(cfg.mI||57)-(cfg.mE||43);
  _configurarMedidor(medidor,cfg,largUtil);
  // hyphens:manual força a quebra a acontecer SÓ nos hífens invisíveis
  // que hifenizarTexto() já inseriu no texto (ou só em espaços, se a
  // hifenização estiver desligada) — nunca no dicionário de hifenização
  // automática do próprio navegador (hyphens:auto). Com os dois ativos
  // ao mesmo tempo, o navegador às vezes escolhia quebrar num ponto
  // DIFERENTE de onde os hífens do app estão — inofensivo quando o
  // parágrafo inteiro fica numa única tag, mas ao dividir em linhas
  // separadas (grade de linhas) isso literalmente cortava a palavra num
  // ponto sem hífen nenhum ali (bug real visto numa geração: "segmento"
  // virando "segmen" numa linha e "to" solto na linha seguinte, sem
  // hífen). Detectar a quebra sempre no mesmo critério do hífen manual
  // elimina essa ambiguidade.
  medidor.style.hyphens='manual';
  medidor.style.webkitHyphens='manual';
  const p=document.createElement('p');
  p.style.margin='0';
  p.style.textAlign='justify';
  // O recuo (text-indent) da primeira linha PRECISA estar aqui — sem
  // isso, a detecção de quebra usava a largura inteira também na 1ª
  // linha, "cabendo" mais texto do que cabe de verdade quando essa linha
  // é renderizada com recuo (ver renderizarBloco, caso _linha). O
  // resultado real então quebrava essa linha em duas, bagunçando a
  // contagem de linhas da página inteira a partir dali — bug real visto
  // numa geração sintética, com páginas estourando bem além do previsto.
  if(cfg.recuo) p.style.textIndent=cfg.recuo+'em';
  p.textContent=bloco.conteudo;
  medidor.innerHTML='';
  medidor.appendChild(p);
  const textNode=p.firstChild;
  if(!textNode||!textNode.length) return null;
  const linhas=_linhasVisuaisDoNo(textNode);
  if(linhas.length<=1) return null;
  return linhas.map((l,i)=>({
    ...bloco,
    id:`${bloco.id}-L${i+1}`,
    conteudo:bloco.conteudo.slice(l.start,l.end),
    _linha:true,
    _primeiraLinha:i===0,
    _ultimaLinha:i===linhas.length-1,
  }));
}

// Quebra o parágrafo COM capitular em linhas visuais, do mesmo jeito que
// _dividirProsaEmLinhas — mas reproduzindo a estrutura real da capitular
// (<span flutuante>letra</span>resto do texto) durante a medição, porque
// a letra flutuante estreita a largura útil só das primeiras linhas (até
// a altura dela ser "vencida" pelo texto). Sem isso, mudar o tamanho da
// capitular não refluía direito o resto da página — o pedido do Wagner
// depois de ver a diagramação quebrar ao trocar o tamanho da letra.
// Detalhe que faz isso funcionar: um float em CSS continua estreitando a
// largura de QUALQUER conteúdo que vier depois dele no mesmo contexto de
// bloco, mesmo em elementos <p> irmãos separados — não precisa manter
// tudo numa tag só. Por isso dá pra continuar quebrando o parágrafo em
// vários microblocos de uma linha cada (ver renderizarBloco, campo
// _capitularPrimeira) e o efeito visual da letra flutuante continua
// estreitando as linhas seguintes até a altura dela acabar, exatamente
// como aconteceria com o parágrafo inteiro numa tag só.
function _dividirCapitularEmLinhas(bloco, cfg, fmt){
  const medidor=_obterMedidor();
  if(!medidor) return null;
  const largUtil=fmt.w-(cfg.mI||57)-(cfg.mE||43);
  _configurarMedidor(medidor,cfg,largUtil);
  // hyphens:manual — ver comentário equivalente em _dividirProsaEmLinhas.
  medidor.style.hyphens='manual';
  medidor.style.webkitHyphens='manual';

  const t=bloco.conteudo||'';
  if(t.length<2) return null;
  const primeira=t.charAt(0);
  const resto=t.slice(1);
  const css=_estiloCapitularComTamanho(cfg.capitular, cfg);

  const p=document.createElement('p');
  p.style.margin='0';
  p.style.textAlign='justify';
  const span=document.createElement('span');
  span.setAttribute('style',css);
  span.textContent=primeira;
  p.appendChild(span);
  const textNode=document.createTextNode(resto);
  p.appendChild(textNode);
  medidor.innerHTML='';
  medidor.appendChild(p);

  if(!textNode.length) return null;
  const linhas=_linhasVisuaisDoNo(textNode);
  if(linhas.length===0) return null;

  // A letra capitular pode ser mais ALTA do que as poucas linhas de texto
  // estreitas ao lado dela (comum em estilos grandes tipo "iluminura") —
  // nesse caso o float "sobra" abaixo do texto, ocupando espaço vertical
  // real que a soma simples de N linhas (cada uma valendo alturaLinha) não
  // cobre. Em vez de estimar por uma razão altura-da-letra/altura-da-linha
  // (testado e revelou instável — acertava um estilo e quebrava outro),
  // mede a altura REAL acumulada até cada uma das primeiras linhas
  // (parágrafo truncado bem naquele ponto) e usa a diferença entre uma
  // medição e a anterior como o "custo" de verdade daquela linha
  // específica. Só as poucas primeiras linhas (onde a letra ainda pode
  // estar influenciando) precisam disso; a partir da que já bate com
  // alturaLinha exata, para de medir e usa o valor padrão no resto.
  // Sem isso, capitulares grandes estouravam a página real bem mais do
  // que o previsto (achado testando os 5 estilos com Playwright).
  const alturaLinha=_medirAlturaLinha(cfg,fmt);
  const LIMITE_LINHAS_MEDIDAS=8; // generoso pra qualquer tamanho de capitular realista
  const alturasCustom=[];
  let alturaAnterior=0;
  for(let i=0;i<Math.min(linhas.length,LIMITE_LINHAS_MEDIDAS);i++){
    textNode.data=resto.slice(0,linhas[i].end);
    const alturaAcumulada=medidor.scrollHeight;
    const custoDestaLinha=alturaAcumulada-alturaAnterior;
    alturasCustom.push(custoDestaLinha);
    alturaAnterior=alturaAcumulada;
    // Assim que uma linha já custar exatamente alturaLinha (± meio pixel
    // de arredondamento), a letra parou de influenciar — não precisa
    // medir as linhas seguintes, todas vão custar o padrão daqui pra
    // frente.
    if(Math.abs(custoDestaLinha-alturaLinha)<0.6) break;
  }
  textNode.data=resto; // restaura o texto completo no nó medido

  return linhas.map((l,i)=>({
    ...bloco,
    id:`${bloco.id}-L${i+1}`,
    // A 1ª linha guarda o texto COMPLETO (letra capitular + resto) no
    // conteudo — igual a qualquer outro bloco, pra quem só lê .conteudo
    // (exportação, checagem de integridade etc.) nunca perder a letra.
    // renderizarBloco separa letra/resto de novo na hora de desenhar.
    conteudo:i===0?(primeira+resto.slice(l.start,l.end)):resto.slice(l.start,l.end),
    _linha:true,
    // Override de altura pras primeiras linhas (medidas de verdade acima)
    // — undefined nas linhas além do que foi medido, que usam alturaLinha
    // padrão como qualquer outra linha da grade.
    _alturaCustom:i<alturasCustom.length?alturasCustom[i]:undefined,
    _primeiraLinha:i===0,
    _ultimaLinha:i===linhas.length-1,
    _capitularPrimeira:i===0,
  }));
}

// Identifica (por referência de objeto) qual bloco 'prosa' é o candidato
// a capitular em cada capítulo: o primeiro 'prosa' depois de cada
// 'capitulo' (ou o primeiro do documento, se vier antes de qualquer
// capítulo, MAS só quando a obra não tem capítulo nenhum — conto sem
// divisão, por exemplo) — a mesma regra que estimarAltura/
// detectarOverflowPaginas já aplicam por página, calculada aqui uma vez
// pra todo o documento, já que a ordem dos blocos nunca muda durante a
// paginação.
//
// Antes disso, um livro com "Título\nAutor: Fulano" colado no topo do
// texto colado (antes do 1º "CAPÍTULO 1") virava esse "primeiro prosa
// da obra" e ganhava letra capitular gigante na página de rosto — bug
// real visto numa geração. Quando a obra TEM capítulo, o prosa antes do
// 1º capítulo (falso "miolo") nunca é candidato; só o que vem depois de
// cada capítulo de verdade.
function _identificarBlocosCapitulares(blocos){
  const candidatos=new Set();
  const temCapitulos=blocos.some(b=>b.tipo==='capitulo');
  let capApl=temCapitulos;
  blocos.forEach(b=>{
    if(b.tipo==='capitulo'){ capApl=false; return; }
    if(b.tipo==='prosa'&&!capApl){ candidatos.add(b); capApl=true; }
  });
  return candidatos;
}

// Pré-processa os blocos pra paginação por grade de linhas: troca cada
// bloco 'prosa' comum (fora o capitular de cada capítulo) pelas suas
// linhas visuais. Blocos de outros tipos (capitulo, subtitulo, diálogo,
// poesia, imagem etc.) passam direto, sem mudança nenhuma.
function _prepararBlocosParaGrade(blocos, cfg, fmt){
  const capitulares=_identificarBlocosCapitulares(blocos);
  const medidor=_obterMedidor();
  if(!medidor) return {blocos, alturaLinha:_alturaMinimaDivisao(cfg), capitulares};

  const alturaLinha=_medirAlturaLinha(cfg,fmt);
  // cfg.decoracao só acrescenta o divisor ornamental abaixo do título do
  // capítulo (ver renderizarBloco, caso 'capitulo') — não muda como a
  // LETRA capitular em si é desenhada, então não precisa desligar a
  // medição precisa por grade de linhas (evita reintroduzir o estouro de
  // página que motivou essa grade, só porque o usuário também escolheu
  // um ornamento de capítulo).
  const temCapitularFixa=cfg.capitular&&cfg.capitular!=='none';
  const resultado=[];
  blocos.forEach(bloco=>{
    if(bloco.tipo!=='prosa'){
      resultado.push(bloco);
      return;
    }
    if(capitulares.has(bloco)){
      // Decoração de gênero ativa (CeleiroMotorDecoracaoEditorial) usa um
      // jeito de desenhar a capitular que essa função não reproduz — cai
      // no bloco inteiro, como antes.
      if(!temCapitularFixa){ resultado.push(bloco); return; }
      const linhasCap=_dividirCapitularEmLinhas(bloco,cfg,fmt);
      if(!linhasCap){ resultado.push(bloco); return; }
      resultado.push(...linhasCap);
      return;
    }
    const linhas=_dividirProsaEmLinhas(bloco,cfg,fmt);
    if(!linhas){ resultado.push(bloco); return; }
    resultado.push(...linhas);
  });
  return {blocos:resultado, alturaLinha, capitulares};
}

function paginar(blocos, cfg, fmt){
  const altUtil=fmt.h-(cfg.mT||52)-(cfg.mB||58);
  const alturaMinDivisao=_alturaMinimaDivisao(cfg);
  // Grade de linhas: quebra os parágrafos de prosa comuns (fora o que
  // abre capítulo com capitular) nas linhas visuais reais deles antes de
  // paginar — ver seção 8.5. Cada linha vira um bloco atômico de altura
  // fixa (alturaLinha), então a página sempre enche até o máximo de
  // linhas que cabem, em vez de parar antes por causa de um parágrafo
  // inteiro que não coube.
  const prep=_prepararBlocosParaGrade(blocos,cfg,fmt);
  const blocosGrade=prep.blocos;
  const alturaLinha=prep.alturaLinha;
  const capitulares=prep.capitulares;
  // Espaço extra depois da ÚLTIMA linha de cada parágrafo (margin-bottom
  // do <p> real — ver gap em renderizarBloco) — sem somar isso na altura
  // da linha final de cada parágrafo, a grade de linhas subestimava toda
  // página com "Espaço §" (paragraphGap) configurado, tanto pior quanto
  // mais parágrafos curtos a página tivesse.
  const gapPx=(cfg.paragraphGap||0)*((cfg.tamanhoFonte||12)*1.333);

  const paginas=[];
  let pag={numero:1,lado:'recto',blocos:[],alturaUsada:0};

  const fila=blocosGrade.slice();
  let i=0;
  while(i<fila.length){
    const bloco=fila[i];

    // Página especial: sempre sozinha na própria página (fecha a atual se
    // tiver conteúdo, empurra ela pra lista, e já deixa a PRÓXIMA página
    // pronta pro que vier depois — nunca divide espaço com mais nada).
    if(bloco.tipo==='pagina_especial'){
      if(pag.blocos.length>0){
        paginas.push(pag);
        const n=paginas.length+1;
        pag={numero:n,lado:n%2===0?'verso':'recto',blocos:[],alturaUsada:0};
      }
      pag.blocos.push({...bloco,altEstimada:0});
      paginas.push(pag);
      const n=paginas.length+1;
      pag={numero:n,lado:n%2===0?'verso':'recto',blocos:[],alturaUsada:0};
      i++;
      continue;
    }
    // Imagem de fundo: marcador de altura zero, só anexa a config de
    // fundo à página atual (renderizarPagina lê isso depois) sem ocupar
    // espaço nem disputar posição com o texto normal.
    if(bloco.tipo==='fundo_pagina'){
      pag.blocos.push({...bloco,altEstimada:0});
      i++;
      continue;
    }

    // Linha da grade: altura fixa já conhecida, nunca precisa de
    // estimarAltura nem de divisão — ou cabe inteira, ou vai pra próxima
    // página inteira (é só uma linha, não tem "meio" pra dividir).
    // O parágrafo que abre capítulo (candidato a capitular) é medido JÁ
    // com a capitular aplicada — sem isso a estimativa saía pequena
    // demais (a letra capitular estreita as primeiras linhas, exigindo
    // mais linhas no total do que o texto "reto" precisaria) e a página
    // estourava de verdade depois, tendo que torcer pra correção de
    // overflow consertar um resíduo que na prática não era pequeno.
    const alt=bloco._linha
      ?(bloco._alturaCustom!==undefined?bloco._alturaCustom:alturaLinha)+(bloco._ultimaLinha?gapPx:0)
      :estimarAltura(bloco,cfg,fmt,capitulares.has(bloco));
    // Capítulo sempre começa em nova página — e, dentro do miolo, sempre
    // em página ímpar (recto/direita), regra editorial padrão. Se a nova
    // página cair em par (verso/esquerda), intercala uma página em branco
    // pra empurrar o capítulo pra próxima página ímpar.
    if(bloco.tipo==='capitulo'&&pag.blocos.length>0){
      paginas.push(pag);
      let n=paginas.length+1;
      if(n%2===0){
        paginas.push({numero:n,lado:'verso',blocos:[],alturaUsada:0,pagBranca:true});
        n=paginas.length+1;
      }
      pag={numero:n,lado:'recto',blocos:[],alturaUsada:0};
    }

    const espacoRestante=altUtil-pag.alturaUsada;
    if(alt>espacoRestante){
      // Bloco não cabe inteiro no espaço que sobra — tenta dividir por
      // palavra em vez de jogar o parágrafo inteiro (e o espaço que
      // sobrou) pra próxima página. Isso é o que evita a página ficar
      // preenchida bem menos do que caberia. (Linhas da grade nunca
      // entram aqui — TIPOS_DIVISIVEIS não bate com bloco._linha porque
      // elas já são a menor unidade possível.)
      if(!bloco._linha&&TIPOS_DIVISIVEIS.has(bloco.tipo)&&espacoRestante>=alturaMinDivisao){
        const divisao=_dividirTextoPorAltura(bloco,cfg,fmt,espacoRestante);
        if(divisao){
          const altParte1=estimarAltura(divisao.parte1,cfg,fmt);
          pag.blocos.push({...divisao.parte1,altEstimada:altParte1});
          pag.alturaUsada+=altParte1;
          fila.splice(i,1,divisao.parte2);
          paginas.push(pag);
          const n=paginas.length+1;
          pag={numero:n,lado:n%2===0?'verso':'recto',blocos:[],alturaUsada:0};
          continue;
        }
      }
      if(pag.blocos.length){
        paginas.push(pag);
        const n=paginas.length+1;
        pag={numero:n,lado:n%2===0?'verso':'recto',blocos:[],alturaUsada:0};
        continue;
      }
      // Página vazia e o bloco, mesmo sozinho, não cabe nem dividindo
      // (ou não é divisível) — segue o mesmo comportamento de antes:
      // aceita e deixa detectarOverflowPaginas() avisar, nunca corta
      // texto silenciosamente.
    }

    pag.blocos.push({...bloco,altEstimada:alt});
    pag.alturaUsada+=alt;
    i++;
  }
  if(pag.blocos.length) paginas.push(pag);
  return paginas;
}

function _flushPagina(paginas, grupo){
  if(!grupo.length) return;
  const n=paginas.length+1;
  paginas.push({numero:n,lado:n%2===0?'verso':'recto',blocos:grupo,alturaUsada:0});
}

// Haicai: uma composição por página (ou duas se configurado). Uma imagem
// interposta sempre ganha página própria — não entra na contagem de
// composições por página, senão desalinha o agrupamento das seguintes.
function paginarHaicai(blocos, cfg, fmt){
  const porPagina=cfg.composicoesPorPagina||1;
  const paginas=[];
  let grupo=[];
  blocos.forEach(bloco=>{
    if(bloco.tipo==='imagem'){
      _flushPagina(paginas,grupo); grupo=[];
      _flushPagina(paginas,[bloco]);
      return;
    }
    grupo.push(bloco);
    if(grupo.length>=porPagina){ _flushPagina(paginas,grupo); grupo=[]; }
  });
  _flushPagina(paginas,grupo);
  return paginas;
}

// Estrofista: um poema completo (7 estrofes) por conjunto de páginas.
// Mesma regra: imagem interposta corta o agrupamento e fica sozinha —
// evita que ela seja contada como uma das 7 estrofes do losango.
function paginarEstrofista(blocos, cfg, fmt){
  const paginas=[];
  let grupo=[];
  blocos.forEach(bloco=>{
    if(bloco.tipo==='imagem'){
      _flushPagina(paginas,grupo); grupo=[];
      _flushPagina(paginas,[bloco]);
      return;
    }
    grupo.push(bloco);
    if(grupo.length>=7){ _flushPagina(paginas,grupo); grupo=[]; }
  });
  _flushPagina(paginas,grupo);
  return paginas;
}

// ═══════════════════════════════════════════════════════════
// 9. VIÚVAS E ÓRFÃS
// ═══════════════════════════════════════════════════════════
// Corrige overflow real: detectarOverflowPaginas() só denunciava quando
// a altura real (página inteira montada, com capitular aplicado) passava
// do espaço disponível — o texto que sobrava ficava escondido atrás do
// overflow:hidden do container, sem aparecer em lugar nenhum (bug visto
// numa geração real: frase cortada no meio, sem continuar na página
// seguinte). Esta função mede a altura real de cada página e, se
// estourar, move o último bloco pra página seguinte e mede de novo —
// repete até caber. Nunca empurra conteúdo pra dentro de uma página em
// branco forçada (pagBranca) nem pra antes de um "capitulo" que abre
// página nova — nesses dois casos raros, mexer na página seguinte
// quebraria a regra de capítulo sempre começar em página ímpar própria;
// aí o overflow segue só reportado pelo alerta, como antes.
function corrigirOverflowPaginas(paginas,cfg,fmt){
  const medidor=_obterMedidor();
  if(!medidor) return paginas;
  const altUtil=fmt.h-(cfg.mT||52)-(cfg.mB||58);
  const largUtil=fmt.w-(cfg.mI||57)-(cfg.mE||43);
  _configurarMedidor(medidor,cfg,largUtil);

  const medirAlturaReal=(pag)=>{
    let capApl=false;
    const abreCap=pag.blocos.length>0&&pag.blocos[0].tipo==='capitulo';
    const podeCap=pag.numero===1||abreCap;
    const html=pag.blocos.map(b=>{
      const aplica=(!capApl&&podeCap&&b.tipo==='prosa'&&cfg.capitular&&cfg.capitular!=='none');
      if(b.tipo==='prosa') capApl=true;
      return renderizarBloco(b,cfg,aplica);
    }).join('');
    medidor.innerHTML=html;
    return medidor.scrollHeight;
  };

  // Pior overflow ANTES de mexer em qualquer coisa — usado no final pra
  // decidir se a correção realmente ajudou. Visto numa geração real:
  // corrigir o overflow de uma página empurra o excesso pra próxima, que
  // também estoura, empurra pra próxima, e assim em cascata — se essa
  // cascata esbarra numa página bloqueada (capítulo/branca) poucas
  // páginas à frente, sobra uma página com overflow BEM maior do que o
  // pequeno overflow original que disparou a correção. Sem essa trava,
  // a "correção" piorava o problema em vez de resolver.
  const piorOverflow=(lista)=>lista.reduce((pior,p)=>Math.max(pior,medirAlturaReal(p)-altUtil),0);
  const piorAntes=piorOverflow(paginas);
  const snapshot=JSON.parse(JSON.stringify(paginas));

  for(let pi=0;pi<paginas.length;pi++){
    const pag=paginas[pi];
    if(pag.blocos.length<2) continue;
    let guarda=0;
    while(pag.blocos.length>1&&medirAlturaReal(pag)>altUtil+2&&guarda<50){
      const prox=paginas[pi+1];
      const proxBloqueada=prox&&(prox.pagBranca||(prox.blocos[0]&&prox.blocos[0].tipo==='capitulo'));
      if(proxBloqueada) break;
      const ultimo=pag.blocos.pop();
      pag.alturaUsada-=(ultimo.altEstimada||0);
      let alvo=prox;
      if(!alvo){
        const n=paginas.length+1;
        alvo={numero:n,lado:n%2===0?'verso':'recto',blocos:[],alturaUsada:0};
        paginas.push(alvo);
      }
      alvo.blocos.unshift(ultimo);
      alvo.alturaUsada=(alvo.alturaUsada||0)+(ultimo.altEstimada||0);
      guarda++;
    }
  }

  const piorDepois=piorOverflow(paginas);
  if(piorDepois>piorAntes+2){
    return snapshot;
  }
  return paginas;
}

function corrigirViuvasOrfas(paginas,cfg,fmt){
  const altUtil=fmt.h-(cfg.mT||52)-(cfg.mB||58);
  for(let pi=0;pi<paginas.length-1;pi++){
    const pag=paginas[pi];const prox=paginas[pi+1];
    const ult=pag.blocos[pag.blocos.length-1];
    // pag.blocos.length>1: nunca tira o ÚNICO bloco de uma página — isso
    // deixava a página inteira em branco (0 blocos), sem remover a página
    // vazia da lista. Bug real visto numa geração real: um "buraco" 100%
    // em branco no meio do livro, sem nenhum aviso.
    // !ult._linha: linha da grade (ver _corrigirViuvasOrfasLinhas) tem
    // altura sempre <40 por ser 1 linha só — essa checagem genérica não é
    // pra ela, senão ficava tentando mover linha isolada sem sentido.
    // Só move se a página de destino tiver espaço de verdade pro bloco —
    // sem essa checagem, a correção de órfã/viúva empurrava uma linha a
    // mais numa página que já estava cheia, criando overflow novo que
    // corrigirOverflowPaginas() tentava consertar em cascata e, se
    // esbarrasse num capítulo/página branca poucas páginas à frente,
    // acabava revertendo TUDO (inclusive correções boas) — visto na
    // prática ao mudar o tamanho do título/capitular, que desloca as
    // quebras de página e cria mais casos de órfã/viúva do que o normal.
    // ult._continuacao / primProx._continuacao+id: só reúne quando os dois
    // pedaços são de fato metades do MESMO parágrafo dividido por altura
    // (ver _dividirTextoPorAltura — parte2 carrega _continuacao e o mesmo
    // id de parte1). Sem essa checagem, QUALQUER parágrafo completo e
    // curto (uma frase só, tipo "Nael fechou a pasta.") que calhasse de
    // ser o último bloco de uma página cheia era tratado como "órfão" e
    // arrancado dali — às vezes indo parar sozinho numa página em branco
    // reservada pro capítulo seguinte, mesmo sem ter irmão nenhum pra
    // reunir. Bug real visto numa geração: página quase 100% vazia no
    // meio do livro, com só essa frase solta, e a página anterior sobrando
    // espaço que ela caberia tranquila.
    const primProx=prox.blocos[0];
    if(ult&&ult.tipo==='prosa'&&!ult._linha&&!ult._continuacao&&ult.altEstimada<40&&pag.blocos.length>1
       &&primProx&&primProx._continuacao&&primProx.id===ult.id
       &&(prox.alturaUsada||0)+ult.altEstimada<=altUtil){
      pag.blocos.pop();pag.alturaUsada-=ult.altEstimada;
      prox.blocos.unshift(ult);prox.alturaUsada+=ult.altEstimada;
      ult._corrigido='orfa';
    }
    const prim=prox.blocos[0];
    if(prim&&prim.tipo==='prosa'&&!prim._linha&&prim._continuacao&&prim.altEstimada<40&&prox.blocos.length>1
       &&(pag.alturaUsada||0)+prim.altEstimada<=altUtil){
      prox.blocos.shift();prox.alturaUsada-=prim.altEstimada;
      pag.blocos.push(prim);pag.alturaUsada+=prim.altEstimada;
      prim._corrigido='viuva';
    }
  }
  return paginas;
}

// Viúvas/órfãs pra linhas da grade (ver seção 8.5): órfã é a PRIMEIRA
// linha de um parágrafo sozinha no fim de uma página, com o resto do
// parágrafo começando só na página seguinte — junta ela ao resto. Viúva é
// a ÚLTIMA linha de um parágrafo sozinha no topo de uma página, com o
// resto do parágrafo na página anterior — devolve ela pra página
// anterior. Regra clássica de tipografia: nunca deixar só 1 linha de um
// parágrafo isolada de um lado da quebra de página.
function _corrigirViuvasOrfasLinhas(paginas,cfg,fmt){
  const altUtil=fmt.h-(cfg.mT||52)-(cfg.mB||58);
  for(let pi=0;pi<paginas.length-1;pi++){
    const pag=paginas[pi];const prox=paginas[pi+1];
    const ult=pag.blocos[pag.blocos.length-1];
    // Checagem de espaço na página de destino antes de mover — ver
    // comentário equivalente em corrigirViuvasOrfas.
    if(ult&&ult._linha&&ult._primeiraLinha&&!ult._ultimaLinha&&pag.blocos.length>1
       &&(prox.alturaUsada||0)+(ult.altEstimada||0)<=altUtil){
      pag.blocos.pop();pag.alturaUsada-=(ult.altEstimada||0);
      prox.blocos.unshift(ult);prox.alturaUsada=(prox.alturaUsada||0)+(ult.altEstimada||0);
      ult._corrigido='orfa';
    }
    const prim=prox.blocos[0];
    if(prim&&prim._linha&&prim._ultimaLinha&&!prim._primeiraLinha&&prox.blocos.length>1
       &&(pag.alturaUsada||0)+(prim.altEstimada||0)<=altUtil){
      prox.blocos.shift();prox.alturaUsada-=(prim.altEstimada||0);
      pag.blocos.push(prim);pag.alturaUsada=(pag.alturaUsada||0)+(prim.altEstimada||0);
      prim._corrigido='viuva';
    }
  }
  return paginas;
}

// ═══════════════════════════════════════════════════════════
// 10. CAPITULAR
// ═══════════════════════════════════════════════════════════
const ESTILOS_CAPITULAR={
  none:'',
  simple:'float:left;font-size:3.2em;line-height:.82;margin:.04em .12em 0 0;font-weight:700;',
  classic:'float:left;font-size:3.9em;line-height:.82;margin:.02em .10em 0 0;font-weight:700;font-family:Georgia,serif;',
  ornamental:'float:left;font-size:4em;line-height:.82;margin:.02em .12em 0 0;font-weight:700;border:1px solid #b7c1b9;padding:.06em .14em .02em;background:#f6f4ef;',
  medieval:'float:left;font-size:4em;line-height:.82;margin:.02em .12em 0 0;font-weight:900;color:#3b1a08;border:2px double #d8a84c;padding:.04em .12em;background:#fffbe8;',
  iluminura:'float:left;font-size:4.2em;line-height:.82;margin:.02em .14em 0 0;font-weight:900;color:#7c1212;border:3px solid #d8b56d;outline:1px solid #7c1212;padding:.04em .14em;background:#fff3bd;',
};
// Tamanho-base (em em) de cada estilo — usado como referência pro
// multiplicador de cfg.capitularTamanho (controle de tamanho da letra
// capitular na UI do Pólux). Ficam em declaração separada, DEPOIS do CSS
// base no style inline, pra sobrescrever o font-size fixo de cada estilo
// (a última declaração da mesma propriedade vence num atributo style).
const ESTILOS_CAPITULAR_EM_BASE={none:0,simple:3.2,classic:3.9,ornamental:4,medieval:4,iluminura:4.2};
function _estiloCapitularComTamanho(estilo, cfg){
  const base=ESTILOS_CAPITULAR[estilo]||ESTILOS_CAPITULAR.classic;
  if(!base) return base;
  const emBase=ESTILOS_CAPITULAR_EM_BASE[estilo]!==undefined?ESTILOS_CAPITULAR_EM_BASE[estilo]:3.9;
  const mult=(cfg&&cfg.capitularTamanho)||1;
  return `${base}font-size:${(emBase*mult).toFixed(2)}em;`;
}

// Fonte da letra capitular quando a decoração é por gênero (motor
// CeleiroMotorDecoracaoEditorial) — mesmo mapeamento do gerarCSSBase()
// daquele motor, só que inline (a letra precisa ficar certa também na
// exportação de PDF/EPUB, que não carrega o <style> da página viva).
const FONTE_CAPITULAR_POR_GENERO={
  medieval:"Cinzel,Georgia,serif",
  fantasia_epica:"'EB Garamond',Georgia,serif",
  ficcao_cientifica:"Georgia,serif",
  cordel:"'Times New Roman',Georgia,serif",
  terror:"'Libre Baskerville',Georgia,serif",
  infantil:"Georgia,serif",
};

function aplicarCapitular(texto,estilo,cfg){
  if(!estilo||estilo==='none') return texto;
  const css=_estiloCapitularComTamanho(estilo, cfg);
  return texto.replace(/^(.)/,`<span style="${css}">$1</span>`);
}

// ═══════════════════════════════════════════════════════════
// 11. RENDERIZAÇÃO HTML DOS BLOCOS
// ═══════════════════════════════════════════════════════════
function renderizarBloco(bloco, cfg, aplicaCapitular_){
  const gap=`margin-bottom:${cfg.paragraphGap||0}em;`;
  const recuo=cfg.recuo?`text-indent:${cfg.recuo}em;`:'';
  const aPoesia=cfg.alinhPoesia||'center';

  switch(bloco.tipo){
    case 'imagem': {
      const img=parseImagem(bloco.conteudo);
      if(!img) return '';
      const legenda=img.legenda?`<figcaption style="text-align:center;font-size:.78em;color:#555;margin-top:.5em;font-style:italic;">${escapar(img.legenda)}</figcaption>`:'';
      return `<figure style="margin:0 0 ${cfg.paragraphGap||0}em;clear:both;text-align:center;"><img src="${escapar(img.url)}" alt="${escapar(img.legenda)}" style="max-width:100%;height:auto;display:block;margin:0 auto;">${legenda}</figure>`;
    }

    // Página especial e imagem de fundo não entram no fluxo comum de
    // conteúdo — renderizarPagina() desenha a página inteira (página
    // especial) ou a camada de fundo (imagem de fundo) separadamente.
    case 'pagina_especial': case 'fundo_pagina':
      return '';

    case 'capitulo': {
      // Ornamento sob o título — só quando há decoração de gênero ativa
      // (cfg.decoracao) e o motor de decoração está carregado na página.
      let divisor='';
      if(cfg.decoracao && typeof window!=='undefined' && window.CeleiroMotorDecoracaoEditorial){
        const d=window.CeleiroMotorDecoracaoEditorial.gerarDecoracao(cfg.decoracao);
        divisor=`<div style="text-align:center;margin:.2em 0 1em;font-size:1.05em;letter-spacing:.15em;opacity:.75;clear:both;">${escapar(d.divisor)}</div>`;
      }
      // Rótulo ("CAPÍTULO 1") e título do capítulo em hierarquia visual
      // separada: rótulo pequeno e espaçado, título maior e serifado em
      // itálico — em vez das duas coisas juntas na mesma linha/fonte.
      // Alinhamento é individual por capítulo (cfg.alinhamentosCapitulo,
      // chaveado pelo id do bloco 'capitulo') — cada capítulo pode ter o
      // rótulo/título à esquerda, centralizado ou à direita, em vez de um
      // alinhamento único pra obra inteira.
      const {rotulo,titulo}=_dividirRotuloETitulo(bloco.conteudo);
      const alinhCap=(cfg.alinhamentosCapitulo&&cfg.alinhamentosCapitulo[bloco.id])||cfg.alinhamentoCapituloPadrao||'center';
      const rotuloHtml=`<div style="text-align:${alinhCap};font-size:.72em;font-weight:700;letter-spacing:.22em;margin:0 0 .5em;line-height:1.2;">${escapar(rotulo)}</div>`;
      const tamanhoTitulo=cfg.tituloTamanho||1.6;
      const tituloHtml=titulo
        ? `<h1 style="text-align:${alinhCap};font-size:${tamanhoTitulo}em;font-weight:400;font-style:italic;font-family:Georgia,'Times New Roman',serif;margin:0;line-height:1.3;">${escapar(titulo)}</h1>`
        : '';
      return `<div style="clear:both;page-break-before:always;">${rotuloHtml}${tituloHtml}</div>${divisor}`;
    }

    case 'subtitulo':
      return `<h2 style="text-align:center;font-size:1.05em;font-style:italic;margin:0 0 1.6em;font-weight:400;clear:both;">${escapar(bloco.conteudo)}</h2>`;

    case 'poesia': case 'sextilha': case 'decima':
      return `<div style="white-space:pre-line;${gap}text-align:${aPoesia};clear:both;">${escapar(bloco.conteudo)}</div>`;

    case 'dialogo':
      return bloco.conteudo.split('\n')
        .map(l=>`<p style="margin:0 0 .4em;text-indent:0;">${escapar(l.trim())}</p>`).join('');

    case 'haicai':
      return renderizarHaicai(bloco, cfg);

    case 'estrofe':
      return renderizarEstrofe(bloco, cfg);

    case 'estrofe_soneto': case 'estrofe_livre':
      return renderizarEstrofeSoneto(bloco, cfg);

    default: {
      // Prosa
      if(bloco._linha){
        // Uma única linha visual pré-calculada da grade de linhas (ver
        // _dividirProsaEmLinhas) — renderizada como o próprio parágrafo
        // completo seria, só que já cortada nessa linha.
        // Se a linha termina com um hífen invisível de hifenização
        // (­, U+00AD) porque a quebra caiu bem ali, precisa virar um
        // hífen visível: sozinha nessa linha, sem o resto da palavra na
        // MESMA renderização, o navegador não tem motivo pra desenhar o
        // hífen (ele só aparece quando é o próprio navegador que decide
        // quebrar ali) — sem isso a sílaba cortada ficava sem hífen.
        const conteudoLinha=bloco.conteudo.endsWith('­')
          ? bloco.conteudo.slice(0,-1)+'-'
          : bloco.conteudo;
        // Capitular nunca leva recuo de primeira linha (igual ao bloco
        // inteiro de sempre) — a letra flutuante já ocupa esse espaço.
        const recuoLinha=(bloco._primeiraLinha&&!bloco._capitularPrimeira)?recuo:'';
        const margemLinha=bloco._ultimaLinha?gap:'margin-bottom:0;';
        // text-align-last:justify força ESTA linha (que sozinha na sua
        // própria tag <p> seria tratada como "última linha", e por
        // padrão não é esticada) a se comportar como uma linha do MEIO
        // de um parágrafo — esticada de margem a margem, igual ficava
        // antes de virar uma linha própria da grade. A verdadeira última
        // linha do parágrafo fica de fora disso, do jeito normal
        // (alinhada à esquerda, sem esticar).
        const alinhamentoLinha=bloco._ultimaLinha
          ?'text-align:justify;'
          :'text-align:justify;text-align-last:justify;';
        // clear:both na última linha de QUALQUER parágrafo: inofensivo
        // quando não há nenhuma letra capitular flutuando (não existe
        // float pra "limpar"), mas é o que impede a letra capitular de um
        // parágrafo continuar estreitando a largura de parágrafos
        // seguintes depois que o texto dela termina.
        const limpezaLinha=bloco._ultimaLinha?'clear:both;':'';
        // hyphens:manual aqui também: essa linha já foi cortada no ponto
        // exato calculado por _dividirProsaEmLinhas (ver comentário lá) —
        // deixar hyphens:auto ligado no render final serviria só pra
        // reabrir a mesma ambiguidade que causava corte de palavra sem
        // hífen, mesmo sendo bem mais raro aqui (a linha já cabe sozinha).
        const semHifenAuto='hyphens:manual;-webkit-hyphens:manual;';
        if(bloco._capitularPrimeira){
          // A letra fica no próprio conteudo (1º caractere) — não num
          // campo à parte — pra quem só lê bloco.conteudo (exportação,
          // checagem de integridade) nunca perder essa letra.
          const css=_estiloCapitularComTamanho(cfg.capitular, cfg);
          const letra=escapar(conteudoLinha.charAt(0));
          const restoLinha=escapar(conteudoLinha.slice(1));
          return `<p style="${margemLinha}${alinhamentoLinha}${limpezaLinha}${semHifenAuto}"><span style="${css}">${letra}</span>${restoLinha}</p>`;
        }
        const textoLinha=escapar(conteudoLinha);
        return `<p style="${recuoLinha}${margemLinha}${alinhamentoLinha}${limpezaLinha}${semHifenAuto}">${textoLinha}</p>`;
      }
      const texto=escapar(bloco.conteudo);
      if(aplicaCapitular_){
        // Com decoração de gênero ativa, a letra capitular usa a
        // biblioteca do motor de decoração (casada com o gênero
        // detectado); sem ela, cai no capitular fixo de sempre.
        if(cfg.decoracao && typeof window!=='undefined' && window.CeleiroMotorDecoracaoEditorial){
          const d=window.CeleiroMotorDecoracaoEditorial.gerarDecoracao(cfg.decoracao);
          const t=bloco.conteudo||'';
          const primeira=escapar(t.charAt(0));
          const resto=escapar(t.slice(1));
          const fonteCap=FONTE_CAPITULAR_POR_GENERO[d.chave]||'';
          const multCap=(cfg&&cfg.capitularTamanho)||1;
          const styleCap=`float:left;font-size:${(3.4*multCap).toFixed(2)}em;line-height:.85;margin:.06em .12em 0 0;font-weight:bold;${fonteCap?`font-family:${fonteCap};`:''}`;
          return `<p style="margin:0 0 ${cfg.paragraphGap||0}em;text-indent:0;text-align:justify;"><span style="${styleCap}">${primeira}</span>${resto}</p>`;
        }
        return `<p style="margin:0 0 ${cfg.paragraphGap||0}em;text-indent:0;text-align:justify;">${aplicarCapitular(texto,cfg.capitular,cfg)}</p>`;
      }
      // Continuação de um parágrafo dividido entre páginas (ver
      // _dividirTextoPorAltura) não é o início de um parágrafo novo —
      // não leva o recuo de primeira linha.
      const recuoAplicado=bloco._continuacao?'':recuo;
      return `<p style="${recuoAplicado}${gap}text-align:justify;">${texto}</p>`;
    }
  }
}

// ─── HAICAI ───────────────────────────────────────────────
function renderizarHaicai(bloco, cfg){
  const titulo=bloco.titulo
    ?`<div style="font-style:italic;font-size:.85em;color:#666;margin-bottom:1.2em;text-align:center;">${escapar(bloco.titulo)}</div>`:'';
  const versos=(bloco.versos||bloco.conteudo.split('\n').filter(Boolean))
    .map(v=>`<div style="line-height:2.2;">${escapar(v.trim())}</div>`).join('');
  const aviso=bloco.tipo==='haicai_invalido'
    ?`<div style="color:#b13a3a;font-size:.7em;margin-top:.8em;">⚠ Este haicai não tem exatamente 3 versos</div>`:'';
  return `<div style="text-align:center;margin:auto;padding:2em 0;">${titulo}${versos}${aviso}</div>`;
}

// ─── ESTROFISTA ───────────────────────────────────────────
function renderizarEstrofe(bloco, cfg){
  const versos=bloco.versos||bloco.conteudo.split('\n').filter(Boolean);
  const aviso=!bloco.valido
    ?`<div style="color:#b13a3a;font-size:.65em;margin-top:.4em;">⚠ Estrofe ${bloco.posicaoLosango+1} deve ter ${bloco.versosEsperados} verso(s)</div>`:'';
  // Papel no losango (modo clássico)
  const labelPapel=cfg.modoEstrofista==='classico'&&bloco.papel
    ?`<div style="font-size:.6em;color:#999;letter-spacing:.1em;text-transform:uppercase;margin-bottom:.4em;">${bloco.papel}</div>`:'';
  const html=versos.map(v=>`<div style="line-height:${cfg.entrelinha||1.8};">${escapar(v.trim())}</div>`).join('');
  return `<div style="text-align:center;margin-bottom:1.6em;">${labelPapel}${html}${aviso}</div>`;
}

// ─── SONETO ───────────────────────────────────────────────
function renderizarEstrofeSoneto(bloco, cfg){
  const versos=bloco.versos||bloco.conteudo.split('\n').filter(Boolean);
  const nome=bloco.nome
    ?`<div style="font-size:.65em;color:#999;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.4em;">${bloco.nome}</div>`:'';
  const html=versos.map(v=>`<div style="line-height:${cfg.entrelinha||1.8};">${escapar(v.trim())}</div>`).join('');
  return `<div style="text-align:center;margin-bottom:${cfg.paragraphGap||1.5}em;">${nome}${html}</div>`;
}

// ═══════════════════════════════════════════════════════════
// 12. RENDERIZAÇÃO DA PÁGINA
// ═══════════════════════════════════════════════════════════
function renderizarPagina(pagina, cfg, fmt, numeracao){
  const W=fmt.w, H=fmt.h;
  const mT=cfg.mT||52, mB=cfg.mB||58;
  const margL=pagina.lado==='recto'?(cfg.mI||57):(cfg.mE||43);
  const margR=pagina.lado==='recto'?(cfg.mE||43):(cfg.mI||57);
  const fs=cfg.tamanhoFonte||12;
  const lh=cfg.entrelinha||1.52;
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";

  // Página especial: página inteira com fundo/cor de texto próprios,
  // sem a caixa de margem normal — layout totalmente à parte do miolo
  // comum, sempre sozinha na página (garantido por paginar()).
  const especial=pagina.blocos.find(b=>b.tipo==='pagina_especial');
  if(especial){
    const opts=especial.opts||{};
    const fundoCor=opts.fundo||'#0a0a0a';
    const textoCor=opts.texto||'#f0e8d0';
    const alinh=opts.alinhamento==='esquerda'?'left':opts.alinhamento==='direita'?'right':'center';
    const imagemFundo=opts.imagem?`background-image:url('${escapar(opts.imagem)}');background-size:cover;background-position:center;`:'';
    const paragrafos=especial.conteudo.split(/\n\s*\n/).map(p=>
      `<p style="margin:0 0 1em;">${escapar(p.trim()).replace(/\n/g,'<br>')}</p>`
    ).join('');
    return `<div style="width:${W}px;height:${H}px;background:${escapar(fundoCor)};${imagemFundo}color:${escapar(textoCor)};position:relative;box-shadow:0 10px 28px rgba(0,0,0,.12);border-radius:2px;flex-shrink:0;overflow:hidden;display:flex;align-items:center;justify-content:center;padding:60px;box-sizing:border-box;">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:1.05em;line-height:1.8;text-align:${alinh};max-width:100%;">${paragrafos}</div>
    </div>`;
  }

  // Capitular: no 1º parágrafo de prosa da 1ª página do livro, e também
  // no 1º parágrafo de prosa de toda página que abre um capítulo — a
  // paginação (paginar()) sempre força capítulo a começar página nova,
  // então "página que abre capítulo" = 1º bloco da página é 'capitulo'.
  let capitularAplicado=false;
  const isPrimeiraPagina=pagina.numero===1;
  const abreCapitulo=pagina.blocos.length>0&&pagina.blocos[0].tipo==='capitulo';
  const podeCapitular=isPrimeiraPagina||abreCapitulo;

  const conteudo=pagina.blocos.map(b=>{
    const aplica=(
      !capitularAplicado&&podeCapitular&&
      b.tipo==='prosa'&&cfg.capitular&&cfg.capitular!=='none'
    );
    if(b.tipo==='prosa') capitularAplicado=true;
    return renderizarBloco(b,cfg,aplica);
  }).join('');

  // Numeração
  let numHtml='';
  if(numeracao&&numeracao!=='off'){
    const align=numeracao==='dir'?'right':pagina.lado==='recto'?'right':'left';
    numHtml=`<div style="position:absolute;bottom:${Math.round(mB/2)}px;left:${margL}px;right:${margR}px;text-align:${align};font-size:.78em;color:#888;">${pagina.numero}</div>`;
  }

  // Imagem de fundo (marcador ::fundo[]): camada atrás do texto, cobrindo
  // a página inteira — o texto normal (dentro da caixa de margem) flui
  // por cima dela naturalmente, sem precisar de nada especial no lado do
  // conteúdo.
  const fundoMarcador=pagina.blocos.find(b=>b.tipo==='fundo_pagina');
  const fundoHtml=fundoMarcador
    ? `<div style="position:absolute;inset:0;background-image:url('${escapar(fundoMarcador.fundo.url)}');background-size:cover;background-position:center;opacity:${fundoMarcador.fundo.opacidade};pointer-events:none;"></div>`
    : '';

  return `<div style="width:${W}px;height:${H}px;background:#fff;position:relative;box-shadow:0 10px 28px rgba(0,0,0,.12);border-radius:2px;flex-shrink:0;overflow:hidden;">
  ${fundoHtml}
  <div style="position:absolute;left:${margL}px;top:${mT}px;right:${margR}px;bottom:${mB}px;font-family:${ff};font-size:${fs}pt;line-height:${lh};overflow:hidden;hyphens:${cfg.hifenizacao?'auto':'manual'};-webkit-hyphens:${cfg.hifenizacao?'auto':'manual'};word-break:break-word;" lang="pt-BR">
    ${conteudo}
  </div>
  ${numHtml}
</div>`;
}

// ═══════════════════════════════════════════════════════════
// 13. PÁGINA DE ROSTO
// ═══════════════════════════════════════════════════════════
function gerarPaginaRosto(titulo, autor, subtitulo, fmt, cfg){
  const W=fmt.w, H=fmt.h;
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  const sub=subtitulo
    ?`<div style="font-size:.9em;font-style:italic;color:#555;margin-top:.6em;">${escapar(subtitulo)}</div>`:'';
  return `<div style="width:${W}px;height:${H}px;background:#fff;position:relative;box-shadow:0 10px 28px rgba(0,0,0,.12);border-radius:2px;flex-shrink:0;display:flex;align-items:center;justify-content:center;">
  <div style="text-align:center;font-family:${ff};padding:40px;">
    <div style="font-size:1.8em;font-weight:700;line-height:1.2;margin-bottom:.4em;">${escapar(titulo||'Sem título')}</div>
    ${sub}
    <div style="margin-top:3em;font-size:1em;color:#444;">${escapar(autor||'')}</div>
  </div>
</div>`;
}

// ═══════════════════════════════════════════════════════════
// 14. ALERTAS
// ═══════════════════════════════════════════════════════════
function gerarAlertas(blocos, paginas, modulo, cfg, fmt){
  const alertas=[];
  // Viúvas/órfãs
  paginas.flatMap(p=>p.blocos).filter(b=>b._corrigido).forEach(b=>{
    alertas.push({tipo:b._corrigido,msg:`${b._corrigido==='viuva'?'Viúva':'Órfã'} corrigida — bloco ${b.id} movido`});
  });
  // Haicai inválido
  if(modulo==='samurai'){
    blocos.filter(b=>b.tipo==='haicai_invalido').forEach(b=>{
      alertas.push({tipo:'haicai_invalido',msg:`Composição ${b.id}: não tem exatamente 3 versos`});
    });
  }
  // Estrofista inválido
  if(modulo==='espartano'){
    blocos.filter(b=>!b.valido).forEach(b=>{
      alertas.push({tipo:'estrofe_invalida',msg:`Estrofe ${b.id}: posição ${b.posicaoLosango+1} do losango deve ter ${b.versosEsperados} verso(s), tem ${b.versos?.length||0}`});
    });
  }
  // Cordel
  if(modulo==='quironxada'){
    const nPags=paginas.length;
    const val=validarCordel(nPags);
    if(!val.valido){
      alertas.push({tipo:'cordel_paginas',msg:`${nPags} páginas — ajuste para ${val.paginasNecessarias} páginas (${val.folhas} folhas)`});
    }
  }
  // Overflow real — rede de segurança contra corte silencioso de texto
  if(cfg&&fmt){
    detectarOverflowPaginas(paginas,cfg,fmt).forEach(o=>{
      alertas.push({tipo:'overflow',msg:`⚠ Página ${o.pagina}: texto real (${o.alturaReal}px) ultrapassa o espaço disponível (${o.alturaDisponivel}px) — reduza a fonte, aumente margens ou revise o bloco.`});
    });
  }
  return alertas;
}

// ═══════════════════════════════════════════════════════════
// 15. FUNÇÃO PRINCIPAL — preparar()
// ═══════════════════════════════════════════════════════════
function preparar(textoBruto, opcoes){
  const modulo=opcoes?.modulo||'polux';
  const preset=PRESETS[modulo]||PRESETS.polux;
  const cfg=Object.assign({},preset,opcoes||{});

  // Formato e margens
  const fmtKey=cfg.formato||cfg.formatoPadrao||'16x23';
  const fmt=FORMATOS[fmtKey]||FORMATOS['16x23'];
  const margKey=cfg.margem||cfg.margemPadrao||'normal';
  const marg=MARGENS[margKey]||MARGENS.normal;
  Object.assign(cfg,marg);

  // Corrigir texto
  const corr=cfg.correcao==='media'?correcaoMedia:correcaoLeve;
  let texto=corr(textoBruto||'');
  if(cfg.hifenizacao) texto=hifenizarTexto(texto);

  // Quebrar em blocos
  const blocos=quebrarBlocos(texto,modulo);
  const tipoObra=classificarObra(blocos);

  // Paginar
  let paginas;
  if(modulo==='samurai') paginas=paginarHaicai(blocos,cfg,fmt);
  else if(modulo==='espartano') paginas=paginarEstrofista(blocos,cfg,fmt);
  else{
    paginas=paginar(blocos,cfg,fmt);
    paginas=corrigirViuvasOrfas(paginas,cfg,fmt);
    paginas=_corrigirViuvasOrfasLinhas(paginas,cfg,fmt);
    paginas=corrigirOverflowPaginas(paginas,cfg,fmt);
  }

  // Stats
  const palavras=(texto.match(/\b[\wÀ-ÿ'-]+\b/g)||[]).length;
  const corrigidos=paginas.flatMap(p=>p.blocos).filter(b=>b._corrigido).length;

  return {
    motor:'CeleiroV3',
    modulo, tipoObra, cfg, fmt,
    blocos, paginas,
    stats:{
      palavras,
      paragrafos:blocos.filter(b=>b.tipo==='prosa').length,
      capitulos:blocos.filter(b=>b.tipo==='capitulo').length,
      paginas:paginas.length,
      corrigidos,
      composicoes:blocos.filter(b=>['haicai','estrofe','estrofe_soneto'].includes(b.tipo)).length,
    },
    alertas:gerarAlertas(blocos,paginas,modulo,cfg,fmt),
  };
}

// ═══════════════════════════════════════════════════════════
// 16. EXPORTAÇÃO CSS (para Paged.js)
// ═══════════════════════════════════════════════════════════
function gerarCSSImpressao(cfg, fmt){
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  const fs=cfg.tamanhoFonte||12;
  const lh=cfg.entrelinha||1.52;
  const wCm=fmt.wCm||16;
  const hCm=fmt.hCm||23;
  const mT=(cfg.mT||52)/37.795;
  const mB=(cfg.mB||58)/37.795;
  const mI=(cfg.mI||57)/37.795;
  const mE=(cfg.mE||43)/37.795;
  // Sangria de 3mm — padrão de gráfica pra qualquer elemento que for até a
  // borda da página (a Galeria Gráfica & Editora recomenda isso pra não
  // sobrar borda branca depois do corte). Hoje nenhum diagramador coloca
  // imagem em sangria plena (toda imagem fica dentro da margem, nunca
  // encostando na borda física) — essa declaração é preventiva, pronta
  // pro dia em que isso for suportado. "marks:crop" e "bleed" são CSS de
  // impressão padrão, mas o Chrome/navegadores não garantem desenhar as
  // marcas de corte no "Salvar como PDF" — pra sangria de verdade valendo
  // pra gráfica, o arquivo final ainda precisa passar por revisão manual
  // ou uma ferramenta de PDF dedicada (não é o que este motor promete).
  return `
@page { size:${wCm}cm ${hCm}cm; margin:${mT.toFixed(2)}cm ${mE.toFixed(2)}cm ${mB.toFixed(2)}cm ${mI.toFixed(2)}cm; bleed:3mm; marks:crop; }
@page:left { margin-left:${mE.toFixed(2)}cm; margin-right:${mI.toFixed(2)}cm; }
@page:right { margin-left:${mI.toFixed(2)}cm; margin-right:${mE.toFixed(2)}cm; }
body { font-family:${ff}; font-size:${fs}pt; line-height:${lh}; hyphens:${cfg.hifenizacao?'auto':'manual'}; -webkit-hyphens:${cfg.hifenizacao?'auto':'manual'}; color:#111; background:#fff; }
p { text-align:justify; margin:0 0 ${cfg.paragraphGap||0}em; text-indent:${cfg.recuo||0}em; }
p:first-of-type { text-indent:0; }
h1 { text-align:center; font-size:1.5em; page-break-before:always; margin-bottom:.8em; }
h2 { text-align:center; font-size:1.05em; font-style:italic; font-weight:400; }
.estrofe, .haicai { text-align:center; white-space:pre-line; margin-bottom:${cfg.paragraphGap||1.2}em; }
.capitular { float:left; font-size:3.9em; line-height:.82; margin:.02em .10em 0 0; font-weight:700; }
@media print { .nav-inf, .panel, .btn { display:none!important; } }
`;
}

// ═══════════════════════════════════════════════════════════
// 17. EXPORTAÇÃO PDF REAL (via jsPDF, carregado pela página)
// --------------------------------------------------------------
// Substitui o antigo "exportar HTML e mandar imprimir pelo navegador"
// por um PDF de verdade: texto vetorial real (selecionável/pesquisável,
// não é imagem), numeração de página batendo com o sumário, e um
// outline (bookmarks) com um item por capítulo — a mesma navegação que
// o Explorer/CHM do Windows mostra num painel de índice lateral.
//
// jsPDF só tem 3 famílias de fonte embutidas (Helvetica, Times,
// Courier) — a família configurada em cada diagramador (Georgia, Arial
// etc.) é mapeada pra mais próxima. Isso significa que a métrica exata
// de quebra de linha do PDF pode diferir um pouco da prévia em HTML
// (fontes diferentes quebram texto em pontos ligeiramente diferentes).
// Por isso cada página é medida ANTES de ser desenhada (sem desenhar
// nada, só computando alturas com as APIs reais do jsPDF) e, se não
// coubesse no espaço disponível, a fonte daquela página é encolhida em
// passos pequenos até caber — nunca corta ou perde texto.
// ═══════════════════════════════════════════════════════════
function _fontePDF(cssFonte){
  const alvo=(cssFonte||'').toLowerCase();
  if(/courier|mono/.test(alvo)) return 'courier';
  if(/arial|helvetica|sans/.test(alvo)) return 'helvetica';
  return 'times';
}

// Processa um bloco pro PDF: se desenhar=true, desenha de verdade no
// doc; sempre retorna o novo Y (fim do espaço ocupado pelo bloco) —
// permite uma passada "seca" (só medir) antes da passada real.
function _processarBlocoPDF(doc, bloco, cfg, x, y, larguraUtilMm, fontFamily, escala, desenhar){
  const fs=(cfg.tamanhoFonte||12)*escala;
  const lh=fs*(cfg.entrelinha||1.52)*0.3527; // pt → mm, já com entrelinha
  const centro=x+larguraUtilMm/2;
  // Remove hífens invisíveis de hifenização (­) — servem pro CSS
  // "hyphens:auto" do HTML, mas o jsPDF desenha texto vetorial puro e
  // mostraria cada um como um hífen literal e visível.
  const conteudo=(bloco.conteudo||'').replace(/­/g,'');

  if(bloco.tipo==='imagem'){
    const img=parseImagem(conteudo);
    if(img&&/^data:image\//.test(img.url)){
      const razao=(img.largura&&img.altura)?img.altura/img.largura:0.66;
      const altImgMm=Math.min(larguraUtilMm*razao,120);
      if(desenhar){
        try{ doc.addImage(img.url,x,y,larguraUtilMm,altImgMm); }catch(e){ /* imagem inválida, segue sem ela */ }
      }
      return y+altImgMm+lh*0.5;
    }
    return y;
  }

  if(bloco.tipo==='capitulo'){
    if(desenhar){ doc.setFont(fontFamily,'bold'); doc.setFontSize(fs*1.35); doc.text(conteudo,centro,y+lh,{align:'center'}); }
    return y+lh*2.4;
  }
  if(bloco.tipo==='subtitulo'){
    if(desenhar){ doc.setFont(fontFamily,'italic'); doc.setFontSize(fs*0.95); doc.text(conteudo,centro,y+lh,{align:'center'}); }
    return y+lh*1.8;
  }
  if(bloco.tipo==='poesia'||bloco.tipo==='sextilha'||bloco.tipo==='decima'||bloco.tipo==='dialogo'){
    const alinh=bloco.tipo==='dialogo'?'left':(cfg.alinhPoesia||'center');
    if(desenhar){ doc.setFont(fontFamily,'normal'); doc.setFontSize(fs); }
    let yy=y;
    conteudo.split('\n').forEach(l=>{
      const linha=l.trim();
      if(!linha){ yy+=lh*0.5; return; }
      if(desenhar) doc.text(linha,alinh==='left'?x:centro,yy+lh,{align:alinh==='left'?'left':'center'});
      yy+=lh;
    });
    return yy+lh*0.5;
  }
  if(bloco.tipo==='haicai'||bloco.tipo==='estrofe'||bloco.tipo==='estrofe_soneto'||bloco.tipo==='estrofe_livre'){
    let yy=y;
    if(bloco.titulo){
      if(desenhar){ doc.setFont(fontFamily,'italic'); doc.setFontSize(fs*0.85); doc.text(bloco.titulo,centro,yy+lh,{align:'center'}); }
      yy+=lh*1.4;
    }
    if(desenhar){ doc.setFont(fontFamily,'normal'); doc.setFontSize(fs); }
    (bloco.versos||conteudo.split('\n').filter(Boolean)).forEach(v=>{
      if(desenhar) doc.text(String(v).trim(),centro,yy+lh,{align:'center'});
      yy+=lh*1.25;
    });
    return yy+lh*0.6;
  }

  // prosa (default) — texto corrido, quebra automática, justificado
  if(desenhar) { doc.setFont(fontFamily,'normal'); doc.setFontSize(fs); }
  const linhas=doc.splitTextToSize(conteudo.replace(/\n/g,' ').trim(),larguraUtilMm);
  if(desenhar) doc.text(linhas,x,y+lh,{align:'justify',maxWidth:larguraUtilMm});
  // Bloco de UMA linha da grade (ver seção 8.5 em motor_celeiro_v3.js):
  // o espaço de fim-de-parágrafo só entra depois da ÚLTIMA linha de cada
  // parágrafo — colocar depois de toda linha (como o bloco de parágrafo
  // inteiro fazia) inflava o PDF com um espaço de parágrafo inteiro
  // entre cada linha em vez de entre parágrafos.
  if(bloco._linha) return y+lh*linhas.length+(bloco._ultimaLinha?lh*(cfg.paragraphGap||0):0);
  return y+lh*linhas.length+lh*(cfg.paragraphGap||0.4);
}

function _alturaPaginaPDF(doc, pag, cfg, x, larguraUtilMm, fontFamily, escala){
  let y=0;
  pag.blocos.forEach(b=>{ y=_processarBlocoPDF(doc,b,cfg,x,y,larguraUtilMm,fontFamily,escala,false); });
  return y;
}

function gerarPDFReal(resultado, titulo, autor){
  if(typeof window==='undefined'||!window.jspdf||!window.jspdf.jsPDF){
    throw new Error('jsPDF não carregado — inclua o script jsPDF na página antes de exportar.');
  }
  const { jsPDF }=window.jspdf;
  const cfg=resultado.cfg, fmt=resultado.fmt;
  const wMm=(fmt.wCm||16)*10, hMm=(fmt.hCm||23)*10;
  const doc=new jsPDF({unit:'mm',format:[wMm,hMm],compress:true});
  const fontFamily=_fontePDF(cfg.fonte);
  const mTmm=(cfg.mT||52)/37.795*10;
  const mBmm=(cfg.mB||58)/37.795*10;
  const mImm=(cfg.mI||57)/37.795*10;
  const mEmm=(cfg.mE||43)/37.795*10;
  const alturaUtilMm=hMm-mTmm-mBmm;

  doc.setProperties({
    title:titulo||'Obra sem título',
    author:autor||'',
    creator:'SIGMAL HQ — Dias Gramador ('+(PRESETS[resultado.modulo]?.nome||resultado.modulo)+')',
  });

  const outlineEntries=[];
  resultado.paginas.forEach((pag,idx)=>{
    if(idx>0) doc.addPage([wMm,hMm]);
    const isRecto=pag.lado==='recto';
    const margL=isRecto?mImm:mEmm;
    const margR=isRecto?mEmm:mImm;
    const larguraUtilMm=wMm-margL-margR;

    // Passada seca: mede a altura real com as fontes do jsPDF e, se
    // estourar o espaço disponível, encolhe a fonte em passos pequenos
    // até caber — texto nunca sai da página nem é cortado.
    let escala=1;
    while(escala>0.7 && _alturaPaginaPDF(doc,pag,cfg,margL,larguraUtilMm,fontFamily,escala)>alturaUtilMm){
      escala-=0.05;
    }

    let y=mTmm;
    pag.blocos.forEach(bloco=>{
      if(bloco.tipo==='capitulo') outlineEntries.push({titulo:bloco.conteudo.replace(/­/g,''),pagina:idx+1});
      y=_processarBlocoPDF(doc,bloco,cfg,margL,y,larguraUtilMm,fontFamily,escala,true);
    });

    if(cfg.numeracao&&cfg.numeracao!=='off'){
      doc.setFont(fontFamily,'normal'); doc.setFontSize(9);
      const alinhNum=cfg.numeracao==='dir'?'right':isRecto?'right':'left';
      const xNum=alinhNum==='right'?wMm-margR:margL;
      doc.text(String(pag.numero),xNum,hMm-mBmm/2,{align:alinhNum});
    }
  });

  outlineEntries.forEach(o=>{ doc.outline.add(null,o.titulo,{pageNumber:o.pagina}); });

  return doc.output('blob');
}

// ═══════════════════════════════════════════════════════════
// 18. EXPORT GLOBAL
// ═══════════════════════════════════════════════════════════
global.CeleiroV3={
  FORMATOS, MARGENS, PRESETS,
  preparar,
  quebrarBlocos,
  classificarObra,
  paginar, paginarHaicai, paginarEstrofista,
  corrigirViuvasOrfas,
  corrigirOverflowPaginas,
  _corrigirViuvasOrfasLinhas,
  _prepararBlocosParaGrade,
  _medirAlturaLinha,
  _dividirProsaEmLinhas,
  _identificarBlocosCapitulares,
  renderizarBloco, renderizarPagina,
  gerarPaginaRosto,
  gerarCSSImpressao,
  aplicarCapitular, ESTILOS_CAPITULAR,
  hifenizarTexto, hifenizarPalavra,
  normalizar, escapar,
  correcaoLeve, correcaoMedia,
  gerarAlertas,
  validarCordel,
  quebrarHaicai, quebrarEstrofista, quebrarSoneto,
  LOSANGO,
  detectarOverflowPaginas,
  gerarPDFReal,
  fontePDF:_fontePDF,
  processarBlocoPDF:_processarBlocoPDF,
  alturaPaginaPDF:_alturaPaginaPDF,
};

})(typeof window!=='undefined'?window:global);
