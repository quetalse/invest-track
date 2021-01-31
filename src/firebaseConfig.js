import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmt6WqKYLNSuN6M_LYbvtZkVr1nyvr_Dw",
    authDomain: "investing-track.firebaseapp.com",
    databaseURL: "https://investing-track-default-rtdb.firebaseio.com",
    projectId: "investing-track",
    storageBucket: "investing-track.appspot.com",
    messagingSenderId: "393360331467",
    appId: "1:393360331467:web:1b3eb48ad3c0c32d60814e"
};
// Initialize Firebase
export const initFirebase = firebase.initializeApp(firebaseConfig);

