import { View, Text, Image, ScrollView, Dimensions, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useState, useEffect } from 'react'

import { COLORS } from '../constants'
import { DotsButton } from './button'
import { PostFooter, DeletePostModal, Heart } from './misc'
import { getCurrentUser } from '../firebase'
import { deletePost, updateDocu } from '../firebase/firestore'
import { useStateContext } from '../context/StateContext'
import { arrayRemove, arrayUnion, increment } from 'firebase/firestore'

const Post = ({ datA }) => {
  const [data, setData] = useState(datA)
  const uid = data.userID
  const [userData, setUserData] = useState({id:uid, profileImgURL:data.profileImgURL, username:data.username, name:data.name})
  const currentUser = getCurrentUser()
  
  const { setDisplayPopUpAlert, setIDToBeRemoved, setPopUpText, updateComments } = useStateContext()
  
  const screenWidth = Dimensions.get('screen').width
  const navigation = useNavigation()
  
  const [likes, setLikes] = useState(data.likes)
  const [isLiked, setIsLiked] = useState(data.likingUsers.includes(uid))

  const [modalVisible, setModalVisible] = useState(false)
  const [showHeart, setShowHeart] = useState(false)
  const [lastTap, setLastTap] = useState(null)

  const [loadingProfilepic, setLoadingProfilepic] = useState(false)
  const [loadingImage, setLoadingImage] = useState(false)
  


  const handlePopUp = () => {
    
    setPopUpText('Postarea a fost eliminată.')
    setDisplayPopUpAlert(true)
    setTimeout(() => {setDisplayPopUpAlert(false)}, 2000)
  }

  const handleLike = () => {
      if(isLiked) { updateDocu('posts', data.id, {likingUsers: arrayRemove(uid), likes: increment(-1)}); setLikes(likes-1), setIsLiked(!isLiked) }
      else { updateDocu('posts', data.id, {likingUsers: arrayUnion(uid), likes: increment(1)}); setLikes(likes+1); setIsLiked(!isLiked)}
    }

  const handleDoubleTap = () => {
    if(!isLiked) {
      const now = Date.now()
      const DOUBLE_PRESS_DELAY = 300
      if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
        handleLike()
        setShowHeart(true)
        setTimeout(() => {
          setShowHeart(false)
        }, 800)
      } else {
        setLastTap(now)
    }
    }
  }
  
  useEffect(() => {
    if(updateComments && updateComments.postId==data.id) {
      setData({...data, comments: [updateComments.fields ,...data.comments]})
    }
    
  }, [updateComments])
  
  return (
    <View style={{margin: 8}}>
      <DeletePostModal modalVisible={modalVisible} handleClose={() => {setModalVisible(false)} } handleDelete={() => {deletePost(data.id, data.imgURLs).then(() => {handlePopUp(); setIDToBeRemoved(data.id)}); setModalVisible(false) }} />
      <View style={{padding:8}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{ width:50, height:50, justifyContent:'center'}}>
            { loadingProfilepic && <ActivityIndicator style={{alignSelf:'center', position:'absolute'}} /> }
            <Image source={{uri: userData && userData.profileImgURL }} resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: 100}} onLoadStart={() => setLoadingProfilepic(true) } onLoadEnd={() => setLoadingProfilepic(false)} />
          </View>
          <View style={{flexDirection: 'row', justifyContent:'space-between', width: '85%', alignItems:'center'}}>
            <View style={{marginLeft:4}}>
              <Text style={{fontSize: 16, fontWeight:'500'}}
                onPress={() => navigation.navigate("Profile", { userData })}
              >{data.name}</Text>
              <Text style={{fontSize: 12, color:COLORS.gray}}>{data.username}</Text>
            </View>
            <DotsButton handlePress={() => currentUser.uid==uid && setModalVisible(true) }/>
          </View>
        </View>

        <View style={{padding:4, marginTop:6}}>
            <Text style={{fontSize:14}} >{data.content}{false && <Text style={{fontSize:14, color:COLORS.gray, opacity:0.8}} onPress={() => {}}> ...afiseaza mai mult</Text>}</Text>
        </View>
      </View>

      { data.imgURLs && 
        <ScrollView snapToInterval={screenWidth} decelerationRate='fast' horizontal showsHorizontalScrollIndicator={false} style={{marginHorizontal:-8}}>
          { data.imgURLs.map((source) => (
            <TouchableWithoutFeedback onPress={handleDoubleTap} key={source}>
              <View style={{ width:screenWidth, height: screenWidth*3/4, paddingTop:0, justifyContent:'center'}}>
                { loadingImage && <ActivityIndicator style={{alignSelf:'center', position:'absolute'}} /> }
                <Image source={{uri: source }} resizeMode='cover' style={{ width: '100%', height: '100%'}} onLoadStart={() => setLoadingImage(true) } onLoadEnd={() => setLoadingImage(false)} />
                { showHeart && 
                  <Heart />
                } 
              </View>
            </TouchableWithoutFeedback>
          ))}
        </ScrollView>
      }

      <PostFooter data={data} addGradient={false} handleLike={handleLike} isLiked={isLiked} likes={likes} />
    </View>
  )
}


export default Post