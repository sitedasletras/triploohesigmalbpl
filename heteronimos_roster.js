/**
 * ROSTER COMPARTILHADO DE HETERÔNIMOS — triploohesigmalbpl
 * ---------------------------------------------------------
 * Fonte de verdade dos 57 heterônimos oficiais: cópia manual do array
 * HETERONIMOS de index.html (linhas 3739-3797). Se um heterônimo for
 * adicionado/editado diretamente em index.html, replique a mudança aqui —
 * este arquivo é um espelho, não o original.
 *
 * Criado para dar a gerador_obra.html e trajano_estrada.html uma base
 * comum de 57 (em vez de listas parciais divergentes), mais os
 * heterônimos criados em runtime pela Maternidade (localStorage
 * 'heteronimos_extras'), que ficam disponíveis via getRosterCompleto()
 * para todas as páginas que carregarem este arquivo.
 */

const HETERONIMOS_ROSTER_BASE = [
  { nome: 'A.J. dos Santos', eixo: 'Prosa', territorio: 'Chupa-cabras, lobisomens, vampiros', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Sobrenatural', 'Rural'], tomPadrao: ['Terror', 'Suspense'] },
  { nome: 'Amanda Fernanda Fisher Leão', eixo: 'Prosa', territorio: 'Pirataria, sereias, monstros marinhos', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Mar', 'Sobrenatural'], tomPadrao: ['Aventura', 'Mistério'] },
  { nome: 'Amélie Maia Hanna', eixo: 'Poesia', territorio: 'Sonetos, memórias, cotidiano', formato: 'soneto', volumeMinimo: 50, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Lírico', 'Melancólico'] },
  { nome: 'Anísio Teixeira', eixo: 'Híbrido', territorio: 'Zumbis, pós-apocalipse, horror existencial', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Pós-apocalíptico'], tomPadrao: ['Horror', 'Existencial'] },
  { nome: 'Articus da Persida', eixo: 'Prosa', territorio: 'Templários, cavalaria medieval, amor impossível', formato: 'romance', volumeMinimo: 120, destino: 'calabouco', universoPadrao: ['Medieval', 'Histórico'], tomPadrao: ['Épico', 'Amor'] },
  { nome: 'Aurora Wings', eixo: 'Híbrido', territorio: 'IA, super-heróis, ficção científica', formato: 'romance', volumeMinimo: 120, destino: 'calabouco', universoPadrao: ['Sci-fi', 'Tecnológico'], tomPadrao: ['Aventura', 'Filosófico'] },
  { nome: 'Padre Benedicttus Konstantinos', eixo: 'Híbrido', territorio: 'Religião católica, gárgulas, apocalipse', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Religioso', 'Sobrenatural'], tomPadrao: ['Terror', 'Filosófico'] },
  { nome: 'Birihani Selami Ina Tesifa', eixo: 'Poesia', territorio: 'Ghazal, amor, devoção, saudade', formato: 'ghazal', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Amor', 'Lírico'] },
  { nome: 'Calíope Papazissis', eixo: 'Híbrido', territorio: 'Mitologia grega, nórdica, celta', formato: 'prosa-poetica', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Mitológico', 'Fantasia'], tomPadrao: ['Épico', 'Poético'] },
  { nome: 'Chesco Irlanda', eixo: 'Prosa', territorio: 'Literatura infantil, fábulas', formato: 'conto', volumeMinimo: 15, destino: 'masmorra', universoPadrao: ['Fantasia'], tomPadrao: ['Aventura', 'Humor'] },
  { nome: 'Clara Mendes Rios', eixo: 'Híbrido', territorio: 'Prosa híbrida, memória, reconstrução feminina', formato: 'prosa-poetica', volumeMinimo: 20, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Psicológico', 'Melancólico'] },
  { nome: 'Claudiney Aristides Diaz', eixo: 'Aberto', territorio: 'Território a definir — escrita em processo', formato: 'variado', volumeMinimo: 10, destino: 'masmorra', universoPadrao: [], tomPadrao: [] },
  { nome: 'Creone Porfirio', eixo: 'Prosa', territorio: 'Guerras, patriotismo, militarismo', formato: 'romance', volumeMinimo: 120, destino: 'calabouco', universoPadrao: ['Guerra', 'Histórico'], tomPadrao: ['Épico', 'Drama'] },
  { nome: 'Cristovão Duarte', eixo: 'Prosa', territorio: 'Aracnídeos, horror subterrâneo', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Sobrenatural', 'Submundo urbano'], tomPadrao: ['Horror', 'Visceral'] },
  { nome: 'Daniel Fernandes', eixo: 'Híbrido', territorio: 'Poesia erótica/hot, teatro, cotidiano urbano', formato: 'poesia', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Erótico', 'Lírico'] },
  { nome: 'Dárius Ninus Vamus', eixo: 'Híbrido', territorio: 'Futebol, humor, limerick, elegia', formato: 'poesia', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Humor', 'Sátira'] },
  { nome: 'Demetrius Varas', eixo: 'Prosa', territorio: 'Prosa erótica/hot', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Erótico'] },
  { nome: 'Din Kin Lin', eixo: 'Híbrido', territorio: 'Dragões, seres místicos do oriente, lendas', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Fantasia', 'Mitológico'], tomPadrao: ['Épico', 'Aventura'] },
  { nome: 'Diógenes Bueno de Alencar', eixo: 'Híbrido', territorio: 'Arquipélagos, penínsulas, memória, interior', formato: 'cronica', volumeMinimo: 30, destino: 'masmorra', universoPadrao: ['Rural', 'Mar'], tomPadrao: ['Contemplativo', 'Melancólico'] },
  { nome: 'Hama Amarin', eixo: 'Poesia', territorio: 'Pantum, perdão, ciclos emocionais', formato: 'pantum', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Lírico', 'Psicológico'] },
  { nome: 'Helena Duarte Valença', eixo: 'Prosa', territorio: 'Reconstrução feminina, memória doméstica, silenciamento', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Drama', 'Psicológico'] },
  { nome: 'Henrich Jones', eixo: 'Prosa', territorio: 'Arqueologia, paleontologia, civilizações antigas', formato: 'romance', volumeMinimo: 120, destino: 'calabouco', universoPadrao: ['Histórico'], tomPadrao: ['Aventura', 'Mistério'] },
  { nome: 'Hernesto Bevilácqua', eixo: 'Poesia', territorio: 'Ode, contemplação, lirismo clássico', formato: 'ode', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Poético', 'Contemplativo'] },
  { nome: 'Horando Almeida Prado', eixo: 'Híbrido', territorio: 'Mar, pesca, litoral sul paulista', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Mar', 'Rural'], tomPadrao: ['Contemplativo', 'Drama'] },
  { nome: 'Icabode Kahpote', eixo: 'Híbrido', territorio: 'Sextinas, contos póstumos, morte, além-vida', formato: 'sextina', volumeMinimo: 30, destino: 'masmorra', universoPadrao: ['Sobrenatural'], tomPadrao: ['Melancólico', 'Existencial'] },
  { nome: 'Imediato Thompson', eixo: 'Híbrido', territorio: 'Constelação Ophiuchus, Atlantis, cosmologia', formato: 'romance', volumeMinimo: 120, destino: 'calabouco', universoPadrao: ['Espaço', 'Mitológico'], tomPadrao: ['Épico', 'Filosófico'] },
  { nome: 'J.L.Gomes', eixo: 'Híbrido', territorio: 'Literatura espírita kardecista — prosa, poesia e mensagens psicografadas. ÚNICO heterônimo autorizado para esse território. Toda obra espírita/kardecista é psicografada/ditada pelo Irmão Pullius (espírito mentor) e assinada por J.L.Gomes como médium. NUNCA usar outro heterônimo para temática espírita kardecista.', formato: 'variado', volumeMinimo: 30, destino: 'masmorra', universoPadrao: ['Religioso', 'Contemporâneo'], tomPadrao: ['Filosófico', 'Contemplativo'], espiritaExclusivo: true, espiritoMentor: 'Irmão Pullius' },
  { nome: 'Jorge Cavalcanti', eixo: 'Cordel', territorio: 'Cordel, cultura popular, oralidade', formato: 'cordel', volumeMinimo: 20, destino: 'masmorra', universoPadrao: ['Rural', 'Histórico'], tomPadrao: ['Humor', 'Épico'] },
  { nome: 'Julia Abdalla', eixo: 'Prosa', territorio: 'Culinária, bem-estar, receitas literárias', formato: 'cronica', volumeMinimo: 20, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Contemplativo', 'Humor'] },
  { nome: 'Juka Pituskaq', eixo: 'Poesia', territorio: 'Novo Movimento Estrofista, odes', formato: 'poesia', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Poético', 'Lírico'] },
  { nome: 'Marina Torres Azevedo', eixo: 'Poesia', territorio: 'Poesia de reconstrução feminina, cura, memória', formato: 'poesia', volumeMinimo: 30, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Psicológico', 'Lírico'] },
  { nome: 'Mário Célio Sabino', eixo: 'Híbrido', territorio: 'Terror, fantasmas, ocultismo, paranormal', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Sobrenatural'], tomPadrao: ['Terror', 'Suspense'] },
  { nome: 'Michelangelo Miguel', eixo: 'Poesia', territorio: 'Poema narrativo, lirismo, memória', formato: 'poesia', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Lírico', 'Poético'] },
  { nome: 'Noraya Sakamoto', eixo: 'Poesia', territorio: 'Haicais, natureza, sensibilidade oriental', formato: 'haicai', volumeMinimo: 60, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Contemplativo', 'Poético'] },
  { nome: 'Pyetra Luyza', eixo: 'Híbrido', territorio: 'Ecoficção, natureza, defesa ambiental', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Rural', 'Pós-apocalíptico'], tomPadrao: ['Contemplativo', 'Urgente'] },
  { nome: 'Raimundo José da Silva Nonato', eixo: 'Híbrido', territorio: 'Seca nordestina, memória oral, resistência', formato: 'cordel', volumeMinimo: 20, destino: 'masmorra', universoPadrao: ['Rural', 'Histórico'], tomPadrao: ['Drama', 'Épico'] },
  { nome: 'Renat Kolotov', eixo: 'Prosa', territorio: 'Revolução Russa, resistência histórica', formato: 'romance', volumeMinimo: 120, destino: 'calabouco', universoPadrao: ['Histórico', 'Político'], tomPadrao: ['Drama', 'Épico'] },
  { nome: 'Rovonilson Reigns Bautista', eixo: 'Híbrido', territorio: 'Rap, rua, marquises, arquitetura urbana', formato: 'poesia', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Submundo urbano', 'Contemporâneo'], tomPadrao: ['Urgente', 'Visceral'] },
  { nome: 'Sebastião Ferreira dos Anjos', eixo: 'Poesia', territorio: 'Poemas dissertativos, reflexão social', formato: 'poesia', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Político', 'Contemporâneo'], tomPadrao: ['Filosófico', 'Drama'] },
  { nome: 'Site das Letras Ed. Literárias', eixo: 'Híbrido', territorio: 'Miscelânea, antologias institucionais', formato: 'variado', volumeMinimo: 10, destino: 'calabouco', universoPadrao: [], tomPadrao: [] },
  { nome: 'Valter Marques', eixo: 'Híbrido', territorio: 'Erros do passado, dor, diversidade de estilos', formato: 'variado', volumeMinimo: 20, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Drama', 'Melancólico'] },
  { nome: 'Victor A. Pereira', eixo: 'Prosa', territorio: 'Mistério, romance policial, investigação', formato: 'romance', volumeMinimo: 120, destino: 'calabouco', universoPadrao: ['Policial', 'Contemporâneo'], tomPadrao: ['Mistério', 'Suspense'] },
  { nome: 'Wagner Planas', eixo: 'Híbrido', territorio: 'Múltiplos — criador do ecossistema', formato: 'variado', volumeMinimo: 10, destino: 'masmorra', universoPadrao: [], tomPadrao: [] },
  { nome: 'Wilson Silva', eixo: 'Híbrido', territorio: 'Cotidiano, amor, poesias e prosas líricas', formato: 'variado', volumeMinimo: 30, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Amor', 'Lírico'] },
  { nome: 'Yago Mattos', eixo: 'Híbrido', territorio: 'Bruxas, lendas, deuses do mar', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Mar', 'Mitológico'], tomPadrao: ['Mistério', 'Épico'] },
  { nome: 'Mórigan Voss', eixo: 'Prosa', territorio: 'Amor impossível, luto, fronteiras entre mundos, o que persiste depois da perda. Tom literário elevado, linguagem densa, emocionalmente preciso. Obra: As Lágrimas que Dobram o Céu', formato: 'romance', volumeMinimo: 120, destino: 'calabouco', universoPadrao: ['Sobrenatural', 'Contemporâneo'], tomPadrao: ['Amor', 'Melancólico'] },
  { nome: 'Dona Catarina Trovante', eixo: 'Poesia', territorio: 'Trovas, quadras métricas, temas nacionais, amor, resistência', formato: 'trova', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Histórico'], tomPadrao: ['Amor', 'Épico'] },
  { nome: 'Vladislava Karnstein', eixo: 'Híbrido', territorio: 'Vampirismo aristocrático, sedução sombria, memórias de uma condessa imortal', formato: 'romance', volumeMinimo: 120, destino: 'calabouco', universoPadrao: ['Sobrenatural', 'Histórico'], tomPadrao: ['Melancólico', 'Erótico'] },
  { nome: 'Santiago Poetrix', eixo: 'Híbrido', territorio: 'Poetrix — forma híbrida entre poesia e prosa poética, Santos SP', formato: 'poetrix', volumeMinimo: 30, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Poético', 'Lírico'] },
  { nome: 'Irmão Ezequias Luz', eixo: 'Híbrido', territorio: 'Literatura cristã evangélica, terror espiritual, batalha entre bem e mal', formato: 'conto', volumeMinimo: 12, destino: 'masmorra', universoPadrao: ['Religioso', 'Sobrenatural'], tomPadrao: ['Terror', 'Filosófico'] },
  { nome: 'Marina das Vozes', eixo: 'Híbrido', territorio: 'Crônica urbana pura, São Paulo, vida metropolitana, ironia fina', formato: 'cronica', volumeMinimo: 30, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Sátira', 'Contemplativo'] },
  { nome: 'Mirela Voss Drummond', eixo: 'Prosa', territorio: 'O que resta nos vivos depois da perda — memória afetiva, presença invisível de quem partiu, luto silencioso no cotidiano. Irmã de Mórigan Voss, nascida em Utrecht, Países Baixos. Obra: O Que Resta Depois do Fogo', formato: 'conto', volumeMinimo: 40, destino: 'calabouco', universoPadrao: ['Contemporâneo'], tomPadrao: ['Melancólico', 'Contemplativo'] },
  { nome: 'Baltasar de Morais Seixas', eixo: 'Prosa', territorio: 'Épica e espiritualidade ibérica — fé, mar, Descobrimentos portugueses, Ordem dos Cavaleiros de Cristo. Neto de marinheiro de Vasco da Gama. Obra: A Cruz Sem Margem', formato: 'romance', volumeMinimo: 120, destino: 'calabouco', universoPadrao: ['Histórico', 'Mar'], tomPadrao: ['Épico', 'Filosófico'] },
  { nome: 'Miroslav Kadek', eixo: 'Prosa', territorio: 'Prosa lírica de tensão histórica e memória fragmentada — Guerra Fria, Europa Central, silêncio geracional, trauma herdado. Obra: O Que Ficou na Areia', formato: 'romance', volumeMinimo: 80, destino: 'calabouco', universoPadrao: ['Histórico', 'Político'], tomPadrao: ['Psicológico', 'Melancólico'] },
  { nome: 'Tlacuilo Bernardino Xochitl', eixo: 'Prosa', territorio: 'Prosa mítica mesoamericana — cosmogonia asteca e maia, deuses, sacrifício, ciclos do tempo. Escreve como um escriba sagrado. Obra: O Que Bebe na Noite', formato: 'romance', volumeMinimo: 80, destino: 'calabouco', universoPadrao: ['Mitológico', 'Histórico'], tomPadrao: ['Épico', 'Filosófico'] },
  { nome: 'Nazário Wendt Colussi', eixo: 'Poesia', territorio: 'Acrósticos — poesia estrutural pela primeira letra de cada verso, jogos de palavras, wordplay visual. ÚNICO heterônimo autorizado para acróstico — só produz obras nesse formato.', formato: 'acrostico', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Lúdico', 'Contemplativo'], acrosticoExclusivo: true },
  { nome: 'Riolando Kraze', eixo: 'Poesia', territorio: 'Epigrama e Vilanela — o golpe curto e irônico de poucos versos, e a obsessão circular dos refrões que se repetem e se cruzam ao longo do poema. ÚNICO heterônimo autorizado para esses dois formatos.', formato: 'poesia', volumeMinimo: 40, destino: 'masmorra', universoPadrao: ['Contemporâneo'], tomPadrao: ['Irônico', 'Obsessivo'] },
];

// Mesmo algoritmo de slug já usado em gerador_obra.html/confirmarNovoHeteronimo(),
// extraído aqui para as duas páginas gerarem sempre a mesma chave a partir de um nome.
function slugifyNome(nome) {
  return nome.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '').substring(0, 30);
}

// Heterônimos criados em runtime pela Maternidade (gerador_obra.html), persistidos
// para sobreviver a reloads e ficarem visíveis ao Trajano Estrada.
function getHeteronimosExtras() {
  try { return JSON.parse(localStorage.getItem('heteronimos_extras') || '[]'); }
  catch (e) { return []; }
}

function registrarHeteronimoExtra(entry) {
  const extras = getHeteronimosExtras();
  const key = slugifyNome(entry.nome);
  if (extras.some(e => slugifyNome(e.nome) === key)) return;
  extras.push(entry);
  localStorage.setItem('heteronimos_extras', JSON.stringify(extras));
}

// Roster completo: os 57 oficiais + o que foi criado depois pela Maternidade.
function getRosterCompleto() {
  return HETERONIMOS_ROSTER_BASE.concat(getHeteronimosExtras());
}

// Busca por nome — igual (exata) primeiro, depois aproximada (mesmo padrão
// de dois passos já usado em index.html para casar nome vindo da IA com o roster).
function getHeteronimoPorNome(nome) {
  if (!nome) return null;
  const roster = getRosterCompleto();
  const alvo = nome.toLowerCase();
  return roster.find(h => h.nome.toLowerCase() === alvo)
    || roster.find(h => h.nome.toLowerCase().includes(alvo) || alvo.includes(h.nome.toLowerCase()))
    || null;
}
