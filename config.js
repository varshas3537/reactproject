import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBpKD4HeXjf3T1cUzWuUyTnJ5z00MFboi4",
    authDomain: "amazing-artwork.firebaseapp.com",
    projectId: "amazing-artwork",
    storageBucket: "amazing-artwork.appspot.com",
    messagingSenderId: "534624603980",
    appId: "1:534624603980:web:cc3a5d32f2ae0c5ee389e9"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
}

export default firebase.firestore();
