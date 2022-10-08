import { View, Text, Image, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useState, useEffect } from 'react'

import { COLORS } from '../constants'
import { DotsButton } from './button'
import { PostFooter, DeletePostModal, PopupMenu } from './misc'
import { getCurrentUser, getDocData } from '../firebase'
import { deletePost } from '../firebase/firestore'
import { useStateContext } from '../context/StateContext'


const Post = ({ data }) => {
  const { setDisplayPopUpAlert, setIDToBeRemoved, setPopUpText } = useStateContext()
  const screenWidth = Dimensions.get('screen').width
  const navigation = useNavigation()
  const uid = data.userID
  const currentUser = getCurrentUser()
  const [userData, setUserData] = useState(null)
  const [display, setDisplay] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  
  useEffect(() => {
    getDocData('users', uid).then(docData =>  setUserData(docData) )
  }, [])

  const handlePopUp = () => {
    
    setPopUpText('Postarea a fost eliminată.')
    setDisplayPopUpAlert(true)
    setTimeout(() => {setDisplayPopUpAlert(false)}, 2000)
  } 

  return (
    <TouchableWithoutFeedback onPress={() => setDisplay(false)}>
    <View style={{margin: 8}}>
      <DeletePostModal modalVisible={modalVisible} handleClose={() => {setModalVisible(false)} } handleDelete={() => {deletePost(data.id, data.imgURLs).then(() => {handlePopUp(); setIDToBeRemoved(data.id)}); setModalVisible(false) }} />
      <View style={{padding:8}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ width:50, height:50}}>
            <Image source={{uri: userData && userData.profileImgURL }} resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: 100}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between', width: '85%', alignItems:'center'}}>
            <View style={{marginLeft:4}}>
              <Text style={{fontSize: 16, fontWeight:'500'}}
                onPress={() => navigation.navigate("Profile", { uid })}
              >{data.name}</Text>
              <Text style={{fontSize: 12, color:COLORS.gray}}>{data.username}</Text>
            </View>
            <DotsButton handlePress={() => setDisplay(true)}/>
            { display &&
              <PopupMenu handlePress={() => {setModalVisible(true); setDisplay(false) } }/>
            }
          </View>
        </View>

        <View style={{padding:4, marginTop:6}}>
            <Text style={{fontSize:14}}>{data.content}{false && <Text style={{fontSize:14, color:COLORS.gray, opacity:0.8}} onPress={() => {}}> ...afiseaza mai mult</Text>}</Text>
        </View>
      </View>

      { data.imgURLs && 
        <ScrollView snapToInterval={screenWidth} decelerationRate='fast' horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal:-8}}>
          { data.imgURLs.map((source) => (
            <View key={source} style={{ width:screenWidth, height: screenWidth*3/4, paddingTop:0}}>
              <Image source={{uri: source}} resizeMode='cover' style={{ width: '100%', height: '100%'}}/>
            </View>
          ))}
        </ScrollView>
      }

      <PostFooter data={data} addGradient={false} uid={currentUser && currentUser.uid} />
    </View>
    </TouchableWithoutFeedback>
  )
}


export default Post