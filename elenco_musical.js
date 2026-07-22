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

  {id:'MUS-061',nome:'Dean Wolfhardt',ic:'🎸',orig:'Reino Unido — Londres',cat:'inst',estilo:'rock',
   inst:'Guitarra hard rock — riffs pesados e power chords',
   bio:'Nascido em Londres, Dean Wolfhardt cresceu ouvindo os clássicos do hard rock britânico e forjou um estilo de riffs pesados, power chords e solos diretos ao ponto — sem frescura, só volume e atitude. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra hard rock — riffs pesados e solos diretos, sem rodeios. Referência: Angus Young com um pé no punk.'},

  {id:'MUS-062',nome:'Delmar Kingfish',ic:'🎸',orig:'Estados Unidos — Mississippi',cat:'inst',estilo:'blues',
   inst:'Guitarra blues do Delta — slide e fingerpicking',
   bio:'Criado às margens do rio Mississippi, Delmar Kingfish herdou o blues do Delta como quem herda uma língua materna — slide guitar chorosa, fingerpicking hipnótico e uma guitarra que parece contar histórias de décadas de estrada. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra blues do Delta — slide chorosa e fingerpicking hipnótico. Referência: B.B. King encontra Muddy Waters.'},

  {id:'MUS-063',nome:'Rafael Duende',ic:'🎸',orig:'Espanha — Jerez de la Frontera',cat:'inst',estilo:'world',
   inst:'Guitarra flamenca — toque de Jerez',
   bio:'Nascido em Jerez de la Frontera, berço do flamenco mais bravio, Rafael Duende toca guitarra com o "duende" que dá nome a ele — aquela emoção crua e incontrolável que os andaluzes dizem que não se aprende, só se tem. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra flamenca de Jerez — técnica virtuosística e emoção crua. Referência: Paco de Lucía.'},

  {id:'MUS-064',nome:'Miles Cordier',ic:'🎸',orig:'França — Paris',cat:'inst',estilo:'jazz',
   inst:'Guitarra de jazz cigano — swing manouche',
   bio:'Parisiense de origem cigana, Miles Cordier carrega a tradição do jazz manouche nas mãos — cordas de aço, swing acelerado e uma técnica de mão direita que parece impossível de acompanhar. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra de jazz cigano — swing manouche velocíssimo. Referência: Django Reinhardt.'},

  {id:'MUS-065',nome:'Sven Thornheart',ic:'🎸',orig:'Suécia — Gotemburgo',cat:'inst',estilo:'metal',
   inst:'Guitarra metal neoclássica — shred técnico',
   bio:'Nascido em Gotemburgo, Sven Thornheart fundiu a técnica da música clássica europeia com a velocidade e a distorção do metal — escalas neoclássicas em velocidade vertiginosa, um shredder que estudou Bach antes de estudar Marshall. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra metal neoclássica — shred técnico em velocidade vertiginosa. Referência: Yngwie Malmsteen.'},

  {id:'MUS-066',nome:'Vinícius Marear',ic:'🎸',orig:'Brasil — Rio de Janeiro',cat:'inst',estilo:'mpb',
   inst:'Violão de bossa nova — batida sincopada',
   bio:'Carioca da gema, Vinícius Marear toca violão com a batida sincopada e o volume baixinho que definiram a bossa nova — cada acorde soa como se fosse sussurrado de propósito, pra caber na sala de qualquer apartamento de Copacabana. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Violão de bossa nova — batida sincopada e volume sussurrado. Referência: João Gilberto.'},

  {id:'MUS-067',nome:'Tucker Lonestar',ic:'🎸',orig:'Estados Unidos — Nashville',cat:'inst',estilo:'country',
   inst:'Guitarra country — fingerstyle e Telecaster',
   bio:'Criado nos arredores de Nashville, Tucker Lonestar domina o fingerstyle country e o twang inconfundível da Telecaster — guitarra que conta histórias de estrada, uísque e coração partido em cada bend. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra country — fingerstyle e twang de Telecaster. Referência: Chet Atkins.'},

  {id:'MUS-068',nome:'Nova Prisma',ic:'🎸',orig:'Reino Unido — Bristol',cat:'inst',estilo:'rock',
   inst:'Guitarra psicodélica — efeitos e bends expressivos',
   bio:'Nascida em Bristol, Nova Prisma constrói paisagens sonoras com pedais de efeito, feedback controlado e bends longos e expressivos — guitarra que não toca notas, pinta texturas. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra psicodélica — texturas de efeito e bends expressivos. Referência: David Gilmour.'},

  {id:'MUS-069',nome:'Anders Nordqvist',ic:'🎹',orig:'Suécia — Estocolmo',cat:'inst',estilo:'rock',
   inst:'Teclado rock de arena — sintetizadores dramáticos e power ballads',
   bio:'Nascido em Estocolmo, Anders Nordqvist aprendeu órgão de igreja antes de descobrir o sintetizador — e uniu as duas coisas num teclado que soa grandioso o bastante pra encher um estádio: camadas de synth-pad, arpejos brilhantes e aquele acorde de abertura que já anuncia que a balada vai ser enorme. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Teclado de rock de arena — camadas de sintetizador dramáticas pra power ballads. Referência: Mic Michaeli (Europe).'},

  {id:'MUS-070',nome:'Erik Stormheim',ic:'🎸',orig:'Suécia — Gotemburgo',cat:'inst',estilo:'rock',
   inst:'Guitarra de rock melódico de arena — solos memoráveis com raiz blues-rock',
   bio:'Nascido em Gotemburgo, Erik Stormheim cresceu entre o blues-rock britânico e o rock escandinavo de estádio — sua marca é o solo que qualquer pessoa consegue cantarolar depois de ouvir uma vez, melodia antes de velocidade, emoção antes de exibicionismo técnico. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra de rock melódico de arena — solos memoráveis, melodia antes de velocidade. Referência: John Norum (Europe).'},

  {id:'MUS-071',nome:'Roscoe Blackfire',ic:'🎸',orig:'Estados Unidos — Nova York',cat:'inst',estilo:'rock',
   inst:'Baixo de glam/shock rock — linha agressiva e teatral',
   bio:'Nascido no Queens, Nova York, Roscoe Blackfire toca baixo como quem cospe fogo no palco — linhas graves agressivas, groove pesado e uma presença cênica tão grande quanto o som do instrumento. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Baixo de glam/shock rock — groove pesado e presença de palco descomunal. Referência: Gene Simmons (KISS).'},

  {id:'MUS-072',nome:'Leona Kroll',ic:'🥁',orig:'Estados Unidos — Nova York',cat:'inst',estilo:'rock',
   inst:'Bateria de glam/hard rock — groove suingado e teatral',
   bio:'Também de Nova York, Leona Kroll bate a bateria com um suingue que vem do soul e do R&B antes de virar hard rock — menos sobre velocidade, mais sobre o groove que faz o público bater palma no tempo certo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Bateria de glam/hard rock — suingue de soul aplicado ao rock pesado. Referência: Peter Criss (KISS).'},

  {id:'MUS-073',nome:'Marcus Ironvein',ic:'🎸',orig:'Reino Unido — Londres',cat:'inst',estilo:'metal',
   inst:'Baixo metal — linhas galopantes em oitavas',
   bio:'Londrino, Marcus Ironvein toca baixo com aquela cavalgada característica do metal britânico — linhas rápidas em oitavas que correm paralelas à guitarra em vez de só sustentar o grave, dando à música uma urgência quase física. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Baixo metal — linhas galopantes que correm junto com a guitarra. Referência: Steve Harris (Iron Maiden).'},

  {id:'MUS-074',nome:'Katarzyna Voss',ic:'🥁',orig:'Polônia — Varsóvia',cat:'inst',estilo:'metal',
   inst:'Bateria metal — blast beats e pedal duplo de precisão',
   bio:'Nascida em Varsóvia, Katarzyna Voss domina o pedal duplo e o blast beat com uma precisão quase metronômica — bateria que soa como uma metralhadora afinada, base de qualquer faixa de metal que precise de peso e velocidade ao mesmo tempo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Bateria metal — blast beats e pedal duplo de precisão cirúrgica. Referência: Mikkey Dee.'},

  {id:'MUS-075',nome:'Otis Redmoor',ic:'🥁',orig:'Estados Unidos — Chicago',cat:'inst',estilo:'blues',
   inst:'Bateria blues/rock — suingue e backbeat pesado',
   bio:'Criado em Chicago, cidade que respira blues elétrico, Otis Redmoor bate uma bateria suingada e pesada ao mesmo tempo — o tipo de groove que faz uma sala inteira balançar a cabeça sem perceber. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Bateria blues/rock — suingue de Chicago com peso de estádio. Referência: John Bonham.'},

  {id:'MUS-076',nome:'Nadia Cordell',ic:'🎸',orig:'Estados Unidos — Ohio',cat:'inst',estilo:'funk',
   inst:'Baixo funk — slap e groove percussivo',
   bio:'Nascida em Ohio, Nadia Cordell toca baixo como se o instrumento fosse também percussão — thumb pesado, dedilhado rápido e aquele groove que faz o corpo se mexer antes da cabeça entender por quê. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Baixo funk — slap e groove percussivo irresistível. Referência: Larry Graham.'},

  {id:'MUS-077',nome:'Alistair Thorne',ic:'🎸',orig:'Reino Unido',cat:'inst',estilo:'rock',
   inst:'Guitarra hard rock/blues — riffs monumentais e afinações alternativas',
   bio:'Nascido no interior da Inglaterra, Alistair Thorne constrói riffs que viram hinos — afinações alternativas, arranjos quase orquestrais dentro de uma banda de quatro integrantes, e um jeito de tocar que mistura folk inglês, blues americano e mística oriental. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra hard rock/blues monumental — riffs que viram hino, afinações alternativas. Referência: Jimmy Page (Led Zeppelin).'},

  {id:'MUS-078',nome:'Desmond Ashgrove',ic:'🎸',orig:'Reino Unido',cat:'inst',estilo:'rock',
   inst:'Baixo e arranjos — versatilidade multi-instrumental',
   bio:'Multi-instrumentista discreto que prefere deixar o holofote pros outros, Desmond Ashgrove é o tipo de baixista que também arranja cordas, toca teclado e mandolin quando a música pede — o alicerce invisível que segura a banda inteira de pé. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Baixo e arranjos multi-instrumentais — o alicerce invisível da banda. Referência: John Paul Jones (Led Zeppelin).'},

  {id:'MUS-079',nome:'Callum Reeve',ic:'🎸',orig:'Reino Unido',cat:'inst',estilo:'rock',
   inst:'Guitarra fingerstyle — tom limpo e narrativo, sem palheta',
   bio:'Callum Reeve toca sem palheta, só com os dedos — um jeito de tocar limpo, econômico e narrativo, cada nota escolhida como se fosse uma palavra de uma história sendo contada. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra fingerstyle — tom limpo, econômico e narrativo. Referência: Mark Knopfler (Dire Straits).'},

  {id:'MUS-080',nome:'Warrick Sunderland',ic:'🥁',orig:'Reino Unido',cat:'inst',estilo:'pop',
   inst:'Bateria pop-rock — reverb portentoso e groove contido',
   bio:'Warrick Sunderland ficou famoso por um som de bateria que parece explodir dentro de uma sala vazia — reverb portentoso, groove contido que explode só no momento certo, e um instinto de produtor que sabe exatamente quando deixar o silêncio fazer o trabalho. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Bateria pop-rock — reverb portentoso e groove que explode no momento certo. Referência: Phil Collins.'},

  {id:'MUS-081',nome:'Nathaniel Cross',ic:'🎸',orig:'Reino Unido',cat:'inst',estilo:'blues',
   inst:'Guitarra blues-rock britânica — vibrato lento e fraseado contido',
   bio:'Nathaniel Cross aprendeu blues americano através de discos importados e devolveu ao mundo com um vibrato lento e um fraseado tão contido quanto expressivo — cada bend parece pesar uma vida inteira. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra blues-rock britânica — vibrato lento, fraseado contido e expressivo. Referência: Eric Clapton.'},

  {id:'MUS-082',nome:'Solomon Vale',ic:'🎸',orig:'Estados Unidos — Minnesota',cat:'inst',estilo:'funk',
   inst:'Guitarra funk-rock — virtuosismo genre-blending',
   bio:'Solomon Vale não escolhe entre funk, rock, pop e soul — toca tudo ao mesmo tempo, com uma técnica que parece brincar com a guitarra em vez de só tocá-la, sempre com um pé no palco e outro numa dimensão musical só dele. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra funk-rock genre-blending — virtuosismo teatral e imprevisível. Referência: Prince.'},

  {id:'MUS-083',nome:'Diego Marchetti',ic:'🎸',orig:'Estados Unidos — Los Angeles',cat:'inst',estilo:'rock',
   inst:'Guitarra hard rock melódica — solos bluesy de chapéu alto',
   bio:'Diego Marchetti nunca tira o chapéu, nem literal nem musicalmente — solos bluesy, melódicos e longos o bastante pra virar assinatura, tocados com uma guitarra que parece chorar e sorrir ao mesmo tempo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra hard rock melódica — solos bluesy longos e inconfundíveis. Referência: Slash (Guns N\'Roses).'},

  {id:'MUS-084',nome:'Trent Halloway',ic:'🎸',orig:'Estados Unidos — Nova Jersey',cat:'inst',estilo:'rock',
   inst:'Guitarra pop-metal de arena — talk box e riffs de refrão',
   bio:'Trent Halloway escreve riffs pensando no refrão que o estádio inteiro vai cantar junto — talk box, hooks impossíveis de esquecer, e a certeza de que rock de arena também pode ser sobre esperança. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra pop-metal de arena — talk box e riffs feitos pra cantar junto. Referência: Richie Sambora (Bon Jovi).'},

  {id:'MUS-085',nome:'Lachlan Moore',ic:'🎹',orig:'Austrália',cat:'inst',estilo:'pop',
   inst:'Teclado/violão de soft rock — baladas AOR lacrimosas',
   bio:'Lachlan Moore escreve baladas que parecem feitas pra tocar no rádio às três da manhã — arranjos aveludados, harmonias vocais imaginárias entre os acordes, e uma sinceridade quase ingênua que nunca sai de moda. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Teclado/violão de soft rock AOR — baladas aveludadas e sinceras. Referência: Air Supply.'},

  {id:'MUS-086',nome:'Hank Calloway',ic:'🎸',orig:'Estados Unidos — Memphis',cat:'inst',estilo:'rock',
   inst:'Guitarra rockabilly — slapback echo e swing dos anos 50',
   bio:'Nascido em Memphis, Hank Calloway toca guitarra com aquele eco de slapback que definiu o rock and roll antes de ele ter esse nome — swing de country, mordida de blues, tudo isso num único acorde. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra rockabilly — slapback echo, swing e as raízes do rock and roll. Referência: Scotty Moore (banda de Elvis Presley).'},

  {id:'MUS-087',nome:'Marvin Delacroix',ic:'🎷',orig:'Estados Unidos — Nova Orleans',cat:'inst',estilo:'soul',
   inst:'Trompete/naipe de metais — soul revue e big band de Vegas',
   bio:'Nascido em Nova Orleans, Marvin Delacroix lidera um naipe de metais que aprendeu a tocar junto, respirando junto, como se fossem um instrumento só — o tipo de trompete que dá o toque de show business em qualquer gravação. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Trompete/naipe de metais — soul revue e brilho de big band de Vegas. Referência: banda de metais de Elvis Presley.'},

  {id:'MUS-088',nome:'Freya Lindqvist',ic:'🎹',orig:'Finlândia',cat:'inst',estilo:'metal',
   inst:'Teclado metal sinfônico — orquestração e composição épica',
   bio:'Nascida na Finlândia, terra que produz mais bandas de metal per capita que qualquer outro lugar do mundo, Freya Lindqvist compõe teclado como quem escreve trilha de filme épico — cordas sintetizadas, coros fantasmagóricos, metal que soa como ópera. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Teclado de metal sinfônico — orquestração épica dentro do metal. Referência: Tuomas Holopainen (Nightwish).'},

  {id:'MUS-089',nome:'Joonas Kivimäki',ic:'🎸',orig:'Finlândia',cat:'inst',estilo:'metal',
   inst:'Guitarra power/metal sinfônico',
   bio:'Companheiro de banda finlandês de Freya, Joonas Kivimäki toca guitarra pesada o bastante pra segurar uma orquestra inteira atrás dele — riffs de power metal que servem a melodia, nunca competem com ela. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra de power/metal sinfônico — riffs que servem a melodia orquestral. Referência: Emppu Vuorinen (Nightwish).'},

  {id:'MUS-090',nome:'Selene Thornbury',ic:'🎹',orig:'Estados Unidos — Arkansas',cat:'inst',estilo:'metal',
   inst:'Piano/teclado gótico-sinfônico — atmosfera e melodrama',
   bio:'Selene Thornbury toca piano como quem escreve poesia gótica — acordes menores, cordas sintetizadas chorosas, e uma melancolia bonita o bastante pra soar bela em vez de só triste, tudo dentro de arranjos de metal sinfônico. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Piano/teclado gótico-sinfônico — melancolia bela dentro do metal. Referência: Evanescence.'},

  {id:'MUS-091',nome:'Dashiell Kwan',ic:'🎹',orig:'Estados Unidos — Califórnia',cat:'inst',estilo:'eletrônico',
   inst:'Turntables e programação — scratch e texturas eletrônicas dentro do rock',
   bio:'Dashiell Kwan trata o toca-discos como um instrumento de banda de rock — scratches que cortam entre os riffs de guitarra, samples e texturas eletrônicas que dão a um nu metal a sensação de hip-hop clandestino. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Turntables e programação — scratch e textura eletrônica dentro do rock pesado. Referência: Mr. Hahn (Linkin Park).'},

  {id:'MUS-092',nome:'Wyatt Callahan',ic:'🎻',orig:'Estados Unidos — Geórgia',cat:'inst',estilo:'country',
   inst:'Rabeca/fiddle country — swing tradicional honky-tonk',
   bio:'Wyatt Callahan aprendeu fiddle antes de aprender a andar de bicicleta — puro honky-tonk tradicional, o tipo de rabeca que faz qualquer pista de dança de rodeio se mexer sem pensar duas vezes. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Rabeca/fiddle country tradicional — swing puro de honky-tonk. Referência: banda de Alan Jackson.'},

  {id:'MUS-093',nome:'Boone Fairweather',ic:'🎸',orig:'Estados Unidos — Oklahoma',cat:'inst',estilo:'country',
   inst:'Pedal steel guitar — bends chorosos e textura country moderna',
   bio:'Boone Fairweather faz a pedal steel chorar exatamente na hora certa — aquele bend arrastado que é a assinatura sonora do country americano, tão em casa numa balada triste quanto num hino de estádio country. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Pedal steel guitar — bends chorosos, assinatura sonora do country. Referência: banda de Garth Brooks.'},

  {id:'MUS-094',nome:'Julian Ashworth',ic:'🎸',orig:'Reino Unido',cat:'inst',estilo:'pop',
   inst:'Violão/teclado disco — groove de quatro por quatro',
   bio:'Julian Ashworth escreve grooves que fazem qualquer pista de dança se mexer sozinha — violão percussivo, teclado brilhante, e aquele quatro-por-quatro inconfundível que virou sinônimo de disco nos anos 70. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Violão/teclado disco — groove de quatro por quatro irresistível. Referência: Bee Gees.'},

  {id:'MUS-095',nome:'Perpétuo Vance',ic:'🎷',orig:'Estados Unidos — Nova Jersey',cat:'inst',estilo:'soul',
   inst:'Saxofone rock — solos grandiosos e presença de arena',
   bio:'Perpétuo Vance toca saxofone como se estivesse gritando pra torcida do fundo do estádio — solos grandes, dramáticos, feitos pra parar a música inteira por dez segundos só pra deixar o sax falar. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Saxofone de rock de estádio — solos grandiosos e dramáticos. Referência: Clarence Clemons (E Street Band).'},

  {id:'MUS-096',nome:'Emory Vandergrift',ic:'🎹',orig:'Estados Unidos — Nova York',cat:'inst',estilo:'rock',
   inst:'Piano de rock — arpejos que empurram a música pra frente',
   bio:'Emory Vandergrift toca piano como um motor por baixo da banda inteira — arpejos que empurram cada música pra frente, o tipo de piano que você só percebe quando some, porque é o que segura tudo de pé. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Piano de rock — arpejos que empurram a música, base invisível da banda. Referência: Roy Bittan (E Street Band).'},

  {id:'MUS-097',nome:'Reginald Ashby',ic:'🎹',orig:'Reino Unido',cat:'inst',estilo:'pop',
   inst:'Piano de rock/pop flamboyante — showman de palco',
   bio:'Reginald Ashby transforma o piano de estádio numa extensão do próprio corpo — acordes grandiosos, melodias que grudam na cabeça em duas audições, e uma teatralidade de palco que faz até uma balada parecer um espetáculo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Piano de rock/pop flamboyante — grandiosidade e teatralidade de palco. Referência: Elton John.'},

  {id:'MUS-098',nome:'Peregrine Ashcombe',ic:'🎸',orig:'Reino Unido',cat:'inst',estilo:'rock',
   inst:'Guitarra rock orquestral — harmonias multi-gravadas',
   bio:'Peregrine Ashcombe constrói guitarras inteiras a partir de uma só — gravando camada sobre camada de harmonia até soar como uma orquestra de cordas elétricas, num tom quente e inconfundível que ele mesmo ajudou a inventar. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra rock orquestral — harmonias multi-gravadas, som de orquestra elétrica. Referência: Brian May (Queen).'},

  {id:'MUS-099',nome:'Gideon Marrow',ic:'🎸',orig:'Reino Unido — Birmingham',cat:'inst',estilo:'metal',
   inst:'Guitarra doom/heavy metal — riffs pesados e afinação baixa',
   bio:'Nascido em Birmingham, Gideon Marrow toca riffs tão pesados e tão baixos que parecem ter inventado um gênero musical inteiro sozinhos — o peso sombrio que viria a se chamar heavy metal, décadas antes do nome existir. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra doom/heavy metal — riffs pesados em afinação baixa, o peso que inventou o metal. Referência: Tony Iommi (Black Sabbath).'},

  {id:'MUS-100',nome:'Cassius Reyes',ic:'🎸',orig:'Estados Unidos — São Francisco',cat:'inst',estilo:'metal',
   inst:'Guitarra thrash metal — palhetada abafada e solos velozes',
   bio:'Cassius Reyes alterna entre riffs de palhetada abafada, rápidos e agressivos, e solos que abrem espaço pra melodia no meio da fúria — a receita que definiu o thrash metal como gênero de peso e técnica ao mesmo tempo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra thrash metal — palhetada abafada e solos velozes. Referência: guitarristas do Metallica.'},

  {id:'MUS-101',nome:'Rufus Kane',ic:'🎸',orig:'Reino Unido',cat:'inst',estilo:'rock',
   inst:'Guitarra rock and roll — afinação aberta e riffs sujos',
   bio:'Rufus Kane toca em afinação aberta, com uma sujeira intencional no tom que faz o riff soar perigoso mesmo quando é simples — cinco cordas, groove sujo, e a prova de que rock and roll não precisa de mais que isso pra ser eterno. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra rock and roll — afinação aberta, riffs sujos e eternos. Referência: Keith Richards (Rolling Stones).'},

  {id:'MUS-102',nome:'Dutch Marchand',ic:'🎸',orig:'Estados Unidos — Boston',cat:'inst',estilo:'blues',
   inst:'Guitarra hard rock bluesy — swagger de Boston',
   bio:'Nascido em Boston, Dutch Marchand toca guitarra com um swagger sujo de blues e uma atitude de rock and roll que nunca precisou pedir desculpa — riffs grudentos, solos suados, rock pesado com alma de bar de bairro. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra hard rock bluesy — swagger de Boston, riffs grudentos. Referência: Joe Perry (Aerosmith).'},

  {id:'MUS-103',nome:'Baxter Wraith',ic:'🎸',orig:'Austrália',cat:'inst',estilo:'rock',
   inst:'Guitarra hard rock — riffs de blues elétrico e power chords diretos',
   bio:'Baxter Wraith toca guitarra sem nenhum enfeite — riffs de blues elétrico, power chords diretos e uma energia de palco que não precisa de mais nada além de volume alto e atitude. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra hard rock australiana — riffs de blues elétrico, direto ao ponto. Referência: Angus Young (AC/DC).'},

  {id:'MUS-104',nome:'Julian Frost',ic:'🎸',orig:'Reino Unido',cat:'inst',estilo:'rock',
   inst:'Guitarra hard rock melódica — virtuosismo dos anos 80',
   bio:'Julian Frost combina técnica de virtuose com melodia de refrão — solos longos, bends dramáticos e aquele brilho de produção que definiu o hard rock melódico dos anos 80. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra hard rock melódica — virtuosismo e solos extensos dos anos 80. Referência: guitarristas do Whitesnake.'},

  {id:'MUS-105',nome:'Miranda Vellacott',ic:'🎹',orig:'Reino Unido',cat:'inst',estilo:'pop',
   inst:'Teclado new wave — atmosfera synth-pop com ambição progressiva',
   bio:'Miranda Vellacott escreve camadas de teclado que parecem maiores que a própria música — synth-pop com ambição de rock progressivo, melancolia britânica e uma produção que soa cinematográfica mesmo numa canção de três minutos. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Teclado new wave — synth-pop atmosférico com ambição progressiva. Referência: Tears for Fears.'},

  {id:'MUS-106',nome:'Dorian Wexler',ic:'🎹',orig:'Reino Unido',cat:'inst',estilo:'eletrônico',
   inst:'Sintetizadores analógicos — synth-pop sombrio e industrial',
   bio:'Dorian Wexler programa sintetizadores analógicos como quem constrói uma paisagem urbana à noite — synth-pop sombrio, pulsos industriais e uma frieza elegante que nunca soa fria de verdade. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Sintetizadores analógicos — synth-pop sombrio com textura industrial. Referência: Depeche Mode.'},

  {id:'MUS-107',nome:'Anselm Kroner',ic:'🎹',orig:'Alemanha',cat:'inst',estilo:'classico',
   inst:'Órgão de catedral — canto gregoriano e arranjos corais',
   bio:'Anselm Kroner toca órgão de catedral como quem reergue séculos de canto gregoriano dentro de arranjos corais modernos — vozes em latim, harmonias antigas, e uma reverência que atravessa o tempo sem soar datada. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Órgão de catedral — canto gregoriano reimaginado em arranjos corais contemporâneos. Referência: projeto Gregorian.'},

  {id:'MUS-108',nome:'Duncan Ferry',ic:'🎸',orig:'Escócia',cat:'inst',estilo:'rock',
   inst:'Guitarra hard rock escocesa — riffs ásperos e blues pesado',
   bio:'Duncan Ferry toca guitarra com uma aspereza de blues britânico que nunca pediu licença pra ninguém — riffs sujos, tom cru e uma pegada de rock pesado sem nenhuma pretensão de sofisticação. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra hard rock escocesa — riffs ásperos e blues pesado sem frescura. Referência: guitarristas do Nazareth.'},

  {id:'MUS-109',nome:'Klaus Reinholt',ic:'🎸',orig:'Alemanha',cat:'inst',estilo:'rock',
   inst:'Guitarra hard rock melódica alemã — power ballads e riffs de arena',
   bio:'Klaus Reinholt escreve riffs que cabem tanto num hino de estádio quanto numa power ballad chorosa — precisão alemã aplicada ao hard rock melódico, com solos que sabem exatamente quando parar de brilhar. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra hard rock melódica — power ballads e riffs de arena alemães. Referência: Matthias Jabs (Scorpions).'},

  {id:'MUS-110',nome:'Beauregard Tillman',ic:'🎸',orig:'Estados Unidos — Jacksonville',cat:'inst',estilo:'rock',
   inst:'Guitarra southern rock — slide e solos longos de improviso',
   bio:'Nascido em Jacksonville, Beauregard Tillman carrega a tradição do southern rock nas mãos — slide guitar arrastada, solos longos que parecem improvisados na hora, e aquele orgulho sulista que vira som antes de virar palavra. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra southern rock — slide guitar e solos longos, tradição sulista americana. Referência: guitarristas do Lynyrd Skynyrd.'},

  {id:'MUS-111',nome:'Cooper Bayless',ic:'🎸',orig:'Estados Unidos — Louisiana',cat:'inst',estilo:'rock',
   inst:'Guitarra swamp rock — riffs pantanosos e rock and roll de raiz',
   bio:'Cooper Bayless toca guitarra com a lama do pântano da Louisiana ainda grudada nas cordas — riffs simples, roots rock and roll, e uma economia de notas que prova que menos é mais quando o groove já está certo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra swamp rock — riffs pantanosos e rock and roll de raiz americana. Referência: John Fogerty (Creedence Clearwater Revival).'},

  {id:'MUS-112',nome:'Saara Kallio',ic:'🎻',orig:'Finlândia',cat:'inst',estilo:'metal',
   inst:'Violoncelo metal — riffs pesados tocados em cordas de orquestra',
   bio:'Saara Kallio toca violoncelo com pedal de distorção — riffs de metal pesados demais pra soar clássicos, mas tocados com um instrumento erudito demais pra soar comum. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Violoncelo metal — riffs pesados de metal tocados em cordas de orquestra. Referência: Apocalyptica.'},

  {id:'MUS-113',nome:'Aurélio Bandeira',ic:'🎺',orig:'Brasil — Brasília',cat:'inst',estilo:'classico',
   inst:'Banda marcial — trompete e percussão cerimonial',
   bio:'Aurélio Bandeira toca trompete com a precisão milimétrica de quem cresceu em banda marcial — cada nota, cada passo, cada gesto ensaiado até virar cerimônia. Nada de improviso: aqui, disciplina também é música. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Banda marcial — trompete e percussão cerimonial de precisão absoluta. Referência: Banda de Música do Batalhão da Guarda Presidencial.'},

  {id:'MUS-114',nome:'Fiona MacAllister',ic:'🎷',orig:'Escócia',cat:'inst',estilo:'folk',
   inst:'Gaita de fole escocesa — drones e melodias celtas',
   bio:'Fiona MacAllister toca gaita de fole nas Terras Altas escocesas como quem conversa com o vento — drones contínuos, melodias celtas que parecem ecoar de um vale pro outro, tradição que atravessa séculos sem precisar de tradução. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Gaita de fole escocesa — drones hipnóticos e melodias celtas tradicionais. Referência: tradição das Terras Altas escocesas.'},

  {id:'MUS-115',nome:'Wayra Quispe',ic:'🎷',orig:'Peru — Cusco',cat:'inst',estilo:'world',
   inst:'Flauta andina — quena e zampoña',
   bio:'Nascida nas montanhas perto de Cusco, Wayra Quispe toca quena e zampoña como quem imita o vento que passa entre os picos dos Andes — melodias que soam antigas mesmo quando são compostas na hora. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Flauta andina (quena/zampoña) — melodias que soam como vento nas montanhas. Referência: música tradicional andina.'},

  {id:'MUS-116',nome:'Zeca Pontieri',ic:'🎸',orig:'Brasil — Rio de Janeiro',cat:'inst',estilo:'samba',
   inst:'Cavaquinho — samba e pagode',
   bio:'Carioca de nascença, Zeca Pontieri toca cavaquinho como o motor rítmico que segura qualquer roda de samba de pé — batida que não para, brilho no dedilhado, e a leveza que só quem cresceu ouvindo samba de fundo de quintal consegue tocar. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Cavaquinho — batida de samba e pagode, o motor rítmico do gênero. Referência: Waldir Azevedo.'},

  {id:'MUS-117',nome:'Cida Malandra',ic:'🥁',orig:'Brasil — Rio de Janeiro',cat:'inst',estilo:'samba',
   inst:'Pandeiro — samba e choro',
   bio:'Cida Malandra toca pandeiro com uma variação de timbre que faz um instrumento parecer uma bateria inteira — grave, agudo, tapinha seco, tudo na mesma mão, no mesmo compasso, sustentando samba e choro com igual naturalidade. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Pandeiro — virtuosismo rítmico de samba e choro. Referência: Jorginho do Pandeiro.'},

  {id:'MUS-118',nome:'Raimundo Cordas',ic:'🎸',orig:'Brasil — Rio de Janeiro',cat:'inst',estilo:'mpb',
   inst:'Violão de 7 cordas — baixaria de choro',
   bio:'Raimundo Cordas toca a sétima corda como ninguém mais no time — a baixaria que caminha por baixo da melodia do choro, contrapontos que conversam com a flauta e o cavaquinho sem nunca atropelar ninguém. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Violão de 7 cordas — baixaria melódica que sustenta o choro por baixo. Referência: Dino Sete Cordas.'},

  {id:'MUS-119',nome:'Chico Ventania',ic:'🪗',orig:'Brasil — Nordeste',cat:'inst',estilo:'forro',
   inst:'Sanfona — forró pé-de-serra',
   bio:'Chico Ventania toca sanfona como quem carrega o sertão inteiro debaixo do braço — forró pé-de-serra tradicional, fole que respira fundo e uma alegria que não separa a festa da saudade. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Sanfona (acordeon) — forró pé-de-serra tradicional do sertão nordestino. Referência: Luiz Gonzaga.'},

  {id:'MUS-120',nome:'Winston Trench',ic:'🎸',orig:'Jamaica — Kingston',cat:'inst',estilo:'reggae',
   inst:'Guitarra reggae — skank e contratempo',
   bio:'Nascido em Kingston, Winston Trench toca aquele acorde curto e cortado no contratempo que é a assinatura do reggae — o "skank" que faz a música balançar sem nunca acelerar. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra reggae — o contratempo (skank) que define o gênero. Referência: guitarristas da banda de Bob Marley (The Wailers).'},

  {id:'MUS-121',nome:'Marlon Riddim',ic:'🎸',orig:'Jamaica — Kingston',cat:'inst',estilo:'reggae',
   inst:'Baixo reggae — riddim profundo e minimalista',
   bio:'Marlon Riddim toca poucas notas, mas cada uma pesa uma tonelada — baixo reggae profundo, minimalista, o tipo de linha que sustenta a música inteira sem nunca chamar atenção pra si. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Baixo reggae — riddim profundo, groove minimalista e hipnótico. Referência: Aston "Family Man" Barrett (The Wailers).'},

  {id:'MUS-122',nome:'Ariel Fuentes',ic:'🪗',orig:'Argentina — Buenos Aires',cat:'inst',estilo:'world',
   inst:'Bandoneon — tango argentino',
   bio:'Ariel Fuentes toca bandoneon como quem respira em compasso de tango — suspiros e acordes que parecem contar uma história de amor e traição só com o movimento do fole. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Bandoneon — a alma sonora do tango argentino, entre o choro e o suspiro. Referência: Astor Piazzolla.'},

  {id:'MUS-123',nome:'Femi Adegoke',ic:'🎷',orig:'Nigéria — Lagos',cat:'inst',estilo:'world',
   inst:'Naipe de metais afrobeat — saxofone e trompete',
   bio:'Femi Adegoke lidera um naipe de metais que conversa em polirritmo com a percussão — saxofone e trompete que não tocam melodia, tocam groove, exatamente como o afrobeat exige. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Naipe de metais afrobeat — groove poliritmico com sax e trompete. Referência: Fela Kuti.'},

  {id:'MUS-124',nome:'Maximilian Vogl',ic:'🎹',orig:'Áustria — Viena',cat:'inst',estilo:'eletrônico',
   inst:'Sintetizadores e rap-cantado — new wave austríaco',
   bio:'Nascido em Viena, Maximilian Vogl mistura rap falado com sintetizadores new wave e uma teatralidade europeia toda própria — pop eletrônico que soa histórico e futurista ao mesmo tempo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Sintetizadores e rap-cantado — new wave austríaco teatral e histórico. Referência: Falco.'},

  {id:'MUS-125',nome:'Elliot Grange',ic:'🎸',orig:'Reino Unido',cat:'inst',estilo:'rock',
   inst:'Guitarra/teclado de arena rock — riffs melódicos e power ballads',
   bio:'Elliot Grange escreve riffs de arena rock feitos pra rádio — melódicos, diretos, com aquele teclado de fundo que também virou marca registrada do gênero nos anos 80. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra/teclado de arena rock — riffs melódicos de rádio. Referência: Foreigner.'},

  {id:'MUS-126',nome:'Desmond Kessler',ic:'🎹',orig:'Estados Unidos — Los Angeles',cat:'inst',estilo:'rock',
   inst:'Teclado/guitarra de session — sofisticação de estúdio de LA',
   bio:'Desmond Kessler é o tipo de músico de estúdio que toca tudo com perfeição técnica quase invisível — harmonias sofisticadas, groove impecável, o som polido de Los Angeles que definiu o rock adulto dos anos 80. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Teclado/guitarra de session — sofisticação e groove impecável de estúdio. Referência: Toto.'},

  {id:'MUS-127',nome:'Rhys Fairbrook',ic:'🎸',orig:'Nova Zelândia',cat:'inst',estilo:'rock',
   inst:'Guitarra jangle pop — melodias solares e harmonias vocais imaginadas',
   bio:'Rhys Fairbrook toca um violão/guitarra que soa como se o sol tivesse um som — jangle pop melódico, acordes abertos e uma simplicidade que esconde uma sofisticação de composição rara. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Guitarra jangle pop — melodias solares e composição sofisticada. Referência: Crowded House.'},

  {id:'MUS-128',nome:'Marcellus Boone',ic:'🎹',orig:'Estados Unidos — Oakland',cat:'inst',estilo:'rap',
   inst:'Produção/sampler — dance-rap dos anos 90 com samples de funk',
   bio:'Marcellus Boone constrói batidas de dança a partir de samples de funk setentista — grooves irresistíveis, coreografia embutida no próprio ritmo, pop-rap feito pra encher qualquer pista. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Produção/sampler dance-rap — grooves de funk setentista remixados pra pista. Referência: MC Hammer.'},

  {id:'MUS-129',nome:'Robbie Chase',ic:'🎹',orig:'Estados Unidos — Miami',cat:'inst',estilo:'rap',
   inst:'Produção/sampler — pop-rap dos anos 90 com riffs de baixo marcantes',
   bio:'Robbie Chase constrói pop-rap em cima de riffs de baixo emprestados e batidas que grudam na cabeça na primeira audição — o tipo de produção feita pra rádio, sem pedir desculpa por isso. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Produção/sampler pop-rap — riffs de baixo marcantes e batida de rádio. Referência: Vanilla Ice.'},

  {id:'MUS-130',nome:'Desmond Hargrove',ic:'🎺',orig:'Estados Unidos — Chicago',cat:'inst',estilo:'jazz',
   inst:'Naipe de metais jazz-rock — trompete e trombone em fusão com rock',
   bio:'Desmond Hargrove lidera um naipe de metais que não soa como banda de rock comum — trompete e trombone arranjados com sofisticação de big band, encaixados dentro de canções de rock melódico. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Naipe de metais jazz-rock — trompete e trombone em fusão sofisticada com o rock. Referência: banda Chicago (banda de Peter Cetera).'},

  {id:'MUS-131',nome:'Maceo Winsome',ic:'🎷',orig:'Estados Unidos',cat:'inst',estilo:'soul',
   inst:'Naipe de metais funk/soul — groove dos anos 70',
   bio:'Maceo Winsome lidera um naipe de metais que faz o corpo se mexer antes da cabeça perceber — funk e soul dos anos 70, groove denso, arranjos que colocam metais no centro do ritmo, não só na decoração. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Naipe de metais funk/soul dos anos 70 — groove denso e arranjos vibrantes. Referência: Earth, Wind & Fire.'},

  {id:'MUS-132',nome:'Simone Delacourt',ic:'🎹',orig:'Estados Unidos',cat:'inst',estilo:'soul',
   inst:'Teclado R&B suave — "quiet storm" dos anos 80',
   bio:'Simone Delacourt toca teclado com uma suavidade aveludada — harmonias de jazz aplicadas ao R&B romântico dos anos 80, o tipo de som feito pra tocar baixinho depois da meia-noite. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Teclado R&B suave — harmonias aveludadas do "quiet storm" dos anos 80. Referência: R&B americano dos anos 80.'},

  {id:'MUS-133',nome:'Tyrell Combs',ic:'🎹',orig:'Estados Unidos',cat:'inst',estilo:'soul',
   inst:'Programação/teclado new jack swing — groove eletrônico dos anos 90',
   bio:'Tyrell Combs funde bateria eletrônica programada com groove de R&B tradicional — o "new jack swing" que definiu o som das rádios americanas nos anos 90, entre o soul e o hip-hop. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Programação/teclado new jack swing — groove eletrônico de R&B dos anos 90. Referência: produção R&B/new jack swing dos anos 90.'},

  {id:'MUS-134',nome:'Silas Greenwood',ic:'🎸',orig:'Estados Unidos',cat:'inst',estilo:'folk',
   inst:'Violão/banjo folk — tradição de revival americano',
   bio:'Silas Greenwood toca violão e banjo com a simplicidade honesta do folk revival americano — poucos acordes, muita história, uma voz de instrumento que soa mais a verdade contada do que a técnica exibida. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Violão/banjo folk — simplicidade honesta do folk revival americano. Referência: tradição do folk revival (Dylan, Simon & Garfunkel).'},

  {id:'MUS-135',nome:'Julien Vasseur',ic:'🎹',orig:'França',cat:'inst',estilo:'pop',
   inst:'Teclado/guitarra AOR europeu — baladas synth-pop românticas dos anos 80',
   bio:'Julien Vasseur escreve baladas europeias dos anos 80 com aquele brilho synth-pop levemente melancólico — teclados brilhantes, guitarra discreta, o tipo de música que trilhava toda pista de rádio europeia da época. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Teclado/guitarra AOR europeu — baladas synth-pop românticas dos anos 80. Referência: Century ("Lover Why").'},

  {id:'MUS-136',nome:'Werner Falkenrath',ic:'🎹',orig:'Alemanha',cat:'inst',estilo:'classico',
   inst:'Composição orquestral para cinema — trilhas épicas e minimalismo hipnótico',
   bio:'Werner Falkenrath compõe música pensando em imagens que ainda nem existem — trilhas orquestrais épicas, motivos rítmicos hipnóticos e uma escala de grandiosidade que faz qualquer cena parecer maior. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Composição orquestral para cinema — épica, hipnótica e cinematográfica. Referência: Hans Zimmer.'},

  {id:'MUS-137',nome:'Alexandros Kyrou',ic:'🎹',orig:'Grécia',cat:'inst',estilo:'eletrônico',
   inst:'Sintetizador orquestral — trilhas eletrônicas épicas',
   bio:'Alexandros Kyrou funde sintetizador e orquestra numa coisa só — texturas eletrônicas grandiosas que soam tão antigas quanto o mar Mediterrâneo e tão futuristas quanto uma nave espacial. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Sintetizador orquestral — trilhas eletrônicas épicas, entre o antigo e o futurista. Referência: Vangelis.'},

  {id:'MUS-138',nome:'Aisling Devereux',ic:'🎹',orig:'Irlanda',cat:'inst',estilo:'world',
   inst:'Teclado/produção celta em camadas — vozes multiplicadas e atmosfera etérea',
   bio:'Aisling Devereux constrói música em camadas, gravando o próprio teclado e vozes dezenas de vezes até formar uma névoa sonora — atmosfera celta etérea que parece vir de um lugar fora do tempo. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Teclado/produção celta em camadas — atmosfera etérea e vozes multiplicadas. Referência: Enya.'},

  {id:'MUS-139',nome:'Baptiste Lorrain',ic:'🎹',orig:'França',cat:'inst',estilo:'classico',
   inst:'Coro épico eletrônico — canto gregoriano fundido a batida moderna',
   bio:'Baptiste Lorrain funde coro em latim, orquestra e batida eletrônica moderna numa única parede de som — épico o bastante pra abertura de filme, hipnótico o bastante pra tocar numa boate. Artista da SIGMAL Music — Site das Letras Edições Literárias & Multimídia.',
   sabor:'Coro épico eletrônico — canto gregoriano fundido a batida moderna. Referência: ERA ("Ameno").'},

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
