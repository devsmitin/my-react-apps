import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCaQUJ_3_Cg8gaROLxHwnZrX1ulGHeQ-jU",
  authDomain: "my-react-apps-47c96.firebaseapp.com",
  databaseURL: "https://my-react-apps-47c96.firebaseio.com",
  projectId: "my-react-apps-47c96",
  storageBucket: "my-react-apps-47c96.appspot.com",
  messagingSenderId: "744968534805",
  appId: "1:744968534805:web:b1147b40a95bb23e84c71c",
  measurementId: "G-4DY7BGNBTX"
};

const fire = firebase.initializeApp(config);
export default fire;
