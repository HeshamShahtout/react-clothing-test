import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCvJQI7STB7rOqR93RHAYNFsEXPF2MKXLQ",
  authDomain: "crwn-db-b6fb0.firebaseapp.com",
  projectId: "crwn-db-b6fb0",
  storageBucket: "crwn-db-b6fb0.appspot.com",
  messagingSenderId: "489152796548",
  appId: "1:489152796548:web:4828aa2525b7d929b0afd1",
  measurementId: "G-2KBXMB5HFC",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user ", error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
