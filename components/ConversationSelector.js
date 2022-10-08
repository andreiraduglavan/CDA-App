import { View, Text, TouchableHighlight } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Icon } from './misc'
import { COLORS } from '../constants'
import { getDocData } from '../firebase'
import { getTimeDiff } from '../utils'

const ConversationSelector = ({data, currentUserID}) => {
  const navigation = useNavigation()
  const conversationID = data.id
  const participantID = currentUserID !=data.participants[0] ? data.participants[0] : data.participants[1]
  const [participant, setParticipant] = useState(null)

  useEffect(() => {
    getDocData('users', participantID).then(result => setParticipant(result))
  
    return () => {
      
    }
  }, [])

  return (
    <TouchableHighlight onPress={() => navigation.navigate('Conversation', { conversationID ,participant, currentUserID })} 
      style={{paddingHorizontal:12, paddingTop:8}} 
      activeOpacity={0.6}
      underlayColor={COLORS.lightGray}
    >
      <View style={{padding:8, flexDirection:'row', alignItems:'center'}}>
        <Icon URL={participant && participant.profileImgURL}/>
        
        <View style={{marginLeft:8}}>
          <Text style={{}}>{participant && participant.name}</Text>
          <Text style={{color:COLORS.gray, fontSize:13 }}>{data.lastMessage.content} <Text style={{fontSize:20}}>·</Text> {getTimeDiff(data.lastUpdated.seconds)}</Text>
        </View>
        
      </View>
    </TouchableHighlight>
  )
}

export default ConversationSelector