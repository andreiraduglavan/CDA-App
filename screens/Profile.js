import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native'
import { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { arrayRemove, arrayUnion, increment } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

import { DotsButton, FollowButton, ScreenHeader, FeedItem, ItemSeparator, DM2Button, Bio } from '../components'
import { COLORS } from '../constants'
import { deleteImage, getCurrentUser, getDocData, getPosts, updateDocu, uploadImage } from '../firebase'
import { joinIDs } from '../utils'

const ProfileHeader = ({ uid, setScreenName }) => {
  const navigation = useNavigation()
  const currentUser = getCurrentUser()
  const [userData, setUserData] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const [followers, setFollowers] = useState(0)
  const [isFollowing, setIsFollowing] = useState(false)
  
  useEffect(() => {
    getDocData('users', uid).then(docData =>  {setUserData(docData); setScreenName(docData.username);setProfilePic(docData.profileImgURL); setFollowers(docData.followersCount); docData.followers.includes(currentUser.uid) ? setIsFollowing(true) : setIsFollowing(false)} )
  }, [])
  
  const changeProfilePicture = async () => {
      
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    })

    if (!result.cancelled) {
      uploadImage(result.uri)
      .then((result) => {
        setProfilePic(result)
        var oldPic = userData.profileImgURL
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
            <TouchableOpacity onPress={() => currentUser.uid==uid && changeProfilePicture()}>
              <Image source={{uri: profilePic && profilePic }} resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: '100%'}}/>
            </TouchableOpacity>
          </View>
          <View style={{paddingTop:4, paddingRight:8}}>
            { currentUser.uid==uid ?
              <DotsButton size={20}/> :
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
        <Text style={{fontSize:32, fontWeight:'500', marginTop:16, color:COLORS.third}}>{userData && userData.name}</Text>
        <Bio userData={userData} />
      </View>
      
      
      <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.2, width:'100%', marginLeft:40, marginBottom:16}}></View>

      <View style={{flexDirection:'row', marginLeft:40, marginBottom:40}}>
        <View style={{marginRight:24}}>
          <Text style={{fontSize:32, fontWeight:'300', color:COLORS.third}}>{followers}</Text>
          <Text style={{color:COLORS.third, fontWeight:'300'}}>FOLLOWERS</Text>
        </View>
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
  const { uid } = route.params
  const [userPosts, setUserPosts] = useState([])
  const [screenName, setScreenName] = useState('')

  useEffect(() => {
    getPosts(uid).then((posts) => setUserPosts(posts))
  }, [])

  return (
    <SafeAreaView>
      <ScreenHeader screenName={screenName} />

      <FlatList
        data={userPosts}
        ItemSeparatorComponent={ () => <ItemSeparator /> }
        renderItem={({item}) => <FeedItem item={item} /> }
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => <ProfileHeader uid={uid} setScreenName={setScreenName} />}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

    </SafeAreaView>
  )
}

export default Profile