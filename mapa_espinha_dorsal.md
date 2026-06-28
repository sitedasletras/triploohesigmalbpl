# 🗺 MAPA DA ESPINHA DORSAL — triploohesigmalbpl
**Gerado em:** 28/06/2026

---

## ARQUIVO RAIZ

| Arquivo | Função | Status |
|---|---|---|
| `index_15.html` → deploy como `index.html` | Painel Central SIGMAL HQ — hub de tudo | ✅ Ativo |
| `config.js` | API key Anthropic + GitHub token + variáveis globais | ✅ Crítico |
| `espinha_dorsal.html` | Mapa de navegação de todos os módulos | ✅ Ativo |

---

## CAMADA 1 — OHE · GERAÇÃO DE OBRAS

| Arquivo | Função | Status |
|---|---|---|
| `maquina_desafio.html` | Fernando Peçanha — desafio PROSA/POESIA, 55 heterônimos | ✅ Atualizado hoje |
| `gerador_livro_calabouco.html` | Expansão narrativa de obras do Calabouço em 3 arcos | ✅ Atualizado hoje |
| `extrair_personagens.html` | Extrai personagens das obras via API e salva na Vitrine | ✅ Corrigido hoje |
| `vitrine_personagens.html` | Exibe e filtra personagens salvos no localStorage | ✅ Ativo |
| `injetar_calabouco.html` | Injeta obras manualmente no Calabouço via localStorage | ✅ Ativo |

---

## CAMADA 2 — ARMAZENAMENTO E DISPATCH

| Arquivo | Função | Status |
|---|---|---|
| `index_15.html` (ala Masmorra) | Masmorra — 750 dias de quarentena por heterônimo | ✅ Embutido |
| `index_15.html` (ala Calabouço) | Calabouço — obras consolidadas com comparador de versões | ✅ Atualizado hoje |
| `catapulta.html` | Dispara obras do Calabouço → Lapidar/Celeiro com ficha técnica | ✅ Atualizado hoje |
| `balestra.html` | Dispatch alternativo (automático) | ⚠️ Não auditado |

---

## CAMADA 3 — PROCESSAMENTO E HUMANIZAÇÃO

| Arquivo | Função | Status |
|---|---|---|
| `humanizador.html` | 4 passes automáticos anti-detecção de IA | ⚠️ Não auditado |
| `revisao_fernando.html` | Revisão curatorial por Fernando Peçanha | ⚠️ Não auditado |
| `lapidacao_psicologica.html` | Análise emocional e psicológica da obra | ⚠️ Não auditado |
| `leitura_emocional.html` | Leitura emocional da obra | ⚠️ Não auditado |

---

## CAMADA 4 — GESTÃO DE AUTORES E BIOGRAFIAS

| Arquivo | Função | Status |
|---|---|---|
| `gestao_biografias_hq.html` | Gera e publica biografias dos heterônimos no Celeiro via GitHub API | ⚠️ Não auditado |
| `sala_exposicao_biografias.html` | Exibe biografias geradas | ⚠️ Não auditado |
| `publicador_lote_biografias.html` | Publica biografias em lote | ⚠️ Não auditado |
| `painel_wagner_planas.html` | Painel pessoal de Wagner | ⚠️ Não auditado |

---

## CAMADA 5 — SIGMAL MUSIC

| Arquivo | Função | Status |
|---|---|---|
| `sigmal_music_studio.html` | Estúdio — Condor Andino + Maestro Aaron Cantarelli Vox | ✅ Referenciado |
| `maestro_aaron_sistema.html` | Sistema do Maestro Aaron | ⚠️ Não auditado |
| `maestro_aaron_curadoria.html` | Curadoria de intérpretes | ⚠️ Não auditado |
| `publicador_lote_musical.html` | Publica músicas em lote | ⚠️ Não auditado |

---

## CAMADA 6 — BPL / NÚCLEO N

| Arquivo | Função | Status |
|---|---|---|
| `bpl_banco_personagens_literarios.html` | Banco de 50 artistas fundadores — geração de rosto via IA | ✅ Referenciado |
| `charlton_heston_sistema.html` | Diretor isolado — elenco para produções visuais | ⚠️ Não auditado |

---

## CAMADA 7 — UTILITÁRIOS E EXPORTAÇÃO

| Arquivo | Função | Status |
|---|---|---|
| `exportador_universal.html` | Exportação universal de conteúdo | ⚠️ Não auditado |
| `sigmal_exportador.html` | Exportador específico SIGMAL | ⚠️ Não auditado |
| `ohe_editor_obras.html` | Editor de obras OHE | ⚠️ Não auditado |
| `biblioteca.html` | Biblioteca do ecossistema | ⚠️ Não auditado |
| `wsp_sa_me.html` | WSP — módulo de comunicação | ⚠️ Não auditado |

---

## CHAVES localStorage (mapa de dados)

| Chave | Conteúdo | Usado por |
|---|---|---|
| `sigmal_hq` | Estado geral (calabouco, masmorra, paiol) | index_15, gerador_livro, maquina_desafio |
| `sigmal_hq_estado` | Estado alternativo (mesmo conteúdo) | catapulta, maquina_desafio |
| `sigmal_estado` | Estado legado | compatibilidade |
| `vitrine_personagens` | Array de personagens extraídos | vitrine, extrair |
| `calabouco_livros` | Array de livros no Calabouço | gerador_livro |
| `catapulta_log` | Log de disparos | catapulta |
| `catapulta_manuais` | Obras registradas manualmente | catapulta |
| `catapulta_ficha_tecnica` | Ficha técnica em trânsito → obra_ativa | catapulta → obra_ativa |
| `hub_apikey` | API key salva pelo usuário | maquina_desafio, outros |
| `gh_token` | GitHub token salvo pelo usuário | index_15, catapulta |
| `sigmal_hq_auth` | Flag de autenticação (='1') | index_15 |
| `lapidar_story_bible` | Story bible do Lapidar | lapidar |
| `trajano_ficha` | Ficha do Trajano Estrada | trajano |

---

## FLUXO PRINCIPAL (caminho de uma obra)

```
Máquina Desafio
      ↓
Fernando Peçanha escolhe heterônimo + gera obra semente
      ↓
⚡ CALABOUÇO  ou  ⛓ MASMORRA (750 dias)
      ↓
Gerador de Livro Calabouço (expansão em 3 arcos)
      ↓
Catapulta → ficha técnica completa (título, autor, forma, modo)
      ↓
obra_ativa.html (Celeiro Literário)
      ↓
motor_detectar_tipo_obra.html → diagramador correto
      ↓
Lapidar Pensante (7 camadas: AN→DRO→ID→NAS→FISA→SENCAL→FIIISAA)
      ↓
Publicação no Celeiro Literário
```

---

## ARQUIVOS NÃO AUDITADOS (próxima rodada)
`humanizador.html` · `revisao_fernando.html` · `balestra.html` · `gestao_biografias_hq.html` · `lapidacao_psicologica.html` · `leitura_emocional.html` · `ohe_editor_obras.html` · `exportador_universal.html` · `maestro_aaron_sistema.html` · `charlton_heston_sistema.html`
