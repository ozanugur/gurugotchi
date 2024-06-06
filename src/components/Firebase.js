import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHHWNO8WjQZDuygHdtW6K_cMZw59L2H9Q",
  authDomain: "testlebi-96680.firebaseapp.com",
  projectId: "testlebi-96680",
  storageBucket: "testlebi-96680.appspot.com",
  messagingSenderId: "839786616244",
  appId: "1:839786616244:web:680d63d04dc242b6ac4ee1",
  //measurementId: "G-9M8XE3W3JX"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

/*import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHHWNO8WjQZDuygHdtW6K_cMZw59L2H9Q",
  authDomain: "testlebi-96680.firebaseapp.com",
  projectId: "testlebi-96680",
  storageBucket: "testlebi-96680.appspot.com",
  messagingSenderId: "839786616244",
  appId: "1:839786616244:web:680d63d04dc242b6ac4ee1",
  //measurementId: "G-9M8XE3W3JX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
  }
};

export { auth, db, signInWithGoogle };*/


