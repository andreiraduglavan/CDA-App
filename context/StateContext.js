import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, { useContext, useState, createContext, useEffect, useRef } from "react";
import { db } from "../firebase/firebaseApp";
import { Notification, PopupAlert } from "../components";

const Context = createContext()

export const StateContext = ({children}) => {
  const [displayPopUpAlert, setDisplayPopUpAlert] = useState(false)
  const [popUpText, setPopUpText] = useState("")

  const [displayNotification, setDisplayNotification] = useState(false)
  const [notificationText, setNotificationText] = useState("")

  const [IDToBeRemoved, setIDToBeRemoved] = useState(null)
  const [newPost, setNewPost] = useState(null)

  const [updateComments, setUpdateComments] = useState({})
  const [currentUser, setCurrentUser] = useState(null)

  const [conversations, setConversations] = useState([])
  const [unseenMessages, setUnseenMessages] = useState(false)

  const getConversations = () => {
    const q = query(collection(db, "conversations"), where('participants', 'array-contains', currentUser.id), orderBy('lastUpdated', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversations = []
      var index = 0

      querySnapshot.docs.forEach((doc) => {
          conversations.push({id:doc.id, ...doc.data()})
          if(index==querySnapshot.size-1)
            setConversations(conversations)
          index+=1
      })
    })

    return () => { unsubscribe() }
  }

  useEffect(() => {

    if(currentUser)
      getConversations()

  }, [currentUser])

  useEffect(() => {
    if(conversations.length!=0)
      setUnseenMessages(false)
      conversations.forEach(conv => { conv.unseen && conv.lastMessage.sender != currentUser.id && setUnseenMessages(true)})

    setNotificationText('Ai primit un mesaj nou')
    setDisplayNotification(true) 
    setTimeout(() => {
      setDisplayNotification(false)
    }, 2000)

  }, [conversations])

  return(
    <Context.Provider value={{ displayPopUpAlert, setDisplayPopUpAlert, IDToBeRemoved, setIDToBeRemoved, popUpText, setPopUpText, newPost, setNewPost, updateComments, setUpdateComments, currentUser, setCurrentUser, conversations, unseenMessages }}>
      {children}
      <Notification display={false} text={notificationText} />
      <PopupAlert display={displayPopUpAlert} text={popUpText}/>
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)