/**
 * motor_imagens_obra.js — Armazenamento real das imagens da obra
 * Celeiro Literário
 *
 * A Central da Obra (obra_ativa.html) só guardava a CONTAGEM das imagens
 * enviadas — o arquivo em si se perdia ao trocar de página. Este motor
 * guarda o conteúdo de verdade (Blob) num IndexedDB local, pra qualquer
 * ferramenta do Celeiro (Barracão de Polimento, diagramadores, OKapista...)
 * poder ler as mesmas imagens sem pedir upload de novo.
 *
 * Por que IndexedDB e não localStorage: imagem em base64 é grande demais
 * pro limite de ~5-10MB do localStorage — poucas fotos já estourariam a
 * cota. IndexedDB guarda Blob nativo, sem inflar 33% em base64, e tem
 * limite de centenas de MB a alguns GB, dependendo do navegador.
 *
 * Exporta: window.CeleiroImagensObra
 */
(function(global){
'use strict';

const DB_NOME = 'celeiro_obra_imagens_db';
const DB_VERSAO = 1;
const STORE = 'imagens';

function abrirDB(){
  return new Promise((resolve, reject)=>{
    if(!('indexedDB' in window)){ reject(new Error('IndexedDB não suportado neste navegador.')); return; }
    const req = indexedDB.open(DB_NOME, DB_VERSAO);
    req.onupgradeneeded = (e)=>{
      const db = e.target.result;
      if(!db.objectStoreNames.contains(STORE)){
        db.createObjectStore(STORE, { keyPath:'id', autoIncrement:true });
      }
    };
    req.onsuccess = (e)=> resolve(e.target.result);
    req.onerror = (e)=> reject(e.target.error);
  });
}

/**
 * Substitui todas as imagens guardadas pelas do array `files` (FileList
 * ou array de File). Cada obra nova troca o conteúdo — não acumula
 * imagens de obras diferentes.
 */
async function salvarImagens(files){
  const db = await abrirDB();
  const lista = Array.from(files||[]);
  return new Promise((resolve, reject)=>{
    const tx = db.transaction(STORE, 'readwrite');
    const store = tx.objectStore(STORE);
    store.clear();
    lista.forEach(file=>{
      store.add({
        nome: file.name,
        tipo: file.type,
        tamanho: file.size,
        blob: file,
        ts: Date.now(),
      });
    });
    tx.oncomplete = ()=> resolve(lista.length);
    tx.onerror = (e)=> reject(e.target.error);
  });
}

/**
 * Retorna array de { id, nome, tipo, tamanho, blob } com as imagens
 * atualmente guardadas.
 */
async function carregarImagens(){
  const db = await abrirDB();
  return new Promise((resolve, reject)=>{
    const tx = db.transaction(STORE, 'readonly');
    const store = tx.objectStore(STORE);
    const req = store.getAll();
    req.onsuccess = ()=> resolve(req.result||[]);
    req.onerror = (e)=> reject(e.target.error);
  });
}

async function contarImagens(){
  const db = await abrirDB();
  return new Promise((resolve, reject)=>{
    const tx = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).count();
    req.onsuccess = ()=> resolve(req.result||0);
    req.onerror = (e)=> reject(e.target.error);
  });
}

async function limparImagens(){
  const db = await abrirDB();
  return new Promise((resolve, reject)=>{
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).clear();
    tx.oncomplete = ()=> resolve();
    tx.onerror = (e)=> reject(e.target.error);
  });
}

global.CeleiroImagensObra = {
  salvarImagens,
  carregarImagens,
  contarImagens,
  limparImagens,
};

})(typeof window!=='undefined'?window:global);
