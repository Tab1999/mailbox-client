// firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBMlN6Z7bLS8K0WvQ_gg_P6hnGErTnyzIo",
    authDomain: "mailbox-8e890.firebaseapp.com",
    projectId: "mailbox-8e890",
    storageBucket: "mailbox-8e890.appspot.com",
    messagingSenderId: "183185638668",
    appId: "1:183185638668:web:edb1716ef2361dbe0bb529",
    measurementId: "G-S1E9VEBDQ8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
