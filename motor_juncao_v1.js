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
// 9. EXPORT
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
};

})(typeof window!=='undefined'?window:global);
