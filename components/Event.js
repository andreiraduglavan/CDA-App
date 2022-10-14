import { View, Text, Image, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { arrayRemove, arrayUnion, increment } from 'firebase/firestore'

import { COLORS } from '../constants'
import { JoinButton } from './button'
import { PostFooter } from './misc'
import { Feather, Ionicons, EvilIcons } from '@expo/vector-icons'
import { updateDocu } from '../firebase'

const Event = ({data}) => {
  const navigation = useNavigation()
  const uid = data.userID
  const [likes, setLikes] = useState(data.likes)
  const [isLiked, setIsLiked] = useState(data.likingUsers.includes(uid))
  const [loadingImage, setLoadingImage] = useState(false)

  const handleLike = () => {
    if(isLiked) { updateDocu('posts', data.id, {likingUsers: arrayRemove(uid), likes: increment(-1)}); setLikes(likes-1), setIsLiked(!isLiked) }
    else { updateDocu('posts', data.id, {likingUsers: arrayUnion(uid), likes: increment(1)}); setLikes(likes+1); setIsLiked(!isLiked)}
  }

  return (
    <View style={{margin: 8, marginTop:0}}>
      <View style={{margin:-8, justifyContent:'center'}}>
        { loadingImage && <ActivityIndicator style={{alignSelf:'center', position:'absolute'}} /> }
        <Image source={{uri: data.imgURLs[0]}} resizeMode='cover' style={{ width: '100%', height: 200, borderBottomLeftRadius: 16, borderBottomRightRadius: 16}} onLoadStart={() => setLoadingImage(true) } onLoadEnd={() => setLoadingImage(false)} />
        <View style={{position: 'absolute', bottom:-20, right:40}}>
          <JoinButton handlePress={() => {}}/>
        </View>
      </View>
      
      <View style={{padding:16, marginTop: 8}}>
        <Text style={{fontSize: 20, fontWeight:'bold'}}>{data.name}</Text>
        
        <Text style={{color:COLORS.gray, marginTop:4}}>Hosted by <Text onPress={() => navigation.navigate("Profile", { uid })}>{data.username}</Text></Text>
        
        <View style={{flexDirection:'row', marginTop:8, alignItems:'center'}}>
          <EvilIcons name="location" size={16} color={COLORS.gray} />
          <Text style={{color: COLORS.gray}}> {data.location}</Text>
          <View style={{height:'80%', borderLeftWidth:1, borderColor: COLORS.gray, marginHorizontal:4}}></View>
          <Feather name="calendar" size={14} color={COLORS.gray} />
          <Text style={{color: COLORS.gray}}> {data.date}</Text>
          <View style={{height:'80%', borderLeftWidth:1, borderColor: COLORS.gray, marginHorizontal:4}}></View>
          <Ionicons name="ios-people-outline" size={14} color={COLORS.gray}/>
          <Text style={{color: COLORS.gray}}> {data.numberOfVolunteers} locuri</Text>
        </View>

        <View style={{padding:4, marginTop:6}}>
            <Text style={{fontSize:14}}>{data.content}</Text>
        </View>
      </View>

      <PostFooter data={data} addGradient={false} handleLike={handleLike} isLiked={isLiked} likes={likes} />
    </View>
  )
}

export default Event