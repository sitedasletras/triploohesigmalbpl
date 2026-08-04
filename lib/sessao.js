// Sessão de acesso ao SIGMAL HQ — Vercel KV.
//
// Antes disso, index.html e escritorio_triplo.html tinham a senha real
// (CELEIRO_BACKUP_SENHA) escrita em texto puro no JavaScript do cliente,
// só pra poder mandá-la de volta no header x-celeiro-senha em toda
// chamada a /api/estado e /api/creditos-status — qualquer um que abrisse
// "Ver código-fonte" lia a senha e entrava no sistema e nos dados de
// gasto. Agora a senha nunca sai do servidor: o cliente manda a senha
// UMA VEZ pra /api/estado?acao=login, o servidor confere contra
// process.env.CELEIRO_BACKUP_SENHA e devolve um token de sessão
// aleatório (guardado no KV com expiração) — esse token, não a senha, é
// o que o cliente guarda e reenvia depois no mesmo header.
//
// Login vira um "modo" dentro de api/estado.js em vez de um arquivo
// próprio (api/login.js) porque o projeto já está no teto de 12
// Serverless Functions do plano Hobby da Vercel — mesmo motivo pelo
// qual a cotação de dólar mora dentro de api/creditos-status.js.
import { kv } from '@vercel/kv';
import crypto from 'crypto';

const PREFIXO_SESSAO = 'sigmal_hq:sessao:';
const TTL_SEGUNDOS = 60 * 60 * 24 * 30; // 30 dias

export async function criarSessao() {
  const token = crypto.randomBytes(32).toString('hex');
  await kv.set(PREFIXO_SESSAO + token, true, { ex: TTL_SEGUNDOS });
  return token;
}

export async function validarSessao(req) {
  const token = req.headers['x-celeiro-senha'];
  if (!token) return false;
  try {
    return !!(await kv.get(PREFIXO_SESSAO + token));
  } catch (e) {
    return false;
  }
}
