import { useState, useEffect } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import { query, onSnapshot, where, orderBy, collection } from 'firebase/firestore'

import { ConversationSelector, ScreenHeader } from '../components'
import { db } from '../firebase/firebaseApp'
import { getCurrentUser } from '../firebase'

const DM = () => {
  const currentUser = getCurrentUser()
  const uid = currentUser.uid
  const [conversations, setConversations] = useState([])

  const getConversations = () => {
    const q = query(collection(db, "conversations"), where('participants', 'array-contains', uid), orderBy('lastUpdated', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const conversations = []
      querySnapshot.forEach((doc) => {
          //console.log(doc.data())
          conversations.push({id:doc.id, ...doc.data()});
      })
      setConversations(conversations)
    })

    return () => { unsubscribe() }
  }

  useEffect(() => {
    //getConversations(uid).then(conversations => setConversations(conversations))
    getConversations()

  }, [])

  return (
    <SafeAreaView>
        <ScreenHeader screenName={'Conversații'}/>

        <FlatList
          data={conversations}
          renderItem={({item}) => <ConversationSelector data={item} currentUserID={uid} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 80 }}       
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

    <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.1, width:'100%', marginTop:8}}></View> 
    
    refreshing={false}
    onRefresh={() => getConversations(uid).then(conversations => setConversations(conversations))}
    
    */