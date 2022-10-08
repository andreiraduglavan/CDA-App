import { View, Text } from 'react-native'

import { COLORS } from '../constants'

const Message = ({data, currentUserID}) => {
  
  const self = data.sender == currentUserID
  const align = self ? 'flex-end' : 'flex-start'
  const borderWidth = self ? 0 : 1
  const borderColor = self ? 'transparent' : COLORS.gray
  const backgroundColor = self ? COLORS.lightGray : 'transparent'

  return (
    <View style={{ margin:12, marginVertical:4, padding:6, maxWidth:'60%', borderRadius:14, alignSelf:align, borderWidth:borderWidth, borderColor: borderColor, backgroundColor:backgroundColor}} >
      <Text style={{}}>{data.content}</Text>
    </View>
  )
}

export default Message