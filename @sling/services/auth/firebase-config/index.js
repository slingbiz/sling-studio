import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// Initialize Firebase
const firebaseConfig = {
  // apiKey: 'AIzaSyB3a2pmgl_fTrpUDk2bef8Xh8ujHfq3-gA',
  // authDomain: 'my-project-1518948515247.firebaseapp.com',
  // databaseURL: 'https://my-project-1518948515247.firebaseio.com',
  // projectId: 'my-project-1518948515247',
  // storageBucket: 'my-project-1518948515247.appspot.com',
  // messagingSenderId: '320051739797',
  // appId: '1:320051739797:web:38770bb5360d0a17da2f9c',
  // measurementId: 'G-GHKN2H5QN2',
  apiKey: 'AIzaSyD-hMawNOYwuEb7SX7gOimG0hDaJcbH_eI',
  authDomain: 'upwork-75d81.firebaseapp.com',
  databaseURL: 'https://upwork-75d81-default-rtdb.firebaseio.com',
  projectId: 'upwork-75d81',
  storageBucket: 'upwork-75d81.appspot.com',
  messagingSenderId: '386706820447',
  appId: '1:386706820447:web:1e71fc0c37b7028f5cfaea',
  measurementId: 'G-HETEPRNM8J',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export {
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
};
