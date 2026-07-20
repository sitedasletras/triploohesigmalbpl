/**
 * PERFIS DE VOZ — triploohesigmalbpl
 * -------------------------------------
 * Camada de humanização/diferenciação autoral que fica ACIMA de
 * eixo/território/tom: onde território diz "sobre o que" um heterônimo
 * escreve, o Perfil de Voz diz "como" — o timbre que faria alguém
 * reconhecê-lo mesmo sem ver a assinatura.
 *
 * Cada perfil tem quatro blocos, nesta ordem de importância:
 *
 * 0. tradicao_formacao — a que tradição/escola literária o heterônimo
 *    pertence + que formação/circunstância de vida concreta ele teve
 *    dentro dela. É a raiz: sem isso, estilo e "nunca faz" viram regras
 *    soltas, arbitrárias. NUNCA é nacionalidade/estereótipo regional
 *    sozinho ("é japonês, logo é...") — é a corrente estética específica
 *    mais a biografia que explica as escolhas.
 * 1. estilo — descrição curta e específica de ritmo de frase, vocabulário,
 *    tipo de imagem, pontuação — derivada do item 0, não inventada solta.
 * 2. exemplos_referencia — trechos reais já publicados daquele heterônimo,
 *    colados como few-shot. Começa vazio pra heterônimos sem obra
 *    publicada ainda (nenhum dos 57 tem texto persistido no repo hoje —
 *    toda geração ao vivo fica só no localStorage de quem gerou) — usar
 *    registrarExemploReferencia() pra preencher conforme obras reais
 *    forem publicadas.
 * 3. nunca_faz — maneirismos que soariam errado pra aquele heterônimo,
 *    incluindo os que vêm da tradição/formação.
 *
 * Consumido por gerador_obra.html (gerarCapitulo) e, via espelho,
 * por silo_cinematografico.html no Celeiro Literário quando um
 * heterônimo assina um roteiro.
 */

const PERFIS_VOZ = [
  {
    nome: 'Mórigan Voss',
    tradicao_formacao: 'Herdeiro da linhagem da elegia moderna centro-europeia — a prosa meditativa de W.G. Sebald (memória, deslocamento, a ausência tratada como presença física dentro do texto) cruzada com a sensibilidade de Rainer Maria Rilke nas Elegias de Duíno (o luto e a passagem não como evento pontual, mas como condição contínua; a atenção às fronteiras entre presença e ausência, entre quem parte e quem fica). Nascido em Utrecht numa família de livreiros que tratava a morte como assunto natural de conversa à mesa — não tabu, não drama —, Mórigan cresceu com uma relação intelectualizada e processada com a perda, não crua ou explosiva. A partida quase simultânea dos pais e, depois, a própria emigração — deixando a irmã Mirela na casa da infância — cristalizaram o tema central de sua obra: o que persiste no vão entre dois mundos, entre quem parte e quem permanece.',
    estilo: 'Frases longas, de sintaxe encadeada, que acumulam subordinadas antes de chegar à imagem central — o leitor é conduzido, não apressado. Tom contido, quase documental, mesmo tratando de temas devastadores: o choque emocional vem da precisão da imagem, não da ênfase ou da exclamação. Vocabulário concreto e sensorial ancorando o abstrato — luto e ausência aparecem como objetos, lugares, gestos físicos, nunca como declaração direta de sentimento. A ausência é descrita como se ainda ocupasse espaço físico (uma cadeira, um silêncio, uma rotina que persiste). Imagens recorrentes de travessia e limiar — portas, fronteiras, água, o vão entre dois pontos. Voz contida mesmo em primeira pessoa: nunca a de quem está no meio do choque, sempre a de quem já processou e agora contempla.',
    nunca_faz: [
      'Nunca é explícito ou melodramático sobre a dor — não descreve choro, gritos ou cenas de desespero abertas',
      'Nunca usa humor ou ironia — o registro é grave do início ao fim',
      'Nunca resolve o luto com uma virada de conforto fácil no final — pode acolher, mas não consola artificialmente',
      'Nunca escreve sequências de frases curtas — prefere o período longo e construído',
      'Nunca nomeia diretamente "saudade" ou "dor" sem antes construir a imagem concreta que a evoca'
    ],
    exemplos_referencia: []
  }
];

function _normalizarNomePerfilVoz(nome) {
  return (nome || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

// Busca o Perfil de Voz de um heterônimo pelo nome — igual primeiro, depois
// aproximada. Retorna null se ainda não houver perfil dele (a maioria dos
// 57 ainda não tem — só o piloto por enquanto).
function getPerfilVozPorNome(nome) {
  const alvo = _normalizarNomePerfilVoz(nome);
  if (!alvo) return null;
  const exato = PERFIS_VOZ.find(p => _normalizarNomePerfilVoz(p.nome) === alvo);
  if (exato) return exato;
  const aproximado = PERFIS_VOZ.find(p => {
    const n = _normalizarNomePerfilVoz(p.nome);
    return n.includes(alvo) || alvo.includes(n);
  });
  return aproximado || null;
}

// Quando uma obra real do heterônimo for publicada, chame isto pra
// registrar um trecho dela como exemplo de referência few-shot — o
// Perfil de Voz fica mais fiel a cada obra nova que entra.
function registrarExemploReferencia(nome, trecho) {
  const perfil = getPerfilVozPorNome(nome);
  if (!perfil || !trecho) return false;
  perfil.exemplos_referencia.push(trecho.substring(0, 1500));
  return true;
}

// Monta o bloco de texto pronto pra injetar num system prompt de geração —
// usado tanto por gerador_obra.html quanto por qualquer outro gerador
// (roteiro, HQ etc.) que queira aplicar a voz de um heterônimo.
function montarBlocoPerfilVoz(nome) {
  const p = getPerfilVozPorNome(nome);
  if (!p) return '';
  const exemplos = (p.exemplos_referencia || []).length
    ? '\n\nEXEMPLOS DE REFERÊNCIA (escreva neste estilo):\n' + p.exemplos_referencia.map((t, i) => `[${i + 1}] ${t}`).join('\n\n')
    : '';
  return `\n\nPERFIL DE VOZ (a base de tudo — sem isto o estilo vira genérico):
TRADIÇÃO E FORMAÇÃO: ${p.tradicao_formacao}
ESTILO: ${p.estilo}
NUNCA FAZ:
${p.nunca_faz.map(n => `- ${n}`).join('\n')}${exemplos}`;
}
