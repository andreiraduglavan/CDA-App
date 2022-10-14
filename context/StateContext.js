import React, { useContext, useState, createContext, useEffect, } from "react";
import { getCurrentUser, getDocData } from "../firebase";

const Context = createContext()

export const StateContext = ({children}) => {
  const [displaySlideBar, setDisplaySlideBar] = useState(false)
  const [displayPopUpAlert, setDisplayPopUpAlert] = useState(false)
  const [IDToBeRemoved, setIDToBeRemoved] = useState(null)
  const [popUpText, setPopUpText] = useState("")
  const [newPost, setNewPost] = useState(null)
  const [updateComments, setUpdateComments] = useState({})
  const [currentUser, setCurrentUser] = useState(null)

  return(
    <Context.Provider value={{ displaySlideBar, setDisplaySlideBar, displayPopUpAlert, setDisplayPopUpAlert, IDToBeRemoved, setIDToBeRemoved, popUpText, setPopUpText, newPost, setNewPost, updateComments, setUpdateComments, currentUser, setCurrentUser }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)