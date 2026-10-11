#!/usr/bin/env node
// CLI pra ler/escrever a colecao Firestore "top100Schedule", usada pela rotina
// "vigia" (que arma o disparo exato) e pelo disparo exato em si (que marca o
// resultado da captura). Usa o Admin SDK, entao ignora as regras de seguranca.
//
// Credencial: variavel de ambiente FIREBASE_SERVICE_ACCOUNT_JSON (conteudo
// inteiro do JSON da conta de servico do Firebase).
//
// Uso:
//   node scripts/top100-schedule-cli.mjs list-pending
//   node scripts/top100-schedule-cli.mjs mark <docId> <status> [--error "msg"] [--armedTriggerId id] [--resultDatasetKey key]

import admin from "firebase-admin";

function initAdmin() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) {
    throw new Error("Variavel de ambiente FIREBASE_SERVICE_ACCOUNT_JSON nao encontrada");
  }
  const credentials = JSON.parse(raw);
  if (admin.apps.length === 0) {
    admin.initializeApp({ credential: admin.credential.cert(credentials) });
  }
  return admin.firestore();
}

function parseFlags(args) {
  const flags = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      flags[args[i].slice(2)] = args[i + 1];
      i++;
    }
  }
  return flags;
}

async function listPending(db) {
  const snapshot = await db.collection("top100Schedule").where("status", "==", "pending").get();
  const items = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      seasonName: data.seasonName,
      targetAt: data.targetAt && data.targetAt.toDate ? data.targetAt.toDate().toISOString() : null,
    };
  });
  console.log(JSON.stringify(items, null, 2));
}

async function mark(db, docId, status, flags) {
  if (!docId || !status) {
    throw new Error("Uso: mark <docId> <status> [--error msg] [--armedTriggerId id] [--resultDatasetKey key]");
  }
  const update = { status };
  if (flags.error) update.error = flags.error;
  if (flags.armedTriggerId) update.armedTriggerId = flags.armedTriggerId;
  if (flags.resultDatasetKey) update.resultDatasetKey = flags.resultDatasetKey;
  await db.collection("top100Schedule").doc(docId).update(update);
  console.log(`Doc ${docId} atualizado para status=${status}`);
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const db = initAdmin();

  if (cmd === "list-pending") {
    await listPending(db);
  } else if (cmd === "mark") {
    const [docId, status, ...flagArgs] = rest;
    await mark(db, docId, status, parseFlags(flagArgs));
  } else {
    console.error("Comando desconhecido. Use: list-pending | mark <docId> <status>");
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error("FATAL:", e.message);
  process.exitCode = 1;
});
