import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { arrayRemove, arrayUnion, collection, getDocs, increment, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import {  FollowButton, ScreenHeader, FeedItem, ItemSeparator, DM2Button, Bio, FeedFooter, SafeViewAndroid } from '../components'
import { COLORS } from '../constants'
import { deleteImage, getCurrentUser, getDocData, getPosts, updateDocu, uploadImage } from '../firebase'
import { joinIDs } from '../utils'
import { db } from '../firebase/firebaseApp'

const ProfileHeader = ({ data, self }) => {
  const navigation = useNavigation()
  const currentUser = getCurrentUser()
  const { id, profileImgURL, name } = data
  const uid = id
  const [userData, setUserData] = useState(null)
  const [profilePic, setProfilePic] = useState(profileImgURL)
  const [followers, setFollowers] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersIDs, setFollowersIDs] = useState([])
  const [loadingProfilepic, setLoadingProfilepic] = useState(false)
  
  useEffect(() => {
    getDocData('users', uid).then(docData =>  {setUserData(docData); setFollowers(docData.followersCount); setFollowersIDs(docData.followers); docData.followers.includes(currentUser.uid) ? setIsFollowing(true) : setIsFollowing(false)} )
  }, [])
  
  const changeProfilePicture = async () => {
      
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
    })

    if (!result.cancelled) {
      uploadImage(result.uri)
      .then((result) => {
        setProfilePic(result)
        var oldPic = profilePic
        updateDocu('users', uid, {profileImgURL: result}).then( () => oldPic && deleteImage(oldPic))
      })
      .catch((error) => console.log(error))
    }
  }
  
  return (
    <View>
      <View style={{marginLeft: 40, marginRight:8, marginBottom:40, marginTop:8}}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <View style={{ width:100, height:100}}>
            <TouchableOpacity onPress={() => currentUser.uid==uid && changeProfilePicture()} style={{justifyContent:'center'}}>
              { loadingProfilepic && <ActivityIndicator style={{alignSelf:'center', position:'absolute'}} /> }
              <Image source={{uri: profilePic && profilePic }} resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: 100}} onLoadStart={() => setLoadingProfilepic(true) } onLoadEnd={() => setLoadingProfilepic(false)} />
            </TouchableOpacity>
          </View>
          <View style={{paddingTop:4, paddingRight:8}}>
            { currentUser.uid==uid ?
              self && <Ionicons name="settings-sharp" size={22} color={COLORS.gray} onPress={() => navigation.navigate('Settings')} suppressHighlighting={true} /> :
              <DM2Button 
                handlePress={() => {
                  var participant = userData
                  var currentUserID = currentUser.uid
                  var conversationID = joinIDs(currentUserID, participant.id)
                  navigation.navigate('Conversation', { participant, conversationID, currentUserID })
                  
                } }
              />
            }
          </View>
        </View>
        <Text style={{fontSize:32, fontWeight:'500', marginTop:16, color:COLORS.third}}>{name}</Text>
        <Bio userData={userData} currentUser={currentUser}/>
      </View>
      
      
      <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.2, width:'100%', marginLeft:40, marginBottom:16}}></View>

      <View style={{flexDirection:'row', marginLeft:40, marginBottom:40}}>
        <TouchableOpacity onPress={() => navigation.navigate('Followers', {followersIDs})}>
          <View style={{marginRight:24}}>
            <Text style={{fontSize:32, fontWeight:'300', color:COLORS.third}}>{userData && followers}</Text>
            <Text style={{color:COLORS.third, fontWeight:'300'}}>FOLLOWERS</Text>
          </View>
        </TouchableOpacity>

        <View style={{marginRight:8}}>
          <Text style={{fontSize:32, fontWeight:'300', color:COLORS.third}}>{0}</Text>
          <Text style={{color:COLORS.third, fontWeight:'300'}}>EVENTS</Text>
        </View>
        
        { !isFollowing ?
        currentUser.uid != uid && <FollowButton text={'FOLLOW'} handlePress={() => { updateDocu('users', currentUser.uid, {following: arrayUnion(uid)}); updateDocu('users', uid, {followersCount: increment(1), followers: arrayUnion(currentUser.uid)}); setFollowers(followers+1); setIsFollowing(true)}}/> :
        currentUser.uid != uid && <FollowButton text={'UNFOLLOW'} handlePress={() => { updateDocu('users', currentUser.uid, {following: arrayRemove(uid)}); updateDocu('users', uid, {followersCount: increment(-1), followers: arrayRemove(currentUser.uid)}); setFollowers(followers-1); setIsFollowing(false)}}/>
        
        }
        
      </View>

      <Text style={{marginLeft:40,fontWeight:'300', color:COLORS.third}}>RECENT ACTIVITY</Text>
      
      <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.2, width:'100%', marginLeft:40, marginBottom:16, marginTop:4}}></View>
    </View>
  )
}

const Profile = ({route, navigate}) => {
  const { userData, self } = route.params
  const { id, username } = userData
  const [userPosts, setUserPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [endReached, setEndReached] = useState(false)
  const postsRef = collection(db, 'posts')

  const fetchMoreData = async () => {
    setIsLoading(true)

    if(!endReached && !isLoading) {
      const startIndex = userPosts[userPosts.length-1].createdAt
      const newPostsSnap = await getDocs(query(postsRef, where('userID', '==', id), orderBy('createdAt', 'desc'), limit(7), startAfter(startIndex)))
      if(newPostsSnap.empty) { setEndReached(true) } 
      const newPosts = newPostsSnap.docs.map((doc)=> ({...doc.data(), id:doc.id}))
      setUserPosts(userPosts.concat(newPosts))
    }
    setIsLoading(false) 
  }

  useEffect(() => {
    
    getPosts(id).then(posts => setUserPosts(posts))

  }, [])
  
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      { !self ? <ScreenHeader screenName={username} /> : <View style={{paddingTop:24}}></View>}

      <FlatList 
        data={userPosts}
        extraData={userPosts}
        ItemSeparatorComponent={ () => <ItemSeparator /> }
        renderItem={({item}) => <FeedItem item={item} /> }
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ProfileHeader data={userData} self={self} />}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListFooterComponent={() => <FeedFooter isLoading={isLoading} endReached={endReached} />}
        onEndReached={fetchMoreData}
      />
    </SafeAreaView>
  )
}

export default Profile