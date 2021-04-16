import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

export default function firebaseClient() {
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
}
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
