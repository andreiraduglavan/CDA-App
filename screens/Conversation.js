import { collection, getDocs, where, orderBy, query, serverTimestamp, onSnapshot, doc, endAt, endBefore, limit } from 'firebase/firestore'
import { useState, useEffect, useRef } from 'react'
import { View, Text, SafeAreaView, FlatList, Dimensions, KeyboardAvoidingView, NativeModules } from 'react-native'

import { BackButton, Icon, Message, TextField } from '../components'
import { COLORS } from '../constants'
import { createDoc, updateDocu } from '../firebase'
import { db } from '../firebase/firebaseApp'

const ConversationHeader = ({participant}) => (
  <View style={{alignItems: 'center'}}>
    <View style={{marginTop:28}}></View>
    <Icon URL={participant && participant.profileImgURL} size={80}/>
    <Text style={{fontSize:20, fontWeight: '500', marginTop:12}}>{participant && participant.name}</Text>
    <Text style={{color: COLORS.gray, marginTop:2}}>Say Hello to {participant && participant.name.split(' ')[0]} 👋</Text>
  </View>
)

const Conversation = ({ route, navigation }) => {
  const { StatusBarManager } = NativeModules
  const [sbHeight, setsbHeight] = useState(0)
  StatusBarManager.getHeight((statusBarHeight)=>{
    setsbHeight(Number(statusBarHeight.height))
  })
  const flatlistRef = useRef()
  const screenHeigth = Dimensions.get('screen').height
  const { participant, conversationID, currentUserID } = route.params
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [newConversation, setNewConversation] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchInitialData = async () => {
    const newMessagesSnap = await getDocs(query(collection(db, 'messages'), where('conversationID', '==', conversationID), orderBy('createdAt', 'desc')))
    if (newMessagesSnap.empty) {
      setNewConversation(true)
    }
    const newMessages = newMessagesSnap.docs.map((doc)=> ({...doc.data(), id:doc.id}))
    setMessages(newMessages)
  }

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchNewData = async () => {
    
    const newMessagesSnap = await getDocs(query(collection(db, 'messages'), where('conversationID', '==', conversationID), orderBy('createdAt', 'desc'), limit(1)))
    const newMessages = newMessagesSnap.docs.map((doc)=> ({...doc.data(), id:doc.id}))
    
    if(newMessages.length!=0 && newMessages[0].id!=messages[0].id) {
      setMessages([...newMessages,...messages])
    }   
  }

  

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(collection(db, 'conversations'), conversationID), (docSnapshot) => {
      if(docSnapshot.data().lastUpdated) {
        
        setLastUpdated(docSnapshot.data().lastUpdated)
      }
    })

    return () => { unsubscribe() }
  }, [])

  useEffect(() => {
  
    if(lastUpdated) {
      fetchNewData()
    }
  }, [lastUpdated])
  

  const sendMessage = async () => {
    const message = {content:input, conversationID:conversationID, liked:false, sender:currentUserID}

    createDoc('messages', {createdAt:serverTimestamp(), ...message})
    .then(result => { 
      setMessages([{...message, id:result.id}, ...messages])
      flatlistRef.current.scrollToOffset({ animated: true, offset: 0 })
      setInput('')
      if(newConversation) {
        createDoc('conversations', {lastMessage:{content:input, sender:currentUserID},lastUpdated:serverTimestamp(),participants:[currentUserID, participant.id]}, conversationID)
        .then(() => setNewConversation(false))
      }
      else { updateDocu('conversations', conversationID, {lastMessage:{content:input, sender:currentUserID},lastUpdated:serverTimestamp()} ) }
    })
  }
  
  return (
    <SafeAreaView>
      <KeyboardAvoidingView style={{height:screenHeigth-sbHeight-12}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={{padding:12, flexDirection:'row', alignItems: 'center', paddingBottom:4, height: 60}}>
          <BackButton size={28}/>
          <View style={{marginHorizontal:4}}></View>
          <Icon URL={participant && participant.profileImgURL} size={40}/>
          <Text style={{fontSize:18, fontWeight: '500',marginLeft:8}}>{participant && participant.name}</Text>
        </View>

        <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.1, width:'100%', marginTop:8}}></View>

        <FlatList
          data={messages}
          renderItem={({item}) => <Message data={item} currentUserID={currentUserID} />}
          keyExtractor={(item) => item.id}
          ref={flatlistRef}
          inverted={true}
          ListFooterComponent={() => <ConversationHeader participant={participant} />}
        />

        <TextField setContent={setInput} handlePress={sendMessage} content={input}/>
      </KeyboardAvoidingView>     
    </SafeAreaView>
  )
}

export default Conversation