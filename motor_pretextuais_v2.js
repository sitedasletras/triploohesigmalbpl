/**
 * motor_pretextuais_v2.js — Motor de Pré e Pós-textuais
 * Diagramadores (portado do Celeiro Literário)
 *
 * Gera as seções técnicas do livro:
 * PRÉ-TEXTUAIS:
 *   1. Falsa folha de rosto
 *   2. Folha de rosto
 *   3. Ficha catalográfica (ABNT)
 *   4. Dedicatória
 *   5. Epígrafe
 *   6. Prefácio / Apresentação
 *   7. Sumário (gerado dos capítulos do miolo)
 *
 * PÓS-TEXTUAIS:
 *   1. Posfácio
 *   2. Notas
 *   3. Referências bibliográficas
 *   4. Índice remissivo
 *   5. Sobre o autor
 *   6. Colofão
 *
 * Exporta: window.CeleiroPretextuais
 */
(function(global){
'use strict';

// ═══════════════════════════════════════════════════════════
// 1. UTILITÁRIOS
// ═══════════════════════════════════════════════════════════
function esc(s){ return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }
function nl2br(s){ return esc(s).replace(/\n/g,'<br>'); }
function paginaBranca(fmt){
  return `<div class="pg-livro" style="width:${fmt.w}px;height:${fmt.h}px;background:#fff;"></div>`;
}

// ═══════════════════════════════════════════════════════════
// 2. ESTILOS BASE (injetados uma vez)
// ═══════════════════════════════════════════════════════════
function cssBase(cfg, fmt){
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  const fs=cfg.tamanhoFonte||12;
  const lh=cfg.entrelinha||1.52;
  const mT=cfg.mT||52, mB=cfg.mB||58, mI=cfg.mI||57, mE=cfg.mE||43;
  return `
.pg-livro{
  width:${fmt.w}px;height:${fmt.h}px;background:#fff;position:relative;
  box-shadow:0 8px 24px rgba(0,0,0,.10);border-radius:2px;flex-shrink:0;
  overflow:hidden;font-family:${ff};font-size:${fs}pt;line-height:${lh};color:#111;
}
.pg-conteudo{
  position:absolute;
  left:${mI}px;top:${mT}px;right:${mE}px;bottom:${mB}px;
  overflow:hidden;
}
.pg-conteudo.verso{ left:${mE}px;right:${mI}px; }
.pg-num{
  position:absolute;bottom:${Math.round(mB/2)}px;
  font-size:.78em;color:#888;
}
.pg-num.recto{ right:${mE}px;text-align:right; }
.pg-num.verso{ left:${mE}px;text-align:left; }
`;
}

// ═══════════════════════════════════════════════════════════
// 3. PRÉ-TEXTUAIS
// ═══════════════════════════════════════════════════════════

/**
 * 3.1 FALSA FOLHA DE ROSTO
 * Só título e autor, centralizado, sem mais informações.
 */
function gerarFalsaFolhaRosto(dados, fmt, cfg){
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  return `<div class="pg-livro" style="width:${fmt.w}px;height:${fmt.h}px;">
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:${ff};padding:60px 50px;text-align:center;">
    <div style="font-size:1.3em;font-weight:700;line-height:1.2;margin-bottom:.5em;">${esc(dados.titulo||'')}</div>
    ${dados.subtitulo?`<div style="font-size:.9em;font-style:italic;color:#555;margin-bottom:.5em;">${esc(dados.subtitulo)}</div>`:''}
    <div style="font-size:.95em;margin-top:1.5em;color:#333;">${esc(dados.autor||'')}</div>
  </div>
</div>`;
}

/**
 * 3.2 FOLHA DE ROSTO
 * Título, subtítulo, autor, nota de natureza (opcional), editora, local, ano.
 */
function gerarFolhaRosto(dados, fmt, cfg){
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  const nota=dados.notaNatureza
    ?`<div style="font-size:.78em;color:#555;max-width:60%;text-align:left;margin:2em auto;line-height:1.5;">${nl2br(dados.notaNatureza)}</div>`:'';
  return `<div class="pg-livro" style="width:${fmt.w}px;height:${fmt.h}px;">
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:space-between;font-family:${ff};padding:70px 50px 60px;text-align:center;">
    <div>
      <div style="font-size:1.5em;font-weight:700;line-height:1.2;margin-bottom:.4em;">${esc(dados.titulo||'')}</div>
      ${dados.subtitulo?`<div style="font-size:1em;font-style:italic;color:#444;margin-bottom:.3em;">${esc(dados.subtitulo)}</div>`:''}
      <div style="font-size:1em;margin-top:1em;">${esc(dados.autor||'')}</div>
      ${dados.organizador?`<div style="font-size:.8em;color:#555;margin-top:.3em;">(org.)</div>`:''}
      ${nota}
    </div>
    <div style="font-size:.82em;color:#333;">
      ${dados.editora?`<div style="font-weight:700;">${esc(dados.editora)}</div>`:''}
      ${dados.local&&dados.ano?`<div>${esc(dados.local)}, ${esc(dados.ano)}</div>`:''}
    </div>
  </div>
</div>`;
}

/**
 * 3.3 FICHA CATALOGRÁFICA (CIP — ABNT NBR 12899)
 * Fica no verso da folha de rosto (página 4).
 * Gerada automaticamente com os dados fornecidos.
 */
function gerarFichaCatalografica(dados, fmt, cfg){
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  const sobrenome=dados.autor
    ? dados.autor.split(' ').slice(-1)[0].toUpperCase()+', '+dados.autor.split(' ').slice(0,-1).join(' ')
    : '';
  const ano=dados.ano||new Date().getFullYear();
  const edicao=dados.edicao?`${dados.edicao}. ed. `:'';
  const local=dados.local||'[S.l.]';
  const editora=dados.editora||'[s.n.]';
  const isbn=dados.isbn?`\n      ISBN ${dados.isbn}`:'';
  const cdd=dados.cdd||'';
  const assuntos=(dados.assuntos||[]).map((a,i)=>`      ${i+1}. ${esc(a)}`).join('\n');

  return `<div class="pg-livro" style="width:${fmt.w}px;height:${fmt.h}px;">
  <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;font-family:${ff};padding:0 60px 60px;">
    <div style="border:1px solid #333;padding:14px 18px;font-size:.72em;line-height:1.7;max-width:380px;width:100%;text-align:left;">
      <div style="text-align:center;font-weight:700;margin-bottom:8px;">Dados Internacionais de Catalogação na Publicação (CIP)</div>
      <div style="white-space:pre-wrap;font-family:'Courier New',monospace;font-size:.95em;">${esc(sobrenome)}
      ${esc(dados.titulo||'')}${dados.subtitulo?' : '+esc(dados.subtitulo):''} / ${esc(dados.autor||'')}. – ${edicao}${esc(local)} : ${esc(editora)}, ${ano}.${isbn}

${assuntos}
${cdd?`      CDD ${cdd}`:''}</div>
    </div>
    ${dados.bibliotecaria?`<div style="font-size:.65em;color:#555;margin-top:8px;text-align:center;">${esc(dados.bibliotecaria)}</div>`:''}
    ${dados.crb?`<div style="font-size:.65em;color:#555;text-align:center;">CRB ${esc(dados.crb)}</div>`:''}
  </div>
</div>`;
}

/**
 * 3.4 DEDICATÓRIA
 * Texto curto, alinhado à direita, no terço inferior da página.
 */
function gerarDedicatoria(texto, fmt, cfg){
  if(!texto||!texto.trim()) return null;
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  return `<div class="pg-livro" style="width:${fmt.w}px;height:${fmt.h}px;">
  <div style="position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:flex-end;font-family:${ff};padding:60px 70px 120px 60px;">
    <div style="font-size:.9em;font-style:italic;line-height:1.8;text-align:right;max-width:65%;">${nl2br(texto)}</div>
  </div>
</div>`;
}

/**
 * 3.5 EPÍGRAFE
 * Citação + autor da citação, alinhado à direita, no terço inferior.
 */
function gerarEpigrafe(citacao, autorCitacao, fmt, cfg){
  if(!citacao||!citacao.trim()) return null;
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  return `<div class="pg-livro" style="width:${fmt.w}px;height:${fmt.h}px;">
  <div style="position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:flex-end;font-family:${ff};padding:60px 70px 120px 60px;">
    <div style="max-width:65%;text-align:right;">
      <div style="font-size:.88em;font-style:italic;line-height:1.8;">${nl2br(citacao)}</div>
      ${autorCitacao?`<div style="font-size:.75em;margin-top:.8em;color:#444;">— ${esc(autorCitacao)}</div>`:''}
    </div>
  </div>
</div>`;
}

/**
 * ALTURA ESTIMADA DE UM PARÁGRAFO — mesma fórmula do motor do miolo
 * (motor_celeiro_v3.js/estimarAltura), pra manter a paginação consistente
 * entre miolo e pré/pós-textuais.
 */
function estimarAlturaParagrafo(paragrafoTexto, fmt, cfg){
  const mI=cfg.mI||57, mE=cfg.mE||43;
  const largUtil=fmt.w-mI-mE;
  const fs=cfg.tamanhoFonte||12;
  const lh=cfg.entrelinha||1.52;
  const fsPx=fs*1.333;
  const cpl=Math.max(20,Math.floor(largUtil/(fsPx*0.52)));
  const linhas=Math.max(1,Math.ceil(Math.max(1,paragrafoTexto.trim().length)/cpl));
  return Math.ceil(linhas*fsPx*lh+16);
}

/**
 * PAGINA TEXTO CORRIDO COM TÍTULO — usado por prefácio, posfácio, notas,
 * referências e sobre o autor. Quebra em quantas páginas forem necessárias
 * em vez de cortar o texto silenciosamente numa única página fixa.
 * O título (e opts.introHtml, ex.: foto do autor) só aparecem na 1ª página.
 */
function paginarTextoComTitulo(titulo, texto, fmt, cfg, opts){
  opts=opts||{};
  const introHtml=opts.introHtml||'';
  const introAltura=opts.introAltura||0;
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  const fs=cfg.tamanhoFonte||12;
  const lh=cfg.entrelinha||1.52;
  const mT=cfg.mT||52, mB=cfg.mB||58, mI=cfg.mI||57, mE=cfg.mE||43;
  const altUtil=fmt.h-mT-mB;
  const tituloAlt=titulo?Math.ceil(fs*1.333*1.3*2.4):0;

  const paragrafos=texto.split(/\n\s*\n/).filter(Boolean).map(p=>p.trim());
  const paginasParas=[];
  let atual=[], alturaUsada=0;
  paragrafos.forEach(p=>{
    const primeiraPagina=paginasParas.length===0;
    const budget=altUtil-(primeiraPagina?tituloAlt+introAltura:0);
    const alt=estimarAlturaParagrafo(p, fmt, cfg);
    if(atual.length&&alturaUsada+alt>budget){
      paginasParas.push(atual); atual=[]; alturaUsada=0;
    }
    atual.push(p); alturaUsada+=alt;
  });
  if(atual.length) paginasParas.push(atual);
  if(!paginasParas.length) return [];

  return paginasParas.map((paras,pageIdx)=>{
    const paragrafosHtml=paras.map((p,i)=>
      `<p style="margin:0 0 .8em;text-indent:${(pageIdx===0&&i===0)?0:1.2}em;text-align:justify;">${esc(p)}</p>`
    ).join('');
    const tituloHtml=pageIdx===0&&titulo
      ?`<h2 style="text-align:center;font-size:1.3em;margin-bottom:1.4em;font-weight:700;">${esc(titulo)}</h2>`:'';
    const introBloco=pageIdx===0?introHtml:'';
    return `<div class="pg-livro" style="width:${fmt.w}px;height:${fmt.h}px;">
  <div style="position:absolute;left:${mI}px;top:${mT}px;right:${mE}px;bottom:${mB}px;font-family:${ff};font-size:${fs}pt;line-height:${lh};overflow:hidden;">
    ${tituloHtml}
    ${introBloco}
    ${paragrafosHtml}
  </div>
</div>`;
  });
}

/**
 * 3.6 PREFÁCIO / APRESENTAÇÃO
 * Texto corrido, igual ao miolo mas com título de seção. Pagina em quantas
 * páginas forem necessárias — não corta o texto.
 */
function gerarPrefacio(titulo, texto, fmt, cfg){
  if(!texto||!texto.trim()) return [];
  return paginarTextoComTitulo(titulo||'Prefácio', texto, fmt, cfg);
}

/**
 * 3.7 SUMÁRIO
 * Gerado automaticamente dos capítulos detectados no miolo.
 * Recebe array de { titulo, pagina }. Pagina em quantas páginas forem
 * necessárias — obras com muitos capítulos não perdem entradas por baixo
 * da página.
 */
function gerarSumario(entradas, fmt, cfg){
  if(!entradas||!entradas.length) return [];
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  const fs=cfg.tamanhoFonte||12;
  const mT=cfg.mT||52, mB=cfg.mB||58, mI=cfg.mI||57, mE=cfg.mE||43;
  const altUtil=fmt.h-mT-mB;
  const tituloAlt=Math.ceil(fs*1.333*1.3*2.4);

  const paginasEntradas=[];
  let atual=[], alturaUsada=0;
  entradas.forEach(e=>{
    const primeiraPagina=paginasEntradas.length===0;
    const budget=altUtil-(primeiraPagina?tituloAlt:0);
    const alt=estimarAlturaParagrafo(e.titulo||'', fmt, cfg);
    if(atual.length&&alturaUsada+alt>budget){
      paginasEntradas.push(atual); atual=[]; alturaUsada=0;
    }
    atual.push(e); alturaUsada+=alt;
  });
  if(atual.length) paginasEntradas.push(atual);
  if(!paginasEntradas.length) return [];

  return paginasEntradas.map((grupo,pageIdx)=>{
    const itens=grupo.map(e=>`
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:.6em;gap:8px;">
        <span style="flex:1;">${esc(e.titulo)}</span>
        <span style="border-bottom:1px dotted #999;flex:1;margin:0 8px;min-width:20px;"></span>
        <span style="flex-shrink:0;color:#444;">${e.pagina||'—'}</span>
      </div>`).join('');
    const tituloHtml=pageIdx===0
      ?`<h2 style="text-align:center;font-size:1.3em;margin-bottom:1.4em;font-weight:700;">Sumário</h2>`:'';
    return `<div class="pg-livro" style="width:${fmt.w}px;height:${fmt.h}px;">
  <div style="position:absolute;left:${mI}px;top:${mT}px;right:${mE}px;bottom:${mB}px;font-family:${ff};font-size:${fs}pt;line-height:1.6;overflow:hidden;">
    ${tituloHtml}
    ${itens}
  </div>
</div>`;
  });
}

// ═══════════════════════════════════════════════════════════
// 4. PÓS-TEXTUAIS
// ═══════════════════════════════════════════════════════════

/**
 * 4.1 SOBRE O AUTOR — pagina em quantas páginas a biografia precisar;
 * foto e nome aparecem só na 1ª página.
 */
function gerarSobreAutor(nome, biografia, fotoBase64, fmt, cfg){
  if(!biografia||!biografia.trim()) return [];
  const foto=fotoBase64
    ?`<img src="${fotoBase64}" style="width:80px;height:80px;border-radius:50%;object-fit:cover;margin-bottom:12px;display:block;margin-left:auto;margin-right:auto;">`
    :'';
  const nomeHtml=nome?`<div style="text-align:center;font-weight:700;margin-bottom:.8em;">${esc(nome)}</div>`:'';
  const introAltura=(fotoBase64?92:0)+(nome?24:0);
  return paginarTextoComTitulo('Sobre o Autor', biografia, fmt, cfg, {introHtml:foto+nomeHtml, introAltura});
}

/**
 * 4.2 POSFÁCIO / NOTAS / REFERÊNCIAS
 * Texto corrido com título de seção. Pagina em quantas páginas precisar.
 */
function gerarSecaoPostextual(titulo, texto, fmt, cfg){
  if(!texto||!texto.trim()) return [];
  return gerarPrefacio(titulo, texto, fmt, cfg);
}

/**
 * 4.3 COLOFÃO
 * Ficha técnica de impressão — última página.
 */
function gerarColofao(dados, fmt, cfg){
  const ff=cfg.fonte||"Georgia,'Times New Roman',serif";
  const ano=dados.ano||new Date().getFullYear();
  const linhas=[
    dados.titulo&&`<em>${esc(dados.titulo)}</em>`,
    dados.autor&&`Autor: ${esc(dados.autor)}`,
    dados.editora&&`Editora: ${esc(dados.editora)}`,
    dados.edicao&&`${esc(dados.edicao)}ª edição`,
    ano&&`${ano}`,
    dados.isbn&&`ISBN: ${esc(dados.isbn)}`,
    dados.impressao&&`Impressão: ${esc(dados.impressao)}`,
    dados.tiragem&&`Tiragem: ${esc(dados.tiragem)} exemplares`,
    dados.papel&&`Papel: ${esc(dados.papel)}`,
    dados.tipografia&&`Tipografia: ${esc(dados.tipografia)}`,
  ].filter(Boolean);
  return `<div class="pg-livro" style="width:${fmt.w}px;height:${fmt.h}px;">
  <div style="position:absolute;inset:0;display:flex;align-items:flex-end;justify-content:center;font-family:${ff};padding:0 60px 80px;">
    <div style="text-align:center;font-size:.72em;line-height:2;color:#555;">
      ${linhas.join('<br>')}
    </div>
  </div>
</div>`;
}

// ═══════════════════════════════════════════════════════════
// 5. GERADOR COMPLETO DE PRÉ-TEXTUAIS
// ═══════════════════════════════════════════════════════════
/**
 * gerarPreTextuais(dados, fmt, cfg)
 * Retorna array de páginas HTML na ordem correta.
 * Cada item: { tipo, html, numero_logico }
 * Páginas ímpares = recto (direita), pares = verso (esquerda).
 * Pré-textuais são numeradas em romano (i, ii, iii...) mas
 * a contagem real começa na falsa folha de rosto.
 */
function gerarPreTextuais(dados, fmt, cfg){
  const paginas=[];

  function add(tipo, html){
    if(html) paginas.push({tipo, html, indice:paginas.length});
  }
  function addBranca(motivo){
    paginas.push({tipo:'branca_'+motivo, html:paginaBranca(fmt), indice:paginas.length});
  }
  function garantirRecto(){
    // Garante que próxima página começa em recto (ímpar)
    if(paginas.length%2===1) addBranca('verso_para_recto');
  }

  // Pág 1 (recto) — Falsa folha de rosto
  add('falsa_folha_rosto', gerarFalsaFolhaRosto(dados, fmt, cfg));
  // Pág 2 (verso) — branca
  addBranca('verso_falsa_rosto');
  // Pág 3 (recto) — Folha de rosto
  add('folha_rosto', gerarFolhaRosto(dados, fmt, cfg));
  // Pág 4 (verso) — Ficha catalográfica
  add('ficha_catalografica', gerarFichaCatalografica(dados, fmt, cfg));
  // Pág 5+ (recto) — Dedicatória (se houver)
  if(dados.dedicatoria&&dados.dedicatoria.trim()){
    garantirRecto();
    add('dedicatoria', gerarDedicatoria(dados.dedicatoria, fmt, cfg));
    addBranca('verso_dedicatoria');
  }
  // Epígrafe (se houver)
  if(dados.epigrafe&&dados.epigrafe.trim()){
    garantirRecto();
    add('epigrafe', gerarEpigrafe(dados.epigrafe, dados.autorEpigrafe, fmt, cfg));
    addBranca('verso_epigrafe');
  }
  // Prefácio (se houver) — pode ocupar mais de uma página
  if(dados.prefacio&&dados.prefacio.trim()){
    garantirRecto();
    gerarPrefacio(dados.tituloPrefacio||'Prefácio', dados.prefacio, fmt, cfg)
      .forEach(html=>add('prefacio', html));
    if(paginas.length%2===1) addBranca('verso_prefacio');
  }
  // Sumário — sempre em recto
  // (será atualizado depois da junção com os números reais)
  garantirRecto();
  gerarSumario(dados.entradasSumario||[], fmt, cfg)
    .forEach(html=>add('sumario_placeholder', html));
  if(paginas.length%2===1) addBranca('verso_sumario');

  return paginas;
}

// ═══════════════════════════════════════════════════════════
// 6. GERADOR COMPLETO DE PÓS-TEXTUAIS
// ═══════════════════════════════════════════════════════════
function gerarPosTextuais(dados, fmt, cfg){
  const paginas=[];
  function add(tipo, html){ if(html) paginas.push({tipo, html, indice:paginas.length}); }
  function addBranca(m){ paginas.push({tipo:'branca_'+m, html:paginaBranca(fmt), indice:paginas.length}); }
  function garantirRecto(){ if(paginas.length%2===1) addBranca('verso_para_recto'); }

  if(dados.posfacio&&dados.posfacio.trim()){
    garantirRecto();
    gerarSecaoPostextual(dados.tituloPosfacio||'Posfácio', dados.posfacio, fmt, cfg)
      .forEach(html=>add('posfacio', html));
    if(paginas.length%2===1) addBranca('verso_posfacio');
  }
  if(dados.notas&&dados.notas.trim()){
    garantirRecto();
    gerarSecaoPostextual('Notas', dados.notas, fmt, cfg)
      .forEach(html=>add('notas', html));
    if(paginas.length%2===1) addBranca('verso_notas');
  }
  if(dados.referencias&&dados.referencias.trim()){
    garantirRecto();
    gerarSecaoPostextual('Referências', dados.referencias, fmt, cfg)
      .forEach(html=>add('referencias', html));
    if(paginas.length%2===1) addBranca('verso_referencias');
  }
  if(dados.sobreAutor&&dados.sobreAutor.trim()){
    garantirRecto();
    gerarSobreAutor(dados.autor, dados.sobreAutor, dados.fotoAutor, fmt, cfg)
      .forEach(html=>add('sobre_autor', html));
    if(paginas.length%2===1) addBranca('verso_sobre_autor');
  }
  // Colofão — sempre última página (verso)
  if(dados.colofao!==false){
    if(paginas.length%2===0) addBranca('recto_para_colofao'); // colofão em verso
    add('colofao', gerarColofao(dados, fmt, cfg));
  }

  return paginas;
}

// ═══════════════════════════════════════════════════════════
// 7. SALVAR / CARREGAR DO LOCALSTORAGE
// ═══════════════════════════════════════════════════════════
const LS_KEY='celeiro_dados_livro';

function salvarDados(dados){
  try{ localStorage.setItem(LS_KEY, JSON.stringify(dados)); return true; }
  catch(e){ console.error('Erro ao salvar dados do livro:', e); return false; }
}

function carregarDados(){
  try{
    const s=localStorage.getItem(LS_KEY);
    return s?JSON.parse(s):null;
  }catch(e){ return null; }
}

function dadosPadrao(){
  return {
    titulo:'', subtitulo:'', autor:'', organizador:false,
    editora:'', local:'Brasil',
    ano:String(new Date().getFullYear()), edicao:'1',
    isbn:'', cdd:'', assuntos:[], bibliotecaria:'', crb:'',
    notaNatureza:'', dedicatoria:'', epigrafe:'', autorEpigrafe:'',
    prefacio:'', tituloPrefacio:'Prefácio',
    posfacio:'', tituloPosfacio:'Posfácio',
    notas:'', referencias:'', sobreAutor:'', fotoAutor:'',
    impressao:'', tiragem:'', papel:'', tipografia:'',
    entradasSumario:[], colofao:true,
  };
}

// ═══════════════════════════════════════════════════════════
// 8. EXPORT
// ═══════════════════════════════════════════════════════════
global.CeleiroPretextuais={
  gerarPreTextuais,
  gerarPosTextuais,
  gerarFalsaFolhaRosto,
  gerarFolhaRosto,
  gerarFichaCatalografica,
  gerarDedicatoria,
  gerarEpigrafe,
  gerarPrefacio,
  gerarSumario,
  gerarSobreAutor,
  gerarSecaoPostextual,
  gerarColofao,
  cssBase,
  paginaBranca,
  salvarDados,
  carregarDados,
  dadosPadrao,
};

})(typeof window!=='undefined'?window:global);
