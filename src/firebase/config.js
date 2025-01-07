// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4YjE4EOX1r5sgkYBBuTCafNzxiyUnW7Y",
  authDomain: "file-storage-c3bbf.firebaseapp.com",
  projectId: "file-storage-c3bbf",
  storageBucket: "file-storage-c3bbf.appspot.com",
  messagingSenderId: "104583679805",
  appId: "1:104583679805:web:37f7db73166728daec7f54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const collections = [
  {
      name: "stickyNotesDB",
  },
];

export { db, collections };