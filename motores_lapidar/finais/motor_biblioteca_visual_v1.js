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
  const capitulares = [];
  const molduras = [];
  const ilustracoes = [];

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
