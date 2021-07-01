import firebase from "firebase/app";
import "firebase/database";
import { fireconfig } from "../../config";

const fb_db = firebase.initializeApp(fireconfig);
export default fb_db;
