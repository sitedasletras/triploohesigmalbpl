/**
 * REGISTRO DE HETERÔNIMOS — TERRITÓRIOS E FORMATOS
 * ---------------------------------------------------
 * Extraído de "Relação das Biografias.docx" (lote enviado por Wagner).
 * Objetivo: alimentar o Fernando Peçanha com o mapa real de quem escreve
 * o quê, para cruzar com BASE_CONHECIMENTO_LITERARIO
 * (base_conhecimento_literario_fernando_pecanha.js) e:
 *
 * 1) Fechar os campos `heteronimo_responsavel: null` daquele arquivo
 *    sempre que o território bater;
 * 2) Confirmar lacunas reais (nenhum heterônimo, nem deste lote nem do
 *    anterior, cobre certos estilos/escolas históricas);
 * 3) Servir de base para a função de reconhecimento de texto (dado um
 *    texto enviado, comparar com `territorio` + `formato` + `exclusividade`).
 *
 * IMPORTANTE: este lote NÃO é o array completo de 57 heterônimos —
 * é o conteúdo deste documento específico. Alguns nomes aqui podem
 * já constar no HETERONIMOS[] do index.html com dados adicionais
 * (data de nascimento, etc.) — este arquivo foca em TERRITÓRIO/FORMATO,
 * que é o que falta para o reconhecimento de estilo.
 */

