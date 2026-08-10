// Proxy server-side pra API de conteúdo do GitHub (ler/gravar arquivo) — o
// GITHUB_TOKEN nunca mais chega ao navegador. Usado por todos os fluxos que
// salvam conteúdo gerado (vozes, biografias, personagens, obras) tanto no
// próprio triploohesigmalbpl quanto no CeleiroLiterario e no OHE-PECANHA.
//
// Allowlist de repositórios: só esses três, pra esse proxy nunca virar um
// "escreve em qualquer repo" caso a URL seja descoberta — mesmo com o token
// só existindo aqui, um proxy sem essa trava aceitaria {repo: "outracoisa"}
// e usaria o mesmo token pra escrever em repositórios fora do escopo
// pretendido.
//
// exige sessão (validarSessao) igual a todo outro proxy pago do sistema
// (api/claude.js, api/gerar-imagem.js etc.) — faltava aqui, e sem isso
// qualquer um que descobrisse a URL conseguia gravar (PUT) arquivo em
// qualquer um dos três repositórios da allowlist, inclusive código-fonte
// deste próprio site, sem nunca ter feito login.
import { validarSessao } from '../lib/sessao.js';

const OWNER = 'sitedasletras';
const REPOS_PERMITIDOS = new Set(['triploohesigmalbpl', 'CeleiroLiterario', 'OHE-PECANHA']);

function validarRepo(repo) {
  return REPOS_PERMITIDOS.has(repo);
}

async function handleGet(req, res, chave) {
  const { repo, path } = req.query;
  if (!validarRepo(repo)) {
    return res.status(400).json({ error: 'Repositório não permitido.' });
  }

  const url = path
    ? `https://api.github.com/repos/${OWNER}/${repo}/contents/${path}`
    : `https://api.github.com/repos/${OWNER}/${repo}`;

  const resposta = await fetch(url, {
    headers: { 'Authorization': `token ${chave}`, 'Accept': 'application/vnd.github.v3+json' },
  });
  const dados = await resposta.json().catch(() => ({}));
  return res.status(resposta.status).json(dados);
}

async function handlePut(req, res, chave) {
  const { repo, path, content, message, sha, branch } = req.body || {};
  if (!validarRepo(repo)) {
    return res.status(400).json({ error: 'Repositório não permitido.' });
  }
  if (!path || content == null || !message) {
    return res.status(400).json({ error: 'Informe "path", "content" e "message".' });
  }

  const corpo = {
    message,
    content: Buffer.from(content, 'utf-8').toString('base64'),
    branch: branch || 'main',
  };
  if (sha) corpo.sha = sha;

  const resposta = await fetch(`https://api.github.com/repos/${OWNER}/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${chave}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(corpo),
  });
  const dados = await resposta.json().catch(() => ({}));
  return res.status(resposta.status).json(dados);
}

export default async function handler(req, res) {
  if (!(await validarSessao(req))) {
    return res.status(401).json({ error: 'Não autorizado.' });
  }

  const chave = process.env.GITHUB_TOKEN;
  if (!chave) {
    return res.status(500).json({ error: 'GITHUB_TOKEN não configurada no servidor.' });
  }

  try {
    if (req.method === 'GET') return await handleGet(req, res, chave);
    if (req.method === 'PUT') return await handlePut(req, res, chave);
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
