import { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList } from 'react-native'

import { BackButton, ConversationSelector, ScreenHeader, Searchbar } from '../components'
import { COLORS } from '../constants'
import { getConversations, getCurrentUser } from '../firebase'

const DM = () => {
  const currentUser = getCurrentUser()
  const uid = currentUser.uid
  const [conversations, setConversations] = useState([])

  useEffect(() => {
    getConversations(uid).then(conversations => setConversations(conversations))
  }, [])

  return (
    <SafeAreaView>
        <ScreenHeader screenName={'Conversații'}/>

        <FlatList
          data={conversations}
          renderItem={({item}) => <ConversationSelector data={item} currentUserID={uid} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ minHeight:'80%'}}
          refreshing={false}
          onRefresh={() => getConversations(uid).then(conversations => setConversations(conversations))}
        />

    </SafeAreaView>
  )
}

export default DM

/* <View style={{flexDirection:'row', alignItems:'center', margin:12, marginTop:16, height:32}}>
      <BackButton size={28}/>
      <View style={{width:'80%', marginLeft:16}}>
        <Searchbar />
      </View>
    </View>

    <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.1, width:'100%', marginTop:8}}></View> */