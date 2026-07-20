/**
 * ELENCO MUSICAL — triploohesigmalbpl (fonte de verdade)
 * -----------------------------------------------------
 * Os artistas do Sigmal Music — cantores individuais (cat:'voz'),
 * instrumentistas (cat:'inst'), bandas (cat:'banda') e a orquestra
 * (cat:'orquestra'). Consumido por publicador_lote_musical.html (o próprio
 * publicador) e por sala_ensaio.html (conversar com um cantor antes de
 * encomendar uma letra/composição).
 *
 * Espelhado em elenco_musical_index.js no Celeiro Literário — se editar
 * aqui, replique lá.
 */

const TODOS = 
[
  // ===== ARTISTAS INDIVIDUAIS =====
  {id:'MUS-001',nome:'Isadora Vellini',ic:'🎤',orig:'Brasil — São Paulo, descendente italiana',cat:'voz',estilo:'classico',
   inst:'Soprano lírico',
   bio:'Isadora Vellini nasceu em São Paulo, filha de família ítalo-brasileira, e cresceu entre a tradição operística italiana e a musicalidade plural da metrópole paulistana. Sua voz de soprano lírico carrega a herança belcantista dos ancestrais e a expressividade aberta do Brasil. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Soprano lírico de primeiro escalão — voz que equilibra pureza italiana e calor brasileiro. Referência: Maria Callas com alma paulistana.'},

  {id:'MUS-002',nome:'Valentina Osei-Bonsu',ic:'🎤',orig:'Gana',cat:'voz',estilo:'classico',
   inst:'Mezzo-soprano',
   bio:'Nascida em Acra, Gana, Valentina Osei-Bonsu atravessou o Atlântico trazendo uma voz de mezzo-soprano que carrega a riqueza vocal da África Ocidental fundida à tradição lírica europeia. Sua presença cênica é inconfundível — grave, dourada e poderosa. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Mezzo-soprano de voz grave e dourada — a riqueza da África Ocidental na tradição lírica. Referência: Jessye Norman.'},

  {id:'MUS-003',nome:'Camille Dufresne',ic:'🎤',orig:'França',cat:'voz',estilo:'classico',
   inst:'Soprano lírico',
   bio:'Parisiense de nascimento e de espírito, Camille Dufresne representa a elegância e a clareza da escola vocal francesa. Sua voz de soprano é cristalina, precisa e delicada — feita para câmara e para o recital íntimo onde cada palavra importa tanto quanto cada nota. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Soprano de câmara — elegância francesa, clareza e precisão. Referência: Natalie Dessay.'},

  {id:'MUS-004',nome:'Fatimah Al-Rashid',ic:'🎤',orig:'Líbano',cat:'voz',estilo:'world',
   inst:'Voz árabe / Maqam',
   bio:'Nascida em Beirute, Fatimah Al-Rashid domina com maestria o sistema Maqam — a estrutura modal que fundamenta a música árabe clássica. Sua voz navega entre o sagrado e o profano da tradição do Oriente Médio com autenticidade e sensibilidade raras. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz árabe clássica — Maqam, ornamentação e emoção do Oriente Médio. Referência: Fairuz.'},

  {id:'MUS-005',nome:'Marco Ferretti',ic:'🎤',orig:'Itália — Nápoles',cat:'voz',estilo:'classico',
   inst:'Tenor lírico napolitano',
   bio:'Nascido em Nápoles, Marco Ferretti herdou a tradição do tenor napolitano — aquela voz que parece nascer do sol e do mar do sul da Itália. Seu timbre quente e sua dicção perfeita fazem dele um intérprete de referência tanto na ópera quanto na canzone napoletana. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Tenor napolitano — calor mediterrâneo, brilho e paixão. Referência: Luciano Pavarotti.'},

  {id:'MUS-006',nome:'Kwabena Asante',ic:'🎤',orig:'Gana',cat:'voz',estilo:'classico',
   inst:'Tenor dramático',
   bio:'Kwabena Asante nasceu em Kumasi, Gana, e desenvolveu um tenor dramático de rara potência — capaz de dominar os maiores teatros sem amplificação. Sua voz une a força vocal africana à tradição do tenor dramático europeu, criando uma presença única no cenário lírico. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Tenor dramático de potência extraordinária — força vocal africana na tradição europeia. Referência: Jonas Kaufmann.'},

  {id:'MUS-007',nome:'Hiroshi Tanaka',ic:'🎤',orig:'Japão',cat:'voz',estilo:'classico',
   inst:'Tenor lírico japonês',
   bio:'Natural de Quioto, Hiroshi Tanaka representa a escola vocal japonesa no canto lírico — precisão técnica absoluta, controle dinâmico impressionante e uma presença cênica que une a estética ocidental ao refinamento oriental. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Tenor lírico com precisão técnica japonesa — refinamento e controle absolutos. Referência: Shoji Goto.'},

  {id:'MUS-008',nome:'Viktor Melnyk',ic:'🎤',orig:'Ucrânia',cat:'voz',estilo:'classico',
   inst:'Barítono dramático',
   bio:'Natural de Lviv, Ucrânia, Viktor Melnyk possui um barítono dramático esculpido na tradição da escola vocal eslava — voz escura, poderosa e expressiva, capaz de transmitir profundidade emocional extraordinária. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Barítono dramático eslavo — escuridão, potência e profundidade emocional. Referência: Dmitri Hvorostovsky.'},

  {id:'MUS-009',nome:'Samuel Okafor',ic:'🎤',orig:'Nigéria',cat:'voz',estilo:'classico',
   inst:'Baixo profundo',
   bio:'Natural de Lagos, Nigéria, Samuel Okafor é dono de um baixo profundo que parece vir das entranhas da terra. Sua voz combina a ressonância natural africana com o domínio técnico do bel canto, criando um instrumento vocal de rara grandiosidade. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Baixo profundo de ressonância extraordinária — a gravidade vocal que ancora qualquer ensemble. Referência: Paul Robeson.'},

  {id:'MUS-010',nome:'Maristela Braga',ic:'🎤',orig:'Brasil — Bahia',cat:'voz',estilo:'mpb',
   inst:'Voz popular / MPB',
   bio:'Nascida em Salvador, Bahia, Maristela Braga carrega no timbre a musicalidade plural da capital cultural do Brasil — axé, samba, MPB e soul fundidos numa voz que é ao mesmo tempo raiz e contemporânea. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz MPB baiana — raiz afro-brasileira com sofisticação contemporânea. Referência: Gal Costa.'},

  {id:'MUS-011',nome:'Sebastião Neto',ic:'🎤',orig:'Brasil — Minas Gerais',cat:'voz',estilo:'mpb',
   inst:'Voz MPB masculina',
   bio:'Natural do interior de Minas Gerais, Sebastião Neto traz para a SIGMAL Music a voz do Brasil profundo — aquela que conta histórias de estradas de terra, de saudade e de beleza simples. Sua MPB tem cheiro de mato e gosto de cachaça boa. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz MPB do Brasil profundo — mineiridade, simplicidade e profundidade. Referência: Milton Nascimento.'},

  {id:'MUS-012',nome:'Dandara Quilombo',ic:'🎤',orig:'Brasil — Maranhão',cat:'voz',estilo:'folk',
   inst:'Voz / Percussão',
   bio:'Natural do Maranhão, Dandara Quilombo é cantora e percussionista — sua arte é inseparável da memória quilombola e da tradição do bumba-meu-boi. Voz e ritmo como forma de resistência e celebração. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz e percussão do Maranhão — resistência quilombola, bumba-meu-boi e identidade. Referência: Alcione.'},

  {id:'MUS-013',nome:'Jairo Silveira',ic:'🎤',orig:'Brasil — Rio de Janeiro',cat:'voz',estilo:'samba',
   inst:'Voz de samba',
   bio:'Carioca do morro, Jairo Silveira nasceu com o samba no sangue — no sentido mais literal e mais belo dessa expressão. Sua voz tem o swing, a malandragem e a alegria genuína do samba que nasce na roda, não no estúdio. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz de samba carioca — malícia, swing e alegria autêntica. Referência: Martinho da Vila.'},

  {id:'MUS-014',nome:'Conceição Palmares',ic:'🎤',orig:'Brasil — Bahia',cat:'voz',estilo:'samba',
   inst:'Voz de samba / axé',
   bio:'Natural de Salvador, Conceição Palmares é a voz que une o samba ao axé com elegância e força. Sua presença no palco é magnética — canta como quem reza e dança como quem liberta. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz samba-axé baiana — magnetismo, fé e celebração. Referência: Ivete Sangalo.'},

  {id:'MUS-015',nome:'Josephine Walker',ic:'🎤',orig:'Estados Unidos — Nova Orleans',cat:'voz',estilo:'jazz',
   inst:'Voz jazz / blues',
   bio:'Natural de Nova Orleans, Josephine Walker cresceu entre o jazz e o blues dos bares da Frenchmen Street — aquela música que só existe quando a vida e a arte se confundem por completo. Sua voz é fumaça, whiskey e alma. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz jazz e blues de Nova Orleans — fumaça, improviso e alma. Referência: Billie Holiday.'},

  {id:'MUS-016',nome:'Raymond Coltrane',ic:'🎤',orig:'Estados Unidos — Chicago',cat:'voz',estilo:'jazz',
   inst:'Voz de jazz',
   bio:'Natural de Chicago, Raymond Coltrane herdou o nome e o espírito do jazz mais profundo. Sua voz de barítono jazzístico improvisa melodias como se estivesse conversando — cada frase uma surpresa, cada nota uma escolha. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Barítono jazz de Chicago — improvisação, conversa e profundidade. Referência: Kurt Elling.'},

  {id:'MUS-017',nome:'Amina Coulibaly',ic:'🎤',orig:'Mali',cat:'voz',estilo:'world',
   inst:'Griot / voz mandinga',
   bio:'Natural de Bamako, Mali, Amina Coulibaly é griot — guardiã da memória oral de seu povo. Sua voz carrega séculos de história, de lamentação e de celebração da cultura mandinga. Canta em bambara, francês e português. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz griot do Mali — memória oral, tradição mandinga e força ancestral. Referência: Oumou Sangaré.'},

  {id:'MUS-018',nome:'Ruth Evangelista',ic:'🎤',orig:'Brasil — Pernambuco',cat:'voz',estilo:'gospel',
   inst:'Soprano gospel',
   bio:'Natural de Recife, Pernambuco, Ruth Evangelista dedica sua voz de soprano ao louvor — uma voz que não pertence a si mesma, mas ao que ela acredita ser maior do que qualquer palco. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Soprano gospel pernambucana — fé, entrega e poder vocal. Referência: Shirley Caesar.'},

  {id:'MUS-019',nome:'Pastor Elias Voz',ic:'🎤',orig:'Brasil — Minas Gerais',cat:'voz',estilo:'gospel',
   inst:'Barítono gospel',
   bio:'Natural de Uberlândia, Minas Gerais, o Pastor Elias Voz usa seu barítono poderoso como instrumento de fé e de comunidade. Sua voz tem a autoridade do púlpito e a ternura do pastor que conhece o nome de cada ovelha. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Barítono gospel mineiro — autoridade, ternura e fé inabalável. Referência: Thalles Roberto.'},

  {id:'MUS-020',nome:'Rosinha do Vale',ic:'🎤',orig:'Brasil — Ceará',cat:'voz',estilo:'folk',
   inst:'Voz / Viola caipira',
   bio:'Natural do sertão do Ceará, Rosinha do Vale canta e toca viola caipira com a autenticidade de quem aprendeu a música antes de aprender a ler. Sua arte é patrimônio vivo do Nordeste. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz e viola caipira nordestina — patrimônio vivo do sertão. Referência: Patativa do Assaré.'},

  {id:'MUS-021',nome:'Seu Maneco Aboio',ic:'🎤',orig:'Brasil — Sertão da Paraíba',cat:'voz',estilo:'folk',
   inst:'Aboiador',
   bio:'Natural do sertão da Paraíba, Seu Maneco Aboio é um dos últimos grandes aboiadores — aqueles que cantam para o gado, para o vento e para o silêncio do sertão. Sua arte é reconhecida como patrimônio imaterial. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Aboiador do sertão paraibano — patrimônio imaterial, voz livre e vento. Referência: tradição aboio nordestino.'},

  {id:'MUS-022',nome:'Siobhán Ní Faoláin',ic:'🎤',orig:'Irlanda',cat:'voz',estilo:'folk',
   inst:'Voz / Harpa celta',
   bio:'Natural do Condado de Galway, Irlanda, Siobhán Ní Faoláin canta em irlandês gaélico e toca harpa celta — uma combinação que evoca névoas, lendas e a melancolia bela das ilhas verdes do Atlântico. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz e harpa celta irlandesa — névoa, lenda e melancolia atlântica. Referência: Loreena McKennitt.'},

  {id:'MUS-023',nome:'Dmitri Balalaika',ic:'🎤',orig:'Rússia',cat:'voz',estilo:'folk',
   inst:'Voz / Balalaika',
   bio:'Natural de São Petersburgo, Dmitri Balalaika é cantor e instrumentista — sua voz de baixo-barítono e sua balalaika constroem juntas as paisagens sonoras da Rússia profunda, das estepes aos bosques de bétulas. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz e balalaika russa — estepes, melancolia eslava e alma profunda. Referência: Ivan Rebroff.'},

  {id:'MUS-024',nome:'Luana Star',ic:'🎤',orig:'Brasil — São Paulo',cat:'voz',estilo:'pop',
   inst:'Voz pop / R&B',
   bio:'Natural de São Paulo, Luana Star é a voz pop da SIGMAL Music — contemporânea, versátil e com presença de palco inegável. Seu R&B tem alma brasileira e produção internacional. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz pop e R&B contemporânea com alma brasileira. Referência: Anitta com profundidade de soul.'},

  {id:'MUS-025',nome:'Kevin Soul',ic:'🎤',orig:'Reino Unido — Londres',cat:'voz',estilo:'pop',
   inst:'Voz soul / pop',
   bio:'Natural de Londres, Kevin Soul cresceu entre o soul britânico e o pop global — sua voz carrega a sofisticação da cena musical londrina com a profundidade emocional que só o soul genuíno possui. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz soul e pop londrina — sofisticação britânica com profundidade emocional. Referência: Sam Smith.'},

  {id:'MUS-026',nome:'Adaeze Piano',ic:'🎹',orig:'Nigéria',cat:'inst',estilo:'classico',
   inst:'Piano clássico',
   bio:'Natural de Enugu, Nigéria, Adaeze Piano é pianista de formação clássica europeia e sensibilidade africana — uma combinação que resulta em interpretações de Chopin, Debussy e Ravel com coloração e profundidade únicas. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Pianista clássica com sensibilidade africana — Chopin e Debussy com nova coloração. Referência: Cecile Licad.'},

  {id:'MUS-027',nome:'Alexei Volkov',ic:'🎹',orig:'Rússia',cat:'inst',estilo:'classico',
   inst:'Piano — escola russa',
   bio:'Natural de Moscou, Alexei Volkov representa a grande tradição pianística russa — técnica sólida como pedra, musicalidade profunda como o inverno siberiano. Interpreta o repertório romântico com autoridade e convicção inabaláveis. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Pianista da escola russa — técnica e musicalidade de inverno siberiano. Referência: Sviatoslav Richter.'},

  {id:'MUS-028',nome:'Yoko Mitsui',ic:'🎻',orig:'Japão',cat:'inst',estilo:'classico',
   inst:'Violino concertista',
   bio:'Natural de Tóquio, Yoko Mitsui é violinista concertista de carreira internacional — sua técnica é impecável e sua musicalidade combina a disciplina japonesa com a expressividade que o repertório europeu exige. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Violinista concertista japonesa — disciplina e expressividade em equilíbrio perfeito. Referência: Midori.'},

  {id:'MUS-029',nome:'Pablo Casado',ic:'🎸',orig:'Espanha — Catalunha',cat:'inst',estilo:'classico',
   inst:'Violoncelo',
   bio:'Natural de Barcelona, Pablo Casado é violoncelista cuja sonoridade profunda e expressiva honra a tradição catalã do instrumento. Seu violoncelo fala — de melancolia, de beleza e de resistência. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Violoncelista catalão — sonoridade profunda e expressiva que fala de melancolia e beleza. Referência: Yo-Yo Ma.'},

  {id:'MUS-030',nome:'Asel Flautista',ic:'🎷',orig:'Quirguistão',cat:'inst',estilo:'world',
   inst:'Flauta / Kaval',
   bio:'Natural de Bisqueque, Quirguistão, Asel Flautista domina a flauta clássica e o kaval — instrumento ancestral das estepes da Ásia Central. Sua música evoca as vastas paisagens nômades de onde vem. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Flauta e kaval da Ásia Central — estepes nômades e ancestralidade sonora. Referência: música tradicional quirguiz.'},

  {id:'MUS-031',nome:'Jean-Pierre Hautbois',ic:'🎷',orig:'França',cat:'inst',estilo:'classico',
   inst:'Oboé',
   bio:'Natural de Lyon, Jean-Pierre Hautbois é oboísta de formação conservatorial francesa — seu instrumento, exigente e singular, produz sob seus dedos uma voz que nenhum outro instrumento pode imitar. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Oboísta da escola francesa — singularidade e precisão do instrumento mais difícil da orquestra. Referência: Heinz Holliger.'},

  {id:'MUS-032',nome:'Carlos Sax',ic:'🎷',orig:'Brasil — Rio de Janeiro',cat:'inst',estilo:'jazz',
   inst:'Saxofone tenor',
   bio:'Natural do Rio de Janeiro, Carlos Sax domina o saxofone tenor com o swing carioca e a profundidade jazzística de quem estudou Coltrane e Jobim com igual devoção. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Saxofonista tenor carioca — swing, Coltrane e Jobim em equilíbrio único. Referência: Paulinho Trompete.'},

  {id:'MUS-033',nome:'Leila Oud',ic:'🎸',orig:'Egito',cat:'inst',estilo:'world',
   inst:'Oud / Guitarra árabe',
   bio:'Natural do Cairo, Leila Oud é oudista — mestre do instrumento que é o ancestral de todas as guitarras do mundo. Sua música navega entre a tradição clássica árabe e a fusão contemporânea com mestria e respeito. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Oudista egípcia — o ancestral de todas as guitarras, com sabedoria árabe clássica. Referência: Naseer Shamma.'},

  {id:'MUS-034',nome:'Ravi Sitar',ic:'🎸',orig:'Índia — Varanasi',cat:'inst',estilo:'world',
   inst:'Sitar / Raga',
   bio:'Natural de Varanasi, cidade sagrada do norte da Índia, Ravi Sitar é sitarista de tradição Hindustani — sua música é meditação, é cosmologia, é a busca pelo som que conecta o humano ao divino. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Sitarista de Varanasi — raga, meditação e a busca pelo som sagrado. Referência: Ravi Shankar.'},

  {id:'MUS-035',nome:'Tomás Viola',ic:'🎸',orig:'Brasil — Goiás',cat:'inst',estilo:'folk',
   inst:'Viola caipira',
   bio:'Natural do interior de Goiás, Tomás Viola é tocador de viola caipira — aquele que conhece cada afinação, cada modo, cada tradição do instrumento mais brasileiro que o Brasil produziu. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Violeiro do cerrado goiano — tradição caipira, modos e profundidade. Referência: Almir Sater.'},

  {id:'MUS-036',nome:'Ibrahim Kora',ic:'🥁',orig:'Senegal',cat:'inst',estilo:'world',
   inst:'Kora / Percussão mandinga',
   bio:'Natural de Dacar, Senegal, Ibrahim Kora é tocador de kora — instrumento de 21 cordas que é ao mesmo tempo harpa e guitarra da África Ocidental. Sua música é a voz das histórias que não cabem em palavras. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Korista senegalês — 21 cordas de história mandinga e memória oral. Referência: Toumani Diabaté.'},

  {id:'MUS-037',nome:'Keiko Shamisen',ic:'🎸',orig:'Japão',cat:'inst',estilo:'world',
   inst:'Shamisen / Koto',
   bio:'Natural de Kyoto, Keiko Shamisen domina o shamisen e o koto — os dois instrumentos de cordas mais representativos da música tradicional japonesa. Sua arte preserva e reinventa a estética sonora do Japão. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Shamisen e koto de Kyoto — preservação e reinvenção da estética sonora japonesa. Referência: Yoko Ono instrumental.'},

  {id:'MUS-038',nome:'Percival Drums',ic:'🥁',orig:'Brasil — Salvador',cat:'inst',estilo:'mpb',
   inst:'Bateria / Percussão',
   bio:'Natural de Salvador, Percival Drums é baterista e percussionista que domina tanto a bateria moderna quanto os instrumentos de percussão afro-brasileiros — um músico que conecta o candomblé ao jazz com naturalidade e respeito. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Baterista e percussionista baiano — candomblé, MPB e jazz numa só batida. Referência: Airto Moreira.'},

  {id:'MUS-039',nome:'Luisa Harpa',ic:'🎻',orig:'Argentina',cat:'inst',estilo:'classico',
   inst:'Harpa orquestral',
   bio:'Natural de Buenos Aires, Luisa Harpa é harpista orquestral cuja sonoridade cristalina e técnica impecável a tornaram referência no instrumento em toda a América do Sul. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Harpista orquestral argentina — cristalino, preciso e de beleza transcendente. Referência: Lily Laskine.'},

  {id:'MUS-040',nome:'Ahmed Bendir',ic:'🥁',orig:'Marrocos',cat:'inst',estilo:'world',
   inst:'Percussão árabe / Darbuka',
   bio:'Natural de Marrakech, Ahmed Bendir domina a percussão árabe — darbuka, bendir e riq — com a velocidade e precisão que só décadas de prática ritual e performática produzem. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Percussionista árabe de Marrakech — velocidade, precisão e ritmo ritual do Magrebe. Referência: Hossam Ramzy.'},

  {id:'MUS-041',nome:'Olga Acordeão',ic:'🎹',orig:'Rússia — Sibéria',cat:'inst',estilo:'folk',
   inst:'Acordeão / Bayan',
   bio:'Natural da Sibéria, Olga Acordeão toca acordeão e bayan — instrumentos que aquecem o inverno russo e fazem dançar até quem tem frio na alma. Sua música é resistência e alegria no lugar mais frio do mundo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Acordeão e bayan siberiano — alegria que aquece o inverno mais longo do mundo. Referência: Friedrich Lips.'},

  {id:'MUS-042',nome:'Santiago Guitarra',ic:'🎸',orig:'Chile',cat:'inst',estilo:'folk',
   inst:'Guitarra clássica / Charango',
   bio:'Natural de Santiago do Chile, Santiago Guitarra domina a guitarra clássica e o charango — instrumento andino de alma indígena. Sua música percorre os Andes do norte ao sul com respeito e virtuosismo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra clássica e charango andino — dos Andes à sala de concerto. Referência: Víctor Jara.'},

  {id:'MUS-043',nome:'Mingus Contrabaixo',ic:'🎻',orig:'Estados Unidos — Nova York',cat:'inst',estilo:'jazz',
   inst:'Contrabaixo jazz',
   bio:'Natural de Nova York, Mingus Contrabaixo herdou o nome e o espírito do maior contrabaixista do jazz. Seu instrumento não acompanha — lidera, dialoga, conta histórias. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Contrabaixista de jazz nova-iorquino — o baixo que lidera e dialoga. Referência: Charles Mingus.'},

  {id:'MUS-044',nome:'Zhen Erhu',ic:'🎻',orig:'China',cat:'inst',estilo:'world',
   inst:'Erhu / Violino chinês',
   bio:'Natural de Xangai, Zhen Erhu domina o erhu — o violino de duas cordas que é a voz mais expressiva da música chinesa tradicional. Seu instrumento chora, ri e conta histórias milenares. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Erhu de Xangai — o violino chinês que chora e ri com igual intensidade. Referência: Er-Hu Ensemble Shanghai.'},

  {id:'MUS-045',nome:'Felix Contratenor',ic:'🎤',orig:'Alemanha',cat:'voz',estilo:'classico',
   inst:'Contratenor',
   bio:'Natural de Hamburgo, Felix Contratenor é contratenor — voz masculina de registro agudo que revive a tradição dos castrati barrocos com toda a dignidade e expressividade que a música antiga exige. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Contratenor alemão — voz barroca, expressividade e dignidade da música antiga. Referência: Andreas Scholl.'},

  {id:'MUS-046',nome:'Tadashi Falsete',ic:'🎤',orig:'Japão',cat:'voz',estilo:'classico',
   inst:'Contratenor / Voz de cabeça',
   bio:'Natural de Osaka, Tadashi Falsete é contratenor de voz de cabeça extraordinária — sua técnica une a tradição do canto japonês ao estilo lírico ocidental criando algo verdadeiramente único. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Contratenor japonês — fusão única entre tradição vocal japonesa e lirismo ocidental. Referência: Yoshikazu Mera.'},

  {id:'MUS-047',nome:'Elena Fado',ic:'🎤',orig:'Portugal — Lisboa',cat:'voz',estilo:'world',
   inst:'Voz de fado',
   bio:'Natural de Lisboa, Elena Fado nasceu no bairro de Alfama — o berço do fado. Sua voz carrega a saudade que só quem nasceu naquelas ruelas de pedra e sol pode genuinamente cantar. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz de fado de Alfama — saudade legítima, nascida nas ruelas de pedra de Lisboa. Referência: Amália Rodrigues.'},

  {id:'MUS-048',nome:'Carmen Flamenca',ic:'🎤',orig:'Espanha — Sevilha',cat:'voz',estilo:'world',
   inst:'Cante flamenco',
   bio:'Natural de Sevilha, Carmen Flamenca é cantaora de flamenco — arte que une voz, palma, guitarra e alma andaluza numa expressão de dor e beleza que não tem igual no mundo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Cantaora flamenca sevilhana — duende, pena negra e alma andaluza. Referência: Camarón de la Isla.'},

  {id:'MUS-049',nome:'Nino Georgiano',ic:'🎤',orig:'Geórgia',cat:'voz',estilo:'world',
   inst:'Voz polifônica georgiana',
   bio:'Natural de Tbilisi, Geórgia, Nino Georgiano domina a arte da polifonia georgiana — uma das tradições vocais mais antigas e complexas do mundo, declarada patrimônio imaterial da humanidade pela UNESCO. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Polifonia georgiana — patrimônio da UNESCO, tradição vocal de séculos. Referência: Ensemble Rustavi.'},

  {id:'MUS-050',nome:'Miriam Klezmer',ic:'🎤',orig:'Israel',cat:'voz',estilo:'world',
   inst:'Voz klezmer / cantora',
   bio:'Natural de Tel Aviv, Miriam Klezmer é cantora e instrumentista de klezmer — a música judaica da Europa Oriental que sobreviveu ao pior da história e continua celebrando a vida com energia e alegria inabaláveis. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz klezmer israelense — celebração da vida que sobreviveu à história. Referência: Noa.'},

  {id:'MUS-051',nome:'Duo Lua & Mar',ic:'🎵',orig:'Brasil — Rio de Janeiro',cat:'conjunto',estilo:'mpb',
   inst:'Duo — voz e violão',
   bio:'O Duo Lua & Mar nasceu da amizade entre dois músicos cariocas que descobriram que suas vozes — uma feminina, outra masculina — criavam juntas uma harmonia que nenhuma conseguia sozinha. MPB intimista, voz e violão, emoção sem exagero. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Duo de MPB carioca — intimismo, voz e violão em harmonia perfeita. Referência: Toquinho & Vinícius.'},

  {id:'MUS-052',nome:'Trio Árido',ic:'🎵',orig:'Brasil — Nordeste',cat:'conjunto',estilo:'folk',
   inst:'Trio — voz e percussão',
   bio:'O Trio Árido nasceu no semiárido nordestino — três músicos que transformaram a escassez em riqueza sonora. Voz, percussão e as notas que o vento do sertão ensina. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Trio nordestino do semiárido — escassez transformada em riqueza sonora. Referência: Trio Nordestino.'},

  {id:'MUS-053',nome:'Duo Sakura',ic:'🎵',orig:'Japão / Brasil',cat:'conjunto',estilo:'world',
   inst:'Duo — koto e voz',
   bio:'O Duo Sakura nasce da parceria entre uma kotista japonesa e uma cantora brasileira — dois mundos sonoros que descobriram que a cerejeira e a amendoeira têm a mesma flor quando a luz é certa. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Duo nipo-brasileiro — koto e voz, cerejeira e amendoeira na mesma luz. Referência: fusão única.'},

  {id:'MUS-054',nome:'Trio Jazz Marginal',ic:'🎵',orig:'Brasil — São Paulo',cat:'conjunto',estilo:'jazz',
   inst:'Trio jazz',
   bio:'O Trio Jazz Marginal nasceu nas margens do jazz convencional — três músicos paulistanos que tomaram o jazz como linguagem e o Brasil como sotaque. Piano, contrabaixo e bateria com alma de periferia. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Trio jazz paulistano da margem — jazz como linguagem, Brasil como sotaque. Referência: Hermeto Pascoal.'},

  {id:'MUS-055',nome:'Diana Synthesis',ic:'🎹',orig:'Alemanha — Berlim',cat:'inst',estilo:'eletrônico',
   inst:'Sintetizadores / Produção eletrônica',
   bio:'Natural de Berlim, Diana Synthesis é produtora e instrumentista eletrônica — filha da tradição techno berlinense e das possibilidades infinitas da síntese sonora contemporânea. Seu estúdio é um laboratório de futuros. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Produtora eletrônica berlinense — techno, síntese e futuros sonoros. Referência: Ellen Allien.'},

  {id:'MUS-056',nome:'Elo Experimental',ic:'🎹',orig:'Brasil — São Paulo',cat:'inst',estilo:'experimental',
   inst:'Produção experimental',
   bio:'Natural de São Paulo, Elo Experimental cria música que não tem nome ainda — sonoridades que ficam entre o ruído e a melodia, entre o acústico e o eletrônico, entre o passado e o que ainda não veio. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Produtor experimental paulistano — entre ruído e melodia, entre o passado e o que ainda não veio. Referência: Tom Zé.'},

  {id:'MUS-057',nome:'Tariq Electronic',ic:'🎹',orig:'Tunísia',cat:'inst',estilo:'eletrônico',
   inst:'Eletrônico / DJ',
   bio:'Natural de Tunis, Tariq Electronic transita entre a música árabe tradicional e a eletrônica contemporânea — seus sets são pontes entre o Mediterrâneo antigo e os clubes do século XXI. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'DJ e produtor tunisiano — ponte entre o Mediterrâneo antigo e os clubes do século XXI. Referência: Deena Abdelwahed.'},

  {id:'MUS-058',nome:'Renata Bolero',ic:'🎤',orig:'México',cat:'voz',estilo:'world',
   inst:'Voz de bolero / balada latina',
   bio:'Natural da Cidade do México, Renata Bolero é a voz do bolero latino-americano — aquela música que faz o coração doer de forma agradável, que conta histórias de amor e perda com elegância inigualável. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz de bolero mexicana — amor, perda e elegância latina inigualável. Referência: Chavela Vargas.'},

  {id:'MUS-059',nome:'Cléo Lunna',ic:'🎤',orig:'Brasil — Recife',cat:'voz',estilo:'mpb',
   inst:'Voz MPB / Manguebeat',
   bio:'Natural de Recife, Cléo Lunna carrega no timbre a revolução do Manguebeat — aquela fusão de maracatu, rock e eletrônico que colocou Recife no mapa da música mundial nos anos 90 e que ela reinterpreta para o século XXI. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz Manguebeat recifense — maracatu, rock e o futuro do Nordeste. Referência: Mundo Livre S/A.'},

  {id:'MUS-060',nome:'Abebe Girma',ic:'🎤',orig:'Etiópia',cat:'voz',estilo:'world',
   inst:'Voz etíope / Ethio-jazz',
   bio:'Natural de Adis Abeba, Abebe Girma é o representante do Ethio-jazz na SIGMAL Music — aquela fusão única de jazz americano com escalas etíopes que Mulatu Astatke imortalizou e que Abebe leva adiante com identidade própria. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Voz Ethio-jazz de Adis Abeba — escalas etíopes e jazz americano em fusão única. Referência: Mulatu Astatke.'},

  // ROVONILSON — especial
  {id:'MUS-ROV',nome:'Rovonilson Reigns Bautista',ic:'🎤',orig:'Brasil — Santo André, SP',cat:'voz',estilo:'rap',
   inst:'Rapper / Letrista',
   bio:'Natural de Santo André, São Paulo, Rovonilson Reigns Bautista é o único artista do ecossistema SIGMAL que atua simultaneamente na literatura e na música. Rapper de português correto e visão ampla, suas letras nascem das marquises, dos becos e das ruas da Grande São Paulo. Na SIGMAL Music, sua identidade musical é separada de sua identidade literária — aqui ele é intérprete e compositor de rap, não escritor. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Rapper da Grande São Paulo — marquises, rua, verdade e redenção pelo verso. Referência: Criolo com a consciência de Eminem.'},

  // ===== BANDAS =====
  {id:'BAND-001',nome:'Ferro & Chuva',ic:'🎸',orig:'Brasil',cat:'banda',estilo:'rock',
   inst:'Banda — Rock Brasileiro · Formação Completa',
   bio:'Ferro & Chuva é uma banda de rock brasileiro formada por quatro músicos de origens diversas que encontraram no som pesado com alma nordestina sua identidade. Guitarra que chora como viola, bateria que soa como baião — rock brasileiro de verdade. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Rock brasileiro com alma nordestina — guitarra que chora como viola. Referência: Legião Urbana com sotaque sertanejo.'},

  {id:'BAND-002',nome:'Noite de Sal',ic:'🎵',orig:'Brasil',cat:'banda',estilo:'jazz',
   inst:'Quinteto — Jazz / MPB · Formação Completa',
   bio:'Noite de Sal é um quinteto que jazz que cheira a bossa nova e fala português. Cinco músicos que se escutam mais do que se ouvem — uma banda onde o silêncio é tão importante quanto as notas. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Quinteto jazz-MPB — silêncio e escuta como linguagem principal. Referência: Quartet com sotaque brasileiro.'},

  {id:'BAND-003',nome:'Forró do Fim do Mundo',ic:'🎵',orig:'Brasil — Nordeste',cat:'banda',estilo:'forro',
   inst:'Trio — Forró Pé de Serra · Formação Clássica',
   bio:'O Forró do Fim do Mundo é um trio de forró pé de serra — zabumba, triângulo e sanfona. O trio que veio do sertão e levou o sertão com ele. Forró de raiz que faz dançar antes de perguntar se você sabe dançar. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Trio forró pé de serra — sertão, zabumba e sanfona que fazem dançar sem pedir licença. Referência: Luiz Gonzaga.'},

  {id:'BAND-004',nome:'Diáspora Sound System',ic:'🎵',orig:'Internacional',cat:'banda',estilo:'world',
   inst:'Coletivo — Afrobeat / Reggae / Eletrônico',
   bio:'Diáspora Sound System é um coletivo de seis músicos de três continentes que encontraram no groove o idioma universal. Afrobeat com eletrônico e reggae fundidos num som que só pode existir quando o mundo se encontra. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Coletivo afrobeat-reggae-eletrônico de três continentes — o groove como idioma universal. Referência: Fela Kuti atualizado.'},

  {id:'BAND-005',nome:'Câmara Negra',ic:'🎻',orig:'Internacional',cat:'banda',estilo:'classico',
   inst:'Quarteto — Música de Câmara / Contemporânea',
   bio:'Câmara Negra é um quarteto de cordas que interpreta do barroco ao contemporâneo com a mesma convicção e o mesmo amor pelo detalhe. Quatro cordas, um pensamento — a música de câmara como conversa entre iguais. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Quarteto de câmara — do barroco ao contemporâneo com convicção e amor pelo detalhe. Referência: Kronos Quartet.'},

  {id:'BAND-006',nome:'Tango Bruto',ic:'🎵',orig:'Argentina / Internacional',cat:'banda',estilo:'world',
   inst:'Quarteto — Tango Nuevo / Milonga',
   bio:'Tango Bruto é um quarteto que não pede licença — tango que não se desculpa por ser intenso, apaixonado e físico. Piazzolla como referência, Buenos Aires como alma, o mundo como palco. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Quarteto de tango nuevo — Piazzolla, intensidade e Buenos Aires sem pedir licença. Referência: Astor Piazzolla.'},

  {id:'BAND-007',nome:'Big Band do Celeiro',ic:'🎵',orig:'Brasil / Internacional',cat:'banda',estilo:'jazz',
   inst:'Big Band — Jazz / Swing / Funk',
   bio:'A Big Band do Celeiro é o som que toma conta do espaço — dezesseis músicos que se movem como um, criando jazz, swing e funk com a grandiosidade que só uma big band pode oferecer. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Big band de jazz, swing e funk — grandiosidade que só dezesseis músicos juntos criam. Referência: Count Basie Orchestra.'},

  {id:'BAND-008',nome:'Al-Andalus',ic:'🎵',orig:'Internacional — Mediterrâneo',cat:'banda',estilo:'world',
   inst:'Quinteto — Música do Mundo / Flamenco / Árabe / Fado',
   bio:'Al-Andalus é um quinteto que reencontra o Mediterrâneo perdido — flamenco, música árabe e fado fundidos no que um dia foi a Andaluzia plural. Cinco músicos de três continentes que têm em comum a saudade de um lugar que nunca existiu mas que devia ter existido. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Quinteto mediterrâneo — flamenco, árabe e fado na Andaluzia que devia ter existido. Referência: Loreena McKennitt encontra flamenco.'},

  {id:'BAND-009',nome:'Ângelus Prime',ic:'🎵',orig:'Internacional',cat:'banda',estilo:'classico',
   inst:'Sexteto Vocal — Gregoriano Pop / 2 Vozes Femininas',
   bio:'Ângelus Prime é um sexteto vocal que transita entre o silêncio da abadia e a grandiosidade do pop orquestral. Entre o silêncio da abadia e a grandiosidade do estádio — seis vozes que cantam como se o sagrado e o popular fossem a mesma coisa. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Sexteto vocal gregoriano-pop — entre o sagrado e o espetacular. Referência: Il Divo com alma gregoriana.'},

  // ===== ORQUESTRA =====
  {id:'ORQUESTRA',nome:'Orquestra Filarmônica do Celeiro Literário',ic:'🎻',orig:'Celeiro Literário — Instituto Cultural',cat:'orquestra',estilo:'classico',
   inst:'Orquestra Filarmônica permanente — Cordas, Sopros Metais, Sopros Madeiras, Percussão & Teclados',
   bio:'A Orquestra Filarmônica do Celeiro Literário é a entidade musical permanente do Instituto Cultural. Com formação flexível que se expande conforme a obra, a Filarmônica reúne músicos de diferentes tradições e origens sob uma única proposta: a música como linguagem universal que atravessa fronteiras e conecta o literário ao sonoro. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Orquestra filarmônica permanente do Instituto — música como linguagem universal que conecta o literário ao sonoro. Referência: Filarmônica de Berlim com alma brasileira.'},
];

function getArtistaMusicalPorNome(nome) {
  const alvo = (nome || '').trim().toLowerCase();
  if (!alvo) return null;
  return TODOS.find(a => a.nome.toLowerCase() === alvo) || null;
}
