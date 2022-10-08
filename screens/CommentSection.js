import { arrayUnion } from 'firebase/firestore'
import { View, SafeAreaView, ScrollView, Dimensions, KeyboardAvoidingView, NativeModules } from 'react-native'
import { useState } from 'react'

import { Comment, ScreenHeader, TextField } from '../components'
import { getCurrentUser, updateDocu, getDocData } from '../firebase'

const CommentSection = ({route, navigation}) => {
  const { StatusBarManager } = NativeModules
  const [sbHeight, setsbHeight] = useState(0)
  StatusBarManager.getHeight((statusBarHeight)=>{
    setsbHeight(Number(statusBarHeight.height))
  })
  
  const { data } = route.params
  const [comments, setComments] = useState(data.comments)
  const screenHeigth = Dimensions.get('screen').height
  const [input, setInput] = useState("")
  const currentUser = getCurrentUser()
  var user
  
  getDocData('users', currentUser.uid).then( docData => user = docData)

  const handlePress = () => { 
    updateDocu('posts', data.id, {comments: arrayUnion({username:user.username, content:input, likes:0, userID:user.id})})
    .then(() => setComments([{username:user.username, content:input, likes:0, userID:user.id}, ...comments]))
    setInput('')
  }

  return (
    <SafeAreaView>
      <ScreenHeader screenName={'Comentarii'} />

      <KeyboardAvoidingView style={{height:screenHeigth-sbHeight-88}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView>
        <View style={{marginTop:12}}>  
          { comments.map((item, index) => (
              <Comment data={item} key={index}/>
            ))}
        </View>
      </ScrollView>

      <TextField setContent={setInput} handlePress={handlePress} content={input} />

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default CommentSection