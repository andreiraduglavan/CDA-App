import React, { useContext, useState, createContext, } from "react";

const Context = createContext()

export const StateContext = ({children}) => {
  const [displaySlideBar, setDisplaySlideBar] = useState(false)
  const [displayPopUpAlert, setDisplayPopUpAlert] = useState(false)
  const [IDToBeRemoved, setIDToBeRemoved] = useState(null)
  const [popUpText, setPopUpText] = useState("")
  const [newPost, setNewPost] = useState(null)

  return(
    <Context.Provider value={{ displaySlideBar, setDisplaySlideBar, displayPopUpAlert, setDisplayPopUpAlert, IDToBeRemoved, setIDToBeRemoved, popUpText, setPopUpText, newPost, setNewPost }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)