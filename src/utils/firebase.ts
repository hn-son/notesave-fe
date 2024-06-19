import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { env } from "../configs/environment";

console.log(env)

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();
// const storageRef = firebase.storage().ref();

export default firebase;
export { storage, ref, uploadBytes, getDownloadURL };
