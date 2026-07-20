/**
 * ELENCO BPL — triploohesigmalbpl (fonte de verdade)
 * -----------------------------------------------------
 * Os 50 atores oficiais do Banco de Personagens Literários — usados como
 * elenco de teatro/cinema/série nas produções. Consumido por
 * bpl_banco_personagens_literarios.html (o próprio banco/vitrine) e por
 * sala_ensaio.html (conversar com um ator antes de encomendar um roteiro).
 *
 * Espelhado em elenco_bpl_index.js no Celeiro Literário — se editar aqui,
 * replique lá.
 */

const ARTISTAS = 
[
  // DRAMA
  {id:'BPL-001',nome:'Isolde Vael Carrim',iniciais:'IV',origem:'África do Sul',genero:'F',especialidade:'drama',formatos:['cinema','teatro','serie'],personalidade:'Presença magnética e contida. Capaz de transmitir dor sem mover um músculo. Mestre do silêncio cênico.',fisico:'Alta, pele escura profunda, olhos castanhos intensos'},
  {id:'BPL-002',nome:'Esteban Morales Vega',iniciais:'EM',origem:'Colômbia',genero:'M',especialidade:'drama',formatos:['teatro','cinema','audiobook'],personalidade:'Voz grave e rouca que carrega décadas. Especialista em personagens que guardam segredos pesados.',fisico:'Forte, cabelo grisalho prematuro, expressão sempre pensativa'},
  {id:'BPL-003',nome:'Yuki Tanegawa',iniciais:'YT',origem:'Japão',genero:'F',especialidade:'drama',formatos:['anime','teatro','performance'],personalidade:'Precisão milimétrica nos movimentos. Expressão facial mínima, impacto máximo. Escola Nô e cinema de arte.',fisico:'Delicada, postura absolutamente ereta, quase estática'},
  {id:'BPL-004',nome:'Darius Mehrabani',iniciais:'DM',origem:'Irã',genero:'M',especialidade:'drama',formatos:['cinema','serie','videoclipe'],personalidade:'Olhar que atravessa a câmera. Especialista em figuras trágicas de alto nível moral.',fisico:'Esguio, barba densa, mãos expressivas'},
  {id:'BPL-005',nome:'Amara Diallo Keïta',iniciais:'AD',origem:'Guiné-Conacri',genero:'F',especialidade:'drama',formatos:['teatro','performance','cinema'],personalidade:'Energia teatral natural. Choro real, raiva real. Nunca simula — sempre está.',fisico:'Robusta, presença que domina o palco, voz de mezzo'},
  {id:'BPL-006',nome:'Mirela Szabo',iniciais:'MS',origem:'Hungria',genero:'F',especialidade:'tragedia',formatos:['teatro','cinema','audiobook'],personalidade:'Especialista em ruína elegante. Personagens que caem com dignidade absoluta.',fisico:'Angulosa, cabelo curto, olhos cinza-verdes'},
  {id:'BPL-007',nome:'Tomás Induni Leal',iniciais:'TI',origem:'Brasil — Rio Grande do Sul',genero:'M',especialidade:'drama',formatos:['teatro','serie','cinema'],personalidade:'Carisma silencioso. Não precisa falar muito — o corpo comunica. Estilo naturalista.',fisico:'Médio, ombros largos, jeito descuidado mas preciso'},

  // COMÉDIA
  {id:'BPL-008',nome:'Bridget Afolabi',iniciais:'BA',origem:'Nigéria',genero:'F',especialidade:'comedia',formatos:['teatro','serie','videoclipe'],personalidade:'Timing perfeito. Humor que nasce do absurdo do cotidiano. Nunca faz graça — ela só existe e é engraçado.',fisico:'Baixa, enérgica, expressões faciais ricas'},
  {id:'BPL-009',nome:'Serafino Conti Neri',iniciais:'SC',origem:'Itália — Nápoles',genero:'M',especialidade:'comedia',formatos:['teatro','performance','cinema'],personalidade:'Exagero calculado. Mestre da comédia física e da sátira política. Escola dell\'arte.',fisico:'Rechonchudo, gesticulação ampla, voz nasalada'},
  {id:'BPL-010',nome:'Park Jiwon',iniciais:'PJ',origem:'Coreia do Sul',genero:'M',especialidade:'comedia',formatos:['serie','animacao','videoclipe'],personalidade:'Ironia seca. O humor está no que ele não diz. Especialista em personagens que acham que são sérios.',fisico:'Alto, feições inexpressivas propositalmente, postura rígida'},
  {id:'BPL-011',nome:'Fatou Mbengue',iniciais:'FM',origem:'Senegal',genero:'F',especialidade:'comedia',formatos:['teatro','performance','serie'],personalidade:'Energia transbordante. Rir junto com ela é inevitável. Comédia que vem da alegria, não da ironia.',fisico:'Alta, sorriso amplo, movimentos expansivos'},
  {id:'BPL-012',nome:'Lucho Cienfuegos',iniciais:'LC',origem:'Peru',genero:'M',especialidade:'comedia',formatos:['teatro','cinema','animacao'],personalidade:'Personagens que se levam muito a sério em situações ridículas. Naturalismo cômico.',fisico:'Bigodinho, olhos expressivos, andar solene e absurdo'},

  // AÇÃO / AVENTURA
  {id:'BPL-013',nome:'Zara Nkemdirim',iniciais:'ZN',origem:'Nigéria',genero:'F',especialidade:'acao',formatos:['cinema','serie','performance'],personalidade:'Fisicamente imponente e precisa. Ação lúcida — sem excesso. Especialista em guerreiras silenciosas.',fisico:'Atlética, 1,80m, expressão determinada e calma'},
  {id:'BPL-014',nome:'Ren Bashir Khattak',iniciais:'RB',origem:'Paquistão',genero:'M',especialidade:'acao',formatos:['cinema','serie','videoclipe'],personalidade:'Velocidade e controle. Ação que parece dança. Escola de artes marciais e teatro físico.',fisico:'Ágil, compacto, olhar concentrado'},
  {id:'BPL-015',nome:'Ingrid Valkonen',iniciais:'IV',origem:'Finlândia',genero:'F',especialidade:'acao',formatos:['cinema','teatro','performance'],personalidade:'Fria como gelo, eficiente como máquina. Especialista em figuras de autoridade e combate.',fisico:'Loura, alta, postura militar'},
  {id:'BPL-016',nome:'Celestino Aguiar Fontes',iniciais:'CA',origem:'Brasil — Bahia',genero:'M',especialidade:'acao',formatos:['cinema','serie','videoclipe'],personalidade:'Explosivo quando precisa, calmo quando domina. Capoeira e teatro de rua como base.',fisico:'Musculoso, sorriso fácil que engana'},

  // SUSPENSE / NOIR
  {id:'BPL-017',nome:'Vera Silvestri Manzoni',iniciais:'VS',origem:'Itália — Milão',genero:'F',especialidade:'suspense',formatos:['cinema','serie','audiobook'],personalidade:'Femme fatale com consciência moral. Nunca é só vilã — tem razões. Olhar que revela e esconde ao mesmo tempo.',fisico:'Esguia, cabelo negro, movimentos lentos e calculados'},
  {id:'BPL-018',nome:'Konrad Brehmer',iniciais:'KB',origem:'Alemanha',genero:'M',especialidade:'suspense',formatos:['cinema','serie','teatro'],personalidade:'O homem que sabe de tudo mas fala pouco. Presença perturbadora. Especialista em antagonistas ambíguos.',fisico:'Pálido, olhos azuis frios, sorriso raro e desconcertante'},
  {id:'BPL-019',nome:'Layla Haddad Osman',iniciais:'LH',origem:'Sudão',genero:'F',especialidade:'suspense',formatos:['cinema','serie','performance'],personalidade:'Inteligência que assusta. Personagens que calculam três jogadas à frente. Suspense psicológico.',fisico:'Elegante, voz baixa e precisa, presença que incomoda'},
  {id:'BPL-020',nome:'Gavriil Petrov-Ilyich',iniciais:'GP',origem:'Rússia',genero:'M',especialidade:'suspense',formatos:['cinema','teatro','audiobook'],personalidade:'Peso existencial. Personagens que carregam o mundo como fardo escolhido. Noir filosófico.',fisico:'Grande, lento nos movimentos, olhar que parece acusar'},

  // ROMANCE
  {id:'BPL-021',nome:'Celeste Mourão Braga',iniciais:'CM',origem:'Brasil — Minas Gerais',genero:'F',especialidade:'romance',formatos:['cinema','serie','videoclipe'],personalidade:'Vulnerabilidade magnética. O espectador quer protegê-la e ao mesmo tempo teme por ela.',fisico:'Delicada, cabelo ondulado, olhos mel'},
  {id:'BPL-022',nome:'Olivier Chastenet',iniciais:'OC',origem:'França',genero:'M',especialidade:'romance',formatos:['cinema','teatro','videoclipe'],personalidade:'Charme sem esforço. O homem que não sabe que é irresistível — e isso é o que o torna irresistível.',fisico:'Moreno claro, sorriso assimétrico, gestos lentos e quentes'},
  {id:'BPL-023',nome:'Priya Subramaniam',iniciais:'PS',origem:'Índia — Tamil Nadu',genero:'F',especialidade:'romance',formatos:['cinema','animacao','videoclipe'],personalidade:'Amor que vem do centro. Não performa sentimento — ele acontece. Dança clássica indiana como formação.',fisico:'Pequena, olhos expressivos enormes, mãos que narram'},
  {id:'BPL-024',nome:'Rafael Queiroga Salave\'a',iniciais:'RQ',origem:'Brasil — Pernambuco',genero:'M',especialidade:'romance',formatos:['teatro','cinema','audiobook'],personalidade:'O amor que machuca com gentileza. Especialista em personagens que amam errado mas com sinceridade.',fisico:'Esguio, rosto expressivo, voz morna e próxima'},
  {id:'BPL-025',nome:'Nadia Oufkir',iniciais:'NO',origem:'Marrocos',genero:'F',especialidade:'romance',formatos:['cinema','serie','videoclipe'],personalidade:'Paixão mediterrânea com razão europeia. Conflito interno como motor. Amor que transforma.',fisico:'Alta, cabelo crespo solto, presença que aquece'},

  // EXPERIMENTAL
  {id:'BPL-026',nome:'Sable Huxley Owens',iniciais:'SH',origem:'Reino Unido — País de Gales',genero:'F',especialidade:'experimental',formatos:['performance','teatro','animacao'],personalidade:'Habita o espaço entre gêneros e formas. Desconstrução física e vocal. Teatro pós-dramático.',fisico:'Andrógina, movimentos não convencionais, voz que muda de registro'},
  {id:'BPL-027',nome:'Kenji Matsunaga Rios',iniciais:'KM',origem:'Brasil — São Paulo, descendente japonês',genero:'M',especialidade:'experimental',formatos:['performance','animacao','teatro'],personalidade:'Hibridismo cultural como linguagem. Corpo como texto. Butoh e teatro contemporâneo brasileiro.',fisico:'Compacto, movimentos imprevisíveis, rosto em constante transformação'},
  {id:'BPL-028',nome:'Asel Mamytbekova',iniciais:'AM',origem:'Quirguistão',genero:'F',especialidade:'experimental',formatos:['performance','teatro','videoclipe'],personalidade:'Tradição nômade e vanguarda ocidental fundidas. Uso de silêncio como dramaturgia.',fisico:'Pequena, pele dourada, olhos amendoados, presença hipnótica'},

  // TRAGÉDIA
  {id:'BPL-029',nome:'Adaeze Onwudiwe',iniciais:'AO',origem:'Nigéria — Igbo',genero:'F',especialidade:'tragedia',formatos:['teatro','cinema','audiobook'],personalidade:'A dor que enobrece. Personagens que perdem tudo mas não perdem a dignidade. Teatro grego revisitado.',fisico:'Imponente, cabelo trançado longo, voz de contralto'},
  {id:'BPL-030',nome:'Vasile Ionescu-Doran',iniciais:'VI',origem:'Romênia',genero:'M',especialidade:'tragedia',formatos:['teatro','cinema','audiobook'],personalidade:'O herói que cai por escolha própria. Compreende a tragédia como purificação. Escola romena clássica.',fisico:'Anguloso, cabelo escuro, olhar trágico natural'},

  // PERFIS VARIADOS — para cobrir diversidade
  {id:'BPL-031',nome:'Sunita Karmakar',iniciais:'SK',origem:'Bangladesh',genero:'F',especialidade:'drama',formatos:['cinema','serie','audiobook'],personalidade:'Resiliência como estética. Personagens que sobrevivem e transformam a sobrevivência em beleza.',fisico:'Miúda, força invisível, sorriso que guarda tristeza'},
  {id:'BPL-032',nome:'Marcus Elroy Thorne',iniciais:'ME',origem:'Jamaica',genero:'M',especialidade:'drama',formatos:['teatro','cinema','serie'],personalidade:'Ritmo caribenho na fala, peso africano no olhar. Personagens que transitam entre mundos culturais.',fisico:'Alto, largo, movimentos que lembram dança sem ser dança'},
  {id:'BPL-033',nome:'Florentina Oprea Vlad',iniciais:'FO',origem:'Romênia',genero:'F',especialidade:'comedia',formatos:['teatro','serie','animacao'],personalidade:'Ironia que não fere. Humor nascido da compaixão. Especialista em personagens que erram com elegância.',fisico:'Rechonchuda, óculos redondos, sorriso permanente'},
  {id:'BPL-034',nome:'Ibrahim Al-Rashid',iniciais:'IA',origem:'Jordânia',genero:'M',especialidade:'drama',formatos:['cinema','teatro','audiobook'],personalidade:'Dignidade árabe clássica. Personagens de honra que enfrentam escolhas impossíveis.',fisico:'Barba aparada, postura nobre, olhar que pesa'},
  {id:'BPL-035',nome:'Esperanza Villarreal',iniciais:'EV',origem:'México — Oaxaca',genero:'F',especialidade:'drama',formatos:['cinema','performance','teatro'],personalidade:'Terra, raiz e fúria suave. Mulheres indígenas fortes que o mundo tenta silenciar. Não silencia.',fisico:'Baixa, trança, cores vivas, presença que ocupa mais do que o corpo'},
  {id:'BPL-036',nome:'Nnamdi Achebe Osei',iniciais:'NA',origem:'Gana',genero:'M',especialidade:'acao',formatos:['cinema','serie','videoclipe'],personalidade:'Nobreza física e moral. O guerreiro que não quer guerrear mas sabe o que faz quando precisa.',fisico:'Muito alto, musculoso, movimentos de felino'},
  {id:'BPL-037',nome:'Valentina Russo Ferretti',iniciais:'VR',origem:'Brasil — São Paulo, italiana',genero:'F',especialidade:'romance',formatos:['cinema','serie','teatro'],personalidade:'Paixão com método. Ama com intensidade italiana mas pensa com precisão brasileira.',fisico:'Morena, cabelo volumoso, sorriso que conquista sem pedir permissão'},
  {id:'BPL-038',nome:'Taavi Mäkinen',iniciais:'TM',origem:'Estônia',genero:'M',especialidade:'suspense',formatos:['cinema','serie','audiobook'],personalidade:'Frio nórdico que guarda brasas. O antagonista que tem razão mas escolhe o caminho errado.',fisico:'Pálido, olhos claros, quase imóvel'},
  {id:'BPL-039',nome:'Chidinma Ezeh',iniciais:'CE',origem:'Nigéria — Enugu',genero:'F',especialidade:'comedia',formatos:['teatro','serie','videoclipe'],personalidade:'Alegria que nasce do chão. Comédia popular nigeriana com timing universal.',fisico:'Pequena, sorriso que toma o rosto inteiro, energia que não para'},
  {id:'BPL-040',nome:'Aleksandr Voronov',iniciais:'AV',origem:'Ucrânia',genero:'M',especialidade:'tragedia',formatos:['teatro','cinema','audiobook'],personalidade:'Peso histórico nos ombros. Personagens que carregam nações inteiras como destino pessoal.',fisico:'Grande, lento, olhar que conheceu guerras mesmo sem vivê-las'},
  {id:'BPL-041',nome:'Meera Pillai Nair',iniciais:'MP',origem:'Índia — Kerala',genero:'F',especialidade:'experimental',formatos:['performance','teatro','animacao'],personalidade:'Kathakali e teatro contemporâneo em um único corpo. Transformação como identidade.',fisico:'Pequena, olhos pintados expressivos, gestual preciso e sagrado'},
  {id:'BPL-042',nome:'Cássio Avelar Drummond',iniciais:'CA',origem:'Brasil — Rio de Janeiro',genero:'M',especialidade:'drama',formatos:['teatro','cinema','serie'],personalidade:'Malandro com alma. O anti-herói carioca que é impossível não amar mesmo quando erra.',fisico:'Esguio, sorriso diagonal, olhar esperto'},
  {id:'BPL-043',nome:'Áine Ní Bhriain',iniciais:'AB',origem:'Irlanda',genero:'F',especialidade:'romance',formatos:['teatro','cinema','audiobook'],personalidade:'Amor com raiz céltica. Personagens que amam além do razoável e encontram sabedoria nisso.',fisico:'Ruiva, sardas, olhos verdes, pele de mármore'},
  {id:'BPL-044',nome:'Hideo Watanabe Suzu',iniciais:'HW',origem:'Japão',genero:'M',especialidade:'suspense',formatos:['cinema','animacao','serie'],personalidade:'O detetive que encontrou a resposta mas hesita em revelá-la. Tensão como modo de existir.',fisico:'Compacto, cabelo liso preto, óculos finos'},
  {id:'BPL-045',nome:'Blessing Okonkwo',iniciais:'BO',origem:'Nigéria — Lagos',genero:'F',especialidade:'drama',formatos:['teatro','serie','cinema'],personalidade:'Força que vem de dentro para fora. Personagens que constroem o próprio destino sem pedir licença.',fisico:'Imponente, trança afro, voz que comanda'},
  {id:'BPL-046',nome:'Simón Arce Palomino',iniciais:'SA',origem:'Bolívia',genero:'M',especialidade:'drama',formatos:['teatro','cinema','performance'],personalidade:'Andino e contemporâneo. Personagens que guardam cosmovisão indígena dentro de narrativas urbanas.',fisico:'Baixo, rosto redondo, olhos escuros profundos'},
  {id:'BPL-047',nome:'Roksana Wiśniewska',iniciais:'RW',origem:'Polônia',genero:'F',especialidade:'tragedia',formatos:['teatro','cinema','audiobook'],personalidade:'Escola polonesa de Grotowski. Corpo como instrumento total. Tragédia como cerimônia.',fisico:'Alta, muito magra, presença que assusta e hipnotiza'},
  {id:'BPL-048',nome:'Chukwuemeka Eze',iniciais:'CE',origem:'Nigéria — Igbo',genero:'M',especialidade:'acao',formatos:['cinema','serie','videoclipe'],personalidade:'Herói que duvida. Força física com peso moral. Ação como consequência, não como prazer.',fisico:'Corpulento, cicatriz no queixo, olhar pesado mas gentil'},
  {id:'BPL-049',nome:'Luna Sepúlveda Araya',iniciais:'LS',origem:'Chile',genero:'F',especialidade:'experimental',formatos:['performance','teatro','videoclipe'],personalidade:'O corpo como manifesto político. Performance que incomoda e não pede desculpa.',fisico:'Alta, cabelo curto, tatuagens visíveis, postura desafiadora'},
  {id:'BPL-050',nome:'Ezra Blackwood-Osei',iniciais:'EB',origem:'Reino Unido — Londres, afro-britânico',genero:'M',especialidade:'drama',formatos:['teatro','cinema','audiobook'],personalidade:'Shakespeare e afrofuturismo no mesmo corpo. Erudição que nasce da rua. Verso e prosa com igual fluência.',fisico:'Alto, cabelo afro volumoso, dicção perfeita, mãos que gesticulam como um mestre'},
]

function getArtistaBplPorNome(nome) {
  const alvo = (nome || '').trim().toLowerCase();
  if (!alvo) return null;
  return ARTISTAS.find(a => a.nome.toLowerCase() === alvo) || null;
}
