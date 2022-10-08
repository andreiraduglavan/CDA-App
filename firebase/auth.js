import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { auth } from './firebaseApp'
import { createDoc } from './firestore'


export const SignUp = (email, password, username, name) => {
  
  var p = new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user
      const emptyFields = { posts: [], following: [], conversations: [], followers: [], followersCount: 0, bio:""}
      createDoc('users', { email: user.email, name:name, username: username, accountCreatedAt: user.metadata.creationTime, ...emptyFields}, user.uid)

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      resolve(errorMessage)
      
      // ..
    })
  })

  return p
}

export const LogIn = (email, password) => {

  var p = new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      resolve(errorMessage)
    })
  })

  return p
}

export const SignOut = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

export const getCurrentUser = () => {
  const user = auth.currentUser
  
  return user
}