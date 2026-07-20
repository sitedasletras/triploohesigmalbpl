---
name: humanizar-texto
description: Use this skill whenever you are about to write, draft, revise, or "humanize" prose, dialogue, narrative text, synopsis, or script content directly in this repo (triploohesigmalbpl / SIGMAL HQ / OHE-Peçanha) — including when the user explicitly asks to "humanize", "de-AI-ify", "make this sound less like AI", or "make this sound more human" a piece of text, and also proactively any time you yourself are about to produce a paragraph of narrative prose, a character's dialogue, or a synopsis as your own chat output in this repo, since that output is just as exposed to AI-writing tells as anything the automated pipeline generates. Does NOT apply to writing code, commit messages, or short factual/technical replies — this is specifically for narrative and creative prose.
---

# Humanizar Texto

## Por que isso existe

Este repo já tem uma camada automática que injeta um checklist anti-IA e perfis de voz por heterônimo direto nos prompts da API (`checklist_antiia.js`, `perfis_voz.js`) — isso cobre a geração que roda pelo pipeline (`gerador_obra.html`, `silo_cinematografico.html`). Esta skill cobre o outro caso: quando **você mesmo**, na conversa, escreve ou revisa prosa, diálogo, sinopse ou trecho de roteiro. Esse texto não passa pelo pipeline, então nada o protege dos mesmos vícios — a menos que você aplique o mesmo cuidado manualmente.

## Seja honesto sobre o que isso é (e o que não é)

Nenhum checklist garante escapar de detectores de IA — detectores são famosos por dar falso positivo em texto humano perfeitamente bom e falso negativo em texto de IA bem revisado. Não trate isso como uma fórmula de evasão. O objetivo real é escrever melhor: os dez padrões abaixo não são "coisas que os detectores procuram", são vícios retóricos genuínos que deixam qualquer texto — de IA ou de humano cansado — burocrático, genérico e sem timbre próprio. Corrigir isso melhora o texto por si só, com ou sem detector no meio.

Se o pedido do usuário for algo como "escreve isso de um jeito que passe no GPTZero", vale dizer isso direto: você vai escrever o melhor texto possível seguindo o checklist abaixo, não vai prometer que passa em nenhum detector específico.

## Se o texto é assinado por um heterônimo

Antes de aplicar o checklist genérico, verifique se o texto é atribuído a um dos heterônimos deste sistema. Se for, o Perfil de Voz dele em `perfis_voz.js` (função `getPerfilVozPorNome(nome)`) manda mais que o checklist genérico — ele descreve a tradição literária, o estilo específico e os "nunca faz" daquele autor em particular, e isso é mais específico e mais importante que qualquer regra geral. O checklist abaixo é o piso mínimo (evita que qualquer autor soe como piloto automático); o Perfil de Voz é o que faz aquele autor soar como ele mesmo e não como outro. Quando os dois existem, aplique ambos — Perfil de Voz primeiro, checklist genérico depois, nessa ordem de prioridade.

Se o heterônimo ainda não tem Perfil de Voz registrado, siga só o checklist genérico — não invente uma tradição/formação sozinho; isso é decisão editorial de Wagner + Fernando Peçanha, não algo pra ser criado ad hoc numa resposta de chat.

## O checklist

Pesquisa de base: o ensaio da Wikipédia em inglês ["Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), compilado por editores a partir de milhares de edições suspeitas de IA — cruzado com cobertura da Forbes ("The 10 Giveaway Signs Of AI Writing, Wikipedia Reveals", set/2025) e da Grammarly sobre vocabulário de IA. Os dez itens abaixo são os padrões mais citados nessas fontes — a mesma lista já injetada na geração automática via `checklist_antiia.js`.

1. **Regra de três** — enumerar tudo em trincas ("adjetivo, adjetivo e adjetivo") pra parecer mais completo do que é. Varie a contagem: dois, quatro, um só.
2. **Cláusulas penduradas** — gerúndio ou particípio jogado no fim da frase só pra soar mais importante, sem informação nova ("...moldando um novo capítulo da história"). Corte, ou troque por uma imagem concreta.
3. **Falsos espectros** — "de X a Y" fingindo uma escala contínua onde só há duas coisas soltas ("de encontros íntimos a movimentos globais"). Sem escala real, sem essa construção.
4. **Resumo compulsivo** — fechar reafirmando o que já foi dito ("em suma", "no fim das contas", "de modo geral"). Termine no último fato ou imagem, não numa síntese.
5. **Inflação de importância** — chamar fato comum de "decisivo", "transformador", "parte de um movimento maior" sem nada que sustente o peso.
6. **Vocabulário de piloto automático** — "mergulhar em", "tapeçaria", "testemunho de", "sublinhar", "fundamental", "essencial", "cenário", "rico", "vibrante", "fomentar", "crucial" como enchimento abstrato em vez de imagem concreta.
7. **Paralelismo negativo em série** — "não é só X, é Y" repetido como muleta ("não é um lançamento, é uma mudança de era"). No máximo uma vez num texto longo.
8. **Atribuição vaga** — "dizem que", "é visto como", "especialistas apontam" sem nomear quem. Se não há fonte concreta na ficção, não finja que há.
9. **Tom promocional parelho** — adjetivo de propaganda ("de tirar o fôlego", "imperdível") aplicado a qualquer coisa, sem hierarquia real de intensidade.
10. **Simetria de superfície** — parágrafos e frases do mesmo tamanho, ritmo regular demais. Varie de propósito: frase curta ao lado de uma longa, parágrafo quebrando o bloco.

## Antes de entregar o texto

Releia o rascunho contra os dez itens acima (e contra o Perfil de Voz, se houver) e corrija o que encontrar — não entregue a primeira versão sem essa checagem. Isso não precisa virar um relatório visível pro usuário; é um passo interno antes de mostrar o resultado final.
