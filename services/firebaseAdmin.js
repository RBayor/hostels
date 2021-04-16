import admin from "firebase-admin";
const serviceAccount = require("../secrets.json");

export const verifyToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
    });
  }

  return admin.auth.verifyToken(token).catch((error) => console.log(error));
};
