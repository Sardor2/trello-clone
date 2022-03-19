import { initializeApp } from "firebase/app";
import {
  getFirestore,
  query,
  doc,
  addDoc,
  getDoc,
  collection,
  setDoc,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { IUser } from "commons";

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
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user: IUser = {
      id: res.user.uid,
      name: res.user.displayName ?? "",
      email: res.user.email ?? "",
      profilePhoto: res.user.photoURL ?? "",
    };

    const userDoc = await getDoc(doc(db, "users", user.id));

    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.id), user);
    }

    return user;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const firebaseLogout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.log(error);
  }
};

// export default app;
