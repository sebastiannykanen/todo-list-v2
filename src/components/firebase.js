import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDL3u8zH4yw-Ax8efu2kUwxV7VqWU87ATU",
  authDomain: "todo-list-dfb3a.firebaseapp.com",
  projectId: "todo-list-dfb3a",
  storageBucket: "todo-list-dfb3a.appspot.com",
  messagingSenderId: "67630190280",
  appId: "1:67630190280:web:eec6d62102202747639ffd",
  measurementId: "G-7H84VTDXK4",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
export const db = getFirestore();

// collection reference
export const colRef = collection(db, "todos");
