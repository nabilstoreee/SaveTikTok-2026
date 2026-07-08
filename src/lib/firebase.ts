import { initializeApp } from "firebase/app";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager,
  doc,
  getDocFromServer
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "gen-lang-client-0184221253",
  appId: "1:4119005247:web:df3379e035d7ccfafa508a",
  apiKey: "AIzaSyC9URH_rdEqhpskYoPxIeCTew54KFWQv9A",
  authDomain: "gen-lang-client-0184221253.firebaseapp.com",
  databaseId: "ai-studio-018b1057-1a2f-45f4-9a28-a6deaba744c3", // Uses the custom database ID provisioned
  storageBucket: "gen-lang-client-0184221253.firebasestorage.app",
  messagingSenderId: "4119005247",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

// Initialize Firestore with long polling and persistent local cache
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
}, "ai-studio-018b1057-1a2f-45f4-9a28-a6deaba744c3");

// Validate Connection to Firestore (as required by the firebase skill)
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    } else {
      console.warn("Firestore validation notice (offline operation available):", error);
    }
  }
}
testConnection();