const REGISTRO_HETERONIMOS = [
  {
    nome: "A.J. dos Santos",
    territorio: "Chupa-cabras, lobisomens, vampiros, criaturas lendárias",
    formato: ["prosa", "poesia"],
    exclusividade: false,
    observacao: "Primo de 2º grau de Padre Benedicttus Konstantinos (mesmo endereço/família)."
  },
  {
    nome: "Amanda Fernanda Fisher Leão",
    territorio: "Pirataria, sereias, monstros marinhos, Fomea (experimento genético)",
    formato: ["poesia", "prosa"],
    exclusividade: false,
    observacao: "Heptaneta de navegador; espírito de aventura marítima."
  },
  {
    nome: "Amélie Maia Hanna",
    territorio: "Memórias, emoções, cotidiano",
    formato: ["soneto"],
    exclusividade: true,
    observacao: "Escreve EXCLUSIVAMENTE sonetos."
  },
  {
    nome: "Anísio Teixeira",
    territorio: "Zumbis — decomposição, memória, esquecimento, pós-apocalipse",
    formato: ["prosa", "poesia"],
    exclusividade: true,
    observacao: "Território fechado: não escreve fora do universo zumbi."
  },
  {
    nome: "Articus da Pérsida",
    territorio: "Templários, Idade Média, amor e guerra santa, Graal",
    formato: ["prosa"],
    exclusividade: false,
    observacao: "Personagem histórico (1274–1307). Compatível com Romance Histórico."
  },
  {
    nome: "Aurora Wings",
    territorio: "Inteligência artificial, super-heróis, ficção científica/ação",
    formato: ["poesia", "prosa"],
    exclusividade: false,
    observacao: "Heroína cibernética — território de FC/ação."
  },
  {
    nome: "Padre Benedicttus Konstantinos",
    territorio: "Catolicismo, apocalipse, versículos bíblicos, gárgulas, amor impossível dentro da fé",
    formato: ["prosa", "poesia"],
    exclusividade: false,
    observacao: "Primo de A.J. dos Santos; tensão fé x pecado como eixo central."
  },
  {
    nome: "Birihani Selami Ina Tesifa",
    territorio: "Amor, perda, devoção, silêncio",
    formato: ["ghazal"],
    exclusividade: true,
    observacao: "Escreve EXCLUSIVAMENTE ghazais."
  },
  {
    nome: "Calíope Papazissis",
    territorio: "Mitologia grega (eixo central) + diálogos com nórdica, celta e italiana",
    formato: ["poesia", "prosa"],
    exclusividade: false,
    observacao: "Mitopoética contemporânea."
  },
  {
    nome: "Chesco Irlanda",
    territorio: "Histórias infantis e fábulas",
    formato: ["prosa infantojuvenil"],
    exclusividade: true,
    observacao: "Optou exclusivamente por infantil/fábulas nesta fase."
  },
  {
    nome: "Claudiney Aristides Diaz",
    territorio: "EM ABERTO — deliberadamente sem eixo temático definido",
    formato: [],
    exclusividade: false,
    observacao: "★ SLOT RESERVADO — candidato natural para preencher quando surgir estilo novo sem heterônimo. Já existe no catálogo, só falta atribuir território."
  },
  {
    nome: "Creone Porfírio",
    territorio: "Guerra (Brasil x vizinhos/Portugal), patriotismo, golpe de estado, seca nordestina",
    formato: ["prosa"],
    exclusividade: false,
    observacao: "Já testado em comparação Sonnet 4.6 vs 5 (país fictício Estados Unidos do Brasil)."
  },
  {
    nome: "Cristovão Duarte",
    territorio: "Aracnídeos, horror de subsolo, água/afogamento",
    formato: ["prosa"],
    exclusividade: false,
    observacao: "Fobia de aracnídeos como origem temática."
  },
  {
    nome: "Daniel Fernandes",
    territorio: "Poesia/prosa hot-erótica, rádio noturno romântico",
    formato: ["poesia", "prosa", "teatro (1 obra)"],
    exclusividade: false,
    observacao: null
  },
  {
    nome: "Valter Marques",
    territorio: "Erros do passado (pessoais, de conhecidos, da humanidade)",
    formato: ["soneto (preferência, não exclusivo)", "prosa", "verso"],
    exclusividade: false,
    observacao: "Duas versões de bio no documento — a segunda amplia p/ 'vários estilos'."
  },
  {
    nome: "Dárius Ninus Vamus",
    territorio: "Futebol de várzea, crônica esportiva, humor",
    formato: ["limerique", "elegia", "infantil", "crônica humorística"],
    exclusividade: false,
    observacao: null
  },
  {
    nome: "Demetrius Varas",
    territorio: "Prosas hot/eróticas — universo 'Condomínio Luxúria Towers'",
    formato: ["prosa"],
    exclusividade: true,
    observacao: "Apenas prosa, apenas erótico."
  },
  {
    nome: "Din Kin Lin",
    territorio: "Haicai, dragões, seres místicos orientais, lendas do oriente",
    formato: ["poesia (haicai, pantum)", "prosa"],
    exclusividade: false,
    observacao: "Casado com Noraya Sakamoto (especialista oriental já mapeada)."
  },
  {
    nome: "Diógenes Bueno de Alencar",
    territorio: "Arquipélagos e penínsulas — memória, conflitos interiores",
    formato: ["prosa", "poesia"],
    exclusividade: false,
    observacao: null
  },
  {
    nome: "Hama Amarin",
    territorio: "Perdão, culpa, perda, reconstrução íntima",
    formato: ["pantum"],
    exclusividade: true,
    observacao: "Escreve EXCLUSIVAMENTE pantum."
  },
  {
    nome: "Hernesto Bevilácqua",
    territorio: "Contemplação, exaltação, sentimentos duradouros",
    formato: ["ode"],
    exclusividade: true,
    observacao: "Escreve EXCLUSIVAMENTE ode."
  },
  {
    nome: "Horando Almeida Prado",
    territorio: "Mar, pesca, litoral sul de SP",
    formato: ["poesia", "conto"],
    exclusividade: false,
    observacao: null
  },
  {
    nome: "Icabode Kahpote",
    territorio: "Morte, passagem para além da vida (poesia póstuma)",
    formato: ["sextina", "conto póstumo", "poesia póstuma"],
    exclusividade: true,
    observacao: "Personagem falecido (1997) — narrativa póstuma como conceito."
  },
  {
    nome: "Imediato Thompson",
    territorio: "Ufologia, abdução, Constelação de Ophiuchus, Atlantis",
    formato: ["poesia", "prosa"],
    exclusividade: true,
    observacao: "Território fechado na 13ª Constelação/Ophiuchus."
  },
  {
    nome: "J.L.Gomes",
    territorio: "Espiritismo/kardecismo, pensamentos motivacionais",
    formato: ["prosa", "poesia", "poetrix"],
    exclusividade: false,
    observacao: "Já mapeado — chip 'Irmão Pullius' no Gerador."
  },
  {
    nome: "Jorge Cavalcanti",
    territorio: "Cotidiano, oralidade, imaginário popular",
    formato: ["cordel"],
    exclusividade: true,
    observacao: "Escreve EXCLUSIVAMENTE cordel."
  },
  {
    nome: "Juka Pituskaq",
    territorio: "Novo Movimento Estrofista (criado pelo próprio Wagner via este heterônimo)",
    formato: ["poesia estrofista", "ode"],
    exclusividade: true,
    observacao: "Personagem histórico (1890–~1900s); fã declarado de Olavo Bilac."
  },
  {
    nome: "Julia Abdalla",
    territorio: "Culinária como cuidado/bem-estar (não-ficção prática)",
    formato: ["prosa não-ficcional"],
    exclusividade: true,
    observacao: "★ ÚNICO heterônimo de não-ficção prática identificado até agora."
  },
  {
    nome: "Mário Célio Sabino",
    territorio: "Terror, espíritos, fantasmas, ocultismo, paranormal, teorias da conspiração",
    formato: ["conto", "poesia", "prosa"],
    exclusividade: false,
    observacao: "Tio de Wilson Silva (mencionado na bio de Pyetra Luyza)."
  },
  {
    nome: "Michelangelo Miguel",
    territorio: "Poema narrativo — história + lirismo",
    formato: ["poema narrativo"],
    exclusividade: true,
    observacao: "Escreve especificamente poemas narrativos (forma híbrida)."
  },
  {
    nome: "Pyetra Luyza",
    territorio: "Ecoficção, natureza, defesa de represas/mananciais",
    formato: ["poesia", "prosa", "jornalismo"],
    exclusividade: false,
    observacao: "★ Cobre 'Ecoficção' — um dos 3 gêneros que Wagner criou (Cyber/Psico/Ecoficção)."
  },
  {
    nome: "Raimundo José da Silva Nonato",
    territorio: "Seca nordestina, desastres naturais, memória oral",
    formato: ["prosa", "poesia"],
    exclusividade: false,
    observacao: null
  },
  {
    nome: "Renat Kolotov",
    territorio: "Revolução Russa de 1917, herança histórica familiar",
    formato: ["prosa"],
    exclusividade: false,
    observacao: null
  },
  {
    nome: "Rovonilson Reigns Bautista",
    territorio: "Vida de rua, rap, desilusão amorosa, letras musicais",
    formato: ["prosa", "poesia", "letra musical"],
    exclusividade: false,
    observacao: null
  },
  {
    nome: "Henrich Jones",
    territorio: "Arqueologia, paleontologia, civilizações antigas, ruínas",
    formato: ["prosa"],
    exclusividade: false,
    observacao: "Fronteira entre história/arqueologia e ficção."
  },
  {
    nome: "Sebastião Ferreira dos Anjos",
    territorio: "Reflexão existencial e social (poema dissertativo)",
    formato: ["poema dissertativo"],
    exclusividade: true,
    observacao: "Forma híbrida entre lirismo e argumentação."
  },
  {
    nome: "Victor A. Pereira",
    territorio: "Mistério, investigação, romance policial",
    formato: ["prosa"],
    exclusividade: false,
    observacao: null
  },
  {
    nome: "Wilson Silva",
    territorio: "Cotidiano, amor, ilusões urbanas",
    formato: ["poesia", "prosa"],
    exclusividade: false,
    observacao: "Sobrinho de Mário Célio Sabino."
  },
  {
    nome: "Yago Mattos",
    territorio: "Bruxas, lendas, deuses do mar, cultura caiçara",
    formato: ["poesia", "prosa"],
    exclusividade: false,
    observacao: null
  },
  {
    nome: "Wagner Planas",
    territorio: "Autor/curador — não é heterônimo, é a pessoa por trás de todos",
    formato: ["todos"],
    exclusividade: false,
    observacao: "Criou Cyberficção, Psicoficção e Ecoficção (via outros heterônimos); criou o Movimento Estrofista via Juka Pituskaq."
  },
  {
    nome: "Site das Letras Edições Literárias",
    territorio: "Biografia institucional — usada em antologias/miscelâneas",
    formato: ["institucional"],
    exclusividade: false,
    observacao: "Não é heterônimo autoral — é a marca/editora."
  }
];

