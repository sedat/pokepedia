import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import {API_KEY} from '../../config'
// Initialize Firebase

export default firebase.initializeApp(API_KEY);
