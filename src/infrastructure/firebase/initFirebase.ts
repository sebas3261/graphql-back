import admin from "firebase-admin";
import fs from "fs";
import path from "node:path";

let app: admin.app.App | null = null;

export function getFirebaseApp(): admin.app.App {
  if (app) return app;

  // 🧭 Detecta la ruta correcta del serviceAccount
  let serviceAccountPath: string;

  if (process.env.NODE_ENV === "production") {
    // 🟣 Render monta los Secret Files aquí:
    serviceAccountPath = "/etc/secrets/serviceAccount.json";
  } else {
    // 💻 Ruta local
    serviceAccountPath = path.resolve(process.cwd(), "secrets/serviceAccount.json");
  }

  // 🔍 Cargar el JSON desde archivo
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return app;
}

export function getFirestore() {
  return getFirebaseApp().firestore();
}