/**
 * CRUZAMENTO COM base_conhecimento_literario_fernando_pecanha.js
 * ------------------------------------------------------------
 * Atualizações a aplicar naquele arquivo (heteronimo_responsavel):
 *
 * - romance_historico        → Articus da Pérsida (templários/Idade Média)
 *                               ou Renat Kolotov (Revolução Russa)
 * - distopia_utopia          → Creone Porfírio (golpe/país fictício) já sinalizado
 * - ficcao_cientifica         → Aurora Wings, Imediato Thompson
 * - terror_horror             → A.J. dos Santos, Mário Célio Sabino
 *                               (além de Anísio Teixeira p/ zumbis especificamente)
 * - romance_policial_noir     → Victor A. Pereira
 * - literatura_erotica        → Daniel Fernandes, Demetrius Varas
 * - literatura_marginal_periferica → Rovonilson Reigns Bautista (rap/rua)
 * - satira_humor              → Dárius Ninus Vamus
 * - literatura_filosofica     → Sebastião Ferreira dos Anjos (poema dissertativo)
 * - infantojuvenil            → Chesco Irlanda, Dárius Ninus Vamus (parcial)
 * - cordel_prosa              → Jorge Cavalcanti (poesia — já mapeado em motor
 *                               ocidental, mas agora com heterônimo exclusivo confirmado)
 *
 * GÊNEROS NOVOS QUE NÃO ESTAVAM NA BASE ANTERIOR (adicionar):
 * - Ecoficção   → Pyetra Luyza
 * - Cyberficção → (heterônimo ainda não identificado neste lote — PREENCHER)
 * - Psicoficção → (heterônimo ainda não identificado neste lote — PREENCHER)
 * - Ufologia / ficção especulativa espacial → Imediato Thompson, Aurora Wings
 * - Culinária / não-ficção de bem-estar → Julia Abdalla (foge do escopo ficcional,
 *   mas está no catálogo — vale decidir se Fernando Peçanha trata isso como
 *   categoria à parte de "literatura utilitária/lifestyle")
 * - Poema narrativo (forma híbrida) → Michelangelo Miguel
 * - Poema dissertativo (forma híbrida) → Sebastião Ferreira dos Anjos
 * - Narrativa póstuma (conceito) → Icabode Kahpote
 *
 * LACUNAS REAIS QUE PERSISTEM (nenhum heterônimo, nem deste lote nem do
 * anterior, cobre — candidatos ao slot aberto de Claudiney Aristides Diaz):
 * - Realismo/Naturalismo clássico (pastiche de época)
 * - Parnasianismo/Simbolismo (pastiche de época)
 * - Trovadorismo/Barroco/Classicismo (pastiche medieval/clássico)
 * - Teatro do Absurdo
 * - Nouveau Roman / literatura experimental anti-narrativa
 * - Realismo mágico latino-americano (ainda não visto em nenhuma bio)
 */

if (typeof module !== "undefined" && module.exports) {
  module.exports = REGISTRO_HETERONIMOS;
}
