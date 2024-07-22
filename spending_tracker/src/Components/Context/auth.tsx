import { auth } from "../../Config/config";

import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updatePassword, sendEmailVerification } from "firebase/auth";

export const doCreateUSerWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
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
