/**
 * PERFIL VOCAL — triploohesigmalbpl
 * -------------------------------------
 * Voz literal (áudio/timbre), NÃO confundir com "Perfil de Voz" (perfis_voz.js),
 * que é voz autoral/estilo de escrita. Este arquivo cobre os dois elencos que
 * falam ou cantam de verdade:
 *   - tipo:'ator'  → elenco artístico do BPL (Banco de Personagens Literários),
 *     voz de FALA/interpretação de diálogo.
 *   - tipo:'cantor' → elenco do SIGMAL Music, voz de CANTO.
 *
 * Cada perfil tem:
 *   - tessitura: classificação vocal (grave/média/aguda pros atores;
 *     soprano/mezzo/contralto/tenor/barítono/baixo/contratenor ou
 *     "popular — <estilo>" pros cantores de gênero não-clássico).
 *   - arquetipoVocal: descrição do timbre/estilo — NUNCA mirando clonar o
 *     áudio de uma celebridade real e identificável (ver nota abaixo).
 *   - vozSintese: {vozId, pitch, rate} — mapeia pra uma das 6 vozes gratuitas
 *     do Web Speech API já usadas em silo_sonoro.html (Francisca, Antônio,
 *     Brenda, Donato, Humberto, Júlio), com pitch/rate ajustados por pessoa
 *     pra dar variedade real de timbre a partir de só 6 vozes-base.
 *
 * NOTA SOBRE REFERÊNCIAS A CANTORES REAIS: o banco de cantores (TODOS, em
 * publicador_lote_musical.html) já usa citações tipo "Referência: Maria
 * Callas" no campo `sabor` como briefing criativo interno — isso é seguro e
 * mantido como está. O que este arquivo NUNCA faz é usar esse nome pra guiar
 * a síntese de ÁUDIO (vozSintese) rumo a imitar o timbre real dessa pessoa:
 * nos EUA, imitação deliberada da voz de uma celebridade reconhecível pra uso
 * comercial já foi julgada violação de direito de imagem mesmo sem copiar
 * literalmente nada (Midler v. Ford Motor Co., Waits v. Frito-Lay) — e o
 * Celeiro Literário vende produto comercial. vozSintese aqui é só as 6 vozes
 * gratuitas do navegador + variação de pitch/rate — nunca clonagem.
 *
 * Dados gerados automaticamente a partir de campos já existentes (não
 * inventados do zero): pra atores, extraído de personalidade/fisico em
 * bpl_banco_personagens_literarios.html; pra cantores, extraído de inst/sabor
 * em publicador_lote_musical.html. Onde não havia pista textual clara, a
 * tessitura cai num padrão razoável por gênero — Wagner pode refinar
 * qualquer entrada específica depois, o mecanismo é que precisa existir
 * primeiro (mesmo princípio do piloto que abriu o Perfil de Voz).
 */

