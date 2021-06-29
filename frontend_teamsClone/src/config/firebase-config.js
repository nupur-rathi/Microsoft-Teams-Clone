import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBNkJxW5ghABErBu_b4PVDJcJQkS7feD4U",
    authDomain: "teams-clone-b1e74.firebaseapp.com",
    projectId: "teams-clone-b1e74",
    storageBucket: "teams-clone-b1e74.appspot.com",
    messagingSenderId: "471038452153",
    appId: "1:471038452153:web:4c4cf58f71805794055668"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;