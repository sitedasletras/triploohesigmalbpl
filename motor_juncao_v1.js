/**
 * motor_juncao_v1.js — Motor de Junção Editorial
 * Diagramadores (portado do Celeiro Literário)
 *
 * Une pré-textuais + miolo + pós-textuais numa sequência única,
 * aplica numeração de páginas correta e atualiza o sumário
 * com os números reais das páginas dos capítulos.
 *
 * Fluxo:
 *   1. Recebe páginas de CeleiroPretextuais.gerarPreTextuais()
 *   2. Recebe páginas do miolo de CeleiroV3.preparar()
 *   3. Recebe páginas de CeleiroPretextuais.gerarPosTextuais()
 *   4. Junta tudo na ordem correta
 *   5. Aplica numeração: pré = romano (não exibido), miolo = arábico
 *   6. Atualiza sumário com páginas reais
 *   7. Retorna livro completo pronto para renderizar ou exportar
 *
 * Exporta: window.CeleiroJuncao
 */
(function(global){
'use strict';

// ═══════════════════════════════════════════════════════════
// 1. NUMERAÇÃO ROMANA
// ═══════════════════════════════════════════════════════════
function toRomano(n){
  if(n<=0) return '';
  const vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms=['m','cm','d','cd','c','xc','l','xl','x','ix','v','iv','i'];
  let r='';
  for(let i=0;i<vals.length;i++){
    while(n>=vals[i]){r+=syms[i];n-=vals[i];}
  }
  return r;
}

// ═══════════════════════════════════════════════════════════
// 2. INJETAR NÚMERO NA PÁGINA HTML
// ═══════════════════════════════════════════════════════════
function injetarNumero(html, numero, lado, cfg, fmt){
  if(!numero) return html;
  const mB=cfg.mB||58;
  const mI=cfg.mI||57;
  const mE=cfg.mE||43;
  const posLeft=lado==='verso'?mE:mI;
  const posRight=lado==='verso'?mI:mE;
  const align=lado==='verso'?'left':'right';
  const numHtml=`<div style="position:absolute;bottom:${Math.round(mB/2)}px;left:${posLeft}px;right:${posRight}px;text-align:${align};font-size:.78em;color:#888;font-family:Georgia,serif;">${numero}</div>`;
  // Injeta antes do </div> final da página
  return html.replace(/<\/div>\s*$/, numHtml+'</div>');
}

// ═══════════════════════════════════════════════════════════
// 3. EXTRAIR CAPÍTULOS DO MIOLO
// ═══════════════════════════════════════════════════════════
/**
 * Extrai títulos dos capítulos com seu número de página arábico real.
 * Percorre as páginas do miolo e detecta blocos tipo 'capitulo'.
 */
function extrairCapitulosDoMiolo(paginasMiolo, offsetPagina){
  const capitulos=[];
  paginasMiolo.forEach((pag,i)=>{
    const pagNum=offsetPagina+i;
    (pag.blocos||[]).forEach(b=>{
      if(b.tipo==='capitulo'){
        // Extrair texto limpo do conteúdo
        const titulo=b.conteudo.replace(/<[^>]+>/g,'').trim();
        capitulos.push({titulo, pagina:pagNum});
      }
    });
  });
  return capitulos;
}

// ═══════════════════════════════════════════════════════════
// 4. ATUALIZAR SUMÁRIO COM PÁGINAS REAIS
// ═══════════════════════════════════════════════════════════
function atualizarSumario(paginasPreTextuais, capitulos, fmt, cfg){
  const indices=paginasPreTextuais
    .map((p,i)=>p.tipo==='sumario_placeholder'?i:-1)
    .filter(i=>i>=0);
  if(!indices.length) return paginasPreTextuais;

  // Regenerar o sumário com os dados reais — pode render em mais ou menos
  // páginas do que o placeholder (números reais têm largura diferente),
  // então substitui a faixa inteira de placeholders, não só um índice.
  const novasPaginas=CeleiroPretextuais.gerarSumario(capitulos, fmt, cfg);
  if(!novasPaginas.length) return paginasPreTextuais;

  const primeiro=indices[0], ultimo=indices[indices.length-1];
  const novas=[...paginasPreTextuais];
  novas.splice(primeiro, ultimo-primeiro+1, ...novasPaginas.map(html=>({tipo:'sumario', html})));
  return novas;
}

// ═══════════════════════════════════════════════════════════
// 5. FUNÇÃO PRINCIPAL — juntar()
// ═══════════════════════════════════════════════════════════
/**
 * juntar(resultadoPreTextuais, resultadoMiolo, resultadoPosTextuais, cfg, fmt)
 *
 * resultadoPreTextuais: array de { tipo, html } de CeleiroPretextuais.gerarPreTextuais()
 * resultadoMiolo: objeto de CeleiroV3.preparar() com .paginas[]
 * resultadoPosTextuais: array de { tipo, html } de CeleiroPretextuais.gerarPosTextuais()
 * cfg: configuração do diagramador (fonte, margens, etc.)
 * fmt: formato da página (w, h, etc.)
 *
 * Retorna: {
 *   paginas: array de { tipo, html, numeroPag, lado, numDisplay }
 *   stats: { totalPaginas, paginasMiolo, paginasPreTextuais, paginasPosTextuais }
 *   capitulos: array de { titulo, pagina }
 * }
 */
function juntar(paginasPre, resultadoMiolo, paginasPos, cfg, fmt){
  // ─── OFFSET DO MIOLO ────────────────────────────────────
  // Miolo começa após pré-textuais
  // Pré-textuais são numeradas em romano (mas não exibidas na maioria das páginas)
  const nPre=paginasPre.length;
  // Miolo começa em página arábica 1
  // (por convenção editorial, a contagem arábica começa no miolo)
  const offsetMiolo=nPre; // posição absoluta no livro

  // ─── CAPÍTULOS COM PÁGINAS REAIS ────────────────────────
  const paginasMiolo=resultadoMiolo?.paginas||[];
  const capitulos=extrairCapitulosDoMiolo(paginasMiolo, 1); // arábico começa em 1

  // ─── ATUALIZAR SUMÁRIO ───────────────────────────────────
  const preAtualizados=atualizarSumario(paginasPre, capitulos, fmt, cfg);

  // ─── MONTAR SEQUÊNCIA COMPLETA ───────────────────────────
  const todas=[];

  // 1. Pré-textuais (numeração romana — falsa folha de rosto, folha de
  // rosto, ficha catalográfica, dedicatória, epígrafe, colofão e páginas
  // brancas contam mas não exibem número; prefácio e sumário exibem)
  preAtualizados.forEach((p,i)=>{
    const numAbsoluto=i+1;
    const lado=numAbsoluto%2===0?'verso':'recto';
    todas.push({
      tipo:p.tipo,
      html:p.html,
      numAbsoluto,
      numDisplay:toRomano(numAbsoluto),
      lado,
      secao:'pre',
    });
  });

  // 2. Miolo (numeração arábica a partir de 1)
  paginasMiolo.forEach((pag,i)=>{
    const numAbsoluto=offsetMiolo+i+1;
    const numArabico=i+1;
    const lado=numAbsoluto%2===0?'verso':'recto';
    // Renderizar HTML da página do miolo
    let html='';
    if(window.CeleiroV3){
      html=CeleiroV3.renderizarPagina(pag, cfg, fmt, cfg.numeracao||'espelho');
    }
    todas.push({
      tipo:'miolo_p'+numArabico,
      html,
      numAbsoluto,
      numDisplay:String(numArabico),
      lado,
      secao:'miolo',
      blocos:pag.blocos,
    });
  });

  // 3. Pós-textuais (continuação da numeração arábica)
  const offsetPos=offsetMiolo+paginasMiolo.length;
  paginasPos.forEach((p,i)=>{
    const numAbsoluto=offsetPos+i+1;
    const numArabico=paginasMiolo.length+i+1;
    const lado=numAbsoluto%2===0?'verso':'recto';
    todas.push({
      tipo:p.tipo,
      html:p.html,
      numAbsoluto,
      numDisplay:String(numArabico),
      lado,
      secao:'pos',
    });
  });

  // ─── INJETAR NUMERAÇÃO FINAL ─────────────────────────────
  const numeracao=cfg.numeracao||'espelho';
  const paginasFinais=todas.map(p=>{
    if(!p.numDisplay||numeracao==='off') return p;
    // Não numerar: páginas brancas, ficha catalográfica, dedicatória, epígrafe
    const naoNumerar=['branca','ficha_catalografica','dedicatoria','epigrafe','colofao','falsa_folha_rosto','folha_rosto'];
    if(naoNumerar.some(t=>p.tipo.startsWith(t))) return p;
    return {...p, html:injetarNumero(p.html, p.numDisplay, p.lado, cfg, fmt)};
  });

  return {
    paginas:paginasFinais,
    stats:{
      totalPaginas:paginasFinais.length,
      paginasPreTextuais:nPre,
      paginasMiolo:paginasMiolo.length,
      paginasPosTextuais:paginasPos.length,
    },
    capitulos,
  };
}

// ═══════════════════════════════════════════════════════════
// 6. RENDERIZAR LIVRO COMPLETO (HTML para exportação)
// ═══════════════════════════════════════════════════════════
/**
 * Gera HTML completo do livro para exportação/impressão.
 * Usa @page CSS para tamanho correto de página.
 */
function renderizarLivroCompleto(livro, cfg, fmt){
  const css=window.CeleiroV3
    ? CeleiroV3.gerarCSSImpressao(cfg, fmt)
    : '';

  const corpo=livro.paginas.map((p,i)=>{
    const quebra=i<livro.paginas.length-1?'page-break-after:always;':'';
    return `<div style="${quebra}">${p.html}</div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Livro Completo</title>
<style>
${css}
body{margin:0;padding:0;}
div{overflow:visible;}
@media screen{
  body{background:#888;padding:20px;}
  .pg-livro{margin:0 auto 20px;display:block;}
}
</style>
</head>
<body>
${corpo}
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════
// 7. PRÉVIA RÁPIDA (para visualização no browser)
// ═══════════════════════════════════════════════════════════
/**
 * Retorna HTML de uma página específica do livro completo.
 */
function renderizarPaginaLivro(livro, indicePagina){
  const p=livro.paginas[indicePagina];
  if(!p) return '';
  return p.html;
}

// ═══════════════════════════════════════════════════════════
// 8. SALVAR LIVRO NO LOCALSTORAGE
// ═══════════════════════════════════════════════════════════
function salvarLivroCompleto(livro){
  try{
    // Salva apenas stats e capítulos (HTML é muito grande)
    localStorage.setItem('celeiro_livro_stats', JSON.stringify(livro.stats));
    localStorage.setItem('celeiro_livro_capitulos', JSON.stringify(livro.capitulos));
    localStorage.setItem('celeiro_livro_concluido','true');
    return true;
  }catch(e){ console.error('Erro ao salvar livro:', e); return false; }
}

// ═══════════════════════════════════════════════════════════
// 9. EXPORTAÇÃO PDF REAL DO LIVRO COMPLETO
// ═══════════════════════════════════════════════════════════
// Mesma ideia de CeleiroV3.gerarPDFReal (texto vetorial real, numeração,
// outline/bookmarks estilo índice do Windows) mas cobrindo o livro
// inteiro — pré-textuais + miolo + pós-textuais — não só o miolo.
// Reaproveita os desenhadores de bloco do miolo (CeleiroV3.processarBlocoPDF)
// e a mesma lógica de agrupamento em páginas do motor de pré-textuais
// (CeleiroPretextuais.agruparParagrafos/agruparEntradasSumario), pra que a
// paginação do PDF bata com a da prévia HTML.
// ═══════════════════════════════════════════════════════════
function _mm(px){ return px/37.795*10; }

function _tituloSecaoPDF(doc, texto, fontFamily, x, y, larguraUtilMm, fs){
  doc.setFont(fontFamily,'bold'); doc.setFontSize(fs*1.3);
  doc.text(texto, x+larguraUtilMm/2, y, {align:'center'});
}

// Texto corrido com título opcional na 1ª página (prefácio, posfácio,
// notas, referências, sobre o autor) — mesmo padrão de "passada seca +
// desenho" do miolo, pra encolher a fonte se a métrica do jsPDF render
// mais larga que a estimativa e o texto não couber.
function _desenharTextoComTitulo(doc, ctx, x, y, larguraUtilMm, fontFamily, cfg, escala, desenhar){
  const fs=(cfg.tamanhoFonte||12)*escala;
  const lh=fs*(cfg.entrelinha||1.52)*0.3527;
  let yy=y;
  if(ctx.titulo){
    if(desenhar) _tituloSecaoPDF(doc, ctx.titulo, fontFamily, x, yy+lh, larguraUtilMm, fs);
    yy+=lh*2.4;
  }
  if(ctx.introLinhas){
    ctx.introLinhas.forEach(il=>{
      if(desenhar){
        doc.setFont(fontFamily, il.estilo||'normal');
        doc.setFontSize((il.tamanho||fs)*escala);
        doc.text(il.texto, x+larguraUtilMm/2, yy+lh, {align:'center'});
      }
      yy+=lh*(il.gapDepois||1.4);
    });
  }
  ctx.paragrafos.forEach((p,i)=>{
    if(desenhar){ doc.setFont(fontFamily,'normal'); doc.setFontSize(fs); }
    const linhas=doc.splitTextToSize(p.replace(/\n/g,' ').trim(), larguraUtilMm);
    if(desenhar) doc.text(linhas, x, yy+lh, {align:'justify', maxWidth:larguraUtilMm});
    yy+=lh*linhas.length+lh*0.4;
  });
  return yy;
}

// Sumário com líder pontilhado (título ......... nº) — mesma convenção
// visual de um índice de livro impresso; o outline do PDF (ver mais
// abaixo) já cobre a navegação clicável estilo Windows/CHM.
function _desenharSumarioPDF(doc, ctx, x, y, larguraUtilMm, fontFamily, cfg, escala, desenhar){
  const fs=(cfg.tamanhoFonte||12)*escala;
  const lh=fs*1.6*0.3527;
  let yy=y;
  if(ctx.primeiraPagina){
    if(desenhar) _tituloSecaoPDF(doc, 'Sumário', fontFamily, x, yy+lh, larguraUtilMm, fs);
    yy+=lh*2.4;
  }
  ctx.entradas.forEach(e=>{
    if(desenhar){
      doc.setFont(fontFamily,'normal'); doc.setFontSize(fs);
      const paginaStr=String(e.pagina||'—');
      const tituloLimpo=(e.titulo||'').replace(/­/g,'');
      const tituloLinhas=doc.splitTextToSize(tituloLimpo, larguraUtilMm*0.72);
      doc.text(tituloLinhas[0], x, yy+lh);
      doc.text(paginaStr, x+larguraUtilMm, yy+lh, {align:'right'});
      const larguraTitulo=doc.getTextWidth(tituloLinhas[0]);
      const larguraPagina=doc.getTextWidth(paginaStr);
      const xIni=x+larguraTitulo+3, xFim=x+larguraUtilMm-larguraPagina-3;
      if(xFim>xIni){
        doc.setLineDashPattern([0.6,0.6],0);
        doc.setDrawColor(153);
        doc.line(xIni, yy+lh-0.8, xFim, yy+lh-0.8);
        doc.setLineDashPattern([],0);
        doc.setDrawColor(0);
      }
    }
    yy+=lh;
  });
  return yy;
}

function _desenharFalsaFolhaRostoPDF(doc, dados, wMm, hMm, fontFamily){
  const cx=wMm/2, largMax=Math.max(wMm*0.7,wMm-40);
  doc.setFont(fontFamily,'bold'); doc.setFontSize(20);
  const linhasTitulo=doc.splitTextToSize(dados.titulo||'', largMax);
  const lhTit=8.4;
  let alturaBloco=linhasTitulo.length*lhTit+6;
  if(dados.subtitulo) alturaBloco+=9;
  alturaBloco+=10;
  let y=hMm/2-alturaBloco/2;
  doc.text(linhasTitulo, cx, y, {align:'center'});
  y+=linhasTitulo.length*lhTit+6;
  if(dados.subtitulo){
    doc.setFont(fontFamily,'italic'); doc.setFontSize(13);
    doc.text(doc.splitTextToSize(dados.subtitulo, largMax), cx, y, {align:'center'});
    y+=9;
  }
  doc.setFont(fontFamily,'normal'); doc.setFontSize(13);
  doc.text(dados.autor||'', cx, y+8, {align:'center'});
}

function _desenharFolhaRostoPDF(doc, dados, wMm, hMm, fontFamily){
  const cx=wMm/2, largMax=Math.max(wMm*0.7,wMm-40);
  let y=hMm*0.3;
  doc.setFont(fontFamily,'bold'); doc.setFontSize(17);
  const linhasTitulo=doc.splitTextToSize(dados.titulo||'', largMax);
  doc.text(linhasTitulo, cx, y, {align:'center'});
  y+=linhasTitulo.length*7.5+5;
  if(dados.subtitulo){
    doc.setFont(fontFamily,'italic'); doc.setFontSize(12);
    doc.text(doc.splitTextToSize(dados.subtitulo, largMax), cx, y, {align:'center'});
    y+=9;
  }
  doc.setFont(fontFamily,'normal'); doc.setFontSize(12);
  doc.text(dados.autor||'', cx, y+7, {align:'center'});
  y+=14;
  if(dados.organizador){ doc.setFontSize(9); doc.text('(org.)', cx, y, {align:'center'}); }
  let yb=hMm-42;
  if(dados.editora){ doc.setFont(fontFamily,'bold'); doc.setFontSize(10); doc.text(dados.editora, cx, yb, {align:'center'}); yb+=6; }
  if(dados.local&&dados.ano){ doc.setFont(fontFamily,'normal'); doc.setFontSize(9.5); doc.text(`${dados.local}, ${dados.ano}`, cx, yb, {align:'center'}); }
}

function _desenharFichaCatalograficaPDF(doc, dados, wMm, hMm, fontFamily){
  const sobrenome=dados.autor
    ? dados.autor.trim().split(/\s+/).slice(-1)[0].toUpperCase()+', '+dados.autor.trim().split(/\s+/).slice(0,-1).join(' ')
    : '';
  const ano=dados.ano||new Date().getFullYear();
  const edicao=dados.edicao?`${dados.edicao}. ed. `:'';
  const local=dados.local||'[S.l.]';
  const editora=dados.editora||'[s.n.]';
  const linhaObra=`${dados.titulo||''}`+(dados.subtitulo?` : ${dados.subtitulo}`:'')+` / ${dados.autor||''}. – ${edicao}${local} : ${editora}, ${ano}.`+(dados.isbn?` ISBN ${dados.isbn}.`:'');
  const linhasCorpo=[sobrenome, linhaObra, '', ...(dados.assuntos||[]).map((a,i)=>`${i+1}. ${a}`)];
  if(dados.cdd) linhasCorpo.push(`CDD ${dados.cdd}`);

  const boxW=Math.max(Math.min(wMm-30,105),wMm*0.65);
  const boxX=(wMm-boxW)/2;
  doc.setFont('courier','normal'); doc.setFontSize(7.5);
  const wrapped=[];
  linhasCorpo.forEach(l=>{
    if(!l){ wrapped.push(''); return; }
    doc.splitTextToSize(l, boxW-10).forEach(w=>wrapped.push(w));
  });
  const lh=3.8, tituloAlt=10;
  const boxH=tituloAlt+wrapped.length*lh+10;
  const boxY=hMm-40-boxH;
  doc.setDrawColor(60);
  doc.rect(boxX, boxY, boxW, boxH);
  doc.setDrawColor(0);
  doc.setFont(fontFamily,'bold'); doc.setFontSize(7.5);
  doc.text(doc.splitTextToSize('Dados Internacionais de Catalogação na Publicação (CIP)', boxW-10), boxX+boxW/2, boxY+7, {align:'center'});
  let y=boxY+tituloAlt+6;
  doc.setFont('courier','normal'); doc.setFontSize(7.5);
  wrapped.forEach(l=>{ doc.text(l, boxX+5, y); y+=lh; });
  let yFora=boxY+boxH+6;
  if(dados.bibliotecaria){ doc.setFont(fontFamily,'normal'); doc.setFontSize(6.5); doc.text(dados.bibliotecaria, wMm/2, yFora, {align:'center'}); yFora+=4; }
  if(dados.crb){ doc.setFontSize(6.5); doc.text('CRB '+dados.crb, wMm/2, yFora, {align:'center'}); }
}

function _desenharBlocoCantoPDF(doc, wMm, hMm, fontFamily, linhas){
  const xDir=wMm-45, maxW=wMm*0.5;
  let y=hMm-95;
  linhas.forEach(l=>{
    doc.setFont(fontFamily, l.estilo||'normal');
    doc.setFontSize(l.tamanho||10);
    const wrapped=doc.splitTextToSize(l.texto, maxW);
    doc.text(wrapped, xDir, y, {align:'right'});
    y+=wrapped.length*((l.tamanho||10)*0.44)+(l.gapDepois||5);
  });
}

function _desenharColofaoPDF(doc, dados, wMm, hMm, fontFamily){
  const ano=dados.ano||new Date().getFullYear();
  const linhas=[
    dados.titulo, dados.autor&&`Autor: ${dados.autor}`,
    dados.editora&&`Editora: ${dados.editora}`,
    dados.edicao&&`${dados.edicao}ª edição`, String(ano),
    dados.isbn&&`ISBN: ${dados.isbn}`,
    dados.impressao&&`Impressão: ${dados.impressao}`,
    dados.tiragem&&`Tiragem: ${dados.tiragem} exemplares`,
    dados.papel&&`Papel: ${dados.papel}`,
    dados.tipografia&&`Tipografia: ${dados.tipografia}`,
  ].filter(Boolean);
  doc.setFont(fontFamily,'normal'); doc.setFontSize(8);
  let y=hMm-70;
  linhas.forEach(l=>{ doc.text(String(l), wMm/2, y, {align:'center'}); y+=5.5; });
}

/**
 * MONTA A SEQUÊNCIA DE PÁGINAS TÉCNICAS (pré/pós-textuais) em
 * descritores prontos pra desenhar em PDF — espelha exatamente o mesmo
 * fluxo condicional de CeleiroPretextuais.gerarPreTextuais/gerarPosTextuais
 * (mesmas condições de presença e de "garantir recto"), só que produzindo
 * instruções de desenho vetorial em vez de HTML.
 */
function _montarSequenciaTecnica(dados, fmt, cfg, secao){
  const seq=[];
  function add(tipo, item){ seq.push(Object.assign({tipo,secao}, item)); }
  function addBranca(motivo){ seq.push({tipo:'branca_'+motivo, secao}); }
  function garantirRecto(){ if(seq.length%2===1) addBranca('verso_para_recto'); }

  if(secao==='pre'){
    add('falsa_folha_rosto', {desenharPagina:(doc,wMm,hMm,ff)=>_desenharFalsaFolhaRostoPDF(doc,dados,wMm,hMm,ff)});
    addBranca('verso_falsa_rosto');
    add('folha_rosto', {desenharPagina:(doc,wMm,hMm,ff)=>_desenharFolhaRostoPDF(doc,dados,wMm,hMm,ff)});
    add('ficha_catalografica', {desenharPagina:(doc,wMm,hMm,ff)=>_desenharFichaCatalograficaPDF(doc,dados,wMm,hMm,ff)});
    if(dados.dedicatoria&&dados.dedicatoria.trim()){
      garantirRecto();
      add('dedicatoria', {desenharPagina:(doc,wMm,hMm,ff)=>_desenharBlocoCantoPDF(doc,wMm,hMm,ff,[{texto:dados.dedicatoria,tamanho:10.5,estilo:'italic'}])});
      addBranca('verso_dedicatoria');
    }
    if(dados.epigrafe&&dados.epigrafe.trim()){
      garantirRecto();
      const linhas=[{texto:dados.epigrafe,tamanho:10.5,estilo:'italic',gapDepois:6}];
      if(dados.autorEpigrafe) linhas.push({texto:'— '+dados.autorEpigrafe,tamanho:8.5,estilo:'normal'});
      add('epigrafe', {desenharPagina:(doc,wMm,hMm,ff)=>_desenharBlocoCantoPDF(doc,wMm,hMm,ff,linhas)});
      addBranca('verso_epigrafe');
    }
    if(dados.prefacio&&dados.prefacio.trim()){
      garantirRecto();
      const paragrafos=dados.prefacio.split(/\n\s*\n/).filter(Boolean).map(p=>p.trim());
      const tituloAlt=window.CeleiroPretextuais.alturaTituloSecao(cfg);
      const grupos=window.CeleiroPretextuais.agruparParagrafos(paragrafos, fmt, cfg, tituloAlt);
      grupos.forEach((grupo,i)=>add('prefacio', {paginado:true, drawCtx:{titulo:i===0?(dados.tituloPrefacio||'Prefácio'):null, paragrafos:grupo}}));
      if(seq.length%2===1) addBranca('verso_prefacio');
    }
    garantirRecto();
    if(dados.entradasSumario&&dados.entradasSumario.length){
      const grupos=window.CeleiroPretextuais.agruparEntradasSumario(dados.entradasSumario, fmt, cfg);
      grupos.forEach((grupo,i)=>add('sumario', {paginado:true, sumario:true, drawCtx:{primeiraPagina:i===0, entradas:grupo}}));
      if(seq.length%2===1) addBranca('verso_sumario');
    }
  }else{
    if(dados.posfacio&&dados.posfacio.trim()){
      garantirRecto();
      const paragrafos=dados.posfacio.split(/\n\s*\n/).filter(Boolean).map(p=>p.trim());
      const tituloAlt=window.CeleiroPretextuais.alturaTituloSecao(cfg);
      const grupos=window.CeleiroPretextuais.agruparParagrafos(paragrafos, fmt, cfg, tituloAlt);
      grupos.forEach((grupo,i)=>add('posfacio', {paginado:true, drawCtx:{titulo:i===0?(dados.tituloPosfacio||'Posfácio'):null, paragrafos:grupo}}));
      if(seq.length%2===1) addBranca('verso_posfacio');
    }
    if(dados.notas&&dados.notas.trim()){
      garantirRecto();
      const paragrafos=dados.notas.split(/\n\s*\n/).filter(Boolean).map(p=>p.trim());
      const tituloAlt=window.CeleiroPretextuais.alturaTituloSecao(cfg);
      const grupos=window.CeleiroPretextuais.agruparParagrafos(paragrafos, fmt, cfg, tituloAlt);
      grupos.forEach((grupo,i)=>add('notas', {paginado:true, drawCtx:{titulo:i===0?'Notas':null, paragrafos:grupo}}));
      if(seq.length%2===1) addBranca('verso_notas');
    }
    if(dados.referencias&&dados.referencias.trim()){
      garantirRecto();
      const paragrafos=dados.referencias.split(/\n\s*\n/).filter(Boolean).map(p=>p.trim());
      const tituloAlt=window.CeleiroPretextuais.alturaTituloSecao(cfg);
      const grupos=window.CeleiroPretextuais.agruparParagrafos(paragrafos, fmt, cfg, tituloAlt);
      grupos.forEach((grupo,i)=>add('referencias', {paginado:true, drawCtx:{titulo:i===0?'Referências':null, paragrafos:grupo}}));
      if(seq.length%2===1) addBranca('verso_referencias');
    }
    if(dados.sobreAutor&&dados.sobreAutor.trim()){
      garantirRecto();
      const paragrafos=dados.sobreAutor.split(/\n\s*\n/).filter(Boolean).map(p=>p.trim());
      const tituloAlt=window.CeleiroPretextuais.alturaTituloSecao(cfg);
      const introLinhas=dados.autor?[{texto:dados.autor,tamanho:(cfg.tamanhoFonte||12)*0.95,estilo:'bold',gapDepois:2}]:null;
      const grupos=window.CeleiroPretextuais.agruparParagrafos(paragrafos, fmt, cfg, tituloAlt+(introLinhas?6:0));
      grupos.forEach((grupo,i)=>add('sobre_autor', {paginado:true, drawCtx:{titulo:i===0?'Sobre o Autor':null, introLinhas:i===0?introLinhas:null, paragrafos:grupo}}));
      if(seq.length%2===1) addBranca('verso_sobre_autor');
    }
    if(dados.colofao!==false){
      if(seq.length%2===0) addBranca('recto_para_colofao');
      add('colofao', {desenharPagina:(doc,wMm,hMm,ff)=>_desenharColofaoPDF(doc,dados,wMm,hMm,ff)});
    }
  }
  return seq;
}

const NAO_NUMERAR_PDF=['branca','ficha_catalografica','dedicatoria','epigrafe','colofao','falsa_folha_rosto','folha_rosto'];

/**
 * gerarPDFRealCompleto(dados, resultadoMiolo, cfg, fmt)
 * Gera o PDF vetorial real do livro inteiro (pré-textuais + miolo +
 * pós-textuais), com a mesma numeração de página (romano nas
 * pré-textuais, arábico a partir do miolo) e outline/bookmarks (Sumário,
 * Prefácio, cada capítulo, Posfácio, Sobre o Autor) que um leitor de PDF
 * mostra como painel de navegação — o "sumário estilo Windows".
 */
function gerarPDFRealCompleto(dados, resultadoMiolo, cfg, fmt){
  if(typeof window==='undefined'||!window.jspdf||!window.jspdf.jsPDF){
    throw new Error('jsPDF não carregado — inclua o script jsPDF na página antes de exportar.');
  }
  if(!window.CeleiroV3||!window.CeleiroV3.processarBlocoPDF||!window.CeleiroPretextuais){
    throw new Error('Motores de diagramação/pré-textuais não carregados.');
  }
  const { jsPDF }=window.jspdf;
  const wMm=(fmt.wCm||16)*10, hMm=(fmt.hCm||23)*10;
  const doc=new jsPDF({unit:'mm',format:[wMm,hMm],compress:true});
  const fontFamily=window.CeleiroV3.fontePDF(cfg.fonte);
  const mTmm=_mm(cfg.mT||52), mBmm=_mm(cfg.mB||58), mImm=_mm(cfg.mI||57), mEmm=_mm(cfg.mE||43);
  const alturaUtilMm=hMm-mTmm-mBmm;

  doc.setProperties({
    title:dados.titulo||'Obra sem título',
    author:dados.autor||'',
    creator:'SIGMAL HQ — Dias Gramador',
  });

  const seqPre=_montarSequenciaTecnica(dados, fmt, cfg, 'pre');
  const paginasMiolo=resultadoMiolo?.paginas||[];
  const seqPos=_montarSequenciaTecnica(dados, fmt, cfg, 'pos');

  const todas=[];
  seqPre.forEach(p=>todas.push(p));
  paginasMiolo.forEach((pag,i)=>todas.push({tipo:'miolo', secao:'miolo', miolo:true, pag, numArabico:i+1}));
  seqPos.forEach(p=>todas.push(p));

  const nPre=seqPre.length;
  const outlineEntries=[];

  todas.forEach((item,idx)=>{
    const numAbsoluto=idx+1;
    const lado=numAbsoluto%2===0?'verso':'recto';
    const isRecto=lado==='recto';
    const margL=isRecto?mImm:mEmm, margR=isRecto?mEmm:mImm;
    const larguraUtilMm=wMm-margL-margR;
    if(idx>0) doc.addPage([wMm,hMm]);

    if(item.tipo==='prefacio'&&item.drawCtx.titulo){
      outlineEntries.push({titulo:item.drawCtx.titulo, pagina:idx+1});
    }
    if(item.tipo==='sumario'&&item.drawCtx.primeiraPagina){
      outlineEntries.push({titulo:'Sumário', pagina:idx+1});
    }
    if((item.tipo==='posfacio'||item.tipo==='notas'||item.tipo==='referencias'||item.tipo==='sobre_autor')&&item.drawCtx.titulo){
      outlineEntries.push({titulo:item.drawCtx.titulo, pagina:idx+1});
    }

    if(item.miolo){
      let escala=1;
      while(escala>0.7 && window.CeleiroV3.alturaPaginaPDF(doc,item.pag,cfg,margL,larguraUtilMm,fontFamily,escala)>alturaUtilMm){
        escala-=0.05;
      }
      let y=mTmm;
      item.pag.blocos.forEach(bloco=>{
        if(bloco.tipo==='capitulo') outlineEntries.push({titulo:bloco.conteudo.replace(/­/g,''), pagina:idx+1});
        y=window.CeleiroV3.processarBlocoPDF(doc,bloco,cfg,margL,y,larguraUtilMm,fontFamily,escala,true);
      });
    }else if(item.paginado){
      const drawFn=item.sumario?_desenharSumarioPDF:_desenharTextoComTitulo;
      let escala=1;
      while(escala>0.7 && drawFn(doc,item.drawCtx,margL,0,larguraUtilMm,fontFamily,cfg,escala,false)>alturaUtilMm){
        escala-=0.05;
      }
      drawFn(doc,item.drawCtx,margL,mTmm,larguraUtilMm,fontFamily,cfg,escala,true);
    }else if(item.desenharPagina){
      item.desenharPagina(doc,wMm,hMm,fontFamily);
    }
    // branca_*: nada a desenhar

    if(cfg.numeracao&&cfg.numeracao!=='off'&&!NAO_NUMERAR_PDF.some(t=>item.tipo.startsWith(t))){
      const numDisplay=idx<nPre?toRomano(numAbsoluto):String(numAbsoluto-nPre);
      doc.setFont(fontFamily,'normal'); doc.setFontSize(9);
      const alinhNum=cfg.numeracao==='dir'?'right':isRecto?'right':'left';
      const xNum=alinhNum==='right'?wMm-margR:margL;
      doc.text(numDisplay,xNum,hMm-mBmm/2,{align:alinhNum});
    }
  });

  outlineEntries.forEach(o=>{ doc.outline.add(null,o.titulo,{pageNumber:o.pagina}); });

  return doc.output('blob');
}

// ═══════════════════════════════════════════════════════════
// 10. EXPORT
// ═══════════════════════════════════════════════════════════
global.CeleiroJuncao={
  juntar,
  renderizarLivroCompleto,
  renderizarPaginaLivro,
  salvarLivroCompleto,
  extrairCapitulosDoMiolo,
  atualizarSumario,
  injetarNumero,
  toRomano,
  gerarPDFRealCompleto,
};

})(typeof window!=='undefined'?window:global);
