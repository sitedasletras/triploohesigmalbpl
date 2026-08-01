# Mary Rose — Índice Geral (Volumes 1–3)

Extração de personagens da série "Mary Rose" (Wagner Planas, 2023, UICLAP), feita
título por título e capítulo por capítulo a partir dos três volumes em docx fornecidos
pelo autor. Cada título tem sua própria pasta com `capitulos/` (resumo do que acontece
em cada capítulo) e `personagens/` (ficha completa e detalhada de cada personagem que
aparece naquele título — protagonistas recorrentes incluídos, com ficha própria em
cada título, não uma ficha única compartilhada).

Ver os índices de cada volume para o detalhamento título a título:
- [`vol1/_indice.md`](vol1/_indice.md)
- [`vol2/_indice.md`](vol2/_indice.md)
- [`vol3/_indice.md`](vol3/_indice.md)

## Números consolidados

| Volume | Títulos | Capítulos | Fichas de personagem |
|---|---|---|---|
| Volume 1 | 10 | 34 | 61 |
| Volume 2 | 7 | 36 | 57 |
| Volume 3 | 11 | 48 | 62 |
| **Total** | **28** | **118** | **180** |

(O número de "fichas" conta cada reaparição de um personagem recorrente em um novo
título como uma ficha própria e independente — Mary Rose, por exemplo, tem dezenas de
fichas, uma por título em que aparece, cada uma aprofundada com o que aquele título
específico revela sobre ela.)

## Achados de continuidade que precisam de decisão editorial

A extração foi feita com fidelidade ao texto-fonte, sem corrigir ou unificar
silenciosamente nada — as inconsistências abaixo já existem nos originais e foram só
documentadas, não resolvidas:

1. **Nomes dos protagonistas mudam de volume para volume.** Nos Volumes 1 e 2 o casal é
   sempre "Mary Rose" e "Bruce Dickson". No **Volume 3, esses nomes nunca aparecem** — o
   texto chama o mesmo casal-conceito (policiais/agentes da Interpol, casados,
   especialistas em recuperar artefatos religiosos da Organização Mozarkinski) de
   **"Cacau"** e **"Válber"** o tempo todo. Também há uma passagem no Volume 2
   ("Uma Nova Vida") que já usa os apelidos "Cacau" e o nome completo "Ana Claudia da
   Silva Quinteira" / "Válber Hierro Gomez" para os mesmos personagens — ou seja, os
   apelidos já existiam antes do Volume 3, só que ali o autor passou a usá-los como nome
   principal. Antes de transformar isso em jogo, vale decidir: um nome canônico único, ou
   manter "Cacau/Válber" como apelidos internos do casal "Mary Rose/Bruce Dickson"?

2. **O antagonista-mor não é uma pessoa fixa.** "Organização Mozarkinski" é estável como
   entidade, mas quem a lidera muda de nome quase a cada título: Ivan Mozarkinski,
   Riccardo Plácido Mozarkinski, Abdala Mozarkinski (ancestral histórico), Rosana
   Mozarkinski, Yuri Zarkov, "O Mestre" (sem nome revelado), e no Volume 2 aparece até um
   "Sr. Godofredo Mozarkinski" como marido de Rosana — inconsistente com Riccardo Plácido
   ser o marido dela em outro título. O mais provável, lendo o conjunto, é que a
   organização tenha múltiplas lideranças regionais (uma "hidra" com várias cabeças), o
   que aliás funciona bem para jogo (vários chefes de fase em vez de um vilão único). Mas
   vale uma decisão consciente sobre isso.

3. **Ivan Mozarkinski é dado como preso no Volume 3, título 07 ("Tridente de Netuno") e
   reaparece solto — e morre — no título 11 ("Os Dentes Sagrados do Dragão Dourado")**,
   sem explicação de fuga no texto.

4. **A idade/posição de Mary Rose entre os irmãos se contradiz** dentro do próprio
   Volume 1: ela é chamada de "filha caçula" num trecho e, mais adiante, descrita como a
   mais velha dos três (25 anos, contra Diego 22 e Alejandro 19).

5. **O Volume 2 tem 7 títulos, não 6**, e o **Volume 3 tem 11, não 10** — as contagens
   originalmente estimadas (a partir só dos headings do docx) subestimaram o total;
   confirmado por leitura integral de cada arquivo.

6. **"Os Dentes Sagrados do Dragão Dourado" (Volume 3, título 11)** tinha um problema de
   formatação no docx original: três capítulos internos estavam marcados como Heading 1
   (nível de título novo) em vez de Heading 2 (capítulo). Foram corrigidos nesta extração
   para ficarem como capítulos do mesmo título — ver nota detalhada em `vol3/_indice.md`.
   Falta também um "Capítulo 3" nesse título: o texto pula do Capítulo 2 direto para um
   trecho rotulado Capítulo 4 — lacuna do original, preservada sem invenção de conteúdo.

## Personagens estruturais (aparecem em muitos títulos, todos os volumes)

- **Mary Rose / Cacau** — protagonista, policial/agente da Interpol.
- **Bruce Dickson / Válber** — parceiro e depois marido de Mary Rose; revelado como
  descendente direto de Jesus Cristo, guardião ligado a relíquias sagradas.
- **João e Joana** — pais de Mary Rose.
- **Organização Mozarkinski** — organização criminosa internacional de tráfico de
  artefatos religiosos/históricos; antagonista estrutural de toda a série (ver achado #2
  acima sobre a liderança inconsistente).
- **Rafael Giannocaro, Fernando Rossi, Franco Baresi, Mansur Galvão, Riccardo Plácido**
  — aliados e antagonistas recorrentes em múltiplos títulos across volumes.

## Estrutura de pastas

```
bpl/personagens/mary_rose/
  _indice_geral.md          <- este arquivo
  vol1/_indice.md + 10 pastas de título
  vol2/_indice.md + 7 pastas de título
  vol3/_indice.md + 11 pastas de título

  <cada pasta de título>/
    capitulos/
      capitulo-NN-<slug>.md   <- personagens presentes + o que acontece naquele capítulo
    personagens/
      <slug-do-personagem>.md <- ficha completa: perfil físico, psicológico, história,
                                  desejos/medos, voz, relações, arco no título, citações
```
