import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyC6F-pVSEkqzWL4PILmLL7uOdAjNq5nUMk",
  authDomain: "reactcomfirebase.firebaseapp.com",
  projectId: "reactcomfirebase",
  storageBucket: "reactcomfirebase.appspot.com",
  messagingSenderId: "824290023723",
  appId: "1:824290023723:web:6e964c0862f20dbd638d6e",
  measurementId: "G-EVQSHQVWEQ"
  };
const fire = firebase.initializeApp(firebaseConfig);
export default fire;