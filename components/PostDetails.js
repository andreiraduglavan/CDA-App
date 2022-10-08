import { View, Text, Image, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { COLORS } from '../constants'
import { DotsButton } from './button'
import Comment from './Comment'
import { DeletePostModal, PopupMenu, PostFooter, ScreenHeader } from './misc'
import { deletePost } from '../firebase/firestore'
import { getCurrentUser } from '../firebase'
import { useStateContext } from '../context/StateContext'
import Post from './Post'

const PostDetails = ( {data, userData} ) => {
  const { setDisplayPopUpAlert, setIDToBeRemoved } = useStateContext()
  const navigation = useNavigation()
  const uid = userData.id
  const screenWidth = Dimensions.get('screen').width
  const [display, setDisplay] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const currentUser = getCurrentUser()

  const handlePopUp = () => {
    
    setDisplayPopUpAlert(true)
    setTimeout(() => {setDisplayPopUpAlert(false)}, 2000)
  }

  return (
    <View>
      <ScreenHeader  screenName={userData.name.split(' ')[0]+"'s Post"} />
      
      <DeletePostModal modalVisible={modalVisible} handleClose={() => {setModalVisible(false)} } handleDelete={() => {deletePost(data.id, data.imgURLs).then(() => {handlePopUp(); setIDToBeRemoved(data.id)}); setModalVisible(false); navigation.goBack() }} />

      <ScrollView style={{minHeight:'90%'}}>
        <Post data={data}/>   
        
        <View style={{borderBottomWidth:1, borderColor: COLORS.gray, opacity:0.1, marginBottom:12}}></View>
        
        { data.comments.map((item, index) => (
          <Comment data={item} key={index}/>
        ))}
      </ScrollView>
    </View>
  )
}

export default PostDetails