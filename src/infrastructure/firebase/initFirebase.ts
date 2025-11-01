import admin from "firebase-admin";
import path from "node:path";

let app: admin.app.App | null = null;

export function getFirebaseApp(): admin.app.App {
  if (app) return app;

  // Ruta local al JSON
  const serviceAccountPath = path.resolve(process.cwd(), "secrets/serviceAccount.json");
  const serviceAccount = require(serviceAccountPath);

  app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return app;
}

export function getFirestore() {
  return getFirebaseApp().firestore();
}
