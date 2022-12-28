import { View, Text, TouchableHighlight } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Icon } from './misc'
import { COLORS } from '../constants'
import { getDocData, updateDocu } from '../firebase'
import { getTimeDiff } from '../utils'

const ConversationSelector = ({data, currentUserID}) => {
  const navigation = useNavigation()
  const conversationID = data.id
  const participantID = currentUserID !=data.participants[0] ? data.participants[0] : data.participants[1]
  const [participant, setParticipant] = useState(null)
  const [unseen, setUnseen] = useState(data.unseen && data.lastMessage.sender != currentUserID)

  useEffect(() => {
    getDocData('users', participantID).then(result => setParticipant(result))
  }, [])

  const handleSeen = () => {
    
    if(data.unseen && data.lastMessage.sender != currentUserID) {
      setUnseen(false)
      updateDocu('conversations', conversationID, {unseen:false})
    }
  }

  useEffect(() => {
    if(data.unseen && data.lastMessage.sender != currentUserID) 
      setUnseen(true)
  
  }, [data.unseen])
  

  return (
    <TouchableHighlight onPress={() => {navigation.navigate('Conversation', { conversationID ,participant, currentUserID }); handleSeen()} } 
      style={{paddingHorizontal:12, paddingTop:8}} 
      activeOpacity={0.6}
      underlayColor={COLORS.lightGray}
    >
      <View style={{padding:8, flexDirection:'row', alignItems:'center'}}>
        <Icon URL={participant && participant.profileImgURL}/>
        
        <View style={{marginLeft:8}}>
          <Text style={{fontWeight:unseen ? '600' : '400'}}>{participant && participant.name}</Text>
          <Text style={{color:unseen ? 'black' : COLORS.gray, fontSize:13, fontWeight:unseen ? '600' : '400' }}>{data.lastMessage.content} <Text style={{fontSize:20}}>·</Text> {data.lastUpdated && getTimeDiff(data.lastUpdated.seconds)}</Text>
        </View>
        
        {unseen && <View style={{position:'absolute', backgroundColor:COLORS.login, alignSelf:'center', right:5, borderRadius:100, height:8, width:8}}></View>}
      </View>
    </TouchableHighlight>
  )
}

export default ConversationSelector