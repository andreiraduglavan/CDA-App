import { collection, getDocs, where, orderBy, query, serverTimestamp, onSnapshot, doc, limit } from 'firebase/firestore'
import { useState, useEffect, useRef } from 'react'
import { View, Text, SafeAreaView, FlatList, Dimensions, KeyboardAvoidingView, NativeModules, ActivityIndicator, Platform } from 'react-native'

import { BackButton, Icon, Message, SafeViewAndroid, TextField } from '../components'
import { COLORS } from '../constants'
import { useStateContext } from '../context/StateContext'
import { createDoc, updateDocu } from '../firebase'
import { db } from '../firebase/firebaseApp'
import { joinIDs } from '../utils'

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
  const [sbHeight, setsbHeight] = useState(12)
  if(Platform.OS === "ios") {
    StatusBarManager.getHeight((statusBarHeight)=>{
      setsbHeight(Number(statusBarHeight.height))
    })
  }

  const flatlistRef = useRef()
  const screenHeigth = Dimensions.get('window').height
  var { participant, conversationID, currentUserID } = route.params
  const { currentUser } = useStateContext()
  
  if(!conversationID) {
    conversationID = joinIDs(participant.id, currentUserID)
  }
  const [messages, setMessages] = useState([])

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
    
    if(newMessages.length!=0 && messages.length!=0 && newMessages[0].id!=messages[0].id) {
      setMessages([...newMessages,...messages])
    }   
  }

  
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(collection(db, 'conversations'), conversationID), (docSnapshot) => {
      if(docSnapshot.exists()) {
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
  
  const sendNotification = (pushToken, senderUsername, content) => {
    const notification = {
      to: pushToken,
      sound: "default",
      title: senderUsername,
      body: content,
      data: {screen: "Conversation", tab:"SearchStackNavigator", conversationID, participant:currentUser, content},
    };

    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notification),
    }).then( (response) => {
      return response;
    });
  }

  const sendMessage = async (input) => {
    if(input.length!=0) {
      const message = {content:input, conversationID:conversationID, liked:false, sender:currentUserID}

      createDoc('messages', {createdAt:serverTimestamp(), ...message})
      .then(result => { 
        setMessages([{...message, id:result.id}, ...messages])
        flatlistRef.current.scrollToOffset({ animated: true, offset: 0 })
        
        if(newConversation) {
          createDoc('conversations', {lastMessage:{content:input, sender:currentUserID, senderUsername: currentUser.username},lastUpdated:serverTimestamp(),participants:[currentUserID, participant.id], unseen:true}, conversationID)
          .then(() => setNewConversation(false))
        }
        else { updateDocu('conversations', conversationID, {lastMessage:{content:input, sender:currentUserID, senderUsername: currentUser.username},lastUpdated:serverTimestamp(), unseen:true} ) }
      }).then(() => participant.pushTokens && participant.pushTokens.forEach(pushToken => sendNotification(pushToken, currentUser.username, input)) )
    }

  }
  
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
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
          ListFooterComponent={() => messages.length!=0 ? <ConversationHeader participant={participant} /> : <View style={{justifyContent:'center', minHeight:500}}><ActivityIndicator /></View> }
          contentContainerStyle={{paddingTop:6}}
        />

        <TextField handlePress={sendMessage}/>
      </KeyboardAvoidingView>     
    </SafeAreaView>
  )
}

export default Conversation