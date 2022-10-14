import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { auth } from './firebaseApp'
import { createDoc, getDocData } from './firestore'


export const SignUp = (email, password, username, name) => {
  
  var p = new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user
      const emptyFields = { posts: [], following: [], conversations: [], followers: [], followersCount: 0, bio:"", profileImgURL:'https://firebasestorage.googleapis.com/v0/b/app-ea7ec.appspot.com/o/images%2Fpng-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black-thumbnail-removebg-preview.png?alt=media&token=592ccbd3-e83f-44e1-9096-1182ba1ac1df'}
      createDoc('users', { email: user.email, name:name, username: username, accountCreatedAt: user.metadata.creationTime, ...emptyFields}, user.uid)
      .then(() => getDocData('users', user.uid).then( docData => resolve(docData) ))
      .catch( error => reject(error))

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
      
      const user = userCredential.user
      getDocData('users', user.uid).then( docData => resolve(docData) )
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
      reject(errorMessage)
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