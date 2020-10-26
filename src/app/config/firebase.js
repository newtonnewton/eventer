import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey : "AIzaSyBI-53dPpTnL46O3AFITdnpSOrxPLzBSgg" ,   
    authDomain : "eventer-1-cf6c5.firebaseapp.com" ,   
    databaseURL : "https: // 1-cf6c5.firebaseio.com" ,   
    projectId : "eventer-1-cf6c5" ,   
    storageBucket : "eventer-1-cf6c5.appspot.com" ,   
    messagingSenderId : "519960366662" ,   
    appId : "1: 519960366662: web: 5ac4cf8d690f90a" ,
    measurementId : "G-TPY0C3W28H" 
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;