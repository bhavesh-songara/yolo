import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAH8aG8zQh9oIHlCebuHcjpxOnrPG8keuU",
  authDomain: "signal-clone-e61dc.firebaseapp.com",
  projectId: "signal-clone-e61dc",
  storageBucket: "signal-clone-e61dc.appspot.com",
  messagingSenderId: "194184019613",
  appId: "1:194184019613:web:fdbecf752a14de106e9e74",
};

let app;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
