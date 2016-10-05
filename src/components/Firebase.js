const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyBk4bIpyMCsdFiRjtqZDEYGvlNxybFAnHQ",
  authDomain: "galvanize-eats-b4eeb.firebaseapp.com",
  databaseURL: "https://galvanize-eats-b4eeb.firebaseio.com",
  storageBucket: "galvanize-eats-b4eeb.appspot.com",
  messagingSenderId: "846614561093"
};

const firebaseApp = firebase.initializeApp(config);

module.exports = firebaseApp;
