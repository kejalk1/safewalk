import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCHAv2WUCmpyVPfbOR5Kd9RhiLQUFzHyBc",
  authDomain: "safewalk-181a2.firebaseapp.com",
  projectId: "safewalk-181a2",
  storageBucket: "safewalk-181a2.firebasestorage.app",
  messagingSenderId: "588310974026",
  appId: "1:588310974026:web:0a1dba209c8433125a20b3"
};

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  const db = getFirestore(app);
  const auth =getAuth(app)
  
  export { db, auth };