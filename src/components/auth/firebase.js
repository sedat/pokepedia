import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { FIREBASE_CONFIG } from "../config";
// Initialize Firebase

export default firebase.initializeApp(FIREBASE_CONFIG);
