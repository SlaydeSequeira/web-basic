// firebase.js

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../firebaseConfig'; // Assuming firebaseConfig.js is in the same directory

const app = firebase.initializeApp(firebaseConfig);

export const database = app.database();
