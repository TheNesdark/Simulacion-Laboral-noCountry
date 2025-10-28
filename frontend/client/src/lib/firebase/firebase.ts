"use client";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJJF9b5xaoDv8ko0BD5Ziso5i0H6W-zno",
  authDomain: "portfolio-a9960.firebaseapp.com",
  projectId: "portfolio-a9960",
  storageBucket: "portfolio-a9960.appspot.com",
  messagingSenderId: "633562735584",
  appId: "1:633562735584:web:10d330515caed637264185"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;