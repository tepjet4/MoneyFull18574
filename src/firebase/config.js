import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAbONlZTl-ySi4u-sg_3smwLgH54DqDhUg",
  authDomain: "moneyfull18574.firebaseapp.com",
  projectId: "moneyfull18574",
  storageBucket: "moneyfull18574.appspot.com",
  messagingSenderId: "1025975412580",
  appId: "1:1025975412580:web:21d4ad2f75bc8762d27c71"
};

  firebase.initializeApp(firebaseConfig)

  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const timestamp = firebase.firestore.Timestamp

  export { projectFirestore, projectAuth, timestamp }