/*
  Celeiro Literário / Lapidar — Motor Biblioteca Visual v1
  ----------------------------------------------------------
  Catálogo de imagens de uso livre (domínio público / CC0, sem cobrança)
  organizadas em três segmentos separados:

  - capitulares: letras iluminadas/ilustradas, pra abrir capítulo no
    lugar (ou além) dos estilos tipográficos do Motor Decoração Editorial.
  - molduras: bordas e molduras ornamentais, pra página especial
    (:::pagina...:::), divisores de capítulo ou moldura ao redor de
    imagem embutida.
  - ilustracoes: imagens avulsas de ilustração, pra usar dentro do miolo
    via ::fundo[](url) ou dentro de página especial.

  Cada item só entra aqui depois de checado como realmente gratuito e
  livre de cobrança (nunca banco de imagem pago, nunca fonte sem licença
  clara) — combinado com o Wagner. O motor começa vazio; os itens são
  adicionados aos poucos conforme os arquivos chegam e passam pela
  checagem.

  Compartilhado por Pólux, Centauro, Hércules e, quando fizer sentido, os
  diagramadores de poesia (Castor, Apolo, Samurai, Espartano, Quironxadá)
  — mesmo padrão do Motor Decoração Editorial.
*/
(function(){
  const MOTOR_ID = 'Celeiro.MotorBibliotecaVisual.v1';

  // Caminho relativo à raiz do site onde os arquivos de fato ficam —
  // cada segmento tem sua própria subpasta dentro de biblioteca_visual/.
  const PASTA_BASE = 'biblioteca_visual/';
  const SUBPASTAS = {
    capitulares: 'capitulares/',
    molduras: 'molduras/',
    ilustracoes: 'ilustracoes/',
  };

  // Cada item: { id, nome, arquivo, tema, fonte, licenca }
  // - id: identificador único dentro do segmento (usado por quem for
  //   referenciar o item, ex. num select de estilo).
  // - arquivo: nome do arquivo dentro da subpasta do segmento.
  // - tema: rótulos livres pra filtrar por gênero/estilo (ex. "medieval",
  //   "natureza", "música") — um item pode ter mais de um, separados por
  //   espaço.
  // - fonte: de onde veio (URL da página ou do arquivo original), pra
  //   rastreabilidade da licença.
  // - licenca: string curta confirmando o status (ex. "dominio-publico",
  //   "cc0") — nunca "verificar" ou vazio; só entra no catálogo depois de
  //   confirmado.
  const capitulares = [
    { id:'capitular-n-ornamental-1480-1490-alemao-01', nome:'Letra N ornamental, alemã, 1480-1490 (gravura histórica)', arquivo:'capitular-n-ornamental-1480-1490-alemao-01.jpg', tema:'medieval histórico clássico gravura', fonte:'rawpixel.com — Ornamental Alphabet (1480/1490) German 15th', licenca:'dominio-publico' },
    { id:'capitular-d-ornamental-1480-1490-alemao-01', nome:'Letra D ornamental, alemã, 1480-1490 (variante 1, azul/dourado)', arquivo:'capitular-d-ornamental-1480-1490-alemao-01.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico, mesma série da letra N', licenca:'dominio-publico' },
    { id:'capitular-d-ornamental-1480-1490-alemao-02', nome:'Letra D ornamental, alemã, 1480-1490 (variante 2, azul/dourado)', arquivo:'capitular-d-ornamental-1480-1490-alemao-02.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico, mesma série da letra N', licenca:'dominio-publico' },
    { id:'capitular-d-ornamental-1480-1490-alemao-03', nome:'Letra D ornamental, alemã, 1480-1490 (variante 3, azul/dourado)', arquivo:'capitular-d-ornamental-1480-1490-alemao-03.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico, mesma série da letra N', licenca:'dominio-publico' },
    { id:'capitular-d-branco-vinha-italiano-01', nome:'Letra D em estilo bianchi girari (folhagem branca), italiano (variante 1)', arquivo:'capitular-d-branco-vinha-italiano-01.jpg', tema:'medieval renascentista histórico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico', licenca:'dominio-publico' },
    { id:'capitular-d-branco-vinha-italiano-02', nome:'Letra D em estilo bianchi girari (folhagem branca), italiano (variante 2)', arquivo:'capitular-d-branco-vinha-italiano-02.jpg', tema:'medieval renascentista histórico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico', licenca:'dominio-publico' },
    { id:'capitular-d-branco-vinha-italiano-03', nome:'Letra D em estilo bianchi girari (folhagem branca), italiano (variante 3)', arquivo:'capitular-d-branco-vinha-italiano-03.jpg', tema:'medieval renascentista histórico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico', licenca:'dominio-publico' },
    { id:'capitular-d-branco-vinha-italiano-04', nome:'Letra D em estilo bianchi girari (folhagem branca), italiano (variante 4)', arquivo:'capitular-d-branco-vinha-italiano-04.jpg', tema:'medieval renascentista histórico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico', licenca:'dominio-publico' },
    { id:'capitular-a-ladder-prata-alemao-01', nome:'Letra A ornamental, friso em escada, folhagem prata (variante 1)', arquivo:'capitular-a-ladder-prata-alemao-01.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico (livro de coro)', licenca:'dominio-publico' },
    { id:'capitular-a-ladder-prata-alemao-02', nome:'Letra A ornamental, friso em escada, folhagem prata (variante 2)', arquivo:'capitular-a-ladder-prata-alemao-02.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico (livro de coro)', licenca:'dominio-publico' },
    { id:'capitular-a-ladder-prata-alemao-03', nome:'Letra A ornamental, friso em escada, folhagem prata (variante 3)', arquivo:'capitular-a-ladder-prata-alemao-03.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico (livro de coro)', licenca:'dominio-publico' },
    { id:'capitular-a-ladder-prata-alemao-04', nome:'Letra A ornamental, friso em escada, folhagem prata (variante 4)', arquivo:'capitular-a-ladder-prata-alemao-04.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico (livro de coro)', licenca:'dominio-publico' },
    { id:'capitular-a-ladder-prata-alemao-05', nome:'Letra A ornamental, friso em escada, folhagem prata (variante 5)', arquivo:'capitular-a-ladder-prata-alemao-05.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico (livro de coro)', licenca:'dominio-publico' },
    { id:'capitular-a-ladder-prata-alemao-06', nome:'Letra A ornamental, friso em escada, folhagem prata (variante 6)', arquivo:'capitular-a-ladder-prata-alemao-06.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico (livro de coro)', licenca:'dominio-publico' },
    { id:'capitular-a-ladder-prata-alemao-07', nome:'Letra A ornamental, friso em escada, folhagem prata (variante 7)', arquivo:'capitular-a-ladder-prata-alemao-07.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico (livro de coro)', licenca:'dominio-publico' },
    { id:'capitular-a-branco-vinha-italiano-01', nome:'Letra A em estilo bianchi girari (folhagem branca), italiano (variante 1)', arquivo:'capitular-a-branco-vinha-italiano-01.jpg', tema:'medieval renascentista histórico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico', licenca:'dominio-publico' },
    { id:'capitular-a-branco-vinha-italiano-02', nome:'Letra A em estilo bianchi girari (folhagem branca), italiano (variante 2)', arquivo:'capitular-a-branco-vinha-italiano-02.jpg', tema:'medieval renascentista histórico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico', licenca:'dominio-publico' },
    { id:'capitular-a-ornamental-1480-1490-alemao-01', nome:'Letra A ornamental, alemã, 1480-1490 (mesma série da letra N)', arquivo:'capitular-a-ornamental-1480-1490-alemao-01.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico, mesma série da letra N', licenca:'dominio-publico' },
    { id:'capitular-a-ladder-floral-01', nome:'Letra A ornamental, friso em escada, florais vermelho/verde', arquivo:'capitular-a-ladder-floral-01.jpg', tema:'medieval histórico clássico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico', licenca:'dominio-publico' },
    { id:'capitular-a-vinha-naturalista-01', nome:'Letra A com vinha naturalista, papoulas vermelhas', arquivo:'capitular-a-vinha-naturalista-01.jpg', tema:'medieval renascentista floral naturalista', fonte:'download direto (usuário) — manuscrito iluminado histórico', licenca:'dominio-publico' },
    { id:'capitular-a-grotesco-dragoes-01', nome:'Letra A com grotescos (dragões) e candelabro', arquivo:'capitular-a-grotesco-dragoes-01.jpg', tema:'medieval renascentista grotesco ornamental', fonte:'download direto (usuário) — manuscrito iluminado histórico', licenca:'dominio-publico' },
    { id:'capitular-a-zoomorfico-dragao-01', nome:'Letra A zoomórfica em forma de dragão', arquivo:'capitular-a-zoomorfico-dragao-01.jpg', tema:'medieval fantástico zoomórfico gravura', fonte:'download direto (usuário) — manuscrito iluminado histórico', licenca:'dominio-publico' },
  ];
  const molduras = [
    { id:'moldura-quadros-ouro-01', nome:'Conjunto de molduras douradas (circular e retangular)', arquivo:'moldura-quadros-ouro-01.png', tema:'moldura decorativa dourada foto', fonte:'https://publicdomainvectors.org/photos/Chrisdesign-gold-frames-set.png', licenca:'dominio-publico' },
    { id:'moldura-cantos-ouro-azul-01', nome:'Elementos decorativos de ouro e azul pra canto de página', arquivo:'moldura-cantos-ouro-azul-01.png', tema:'moldura canto de página dourado floral elegante', fonte:'https://publicdomainvectors.org/photos/Floral-Flourish-Frame-7-Variation-3.png', licenca:'dominio-publico' },
    { id:'moldura-floral-grade-01', nome:'Grade de molduras florais (padrão 3x3)', arquivo:'moldura-floral-grade-01.png', tema:'moldura floral padrão preto-e-branco', fonte:'https://publicdomainvectors.org/photos/Floral-Flourish-Silhouette-Design-10.png', licenca:'dominio-publico' },
    { id:'moldura-rosas-01', nome:'Guirlanda de rosas (borda superior/esquerda)', arquivo:'moldura-rosas-01.png', tema:'moldura floral rosas divisor', fonte:'https://publicdomainvectors.org/photos/frames.png', licenca:'dominio-publico' },
    { id:'moldura-espelho-duplo-01', nome:'Moldura de espelho decorado duplo (art nouveau)', arquivo:'moldura-espelho-duplo-01.png', tema:'moldura art-nouveau preto-e-branco elegante', fonte:'https://publicdomainvectors.org/photos/doubleframe.png', licenca:'dominio-publico' },
    { id:'moldura-canto-losango-01', nome:'Moldura ornamental em losango (cantos)', arquivo:'moldura-canto-losango-01.png', tema:'moldura ornamental preto-e-branco elegante', fonte:'openclipart.org (detail/222492) via publicdomainvectors.org', licenca:'cc0' },
    { id:'moldura-4-petalas-01', nome:'Moldura ornamental em 4 pétalas', arquivo:'moldura-4-petalas-01.png', tema:'moldura ornamental preto-e-branco elegante', fonte:'openclipart.org via publicdomainvectors.org', licenca:'cc0' },
    { id:'moldura-retangular-completa-01', nome:'Moldura ornamental retangular completa (com linha central no topo/base)', arquivo:'moldura-retangular-completa-01.png', tema:'moldura ornamental página completa preto-e-branco elegante', fonte:'openclipart.org (detail/222492) via publicdomainvectors.org', licenca:'cc0' },
    { id:'moldura-cata-vento-01', nome:'Moldura ornamental em cata-vento (4 cantos espelhados)', arquivo:'moldura-cata-vento-01.png', tema:'moldura ornamental preto-e-branco elegante', fonte:'openclipart.org via publicdomainvectors.org', licenca:'cc0' },
    { id:'moldura-floral-coracoes-cantos-01', nome:'Moldura ornamental floral em corações (4 cantos)', arquivo:'moldura-floral-coracoes-cantos-01.png', tema:'moldura ornamental preto-e-branco elegante', fonte:'openclipart.org via publicdomainvectors.org', licenca:'cc0' },
  ];
  const ilustracoes = [
    { id:'ilust-sinal-neon-rock-house-01', nome:'Sinal de néon \'Ray\'s Rock House\'', arquivo:'ilust-sinal-neon-rock-house-01.png', tema:'néon retrô música', fonte:'https://publicdomainvectors.org/photos/Rays_RockHouse__Arvin61r58.png', licenca:'dominio-publico' },
    { id:'ilust-simbolo-rock-01', nome:'Símbolo de rock and roll', arquivo:'ilust-simbolo-rock-01.png', tema:'música rock', fonte:'https://publicdomainvectors.org/photos/1577616439Seals in the sunset.png', licenca:'dominio-publico' },
    { id:'ilust-bruxa-gato-vassoura-01', nome:'Bruxa e gato preto em silhueta de vassoura', arquivo:'ilust-bruxa-gato-vassoura-01.png', tema:'fantasia terror halloween silhueta', fonte:'https://publicdomainvectors.org/photos/itch and at on roomstick ilhouette.png', licenca:'dominio-publico' },
    { id:'ilust-cranio-chaves-01', nome:'Crânio e chaves cruzadas (emblema)', arquivo:'ilust-cranio-chaves-01.png', tema:'terror mistério aventura emblema preto-e-branco', fonte:'https://publicdomainvectors.org/photos/Skull and Keys Emblem.png', licenca:'dominio-publico' },
    { id:'ilust-moca-chique-01', nome:'Ilustração de moça chique com óculos de sol', arquivo:'ilust-moca-chique-01.png', tema:'pessoas moda retrato colorido', fonte:'https://publicdomainvectors.org/photos/Lady with yellow eyes and long neck.png', licenca:'dominio-publico' },
    { id:'ilust-quimica-molecula-01', nome:'Molécula química (diagrama)', arquivo:'ilust-quimica-molecula-01.png', tema:'ciência técnico educativo', fonte:'https://publicdomainvectors.org/photos/DDT To DDD And DDE.png', licenca:'dominio-publico' },
    { id:'ilust-musicista-feminina-01', nome:'Musicista feminina fazendo sinal de rock (ilustração colorida)', arquivo:'ilust-musicista-feminina-01.jpg', tema:'música pessoas', fonte:'https://publicdomainvectors.org/photos/female-rock-musician.jpg', licenca:'dominio-publico' },
    { id:'ilust-guitarrista-01', nome:'Guitarrista de rock (foto)', arquivo:'ilust-guitarrista-01.jpg', tema:'música pessoas foto', fonte:'https://publicdomainvectors.org/photos/heavy-rock-musician.jpg', licenca:'dominio-publico' },
    { id:'ilust-musico-guitarra-01', nome:'Músico de rock com uma guitarra (ilustração)', arquivo:'ilust-musico-guitarra-01.png', tema:'música pessoas', fonte:'https://publicdomainvectors.org/photos/rock-musician-with-guitar.png', licenca:'dominio-publico' },
    { id:'ilust-guitarrista-02', nome:'Guitarrista de rock (foto 2)', arquivo:'ilust-guitarrista-02.jpg', tema:'música pessoas foto', fonte:'https://publicdomainvectors.org/photos/rock-music-guitarist-publicdomain.jpg', licenca:'dominio-publico' },
    { id:'ilust-flores-silhueta-01', nome:'Flores em silhueta (divisor decorativo)', arquivo:'ilust-flores-silhueta-01.png', tema:'flores natureza divisor', fonte:'https://publicdomainvectors.org/photos/Floral-Silhouette-By-RebeccaRead.png', licenca:'dominio-publico' },
    { id:'ilust-ave-black-skimmer-01', nome:'Black Skimmer (ave, ilustração de linha)', arquivo:'ilust-ave-black-skimmer-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Black_Skimmer.png', licenca:'dominio-publico' },
    { id:'ilust-ave-corvo-marinho-01', nome:'Corvos-marinhos / Cormorants (ave, ilustração de linha)', arquivo:'ilust-ave-corvo-marinho-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Cormorants.png', licenca:'dominio-publico' },
    { id:'ilust-ave-aguia-careca-01', nome:'Águia careca / Bald Eagle (ave, ilustração de linha)', arquivo:'ilust-ave-aguia-careca-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Bald_Eagle_2.png', licenca:'dominio-publico' },
    { id:'ilust-ave-loon-comum-01', nome:'Loon comum / Common Loon (ave, ilustração de linha)', arquivo:'ilust-ave-loon-comum-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Common_Loon.png', licenca:'dominio-publico' },
    { id:'ilust-ave-western-grebe-01', nome:'Western Grebe / Mergulhão-ocidental (ave, ilustração de linha, variante 1)', arquivo:'ilust-ave-western-grebe-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Western_Grebe_2.png', licenca:'dominio-publico' },
    { id:'ilust-ave-caimao-01', nome:'Ave Caimão / Gallinule (ave, ilustração de linha)', arquivo:'ilust-ave-caimao-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Gallinule.png', licenca:'dominio-publico' },
    { id:'ilust-ave-bristle-thighed-curlew-01', nome:'Bristle-thighed Curlew (ave, ilustração de linha)', arquivo:'ilust-ave-bristle-thighed-curlew-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Bristle-thighed_Curlew.png', licenca:'dominio-publico' },
    { id:'ilust-ave-sooty-tern-01', nome:'Sooty Tern / Trinta-réis-escuro (ave, ilustração de linha)', arquivo:'ilust-ave-sooty-tern-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Sooty_Tern.png', licenca:'dominio-publico' },
    { id:'ilust-ave-trinta-reis-negro-01', nome:'Trinta-réis-negro / Black Tern (ave, ilustração de linha)', arquivo:'ilust-ave-trinta-reis-negro-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Black_Tern.png', licenca:'dominio-publico' },
    { id:'ilust-ave-ruddy-turnstone-01', nome:'Ruddy Turnstone / Vira-pedras (ave, ilustração de linha)', arquivo:'ilust-ave-ruddy-turnstone-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Ruddy_Turnstone.png', licenca:'dominio-publico' },
    { id:'ilust-ave-yellowleg-maior-01', nome:'Yellowleg maior / Greater Yellowlegs (ave, ilustração de linha)', arquivo:'ilust-ave-yellowleg-maior-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Yellow_Leg.png', licenca:'dominio-publico' },
    { id:'ilust-ave-western-grebe-02', nome:'Western Grebe / Mergulhão-ocidental (ave, ilustração de linha, variante 2)', arquivo:'ilust-ave-western-grebe-02.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Western_Grebe_3.png', licenca:'dominio-publico' },
    { id:'ilust-ave-western-grebe-03', nome:'Western Grebe / Mergulhão-ocidental (ave, ilustração de linha, variante 3)', arquivo:'ilust-ave-western-grebe-03.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Western_Grebe.png', licenca:'dominio-publico' },
    { id:'ilust-ave-anhinga-01', nome:'Anhinga (ave, ilustração de linha preto e branco)', arquivo:'ilust-ave-anhinga-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_anhinga.png', licenca:'dominio-publico' },
    { id:'ilust-ave-arctic-tern-01', nome:'Andorinha do Ártico / Arctic Tern (ave, ilustração de linha, variante 1)', arquivo:'ilust-ave-arctic-tern-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Arctic_Tern_1.png', licenca:'dominio-publico' },
    { id:'ilust-ave-arctic-tern-02', nome:'Andorinha do Ártico / Arctic Tern (ave, ilustração de linha, variante 2)', arquivo:'ilust-ave-arctic-tern-02.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Arctic_Tern_2.png', licenca:'dominio-publico' },
    { id:'ilust-ave-avocet-01', nome:'Avocet (ave, ilustração de linha, variante 1)', arquivo:'ilust-ave-avocet-01.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Avocet_3.png', licenca:'dominio-publico' },
    { id:'ilust-ave-avocet-02', nome:'Avocet (ave, ilustração de linha, variante 2)', arquivo:'ilust-ave-avocet-02.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Avocet_4.png', licenca:'dominio-publico' },
    { id:'ilust-ave-avocet-03', nome:'Avocet (ave, ilustração de linha, variante 3)', arquivo:'ilust-ave-avocet-03.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Avocet_1.png', licenca:'dominio-publico' },
    { id:'ilust-ave-avocet-04', nome:'Avocet (ave, ilustração de linha, variante 4)', arquivo:'ilust-ave-avocet-04.png', tema:'aves natureza', fonte:'https://publicdomainvectors.org/photos/ryanlerch_Avocet_2.png', licenca:'dominio-publico' },
  ];

  const SEGMENTOS = { capitulares, molduras, ilustracoes };

  function listar(segmento, filtroTema){
    const lista = SEGMENTOS[segmento];
    if(!lista) return [];
    if(!filtroTema) return lista.slice();
    const f = filtroTema.toLowerCase();
    return lista.filter(item=>(item.tema||'').toLowerCase().includes(f));
  }

  function obter(segmento, id){
    const lista = SEGMENTOS[segmento];
    return lista ? (lista.find(i=>i.id===id) || null) : null;
  }

  function caminho(segmento, item){
    if(!item) return '';
    const sub = SUBPASTAS[segmento] || '';
    return PASTA_BASE + sub + item.arquivo;
  }

  // Pra popular o catálogo (usado ao integrar novos arquivos verificados
  // — nunca chamado a partir de conteúdo gerado ou vindo de fora, só na
  // hora de cadastrar um item novo checado manualmente).
  function adicionar(segmento, item){
    const lista = SEGMENTOS[segmento];
    if(!lista) throw new Error(`Segmento desconhecido: ${segmento}`);
    if(!item.id || !item.arquivo || !item.licenca){
      throw new Error('Item precisa de id, arquivo e licenca pra entrar no catálogo.');
    }
    if(lista.some(i=>i.id===item.id)){
      throw new Error(`Já existe item com id "${item.id}" em ${segmento}.`);
    }
    lista.push(item);
    return item;
  }

  window.CeleiroMotorBibliotecaVisual = {
    MOTOR_ID,
    PASTA_BASE,
    SUBPASTAS,
    segmentos: SEGMENTOS,
    listar,
    obter,
    caminho,
    adicionar,
  };
})();
