import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyDGbUGaEBQR3Uz2-641qjqLaGiP3Ixa-h0",
  authDomain: "app-ea7ec.firebaseapp.com",
  projectId: "app-ea7ec",
  storageBucket: "app-ea7ec.appspot.com",
  messagingSenderId: "1012402521184",
  appId: "1:1012402521184:web:1b9cb99d7715806917ef05"
}

let myApp = initializeApp(firebaseConfig)

export const auth = getAuth(myApp)
export const db = getFirestore(myApp)
export const storage = getStorage(myApp)

