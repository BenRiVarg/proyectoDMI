import firebase from "firebase/app";

const firebaseConfig = {

  apiKey: "AIzaSyDBTNvsEXv-ePFqqKXj_wQYchiX8k_h-jA",

  authDomain: "practica-10a.firebaseapp.com",

  projectId: "practica-10a",

  storageBucket: "practica-10a.appspot.com",

  messagingSenderId: "553354129969",

  appId: "1:553354129969:web:e72dfb7292dd0a8519db10"

};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
