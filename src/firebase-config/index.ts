import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmSqx0Y5jVT5MbTOhOi7hdSu77HPaeeKs",
  authDomain: "trello-clone-5b631.firebaseapp.com",
  projectId: "trello-clone-5b631",
  storageBucket: "trello-clone-5b631.appspot.com",
  messagingSenderId: "33441449107",
  appId: "1:33441449107:web:56be0ba51214d41c9fb966",
  measurementId: "G-VR7H2K8DH5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// export default app;
