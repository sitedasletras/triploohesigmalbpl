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
  'Regra de três: enumerar tudo em trincas — três adjetivos, três frases curtas separadas por vírgula, OU três sentenças fragmentadas em sequência, cada uma fechada com PONTO FINAL, imitando cadência de clímax (ex.: "A pedra. O cadeado nos animais mortos. O silêncio." — mesmo vício da trinca, só que pontuado como três frases isoladas em vez de vírgulas; é IGUALMENTE vício mesmo cada fragmento sendo gramaticalmente uma frase completa). Some tudo numa frase corrida com vírgula e "e" quando os três itens pertencem à mesma ideia (ex. de correção: "A pedra, o cadeado ainda nos animais mortos e o silêncio brutal."), ou varie o número de itens — dois, quatro, um só — em vez de forçar exatamente três.',
  'Cláusulas penduradas: gerúndio ou particípio jogado no fim da frase só pra soar mais importante, sem acrescentar informação nova ("...moldando um novo capítulo da história"). Corte, ou substitua por uma imagem concreta.',
  'Falsos espectros: construções "de X a Y" que fingem uma escala contínua onde só há duas coisas soltas e vagamente parecidas ("de encontros íntimos a movimentos globais"). Se não existe uma escala real, não finja uma.',
  'Resumo compulsivo: fechar parágrafo ou texto reafirmando o que acabou de ser dito ("em suma", "no fim das contas", "de modo geral"). Termine no último fato ou imagem, não numa síntese.',
  'Inflação de importância: chamar fato comum de "decisivo", "transformador", "parte de um movimento maior" sem nada que sustente o peso. Deixe o fato falar do tamanho dele sozinho.',
  'Vocabulário de piloto automático: "mergulhar em", "tapeçaria", "testemunho de", "sublinhar", "fundamental", "essencial", "cenário", "rico", "vibrante", "fomentar", "crucial" — usados como enchimento abstrato em vez de imagem concreta e específica.',
  'Paralelismo negativo em série: "não é só X, é Y" repetido como muleta retórica ("não é um lançamento, é uma mudança de era"). No máximo uma vez por texto longo, nunca como padrão recorrente.',
  'Atribuição vaga (weasel wording): "dizem que", "é visto como", "especialistas apontam" sem nomear quem — jogando a autoridade da frase pra uma fonte que não existe. Se não há uma fonte concreta na ficção, não finja que há.',
  'Tom promocional parelho: adjetivo de propaganda ("de tirar o fôlego", "imperdível", "único") aplicado a qualquer coisa, sem hierarquia real de intensidade — tudo soa igualmente incrível, e por isso nada soa.',
  'Simetria de superfície: parágrafos do mesmo tamanho, frases do mesmo comprimento, ritmo regular demais. Escrita humana varia — frase de duas palavras ao lado de uma de quarenta, parágrafo curto quebrando um bloco longo.',
  'Diálogo em fôrma fixa: usar sempre a mesma construção "— Fala — verbo dicendi — continuação da fala." (travessão, fala, travessão, verbo dicendi, travessão, resto da fala no MESMO parágrafo) em praticamente toda linha de diálogo. Esse formato existe e é válido pra fala genuinamente interrompida e retomada (Chicago Manual of Style o reconhece), mas IA o repete como padrão fixo em vez de reservá-lo pra interrupções reais — e travessão em excesso (3-5x a taxa de autores humanos) já é, por si só, sinal reconhecido de texto gerado. Varie a FORMA e a POSIÇÃO do verbo dicendi: termine a fala com ponto logo após o verbo dicendi e comece um parágrafo novo pra continuação ("— Fala — disse ele.\\n— Continuação."), ou junte fala e tag numa linha só sem retomar no mesmo parágrafo, ou coloque o dicendi ANTES da fala ("Disse ele: — Fala."). O que NÃO pode variar é a presença da identificação — ver o item "Diálogo sem identificação de quem fala" abaixo. Reserve o travessão-retomada só pra quando o personagem é de fato cortado e recomeça a MESMA frase.',
  'Diálogo sem identificação de quem fala: numa cena com dois ou mais personagens trocando falas, é OBRIGATÓRIO deixar claro quem está falando em cada fala — verbo dicendi (disse, perguntou, respondeu, gritou...) junto do nome ou pronome do personagem, ou uma ação/gesto do próprio personagem colado à fala. É um vício DIFERENTE do "Diálogo em fôrma fixa" acima (que é sobre repetir a MESMA construção): aqui o erro é o oposto — várias falas em sequência sem NENHUMA marcação de quem fala, texto que "soa natural" mas deixa o leitor perdido sobre quem disse o quê (relatado na prática: um diálogo de duas pessoas ficou tão embaralhado que nem o autor conseguiu acompanhar). Nunca deixe mais de duas ou três falas seguidas sem identificar o falante pelo menos uma vez. Exemplo do formato certo: "— Quem comeu a bolacha? — perguntou Juquinha.\\n— Foi eu! — respondeu Amélia." Isso vale pra QUALQUER geração de texto narrativo do sistema — obra, capítulo, conto, romance, híbrido — não só pro Humanizador.',
  'Fala sem marcação: colocar uma linha de diálogo direto dentro do parágrafo de narração sem travessão nenhum separando fala de narração (ex.: "João, feche a porta, disse José" solto no meio do texto corrido). Todo diálogo direto tem que abrir com travessão (—) no início da linha da fala — "— João, feche a porta — disse José." ou "— João, feche a porta. / — Disse José." Sem essa marcação, o leitor não distingue onde a fala começa.',
  'Parágrafo maratona: parágrafo de prosa esticado por quase meia página é a marca mais óbvia de texto gerado por IA — pontos importantes ficam perdidos no meio do bloco. Quando a cena pedir mais fôlego, quebre em dois ou três parágrafos curtos em vez de um bloco só longo.',
  'Frase maratona: o limite de tamanho é por FRASE, não por parágrafo — cada frase mira até ~30 palavras, sem estourar muito acima disso; abaixo de 30 é livre (frase de três palavras é tão válida quanto uma de vinte). Um parágrafo pode ter qualquer tamanho DESDE QUE seja feito de várias frases dentro desse limite — a frase muito longa, com várias orações encadeadas por vírgula até perder o fôlego, é o sinal de piloto automático, não o parágrafo em si.',
  'Dois-pontos de efeito: usar ":" pra criar uma pausa dramática antes de uma "revelação" ou resumo fora de diálogo, lista ou citação direta ("O que restou foi mais concreto: vinte e três libras de ferro."). É pontuação usada como truque de suspense em vez de deixar a frase carregar o próprio peso — reserve dois-pontos pra listas de verdade, citações diretas ou explicações técnicas.',
  'Travessão como parêntese de narração: usar um travessão — ou par de travessões — pra encaixar uma ação, gesto ou observação de narrador NO MEIO de uma frase que não é diálogo (ex.: "A autoridade não estava na patente — estava no fato de que chegara antes de todos."). É marca reconhecida de texto gerado por IA. O conserto mais simples e correto costuma ser trocar o travessão por vírgula ("A autoridade não estava na patente, estava no fato de que chegara antes de todos.") — não precisa reestruturar a frase inteira nem inventar uma solução mais rebuscada; se a vírgula já lê natural, é essa a correção. Travessão fica reservado pra diálogo (ver "Diálogo em fôrma fixa" e "Fala sem marcação" acima) ou pra um corte real e abrupto no meio da frase, nunca pra parênteses disfarçado.',
  'Variação elegante (troca forçada de sinônimo): trocar o nome de uma mesma pessoa, lugar ou coisa por um sinônimo diferente a cada menção só pra evitar repetir a palavra (ex.: "o protagonista... o rapaz... o jovem... o herói..." — quatro expressões diferentes apontando pra UMA SÓ pessoa em sequência). Nomeie do jeito mais natural pro contexto — nome próprio ou "ele/ela" na maior parte das vezes — e só troque de termo quando há um motivo real (mudança de ponto de vista, tom, ironia), nunca só pra variar a palavra.',
  'Fuga da cópula: trocar um simples "é/está/são" por um verbo mais elaborado só pra soar mais sofisticado ("configura-se como", "se apresenta como", "figura como", "constitui-se em"). Se a frase é "X é Y", escreva "X é Y" — use um verbo mais rico só quando ele realmente acrescenta uma imagem ou ação, nunca como disfarce de uma frase simples.',
  'Vazamento de fala de assistente de IA: frases que soam como resposta de chatbot escapando pro meio da narrativa — "espero que isso ajude", "aqui está o que você pediu", "posso continuar?", "como modelo de linguagem", ou qualquer comentário que quebra a quarta parede se dirigindo a "você" como se fosse um assistente respondendo um pedido, fora da ficção. Isso não pode aparecer NUNCA, nem por acidente — é o sinal mais grosseiro de todos, denuncia geração automática na cara. Cuidado à parte com "claro!" isolado: como resposta afirmativa DENTRO de um diálogo entre personagens da própria ficção (ex.: "— Você vem comigo? — Claro!") é fala natural e comum do português brasileiro, NÃO é vício — só vira vício quando abre uma resposta fora do diálogo da cena, no tom de chatbot atendendo um pedido (ex.: um bloco de texto que começa "Claro! Aqui está sua história:").',
  'Drama telegráfico em série: encadear várias frases curtas e cortantes seguidas só pra fabricar clima de suspense ou drama (ex.: "O medo chegou primeiro. Depois veio o silêncio. Por fim, a certeza. Não havia mais volta."). Uma frase curta isolada, pra dar ênfase pontual, funciona bem — uma SEQUÊNCIA de quatro, cinco fragmentos cortados em fila já soa fabricado e mecânico (se o vício aparecer em exatamente três frases, ver também "Regra de três" acima — é o mesmo problema, generalizado pra qualquer tamanho de série). Corrija juntando parte dos fragmentos numa frase corrida, ou deixando só um corte de verdade em vez de vários.'
];

