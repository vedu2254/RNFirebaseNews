// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcXcE2mGZnHhDBZX-O6G79iSA-RHVzToE",
  authDomain: "rnfirebasenews.firebaseapp.com",
  projectId: "rnfirebasenews",
  storageBucket: "rnfirebasenews.appspot.com",
  messagingSenderId: "782605860487",
  appId: "1:782605860487:web:99484c89e1f05fab708222"
};

// Initialize Firebase
let app;
if(firebase.apps.length===0){
  app=firebase.initializeApp(firebaseConfig);
}else{
  app=firebase.app()
}

const auth = firebase.auth()

export {auth};