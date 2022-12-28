import { View, Text } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'

import { COLORS } from '../constants'
import { useState } from 'react'
import { updateDocu } from '../firebase'

const Message = ({data, currentUserID}) => {
  
  const self = data.sender == currentUserID
  const align = self ? 'flex-end' : 'flex-start'
  const borderWidth = self ? 0 : 1
  const borderColor = self ? 'transparent' : COLORS.gray
  const backgroundColor = self ? COLORS.lightGray : 'transparent'
  const [isLiked, setIsLiked] = useState(data.isLiked)
  const [lastTap, setLastTap] = useState(null)

  const handleDoubleTap = () => {
    if(!isLiked && !self) {
      const now = Date.now()
      const DOUBLE_PRESS_DELAY = 300
      if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
        updateDocu('messages', data.id, {isLiked:true})
        .then(() => setIsLiked(true))
        
      } else {
        setLastTap(now)
    }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={{ margin:12, marginVertical:4, padding:10, paddingHorizontal:12, maxWidth:'60%', borderRadius:20, alignSelf:align, borderWidth:borderWidth, borderColor: borderColor, backgroundColor:backgroundColor}} >
        <Text style={{fontSize:15}}>{data.content}</Text>
        { isLiked &&
          <View style={{ position:'absolute', backgroundColor:COLORS.lightGray, bottom:-10, left:12, padding:4, borderRadius:12}}>
            <AntDesign name="heart" size={13} color={'red'}/>
          </View>
        }
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Message