// Monta o bloco pronto pra injetar em qualquer system prompt de geração —
// chamar sempre, independente de o heterônimo ter Perfil de Voz ou não.
//
// O preâmbulo de calibração de voz e o rodapé de falsos-positivos (abaixo)
// vieram de comparar este checklist com a skill open-source "humanizer"
// (github.com/blader/humanizer, baseada na mesma fonte — o ensaio da
// Wikipédia "Signs of AI writing") — duas peças que faltavam aqui: (1)
// nenhuma regra dizia o que fazer quando o checklist genérico esbarra
// numa peculiaridade real do Perfil de Voz de um heterônimo; (2) o
// checklist só listava vícios a evitar, sem nenhuma orientação de quando
// NÃO marcar algo como vício — o que causa correções em cima de escolhas
// estilísticas legítimas.
// opts.formatoRoteiro: true quando o material é roteiro/escaleta/peça de
// teatro (dialogo marcado por cabeçalho de personagem, não travessão) —
// achado do Codex no PR #27 do CeleiroLiterario: a regra "Fala sem
// marcação" abaixo exige travessão em TODO diálogo direto, o que conflita
// com o formato profissional de roteiro pedido em silo_cinematografico.html.
function montarBlocoAntiIA(opts) {
  const notaRoteiro = (opts && opts.formatoRoteiro)
    ? `\n\nNOTA DE FORMATO — ROTEIRO/ESCALETA/PEÇA DE TEATRO: a regra "Fala sem marcação" acima (exigir travessão em todo diálogo direto) NÃO se aplica aqui. Este material usa a convenção profissional de roteiro/teatro, onde a fala é marcada por CABEÇALHO DE PERSONAGEM (nome do personagem, em maiúsculas ou seguido de dois-pontos, numa linha própria acima da fala) — não por travessão. Só use travessão se houver trecho de narração/sinopse em prosa fora do bloco de cena. As demais regras do checklist (regra de três, parágrafo maratona, vocabulário de piloto automático, vazamento de fala de assistente de IA etc.) continuam valendo normalmente pras descrições de ação, indicações de cena e blocos narrativos.`
    : '';
  return `\n\nCHECKLIST ANTI-PADRÃO-DE-IA (aplica-se sempre, é a base mínima de qualquer texto seu — evite estes ${PADROES_ANTI_IA.length} vícios que denunciam texto gerado em piloto automático):

IMPORTANTE — quando este checklist entrar em conflito com o Perfil de Voz de um heterônimo específico (se houver um bloco de voz junto neste prompt): o Perfil de Voz VENCE. Estes vícios genéricos existem pra impedir que QUALQUER autor soe como piloto automático — mas se a voz peculiar do heterônimo já usa travessão com mais frequência que o normal, repete uma palavra de propósito como marca de estilo, ou tem qualquer outra peculiaridade documentada no Perfil de Voz, isso é ASSINATURA AUTORAL, não vício de IA. Nunca lime uma peculiaridade real do heterônimo achando que está corrigindo um vício.

${PADROES_ANTI_IA.map((p, i) => `${i + 1}. ${p}`).join('\n')}

O QUE NÃO É VÍCIO (evite falso positivo — procure AGRUPAMENTOS de vícios, nunca marque por uma ocorrência isolada): um travessão sozinho não é sinal de nada (só travessão em EXCESSO CONSTANTE é); um "porém"/"contudo" usado uma vez é normal; vocabulário culto ou técnico legítimo pro contexto da cena não é "vocabulário de piloto automático"; uma frase curta isolada pra dar ênfase é recurso válido, não é "drama telegráfico"; um detalhe muito específico e estranho geralmente é sinal de escrita HUMANA, não o oposto — não simplifique um detalhe estranho achando que está "limpando" o texto.${notaRoteiro}`;
}
