import { doc, setDoc, addDoc, updateDoc, collection, getDoc, query, where, getDocs, serverTimestamp, deleteDoc, orderBy, limit, documentId } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { v4 } from 'uuid'

import { db, storage } from './firebaseApp'
import { getPath } from "../utils"

export const createDoc = (collectionId, fields, documentId) => {
  
  var p = new Promise((resolve, reject) => {
    if(documentId) {
      setDoc(doc(db, collectionId, documentId), fields)
      .then(result => resolve(result))
      .catch(error => reject(error))
    }
    else {
      const dbRef = collection(db, collectionId)
      addDoc(dbRef, fields)
      .then(result => resolve(result))
      .catch(error => reject(error))
    }
  })

  return p
}

export const updateDocu = (collectionId, documentId, fields) => {
  
  var p = new Promise((resolve, reject) => {
    const docRef = doc(db, collectionId, documentId)
    updateDoc(docRef, fields)
    .then(result => resolve(result))
    .catch(error => reject(error))
  })
  
  return p
}

export const getDocData = async (collectionId, documentID) => {
  const docRef = doc(db, collectionId, documentID)
  const docSnap = await getDoc(docRef)
  const docData = { id:docSnap.id, ...docSnap.data()}
  
  return docData
}

export const uploadImage = async (imageUpload) => {
  
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function() {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', imageUpload, true);
    xhr.send(null);
  })

  var p =  new Promise((resolve, reject) => {
    const imageRef = ref(storage, `images/${v4()}`)

    const uploadTask = uploadBytesResumable(imageRef, blob);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        reject(error)
      }, 
      () => {
        // Handle successful uploads on complete
        console.log('Upload is completed')
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)
        })
      }
    )
  })

  return p
}


export const deleteImage = (imageToBeDeleted) => {
  var p = new Promise( function(resolve, reject) {
    const imageRef = ref(storage, getPath(imageToBeDeleted))

    deleteObject(imageRef)
    .then((result) =>  resolve(result) )
    .catch( error => reject(error))
  })

  return p
}

export const addPost = ( userID, name, username, content, images, event, eventFields, profileImgURL) => {
  const postsRef = collection(db, 'posts')

  var p = new Promise( async (resolve, reject) => {
    if(!event) {
      let imgURLs = []
      for await (const image of images) {
        await uploadImage(image).then((result) => imgURLs.push(result)).catch((error) => reject(error))
      }
      
      const fields = {userID:userID, profileImgURL:profileImgURL, name:name, username:username, content:content, imgURLs:imgURLs, event:event, createdAt: serverTimestamp(), comments:[], likingUsers: [], likes: 0}
      await addDoc(postsRef, fields).then((response) => resolve({...fields, id:response.id})).catch((error) => reject(error))
    }
    else {
      let imgURLs = []
      for await (const image of images) {
        await uploadImage(image).then((result) => imgURLs.push(result)).catch((error) => reject(error))
      }
      
      const fields = {userID:userID, name:name, username:username, content:content, imgURLs:imgURLs, event:event, createdAt: serverTimestamp(), comments:[], likingUsers: [], likes: 0, ...eventFields}
      await addDoc(postsRef, fields).then((response) => resolve({...fields, id:response.id})).catch((error) => reject(error))
    }
  })

  return p
}

export const deletePost = ( postID, images) => {
  const postsRef = collection(db, 'posts')

  var p = new Promise( async (resolve, reject) => {
    
    for await (const image of images) {
      await deleteImage(image).then(() => {}).catch((error) => reject(error))
    }
    
    
    await deleteDoc(doc(postsRef, postID)).then((result) => resolve(result)).catch((error) => reject(error))
  })

  return p
}

export const getPosts = (id) => {
  var p = new Promise((resolve, reject) => {
    const posts = query(collection(db, 'posts'), where('userID', '==', id), orderBy('createdAt', 'desc'), limit(3))
    getDocs(posts)
    .then((querySnapshot) => {
      var posts = querySnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}) )
      resolve(posts)
    })
  })

  return p
}

export const getConversations = (id) => {
  var p = new Promise((resolve, reject) => {
    const conversations = query(collection(db, 'conversations'), where('participants', 'array-contains', id), orderBy('lastUpdated', 'desc'))
    getDocs(conversations)
    .then((querySnapshot) => {
      var conversations = querySnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}) )
      resolve(conversations)
    })
  })

  return p
}

export const getUsersList = () => {
  var p = new Promise((resolve, reject) => {
    const docRef = doc(db, 'usersList', 'usersList')
    getDoc(docRef)
    .then(response => resolve(response.data().usersList))
    .catch(error => reject(error))
  })

  return p
}

export const getFollowersDetails = (followersIDs) => {
  var p = new Promise((resolve, reject) => {
    const q = query(collection(db, 'users'), where(documentId(), 'in', followersIDs))
    getDocs(q)
    .then(querySnapshot => {
      var followers = querySnapshot.docs.map((doc) => ({id:doc.id, username:doc.data().username, profileImgURL:doc.data().profileImgURL}) )
      resolve(followers)
    })
    .catch(error => reject(error))
  })

  return p
}