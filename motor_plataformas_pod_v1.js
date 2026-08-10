/**
 * motor_plataformas_pod_v1.js — Especificações Técnicas das Plataformas POD
 * (portado do Celeiro Literário)
 *
 * Contém as dimensões, sangria, DPI e requisitos de cada plataforma.
 *
 * Exporta: window.CeleiroPOD
 */
(function(global){
'use strict';

// ═══════════════════════════════════════════════════════════
// 1. PLATAFORMAS
// ═══════════════════════════════════════════════════════════
const PLATAFORMAS = {

  // ─── NACIONAIS ───────────────────────────────────────────
  uiclap: {
    nome:'Uiclap', bandeira:'🇧🇷', tipo:'nacional',
    url:'https://uiclap.com',
    urlPublicar:'https://uiclap.com/publicar',
    info:'Maior plataforma brasileira de autopublicação. Gratuito, sem tiragem mínima.',
    formatos:{
      A5:    { w:14.8, h:21.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '14x21':{ w:14.0, h:21.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '16x23':{ w:16.0, h:23.0, sangria:0.3, dpi:300, arquivo:'PDF' },
    },
    formatoPadrao:'16x23',
    aceitaOrelha:false,
    calculaLombada:true,
    papelGSM:75, // papel offset 75g/m²
    espessuraPaginaMM:0.1, // mm por página
    notas:'Miolo e capa em arquivos separados. Capa em PDF/X-1a.',
  },

  clube_autores: {
    nome:'Clube de Autores', bandeira:'🇧🇷', tipo:'nacional',
    url:'https://www.clubedeautores.com.br',
    urlPublicar:'https://www.clubedeautores.com.br/publicar',
    info:'Pioneira na autopublicação brasileira. Grande base de leitores.',
    formatos:{
      A5:    { w:14.8, h:21.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '14x21':{ w:14.0, h:21.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '16x23':{ w:16.0, h:23.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      A4:    { w:21.0, h:29.7, sangria:0.3, dpi:300, arquivo:'PDF' },
    },
    formatoPadrao:'16x23',
    aceitaOrelha:false,
    calculaLombada:true,
    papelGSM:75,
    espessuraPaginaMM:0.1,
    notas:'Capa e miolo enviados separadamente em PDF.',
  },

  bok2: {
    nome:'Bok2', bandeira:'🇧🇷', tipo:'nacional',
    url:'https://bok2.com.br',
    urlPublicar:'https://bok2.com.br',
    info:'Hub de serviços literários. Distribui para Amazon, B2W e Estante Virtual.',
    formatos:{
      A5:    { w:14.8, h:21.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '14x21':{ w:14.0, h:21.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '16x23':{ w:16.0, h:23.0, sangria:0.3, dpi:300, arquivo:'PDF' },
    },
    formatoPadrao:'14x21',
    aceitaOrelha:false,
    calculaLombada:true,
    papelGSM:75,
    espessuraPaginaMM:0.1,
    notas:'Miolo e capa separados. Aceita PDF/X.',
  },

  pod_editora: {
    nome:'POD Editora', bandeira:'🇧🇷', tipo:'nacional',
    url:'https://podeditora.com.br',
    urlPublicar:'https://podeditora.com.br',
    info:'Especializada em tiragens mínimas, até 1 exemplar.',
    formatos:{
      A5:    { w:14.8, h:21.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '14x21':{ w:14.0, h:21.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '16x23':{ w:16.0, h:23.0, sangria:0.3, dpi:300, arquivo:'PDF' },
    },
    formatoPadrao:'14x21',
    aceitaOrelha:false,
    calculaLombada:true,
    papelGSM:75,
    espessuraPaginaMM:0.1,
    notas:'Enviar PDF de alta resolução com sangria de 3mm.',
  },

  // ─── INTERNACIONAIS ───────────────────────────────────────
  amazon_kdp: {
    nome:'Amazon KDP', bandeira:'🌎', tipo:'internacional',
    url:'https://kdp.amazon.com',
    urlPublicar:'https://kdp.amazon.com/en_US/help/topic/G201834170',
    info:'Maior plataforma de autopublicação do mundo. Distribuição global.',
    formatos:{
      '5x8':   { w:12.7, h:20.3, sangria:0.318, dpi:300, arquivo:'PDF' },
      '5.5x8.5':{ w:13.97, h:21.59, sangria:0.318, dpi:300, arquivo:'PDF' },
      '6x9':   { w:15.24, h:22.86, sangria:0.318, dpi:300, arquivo:'PDF' },
      '8.5x11':{ w:21.59, h:27.94, sangria:0.318, dpi:300, arquivo:'PDF' },
    },
    formatoPadrao:'6x9',
    aceitaOrelha:false,
    calculaLombada:true,
    papelGSM:60,
    espessuraPaginaMM:0.0572, // papel cream
    notas:'Lombada mínima de 6.35mm (78 páginas). Capa em PDF com marcadores.',
    lombadaMinimaPaginas:78,
  },

  ingram_spark: {
    nome:'IngramSpark', bandeira:'🌎', tipo:'internacional',
    url:'https://www.ingramspark.com',
    urlPublicar:'https://www.ingramspark.com/plan-your-book/cover',
    info:'Distribuição profissional global. Usado por editoras independentes.',
    formatos:{
      '5x8':   { w:12.7, h:20.3, sangria:0.318, dpi:300, arquivo:'PDF' },
      '5.5x8.5':{ w:13.97, h:21.59, sangria:0.318, dpi:300, arquivo:'PDF' },
      '6x9':   { w:15.24, h:22.86, sangria:0.318, dpi:300, arquivo:'PDF' },
      A5:      { w:14.8, h:21.0, sangria:0.318, dpi:300, arquivo:'PDF' },
    },
    formatoPadrao:'6x9',
    aceitaOrelha:false,
    calculaLombada:true,
    papelGSM:60,
    espessuraPaginaMM:0.0572,
    notas:'PDF/X-1a ou PDF/X-3. Marcadores de corte obrigatórios.',
  },

  lulu: {
    nome:'Lulu', bandeira:'🌎', tipo:'internacional',
    url:'https://www.lulu.com',
    urlPublicar:'https://www.lulu.com/create/books',
    info:'Popular para poesia, nichos e edições especiais. Distribuição em livrarias.',
    formatos:{
      '5x8':   { w:12.7, h:20.3, sangria:0.318, dpi:300, arquivo:'PDF' },
      '6x9':   { w:15.24, h:22.86, sangria:0.318, dpi:300, arquivo:'PDF' },
      'quadrado':{ w:21.59, h:21.59, sangria:0.318, dpi:300, arquivo:'PDF' },
      A4:      { w:21.0, h:29.7, sangria:0.318, dpi:300, arquivo:'PDF' },
    },
    formatoPadrao:'6x9',
    aceitaOrelha:false,
    calculaLombada:true,
    papelGSM:60,
    espessuraPaginaMM:0.0572,
    notas:'Calculadora de lombada disponível no site. Aceita capa em PDF ou JPG.',
  },

  draft2digital: {
    nome:'Draft2Digital', bandeira:'🌎', tipo:'internacional',
    url:'https://www.draft2digital.com',
    urlPublicar:'https://www.draft2digital.com',
    info:'Forte em eBooks e distribuição para Kobo, Apple Books, Barnes & Noble.',
    formatos:{
      epub: { w:0, h:0, sangria:0, dpi:150, arquivo:'EPUB/PDF' },
    },
    formatoPadrao:'epub',
    aceitaOrelha:false,
    calculaLombada:false,
    papelGSM:0,
    espessuraPaginaMM:0,
    notas:'Principalmente digital. Capa em JPG/PNG 1600×2400px mínimo.',
    somenteDigital:true,
  },

  // ─── GRÁFICA PRÓPRIA / PERSONALIZADA ────────────────────
  grafica_propria: {
    nome:'Gráfica Personalizada', bandeira:'🖨️', tipo:'custom',
    url:'', urlPublicar:'',
    info:'Especificações totalmente personalizadas para qualquer gráfica.',
    formatos:{
      A5:      { w:14.8, h:21.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '14x21': { w:14.0, h:21.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '16x23': { w:16.0, h:23.0, sangria:0.3, dpi:300, arquivo:'PDF' },
      '6x9':   { w:15.24,h:22.86,sangria:0.318,dpi:300,arquivo:'PDF' },
      A4:      { w:21.0, h:29.7, sangria:0.3, dpi:300, arquivo:'PDF' },
      custom:  { w:0, h:0, sangria:0.3, dpi:300, arquivo:'PDF' },
    },
    formatoPadrao:'16x23',
    aceitaOrelha:true,
    calculaLombada:true,
    papelGSM:75,
    espessuraPaginaMM:0.1,
    notas:'Configure todas as especificações conforme solicitado pela gráfica.',
    // Papéis disponíveis para cálculo de lombada
    papeis:{
      offset75:  { nome:'Offset 75g/m²',   gsm:75,  espMM:0.10, desc:'Padrão para livros literários' },
      offset90:  { nome:'Offset 90g/m²',   gsm:90,  espMM:0.12, desc:'Mais encorpado, livros técnicos' },
      couche115: { nome:'Couchê 115g/m²',  gsm:115, espMM:0.10, desc:'Livros ilustrados, fotografias' },
      couche150: { nome:'Couchê 150g/m²',  gsm:150, espMM:0.13, desc:'Alta qualidade, revistas' },
      reciclado: { nome:'Reciclado 75g/m²',gsm:75,  espMM:0.11, desc:'Sustentável, tom amarelado' },
      bookcel:   { nome:'Bookcel 60g/m²',  gsm:60,  espMM:0.0572,desc:'Amazon KDP, IngramSpark' },
      bondpaper: { nome:'Bond 90g/m²',     gsm:90,  espMM:0.12, desc:'Impressão a laser, técnicos' },
    },
    // Perfis de cor
    perfisCor:{
      cmyk:   { nome:'CMYK',          desc:'Impressão offset/digital — padrão gráfica' },
      rgb:    { nome:'RGB',           desc:'Apenas digital/tela — não recomendado para impressão' },
      cmyk_isocoated: { nome:'CMYK ISO Coated v2', desc:'Padrão europeu para couchê' },
      grayscale:{ nome:'Escala de Cinza', desc:'Livros preto e branco — mais econômico' },
    },
  },
};

// ═══════════════════════════════════════════════════════════
// 2. CÁLCULO DA LOMBADA
// ═══════════════════════════════════════════════════════════
/**
 * Calcula a largura da lombada em cm
 * @param {number} paginas — número de páginas do miolo
 * @param {string} plataformaKey — chave da plataforma
 * @param {number} gsm — gramatura do papel (opcional)
 * @returns {number} largura da lombada em cm
 */
function calcularLombada(paginas, plataformaKey, gsm){
  const plat = PLATAFORMAS[plataformaKey]||PLATAFORMAS.uiclap;

  // Espessura por página: se um gsm explícito for passado (papel diferente
  // do padrão da plataforma), deriva da faixa de gramatura genérica. Sem
  // gsm explícito — o caso de todo chamador atual —, usa a espessura que a
  // própria plataforma já declara (plat.espessuraPaginaMM), que é mais
  // precisa que a faixa genérica pro papel específico dela (ex.: "papel
  // cream" da Amazon KDP). Antes, as faixas genéricas sempre sobrescreviam
  // o valor declarado da plataforma, mesmo sem gsm explícito — só não dava
  // resultado errado porque cada plataforma cadastrada hoje já tinha o
  // valor declarado igual ao da faixa correspondente; uma plataforma nova
  // com papel fora do comum cairia nessa armadilha silenciosamente.
  let espAdj;
  if(gsm){
    if(gsm <= 60) espAdj = 0.0572;
    else if(gsm <= 75) espAdj = 0.10;
    else if(gsm <= 90) espAdj = 0.12;
    else espAdj = 0.15;
  } else {
    espAdj = plat.espessuraPaginaMM || 0.10;
  }

  const lombadaMM = paginas * espAdj;
  // Mínimo de 2mm para lombada visível
  const lombadaFinal = Math.max(lombadaMM, 2.0);
  return Math.round(lombadaFinal * 10) / 10; // mm, 1 casa decimal
}

/**
 * Converte mm para cm
 */
function mmParaCm(mm){ return Math.round(mm/10*100)/100; }

// ═══════════════════════════════════════════════════════════
// 3. DIMENSÕES COMPLETAS DA CAPA
// ═══════════════════════════════════════════════════════════
/**
 * Calcula dimensões totais da capa (frente + lombada + verso)
 * em cm, com sangria
 */
function calcularDimensoesCapa(plataformaKey, formatoKey, paginas, temOrelha, larguraOrelha){
  const plat = PLATAFORMAS[plataformaKey]||PLATAFORMAS.uiclap;
  const fmt = plat.formatos[formatoKey]||Object.values(plat.formatos)[0];

  const lombadaMM = calcularLombada(paginas, plataformaKey);
  const lombadaCm = mmParaCm(lombadaMM);
  const sangria = fmt.sangria || 0.3;
  const orelha = (temOrelha && plat.aceitaOrelha) ? (larguraOrelha||8) : 0;

  // Largura total: orelha + frente + lombada + verso + orelha + sangrias
  const largTotal = (fmt.w * 2) + lombadaCm + (orelha * 2) + (sangria * 2);
  const altTotal  = fmt.h + (sangria * 2);

  return {
    larguraFrenteCm: fmt.w,
    alturaFrenteCm:  fmt.h,
    lombadaCm,
    lombadaMM,
    larguraTotal: Math.round(largTotal*100)/100,
    alturaTotal:  Math.round(altTotal*100)/100,
    sangria,
    orelha,
    dpi: fmt.dpi,
    arquivo: fmt.arquivo,
    // Em pixels (para geração de imagem)
    largPx: Math.round((largTotal/2.54)*fmt.dpi),
    altPx:  Math.round((altTotal/2.54)*fmt.dpi),
  };
}

// ═══════════════════════════════════════════════════════════
// 4. GERADOR DE BRIEFING PARA IMAGEM
// ═══════════════════════════════════════════════════════════
/**
 * Gera prompt para Pollinations.AI baseado nos dados do livro
 */
function gerarPromptCapa(dados){
  const { titulo, autor, genero, tema, estilo, cores, humor } = dados;

  const estilos = {
    realista:'photorealistic, detailed, high quality',
    aquarela:'watercolor painting, soft colors, artistic',
    minimalista:'minimalist design, clean, modern',
    classico:'classic oil painting style, elegant, traditional',
    abstrato:'abstract art, modern, artistic composition',
    ilustracao:'digital illustration, colorful, detailed',
    fotografia:'professional photography, cinematic lighting',
    vintage:'vintage style, retro, aged paper texture',
  };

  const generos_map = {
    romance:'romantic atmosphere, emotional',
    ficcao:'science fiction, futuristic',
    policial:'dark, mysterious, noir',
    poesia:'abstract, ethereal, dreamy',
    infantil:'colorful, playful, friendly characters',
    didatico:'clean, organized, professional',
    cordel:'brazilian folk art, woodcut style, vibrant colors',
    fantasia:'fantasy world, magical, epic',
  };

  const estiloPrompt = estilos[estilo]||estilos.ilustracao;
  const generoPrompt = generos_map[genero]||'literary, artistic';
  const coresPrompt = cores ? `color palette: ${cores}` : 'rich colors';
  const humorPrompt = humor||'';
  const temaPrompt = tema ? `theme: ${tema}` : '';

  return `book cover art, ${temaPrompt}, ${generoPrompt}, ${estiloPrompt}, ${coresPrompt}, ${humorPrompt}, no text, no letters, professional book cover illustration, high resolution`.replace(/,\s*,/g,',').replace(/,\s*$/,'');
}

// ═══════════════════════════════════════════════════════════
// FUNÇÕES QUE FALTAVAM — referenciadas no export mas nunca
// definidas no arquivo original. Corrigido em 01/07/2026.
// ═══════════════════════════════════════════════════════════
function listarPlataformas(){
  return Object.keys(PLATAFORMAS).map(key => ({
    key,
    nome: PLATAFORMAS[key].nome,
    bandeira: PLATAFORMAS[key].bandeira,
    tipo: PLATAFORMAS[key].tipo,
  }));
}
function listarFormatos(plataformaKey){
  const plat = PLATAFORMAS[plataformaKey] || PLATAFORMAS.uiclap;
  return Object.keys(plat.formatos).map(key => ({
    key,
    ...plat.formatos[key],
  }));
}

// ═══════════════════════════════════════════════════════════
// 4B. GERAÇÃO DE IMAGEM
// ═══════════════════════════════════════════════════════════
// A versão do Celeiro Literário chamava o Gemini direto do navegador com
// uma chave salva em localStorage, caindo pro Pollinations (grátis) se
// não tivesse chave — padrão que o triploohesigmalbpl já tinha eliminado
// pra todas as outras chaves (ver histórico no config.js). Aqui usa o
// proxy server-side que o triplo já tem (api/gerar-imagem.js), que decide
// sozinho a fonte mais barata disponível entre Stability/Gemini/OpenAI —
// nenhuma chave passa pelo navegador, e o custo real (`custoUsd`) vem
// na resposta pra mostrar pro operador, já que agora é dinheiro de
// verdade por chamada, não mais uma cota grátis.
/**
 * Gera imagem de capa via api/gerar-imagem.js.
 * `dados` usa o mesmo formato de gerarPromptCapa().
 * `callbacks.onTentativa(label)` é chamado antes de disparar a chamada.
 * Retorna { url, provedor, custoUsd, aviso } — `url` é uma Data URL base64.
 */
async function gerarImagemComFallback(dados, largura, altura, callbacks){
  callbacks = callbacks || {};
  const prompt = gerarPromptCapa(dados);
  if(callbacks.onTentativa) callbacks.onTentativa('IA (servidor)');
  const resp = await fetch('/api/gerar-imagem', {
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ prompt, negativePrompt:'text, letters, watermark, low quality' }),
  });
  const data = await resp.json();
  if(!resp.ok || data.error) throw new Error(data.error || 'Erro ao gerar imagem.');
  return { url: data.imagemDataUrl, provedor: data.fonte, custoUsd: data.custoUsd, aviso: data.aviso };
}

// ═══════════════════════════════════════════════════════════
// 5B. CÁLCULO PERSONALIZADO PARA GRÁFICA
// ═══════════════════════════════════════════════════════════
/**
 * Calcula dimensões completas para gráfica com especificações custom
 */
function calcularDimensoesGrafica(opcoes){
  const {
    larguraMiolo=16, alturaMiolo=23,
    sangriaMM=3, dpi=300,
    paginas=200, papel='offset75',
    temOrelha=false, larguraOrelhaCm=8,
    temCapa=true,
  } = opcoes;

  const platGraf = PLATAFORMAS.grafica_propria;
  const papelObj = platGraf.papeis[papel]||platGraf.papeis.offset75;
  const espMM = papelObj.espMM;
  const lombadaMM = Math.max(paginas*espMM, 2.0);
  const lombadaCm = Math.round(lombadaMM*10)/100;
  const sangriaCm = sangriaMM/10;
  const orelha = temOrelha ? larguraOrelhaCm : 0;

  const largTotal = (larguraMiolo*2) + lombadaCm + (orelha*2) + (sangriaCm*2);
  const altTotal  = alturaMiolo + (sangriaCm*2);

  return {
    // Dimensões do miolo
    larguraMiolo, alturaMiolo,
    // Lombada
    lombadaMM: Math.round(lombadaMM*10)/10,
    lombadaCm,
    // Totais
    larguraTotal: Math.round(largTotal*100)/100,
    alturaTotal: Math.round(altTotal*100)/100,
    // Técnico
    sangriaMM, sangriaCm,
    dpi, orelha,
    papel: papelObj.nome,
    papelGSM: papelObj.gsm,
    // Pixels para geração digital
    largPx: Math.round((largTotal/2.54)*dpi),
    altPx:  Math.round((altTotal/2.54)*dpi),
  };
}

// ═══════════════════════════════════════════════════════════
// 6. FICHA TÉCNICA PARA GRÁFICA
// ═══════════════════════════════════════════════════════════
/**
 * Gera HTML da ficha técnica completa para enviar à gráfica
 */
function gerarFichaTecnica(dados, dims, opcoes){
  const {
    titulo='', autor='', plataforma='grafica_propria',
    formato='', paginas=0, papel='offset75',
    perfilCor='cmyk', arquivo='PDF',
    nomeGrafica='', contatoGrafica='',
    imagemFonte='Pollinations.AI',
  } = dados;

  const platObj = PLATAFORMAS[plataforma]||PLATAFORMAS.grafica_propria;
  const papelObj = platObj.papeis?.[papel]||{ nome:papel, gsm:75 };
  const perfilObj = platObj.perfisCor?.[perfilCor]||{ nome:perfilCor };
  const dataGer = new Date().toLocaleDateString('pt-BR');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Ficha Técnica — ${titulo}</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;font-size:10pt;color:#111;max-width:800px;margin:0 auto;padding:20px;}
  h1{font-size:14pt;color:#1e3a5f;border-bottom:2px solid #1e3a5f;padding-bottom:6px;margin-bottom:16px;}
  h2{font-size:11pt;color:#1e3a5f;margin:16px 0 8px;border-left:3px solid #c9a84c;padding-left:8px;}
  table{width:100%;border-collapse:collapse;margin-bottom:12px;}
  td{padding:5px 8px;border:1px solid #ddd;font-size:9.5pt;}
  td:first-child{font-weight:700;color:#1e3a5f;width:40%;background:#f5f8ff;}
  .destaque{background:#fffbe6;border:1px solid #c9a84c;border-radius:6px;padding:10px;margin:10px 0;font-size:9pt;}
  .alerta{background:#fff5f5;border:1px solid #b13a3a;border-radius:6px;padding:10px;margin:10px 0;font-size:9pt;color:#b13a3a;}
  .logo{text-align:right;font-size:8pt;color:#999;margin-bottom:10px;}
  .diagrama{border:2px solid #1e3a5f;padding:20px;text-align:center;margin:12px 0;background:#f8f9ff;}
  .diagrama-capa{display:inline-flex;align-items:stretch;border:1px solid #333;}
  .d-verso,.d-frente{width:${Math.round(dims.larguraMiolo*15)}px;height:${Math.round(dims.alturaMiolo*10)}px;border:1px solid #333;display:flex;align-items:center;justify-content:center;font-size:8pt;color:#666;background:#e8eeff;}
  .d-lombada{width:${Math.round(dims.lombadaMM*3)}px;min-width:12px;height:${Math.round(dims.alturaMiolo*10)}px;background:#1e3a5f;display:flex;align-items:center;justify-content:center;}
  .d-lombada span{writing-mode:vertical-rl;transform:rotate(180deg);color:#fff;font-size:7pt;white-space:nowrap;}
  .d-sangria{width:${Math.round(dims.sangriaMM*3)}px;height:${Math.round(dims.alturaMiolo*10)}px;background:repeating-linear-gradient(45deg,#ffd700,#ffd700 2px,transparent 2px,transparent 6px);opacity:.5;}
  @media print{body{padding:0;}.no-print{display:none;}}
</style>
</head>
<body>
<div class="logo">Gerado em ${dataGer}</div>
<h1>📋 Ficha Técnica — Arquivo de Capa</h1>

<div class="destaque">
  <strong>Obra:</strong> ${titulo||'—'}<br>
  <strong>Autor:</strong> ${autor||'—'}<br>
  <strong>Destino:</strong> ${nomeGrafica||platObj.nome}${contatoGrafica?' · '+contatoGrafica:''}
</div>

<h2>Dimensões do Arquivo de Capa</h2>
<table>
  <tr><td>Frente (capa)</td><td>${dims.larguraMiolo} × ${dims.alturaMiolo} cm</td></tr>
  <tr><td>Verso (contracapa)</td><td>${dims.larguraMiolo} × ${dims.alturaMiolo} cm</td></tr>
  <tr><td>Lombada</td><td>${dims.lombadaMM}mm (${dims.lombadaCm}cm)</td></tr>
  ${dims.orelha?`<tr><td>Orelhas (cada)</td><td>${dims.orelha} cm</td></tr>`:''}
  <tr><td>Sangria (cada lado)</td><td>${dims.sangriaMM}mm</td></tr>
  <tr><td><strong>Largura total (aberta)</strong></td><td><strong>${dims.larguraTotal} cm</strong></td></tr>
  <tr><td><strong>Altura total</strong></td><td><strong>${dims.alturaTotal} cm</strong></td></tr>
</table>

<h2>Especificações Técnicas</h2>
<table>
  <tr><td>Resolução</td><td>${dims.dpi} DPI</td></tr>
  <tr><td>Perfil de cor</td><td>${perfilObj.nome||perfilCor}</td></tr>
  <tr><td>Formato do arquivo</td><td>${arquivo}</td></tr>
  <tr><td>Papel do miolo</td><td>${papelObj.nome} — ${papelObj.gsm}g/m²</td></tr>
  <tr><td>Número de páginas</td><td>${paginas} páginas</td></tr>
  <tr><td>Base do cálculo da lombada</td><td>${dims.lombadaMM}mm para ${paginas} págs em ${papelObj.nome}</td></tr>
</table>

<h2>Tamanho em Pixels (referência digital)</h2>
<table>
  <tr><td>Largura</td><td>${dims.largPx}px</td></tr>
  <tr><td>Altura</td><td>${dims.altPx}px</td></tr>
  <tr><td>Base de cálculo</td><td>${dims.dpi}dpi · ${dims.larguraTotal}×${dims.alturaTotal}cm</td></tr>
</table>

<h2>Diagrama da Capa (aproximado)</h2>
<div class="diagrama">
  <div style="font-size:8pt;color:#666;margin-bottom:8px;">← ${dims.larguraTotal}cm total →</div>
  <div class="diagrama-capa">
    <div class="d-sangria"></div>
    ${dims.orelha?`<div class="d-verso" style="width:${Math.round(dims.orelha*15)}px;background:#e8ffe8;">Orelha<br>${dims.orelha}cm</div>`:''}
    <div class="d-verso">Contracapa<br>${dims.larguraMiolo}cm</div>
    <div class="d-lombada"><span>${dims.lombadaMM}mm</span></div>
    <div class="d-frente">Capa<br>${dims.larguraMiolo}cm</div>
    ${dims.orelha?`<div class="d-verso" style="width:${Math.round(dims.orelha*15)}px;background:#e8ffe8;">Orelha<br>${dims.orelha}cm</div>`:''}
    <div class="d-sangria"></div>
  </div>
  <div style="font-size:7pt;color:#c9a84c;margin-top:6px;">█ Sangria | ░ Área de impressão</div>
</div>

<h2>Imagem da Capa</h2>
<table>
  <tr><td>Fonte da imagem</td><td>${imagemFonte}</td></tr>
  <tr><td>Licença</td><td>${imagemFonte==='Pollinations.AI'?'Domínio público — uso comercial livre — sem atribuição obrigatória':'Pixabay License — uso comercial livre — sem atribuição obrigatória'}</td></tr>
  <tr><td>Nota na ficha catalográfica</td><td>Imagem de capa gerada por Inteligência Artificial — ${imagemFonte}</td></tr>
</table>

<div class="alerta">
  ⚠ ATENÇÃO: Verifique sempre as especificações com a gráfica antes de enviar o arquivo.
  Lombadas podem variar conforme o lote de papel. Recomenda-se margem de ±1mm.
</div>

<div style="font-size:8pt;color:#999;margin-top:20px;border-top:1px solid #ddd;padding-top:8px;">
  Ficha técnica gerada automaticamente · ${dataGer}
</div>

<div class="no-print" style="margin-top:16px;">
  <button onclick="window.print()" style="padding:8px 20px;background:#1e3a5f;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:10pt;">🖨 Imprimir / Salvar PDF</button>
</div>
</body>
</html>`;
}

// ═══════════════════════════════════════════════════════════
// 7. EXPORT (atualizado)
// ═══════════════════════════════════════════════════════════
global.CeleiroPOD = {
  PLATAFORMAS,
  calcularLombada,
  calcularDimensoesCapa,
  calcularDimensoesGrafica,
  gerarFichaTecnica,
  gerarPromptCapa,
  gerarImagemComFallback,
  listarPlataformas,
  listarFormatos,
  mmParaCm,
};

})(typeof window!=='undefined'?window:global);
