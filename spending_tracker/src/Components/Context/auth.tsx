import { auth, app } from "../../Config/config";
import { doc, setDoc, getFirestore } from "firebase/firestore";

import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword, sendEmailVerification } from "firebase/auth";

export const createUserData = async (email: string, password: string, userId: string, firstName: string, secondName: string) => {
  const db = getFirestore(app);
  try {
    const data = {
      firstName: firstName,
      secondName: secondName,
      email: email,
      password: password,
      userId: userId,
      transactions: [],
      categoryList: ["food", "income", "entertainment", "utilties", "car", "house", "work", "subscription"],
    };
    await setDoc(doc(db, "users", userId), data);
    console.log("document built in firebase");
  } catch (error) {
    console.log("something went wrong - " + error);
  }
};

export const doCreateUSerWithEmailAndPassword = async (email: string, password: string) => {
  // Create the user with email and password
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential;
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  if (auth.currentUser) {
    return updatePassword(auth.currentUser, password);
  } else {
    console.log("error");
  }
};

export const doSendEmailVerification = () => {
  if (auth.currentUser) {
    return sendEmailVerification(auth.currentUser, {
      url: "${window.location.origin}/home",
    });
  } else {
    console.log("error");
  }
};
