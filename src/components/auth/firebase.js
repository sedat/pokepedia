import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import config from "../../config";
const firebaseConfig = config.API_KEY;
// Initialize Firebase

export default firebase.initializeApp(firebaseConfig);
