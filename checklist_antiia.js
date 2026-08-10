/**
 * CHECKLIST ANTI-PADRÃO-DE-IA — triploohesigmalbpl
 * -------------------------------------------------
 * Camada universal de humanização, aplicada a TODA geração de texto do
 * sistema (obra, capítulo, sinopse, roteiro), com ou sem Perfil de Voz.
 * Não substitui o Perfil de Voz (perfis_voz.js) — o Perfil de Voz diz
 * COMO um heterônimo específico escreve; este checklist só remove os
 * vícios genéricos que fariam QUALQUER autor, humano ou não, soar como
 * texto gerado em piloto automático.
 *
 * Base de pesquisa: o ensaio da Wikipédia em inglês "Signs of AI writing"
 * (en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), compilado por
 * editores da Wikipédia a partir de milhares de edições suspeitas de IA
 * — cruzado com cobertura jornalística do mesmo ensaio (Forbes, "The 10
 * Giveaway Signs Of AI Writing, Wikipedia Reveals", set/2025) e análise
 * de vocabulário da Grammarly ("Common Words and Phrases in AI-Generated
 * Text"). Os dez itens abaixo são os padrões mais citados nessas fontes.
 */

const PADROES_ANTI_IA = [
  'Regra de três: enumerar tudo em trincas ("adjetivo, adjetivo e adjetivo" ou "frase curta, frase curta, e frase curta") pra parecer mais completo do que é. Varie o número de itens — dois, quatro, um só.',
  'Cláusulas penduradas: gerúndio ou particípio jogado no fim da frase só pra soar mais importante, sem acrescentar informação nova ("...moldando um novo capítulo da história"). Corte, ou substitua por uma imagem concreta.',
  'Falsos espectros: construções "de X a Y" que fingem uma escala contínua onde só há duas coisas soltas e vagamente parecidas ("de encontros íntimos a movimentos globais"). Se não existe uma escala real, não finja uma.',
  'Resumo compulsivo: fechar parágrafo ou texto reafirmando o que acabou de ser dito ("em suma", "no fim das contas", "de modo geral"). Termine no último fato ou imagem, não numa síntese.',
  'Inflação de importância: chamar fato comum de "decisivo", "transformador", "parte de um movimento maior" sem nada que sustente o peso. Deixe o fato falar do tamanho dele sozinho.',
  'Vocabulário de piloto automático: "mergulhar em", "tapeçaria", "testemunho de", "sublinhar", "fundamental", "essencial", "cenário", "rico", "vibrante", "fomentar", "crucial" — usados como enchimento abstrato em vez de imagem concreta e específica.',
  'Paralelismo negativo em série: "não é só X, é Y" repetido como muleta retórica ("não é um lançamento, é uma mudança de era"). No máximo uma vez por texto longo, nunca como padrão recorrente.',
  'Atribuição vaga (weasel wording): "dizem que", "é visto como", "especialistas apontam" sem nomear quem — jogando a autoridade da frase pra uma fonte que não existe. Se não há uma fonte concreta na ficção, não finja que há.',
  'Tom promocional parelho: adjetivo de propaganda ("de tirar o fôlego", "imperdível", "único") aplicado a qualquer coisa, sem hierarquia real de intensidade — tudo soa igualmente incrível, e por isso nada soa.',
  'Simetria de superfície: parágrafos do mesmo tamanho, frases do mesmo comprimento, ritmo regular demais. Escrita humana varia — frase de duas palavras ao lado de uma de quarenta, parágrafo curto quebrando um bloco longo.',
  'Diálogo em fôrma fixa: usar sempre a mesma construção "— Fala — verbo dicendi — continuação da fala." (travessão, fala, travessão, verbo dicendi, travessão, resto da fala no MESMO parágrafo) em praticamente toda linha de diálogo. Esse formato existe e é válido pra fala genuinamente interrompida e retomada (Chicago Manual of Style o reconhece), mas IA o repete como padrão fixo em vez de reservá-lo pra interrupções reais — e travessão em excesso (3-5x a taxa de autores humanos) já é, por si só, sinal reconhecido de texto gerado. Varie: termine a fala com ponto logo após o verbo dicendi e comece um parágrafo novo pra continuação ("— Fala — disse ele.\\n— Continuação."), ou dispense o verbo dicendi e deixe a ação/contexto identificar quem fala, ou junte fala e tag numa linha só sem retomar no mesmo parágrafo. Reserve o travessão-retomada só pra quando o personagem é de fato cortado e recomeça a MESMA frase.',
  'Fala sem marcação: colocar uma linha de diálogo direto dentro do parágrafo de narração sem travessão nenhum separando fala de narração (ex.: "João, feche a porta, disse José" solto no meio do texto corrido). Todo diálogo direto tem que abrir com travessão (—) no início da linha da fala — "— João, feche a porta — disse José." ou "— João, feche a porta. / — Disse José." Sem essa marcação, o leitor não distingue onde a fala começa.',
  'Parágrafo maratona: parágrafo de prosa esticado por quase meia página é a marca mais óbvia de texto gerado por IA — pontos importantes ficam perdidos no meio do bloco. Quando a cena pedir mais fôlego, quebre em dois ou três parágrafos curtos em vez de um bloco só longo.',
  'Frase maratona: o limite de tamanho é por FRASE, não por parágrafo — cada frase mira até ~30 palavras, sem estourar muito acima disso; abaixo de 30 é livre (frase de três palavras é tão válida quanto uma de vinte). Um parágrafo pode ter qualquer tamanho DESDE QUE seja feito de várias frases dentro desse limite — a frase muito longa, com várias orações encadeadas por vírgula até perder o fôlego, é o sinal de piloto automático, não o parágrafo em si.'
];

// Monta o bloco pronto pra injetar em qualquer system prompt de geração —
// chamar sempre, independente de o heterônimo ter Perfil de Voz ou não.
function montarBlocoAntiIA() {
  return `\n\nCHECKLIST ANTI-PADRÃO-DE-IA (aplica-se sempre, é a base mínima de qualquer texto seu — evite estes ${PADROES_ANTI_IA.length} vícios que denunciam texto gerado em piloto automático):
${PADROES_ANTI_IA.map((p, i) => `${i + 1}. ${p}`).join('\n')}`;
}