const PERFIS_VOCAIS = [
  {nome:'Isolde Vael Carrim',tipo:'ator',genero:'F',tessitura:'aguda',arquetipoVocal:'Voz aguda — timbre de drama, presença magnética e contida',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:1.05,rate:1.11}},
  {nome:'Esteban Morales Vega',tipo:'ator',genero:'M',tessitura:'grave',arquetipoVocal:'Voz grave — timbre de drama, voz grave e rouca que carrega décadas',vozSintese:{vozId:'pt-BR-AntonioNeural',pitch:1.11,rate:1.02},vozPremiumId:'0bc75396edd6468398583e8d860a9cc2'},
  {nome:'Yuki Tanegawa',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de drama, precisão milimétrica nos movimentos',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:1.03,rate:0.97}},
  {nome:'Darius Mehrabani',tipo:'ator',genero:'M',tessitura:'barítono',arquetipoVocal:'Voz barítono — timbre de drama, olhar que atravessa a câmera',vozSintese:{vozId:'pt-BR-JulioNeural',pitch:1.09,rate:0.99}},
  {nome:'Amara Diallo Keïta',tipo:'ator',genero:'F',tessitura:'mezzo',arquetipoVocal:'Voz mezzo — timbre de drama, energia teatral natural',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.97,rate:0.93}},
  {nome:'Mirela Szabo',tipo:'ator',genero:'F',tessitura:'aguda',arquetipoVocal:'Voz aguda — timbre de tragedia, especialista em ruína elegante',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.1,rate:0.98}},
  {nome:'Tomás Induni Leal',tipo:'ator',genero:'M',tessitura:'barítono',arquetipoVocal:'Voz barítono — timbre de drama, carisma silencioso',vozSintese:{vozId:'pt-BR-JulioNeural',pitch:0.96,rate:0.91},vozPremiumId:'bb7c8a61fd23467390302c8272e14cb3'},
  {nome:'Bridget Afolabi',tipo:'ator',genero:'F',tessitura:'média',arquetipoVocal:'Voz média — timbre de comedia, timing perfeito',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.12,rate:1.09}},
  {nome:'Serafino Conti Neri',tipo:'ator',genero:'M',tessitura:'média nasalada',arquetipoVocal:'Voz média nasalada — timbre de comedia, exagero calculado',vozSintese:{vozId:'pt-BR-HumbertoNeural',pitch:1.06,rate:0.94}},
  {nome:'Park Jiwon',tipo:'ator',genero:'M',tessitura:'média',arquetipoVocal:'Voz média — timbre de comedia, ironia seca',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:0.85,rate:0.95}},
  {nome:'Fatou Mbengue',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de comedia, energia transbordante',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:1.08,rate:1.08}},
  {nome:'Lucho Cienfuegos',tipo:'ator',genero:'M',tessitura:'média',arquetipoVocal:'Voz média — timbre de comedia, personagens que se levam muito a sério em situações ridículas',vozSintese:{vozId:'pt-BR-JulioNeural',pitch:1.11,rate:1.1}},
  {nome:'Zara Nkemdirim',tipo:'ator',genero:'F',tessitura:'aguda',arquetipoVocal:'Voz aguda — timbre de acao, fisicamente imponente e precisa',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:1.13,rate:1.13}},
  {nome:'Ren Bashir Khattak',tipo:'ator',genero:'M',tessitura:'barítono',arquetipoVocal:'Voz barítono — timbre de acao, velocidade e controle',vozSintese:{vozId:'pt-BR-AntonioNeural',pitch:0.9,rate:0.92}},
  {nome:'Ingrid Valkonen',tipo:'ator',genero:'F',tessitura:'média',arquetipoVocal:'Voz média — timbre de acao, fria como gelo, eficiente como máquina',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.04,rate:1}},
  {nome:'Celestino Aguiar Fontes',tipo:'ator',genero:'M',tessitura:'barítono',arquetipoVocal:'Voz barítono — timbre de acao, explosivo quando precisa, calmo quando domina',vozSintese:{vozId:'pt-BR-AntonioNeural',pitch:1.13,rate:1.07}},
  {nome:'Vera Silvestri Manzoni',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de suspense, femme fatale com consciência moral',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.15,rate:0.94}},
  {nome:'Konrad Brehmer',tipo:'ator',genero:'M',tessitura:'média',arquetipoVocal:'Voz média — timbre de suspense, o homem que sabe de tudo mas fala pouco',vozSintese:{vozId:'pt-BR-HumbertoNeural',pitch:1.06,rate:0.96}},
  {nome:'Layla Haddad Osman',tipo:'ator',genero:'F',tessitura:'grave',arquetipoVocal:'Voz grave — timbre de suspense, inteligência que assusta',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.07,rate:0.88}},
  {nome:'Gavriil Petrov-Ilyich',tipo:'ator',genero:'M',tessitura:'barítono',arquetipoVocal:'Voz barítono — timbre de suspense, peso existencial',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:1.11,rate:0.92}},
  {nome:'Celeste Mourão Braga',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de romance, vulnerabilidade magnética',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.16,rate:0.96},vozPremiumId:'3a3b45fe5172480c9aa323fb8f33ed7f'},
  {nome:'Olivier Chastenet',tipo:'ator',genero:'M',tessitura:'barítono',arquetipoVocal:'Voz barítono — timbre de romance, charme sem esforço',vozSintese:{vozId:'pt-BR-JulioNeural',pitch:1.05,rate:0.94}},
  {nome:'Priya Subramaniam',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de romance, amor que vem do centro',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.97,rate:0.97}},
  {nome:'Rafael Queiroga Salave\'a',tipo:'ator',genero:'M',tessitura:'grave',arquetipoVocal:'Voz grave — timbre de romance, o amor que machuca com gentileza',vozSintese:{vozId:'pt-BR-HumbertoNeural',pitch:1.1,rate:0.9},vozPremiumId:'e70476dbffeb4cf4a2caa1f55b421189'},
  {nome:'Nadia Oufkir',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de romance, paixão mediterrânea com razão europeia',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.89,rate:0.99}},
  {nome:'Sable Huxley Owens',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de experimental, habita o espaço entre gêneros e formas',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:0.95,rate:0.9}},
  {nome:'Kenji Matsunaga Rios',tipo:'ator',genero:'M',tessitura:'barítono',arquetipoVocal:'Voz barítono — timbre de experimental, hibridismo cultural como linguagem',vozSintese:{vozId:'pt-BR-JulioNeural',pitch:1.03,rate:1.1},vozPremiumId:'225be0701c0a4804b7b9cf5d168ed6d5'},
  {nome:'Asel Mamytbekova',tipo:'ator',genero:'F',tessitura:'aguda',arquetipoVocal:'Voz aguda — timbre de experimental, tradição nômade e vanguarda ocidental fundidas',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.85,rate:1}},
  {nome:'Adaeze Onwudiwe',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de tragedia, a dor que enobrece',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:0.86,rate:0.92}},
  {nome:'Vasile Ionescu-Doran',tipo:'ator',genero:'M',tessitura:'média',arquetipoVocal:'Voz média — timbre de tragedia, o herói que cai por escolha própria',vozSintese:{vozId:'pt-BR-JulioNeural',pitch:0.99,rate:0.99}},
  {nome:'Sunita Karmakar',tipo:'ator',genero:'F',tessitura:'aguda',arquetipoVocal:'Voz aguda — timbre de drama, resiliência como estética',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:1.04,rate:1.02}},
  {nome:'Marcus Elroy Thorne',tipo:'ator',genero:'M',tessitura:'grave',arquetipoVocal:'Voz grave — timbre de drama, ritmo caribenho na fala, peso africano no olhar',vozSintese:{vozId:'pt-BR-HumbertoNeural',pitch:1.09,rate:1.1}},
  {nome:'Florentina Oprea Vlad',tipo:'ator',genero:'F',tessitura:'aguda',arquetipoVocal:'Voz aguda — timbre de comedia, ironia que não fere',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:0.98,rate:0.88},vozPremiumId:'8f2abb7dd7644e26abea20d301a03ff6'},
  {nome:'Ibrahim Al-Rashid',tipo:'ator',genero:'M',tessitura:'grave',arquetipoVocal:'Voz grave — timbre de drama, dignidade árabe clássica',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:1.12,rate:0.97}},
  {nome:'Esperanza Villarreal',tipo:'ator',genero:'F',tessitura:'aguda',arquetipoVocal:'Voz aguda — timbre de drama, terra, raiz e fúria suave',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.01,rate:0.97}},
  {nome:'Nnamdi Achebe Osei',tipo:'ator',genero:'M',tessitura:'média',arquetipoVocal:'Voz média — timbre de acao, nobreza física e moral',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:0.91,rate:1.1}},
  {nome:'Valentina Russo Ferretti',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de romance, paixão com método',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.99,rate:1.09},vozPremiumId:'d706f2d068ab470bb43bdae3c0a0625c'},
  {nome:'Taavi Mäkinen',tipo:'ator',genero:'M',tessitura:'média',arquetipoVocal:'Voz média — timbre de suspense, frio nórdico que guarda brasas',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:1.06,rate:1.13}},
  {nome:'Chidinma Ezeh',tipo:'ator',genero:'F',tessitura:'aguda',arquetipoVocal:'Voz aguda — timbre de comedia, alegria que nasce do chão',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.9,rate:0.96}},
  {nome:'Aleksandr Voronov',tipo:'ator',genero:'M',tessitura:'média',arquetipoVocal:'Voz média — timbre de tragedia, peso histórico nos ombros',vozSintese:{vozId:'pt-BR-AntonioNeural',pitch:1,rate:0.96}},
  {nome:'Meera Pillai Nair',tipo:'ator',genero:'F',tessitura:'aguda',arquetipoVocal:'Voz aguda — timbre de experimental, kathakali e teatro contemporâneo em um único corpo',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.98,rate:1.01}},
  {nome:'Cássio Avelar Drummond',tipo:'ator',genero:'M',tessitura:'média',arquetipoVocal:'Voz média — timbre de drama, malandro com alma',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:1.04,rate:0.92}},
  {nome:'Áine Ní Bhriain',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de romance, amor com raiz céltica',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.08,rate:0.95}},
  {nome:'Hideo Watanabe Suzu',tipo:'ator',genero:'M',tessitura:'média',arquetipoVocal:'Voz média — timbre de suspense, o detetive que encontrou a resposta mas hesita em revelá-la',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:1.16,rate:0.95}},
  {nome:'Blessing Okonkwo',tipo:'ator',genero:'F',tessitura:'grave',arquetipoVocal:'Voz grave — timbre de drama, força que vem de dentro para fora',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.87,rate:1.1}},
  {nome:'Simón Arce Palomino',tipo:'ator',genero:'M',tessitura:'barítono',arquetipoVocal:'Voz barítono — timbre de drama, andino e contemporâneo',vozSintese:{vozId:'pt-BR-AntonioNeural',pitch:1,rate:1.05}},
  {nome:'Roksana Wiśniewska',tipo:'ator',genero:'F',tessitura:'aguda',arquetipoVocal:'Voz aguda — timbre de tragedia, escola polonesa de grotowski',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:0.89,rate:1.11}},
  {nome:'Chukwuemeka Eze',tipo:'ator',genero:'M',tessitura:'média',arquetipoVocal:'Voz média — timbre de acao, herói que duvida',vozSintese:{vozId:'pt-BR-HumbertoNeural',pitch:0.94,rate:0.9}},
  {nome:'Luna Sepúlveda Araya',tipo:'ator',genero:'F',tessitura:'contralto',arquetipoVocal:'Voz contralto — timbre de experimental, o corpo como manifesto político',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:1.11,rate:0.97}},
  {nome:'Ezra Blackwood-Osei',tipo:'ator',genero:'M',tessitura:'média clara',arquetipoVocal:'Voz média clara — timbre de drama, shakespeare e afrofuturismo no mesmo corpo',vozSintese:{vozId:'pt-BR-JulioNeural',pitch:1.16,rate:1.06}},
  {nome:'Isadora Vellini',tipo:'cantor',genero:'F',tessitura:'soprano',arquetipoVocal:'Soprano lírico de primeiro escalão — voz que equilibra pureza italiana e calor brasileiro.',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:1.03,rate:1.09},vozPremiumId:'9f4e7f0dc12c4198a0cbebb7ce4b91f0'},
  {nome:'Valentina Osei-Bonsu',tipo:'cantor',genero:'F',tessitura:'mezzo-soprano',arquetipoVocal:'Mezzo-soprano de voz grave e dourada — a riqueza da África Ocidental na tradição lírica.',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:0.83,rate:1.11}},
  {nome:'Camille Dufresne',tipo:'cantor',genero:'F',tessitura:'soprano',arquetipoVocal:'Soprano de câmara — elegância francesa, clareza e precisão.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.95,rate:0.88}},
  {nome:'Fatimah Al-Rashid',tipo:'cantor',genero:'F',tessitura:'popular — voz árabe / maqam',arquetipoVocal:'Voz árabe clássica — Maqam, ornamentação e emoção do Oriente Médio.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.17,rate:0.88}},
  {nome:'Marco Ferretti',tipo:'cantor',genero:'M',tessitura:'tenor',arquetipoVocal:'Tenor napolitano — calor mediterrâneo, brilho e paixão.',vozSintese:{vozId:'pt-BR-JulioNeural',pitch:1.11,rate:0.98}},
  {nome:'Kwabena Asante',tipo:'cantor',genero:'M',tessitura:'tenor',arquetipoVocal:'Tenor dramático de potência extraordinária — força vocal africana na tradição europeia.',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:1.13,rate:1.02}},
  {nome:'Hiroshi Tanaka',tipo:'cantor',genero:'M',tessitura:'tenor',arquetipoVocal:'Tenor lírico com precisão técnica japonesa — refinamento e controle absolutos.',vozSintese:{vozId:'pt-BR-AntonioNeural',pitch:0.89,rate:1.01}},
  {nome:'Viktor Melnyk',tipo:'cantor',genero:'M',tessitura:'barítono',arquetipoVocal:'Barítono dramático eslavo — escuridão, potência e profundidade emocional.',vozSintese:{vozId:'pt-BR-JulioNeural',pitch:0.86,rate:1.12}},
  {nome:'Samuel Okafor',tipo:'cantor',genero:'M',tessitura:'baixo',arquetipoVocal:'Baixo profundo de ressonância extraordinária — a gravidade vocal que ancora qualquer ensemble.',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:1.16,rate:0.92}},
  {nome:'Maristela Braga',tipo:'cantor',genero:'F',tessitura:'popular — voz popular / mpb',arquetipoVocal:'Voz MPB baiana — raiz afro-brasileira com sofisticação contemporânea.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.96,rate:0.9}},
  {nome:'Sebastião Neto',tipo:'cantor',genero:'M',tessitura:'popular — voz mpb masculina',arquetipoVocal:'Voz MPB do Brasil profundo — mineiridade, simplicidade e profundidade.',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:0.96,rate:1.02}},
  {nome:'Dandara Quilombo',tipo:'cantor',genero:'F',tessitura:'popular — voz / percussão',arquetipoVocal:'Voz e percussão do Maranhão — resistência quilombola, bumba-meu-boi e identidade.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.98,rate:1.07}},
  {nome:'Jairo Silveira',tipo:'cantor',genero:'M',tessitura:'popular — voz de samba',arquetipoVocal:'Voz de samba carioca — malícia, swing e alegria autêntica.',vozSintese:{vozId:'pt-BR-AntonioNeural',pitch:1.04,rate:0.88}},
  {nome:'Conceição Palmares',tipo:'cantor',genero:'F',tessitura:'popular — voz de samba / axé',arquetipoVocal:'Voz samba-axé baiana — magnetismo, fé e celebração.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.1,rate:1.05}},
  {nome:'Josephine Walker',tipo:'cantor',genero:'F',tessitura:'popular — voz jazz / blues',arquetipoVocal:'Voz jazz e blues de Nova Orleans — fumaça, improviso e alma.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.93,rate:0.94}},
  {nome:'Raymond Coltrane',tipo:'cantor',genero:'M',tessitura:'popular — voz de jazz',arquetipoVocal:'Barítono jazz de Chicago — improvisação, conversa e profundidade.',vozSintese:{vozId:'pt-BR-AntonioNeural',pitch:1.01,rate:0.88}},
  {nome:'Amina Coulibaly',tipo:'cantor',genero:'F',tessitura:'popular — griot / voz mandinga',arquetipoVocal:'Voz griot do Mali — memória oral, tradição mandinga e força ancestral.',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:1.02,rate:1.01}},
  {nome:'Ruth Evangelista',tipo:'cantor',genero:'F',tessitura:'soprano',arquetipoVocal:'Soprano gospel pernambucana — fé, entrega e poder vocal.',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:1.1,rate:0.92}},
  {nome:'Pastor Elias Voz',tipo:'cantor',genero:'M',tessitura:'barítono',arquetipoVocal:'Barítono gospel mineiro — autoridade, ternura e fé inabalável.',vozSintese:{vozId:'pt-BR-HumbertoNeural',pitch:1.1,rate:0.98}},
  {nome:'Rosinha do Vale',tipo:'cantor',genero:'F',tessitura:'popular — voz / viola caipira',arquetipoVocal:'Voz e viola caipira nordestina — patrimônio vivo do sertão.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.94,rate:1.1}},
  {nome:'Seu Maneco Aboio',tipo:'cantor',genero:'M',tessitura:'popular — aboiador',arquetipoVocal:'Aboiador do sertão paraibano — patrimônio imaterial, voz livre e vento.',vozSintese:{vozId:'pt-BR-AntonioNeural',pitch:1.05,rate:1.04}},
  {nome:'Siobhán Ní Faoláin',tipo:'cantor',genero:'F',tessitura:'popular — voz / harpa celta',arquetipoVocal:'Voz e harpa celta irlandesa — névoa, lenda e melancolia atlântica.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.82,rate:0.89}},
  {nome:'Dmitri Balalaika',tipo:'cantor',genero:'M',tessitura:'popular — voz / balalaika',arquetipoVocal:'Voz e balalaika russa — estepes, melancolia eslava e alma profunda.',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:1.01,rate:1.07}},
  {nome:'Luana Star',tipo:'cantor',genero:'F',tessitura:'popular — voz pop / r&b',arquetipoVocal:'Voz pop e R&B contemporânea com alma brasileira.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.9,rate:1}},
  {nome:'Kevin Soul',tipo:'cantor',genero:'M',tessitura:'popular — voz soul / pop',arquetipoVocal:'Voz soul e pop londrina — sofisticação britânica com profundidade emocional.',vozSintese:{vozId:'pt-BR-HumbertoNeural',pitch:1.05,rate:0.96}},
  {nome:'Felix Contratenor',tipo:'cantor',genero:'M',tessitura:'contratenor',arquetipoVocal:'Contratenor alemão — voz barroca, expressividade e dignidade da música antiga.',vozSintese:{vozId:'pt-BR-JulioNeural',pitch:1.17,rate:0.94}},
  {nome:'Tadashi Falsete',tipo:'cantor',genero:'M',tessitura:'contratenor',arquetipoVocal:'Contratenor japonês — fusão única entre tradição vocal japonesa e lirismo ocidental.',vozSintese:{vozId:'pt-BR-HumbertoNeural',pitch:1.07,rate:1.12}},
  {nome:'Elena Fado',tipo:'cantor',genero:'F',tessitura:'popular — voz de fado',arquetipoVocal:'Voz de fado de Alfama — saudade legítima, nascida nas ruelas de pedra de Lisboa.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.07,rate:1.05}},
  {nome:'Carmen Flamenca',tipo:'cantor',genero:'F',tessitura:'popular — cante flamenco',arquetipoVocal:'Cantaora flamenca sevilhana — duende, pena negra e alma andaluza.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:1.16,rate:1.09}},
  {nome:'Nino Georgiano',tipo:'cantor',genero:'M',tessitura:'popular — voz polifônica georgiana',arquetipoVocal:'Polifonia georgiana — patrimônio da UNESCO, tradição vocal de séculos.',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:0.89,rate:0.88}},
  {nome:'Miriam Klezmer',tipo:'cantor',genero:'F',tessitura:'popular — voz klezmer / cantora',arquetipoVocal:'Voz klezmer israelense — celebração da vida que sobreviveu à história.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.88,rate:0.9}},
  {nome:'Renata Bolero',tipo:'cantor',genero:'F',tessitura:'popular — voz de bolero / balada latina',arquetipoVocal:'Voz de bolero mexicana — amor, perda e elegância latina inigualável.',vozSintese:{vozId:'pt-BR-FranciscaNeural',pitch:0.97,rate:1.08}},
  {nome:'Cléo Lunna',tipo:'cantor',genero:'F',tessitura:'popular — voz mpb / manguebeat',arquetipoVocal:'Voz Manguebeat recifense — maracatu, rock e o futuro do Nordeste.',vozSintese:{vozId:'pt-BR-BrendaNeural',pitch:0.98,rate:1.04}},
  {nome:'Abebe Girma',tipo:'cantor',genero:'M',tessitura:'popular — voz etíope / ethio-jazz',arquetipoVocal:'Voz Ethio-jazz de Adis Abeba — escalas etíopes e jazz americano em fusão única.',vozSintese:{vozId:'pt-BR-DonatoNeural',pitch:1.08,rate:1.12}},
  {nome:'Rovonilson Reigns Bautista',tipo:'cantor',genero:'M',tessitura:'popular — rapper / letrista',arquetipoVocal:'Rapper da Grande São Paulo — marquises, rua, verdade e redenção pelo verso.',vozSintese:{vozId:'pt-BR-HumbertoNeural',pitch:1.05,rate:0.95},vozPremiumId:'bcd4fde15c3d46da95d5342727f41474'}];

function _normalizarNomePerfilVocal(nome) {
  return (nome || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function getPerfilVocalPorNome(nome) {
  const alvo = _normalizarNomePerfilVocal(nome);
  if (!alvo) return null;
  const exato = PERFIS_VOCAIS.find(p => _normalizarNomePerfilVocal(p.nome) === alvo);
  if (exato) return exato;
  const aproximado = PERFIS_VOCAIS.find(p => {
    const n = _normalizarNomePerfilVocal(p.nome);
    return n.includes(alvo) || alvo.includes(n);
  });
  return aproximado || null;
}

// Bloco de texto pra injetar em prompt de geração (direção de personagem,
// letra de música) — descreve o timbre sem instruir a IA a imitar ninguém.
function montarBlocoPerfilVocal(nome) {
  const p = getPerfilVocalPorNome(nome);
  if (!p) return '';
  return `\n\nPERFIL VOCAL: ${p.arquetipoVocal} (tessitura: ${p.tessitura})`;
}

// Config pronta pra usar com speechSynthesis — usado por silo_sonoro.html.
// Se o personagem já tem uma voz premium salva (Fish Audio, ver
// fish_audio.js), ela tem prioridade sobre as 6 vozes gratuitas do
// navegador — quem consome isso decide o que fazer com `premium:true`
// (chamar sintetizarComVozPremium em vez de speechSynthesis).
function configVozSintese(nome) {
  const p = getPerfilVocalPorNome(nome);
  if (!p) return null;
  if (p.vozPremiumId) return { premium: true, referenceId: p.vozPremiumId };
  return Object.assign({ premium: false }, p.vozSintese);
}

// Anexa permanentemente (em memória — quem chama decide se persiste no
// GitHub, ver criador_vozes.html) uma voz premium do Fish Audio a um
// personagem já existente no Perfil Vocal.
function salvarVozPremium(nome, referenceId) {
  const p = getPerfilVocalPorNome(nome);
  if (!p || !referenceId) return false;
  p.vozPremiumId = referenceId;
  return true;
}
