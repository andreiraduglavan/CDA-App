import { View, Text, TouchableWithoutFeedback, TextInput } from 'react-native'
import { useEffect, useState } from 'react'
import { COLORS } from '../constants'
import { AddBio } from './button'
import { updateDocu } from '../firebase'

const Bio = ({ userData }) => {
  const [bio, setBio] = useState(userData ? userData.bio : null)
  const [lastTap, setLastTap] = useState(null)
  const [edit, setEdit] = useState(false)
  const [input, setInput]  = useState(userData ? userData.bio : '')
  const [emptyBio, setEmptyBio] = useState(false)
  
  useEffect(() => {
    userData && setBio(userData.bio)
    userData && setInput(userData.bio)
    userData && setEmptyBio(userData.bio=="" ? true : false)
  }, [userData])

  const handleDoubleTap = () => {
    const now = Date.now()
    const DOUBLE_PRESS_DELAY = 300
    if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
      setEdit(true)
    } else {
      setLastTap(now)
    }
  }

  const uploadBio = () => {
    updateDocu('users', userData.id, { bio:input} )
    .then(() => {
      setBio(input)
      setEdit(false)
      input=="" ? setEmptyBio(true) : setEmptyBio(false)
    })
    .catch((error) => console.log(error))
  }
  
  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View>
      { emptyBio &&
        <AddBio 
          color={'black'} 
          style={{ marginTop:12}} 
          handlePress={() => { setEdit(true); setEmptyBio(false)}}
        />
      }

      { !edit ?
        <Text style={{fontSize:14, marginTop:8, color: COLORS.third}} suppressHighlighting={true}>{bio}</Text> :
        <View>
          <TextInput 
            placeholder='Adaugă bio'
            style={{backgroundColor:COLORS.lightGray, padding:6, borderRadius:16, marginTop:8, minHeight:90, maxHeight:130, marginRight:16}}
            multiline={true}
            onChangeText={(text) => setInput(text)}
            value={input}
          />
          <AddBio 
            color={COLORS.third} 
            style={{ alignSelf:'flex-end', marginTop:6, marginRight:12}} 
            handlePress={() => uploadBio()}
          />
        </View>
      }
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Bio