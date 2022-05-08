// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Web app's Firebase configuration

const firebaseConfig = {
	apiKey: "AIzaSyAOdEkVtQYA8PdTc0akoBGoJ6l9qQGSzFI",
	authDomain: "twitter-clone-fab04.firebaseapp.com",
	projectId: "twitter-clone-fab04",
	storageBucket: "twitter-clone-fab04.appspot.com",
	messagingSenderId: "940199910770",
	appId: "1:940199910770:web:cd11650c05d342326bd1eb",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };
