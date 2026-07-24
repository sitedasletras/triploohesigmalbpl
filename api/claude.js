import { kv } from '@vercel/kv';
import { registrarGasto } from '../lib/creditos.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const chave = process.env.ANTHROPIC_API_KEY;
  if (!chave) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY não configurada no servidor.' });
  }

  try {
    const resposta = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': chave,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    });

    const dados = await resposta.json();
    if (dados?.usage) {
      await registrarGasto(kv, 'claude', dados.usage.input_tokens, dados.usage.output_tokens);
    }
    return res.status(resposta.status).json(dados);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
