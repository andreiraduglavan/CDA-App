import { View, Text } from 'react-native'
import { useState } from 'react'

import { COLORS } from '../constants'
import { HeartButton } from './button'
import { useNavigation } from '@react-navigation/native'

const Comment = ({data}) => {
  const navigation = useNavigation()
  const [likes, setLikes] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const uid = data.userID

  return (
    <View style={{paddingHorizontal:12, marginBottom:12}}>
      <Text><Text style={{fontWeight:'bold'}} onPress={() => navigation.navigate("Profile", { uid })}>{data.username}</Text>   {data.content}</Text>
      <View style={{marginTop:0, flexDirection:'row', alignItems:'center'}}>
        <HeartButton size={11} handlePress={() => {
            if(isLiked) { setIsLiked(!isLiked); setLikes(likes-1) }
            else { setIsLiked(!isLiked); setLikes(likes+1)}
          } }
          color={isLiked ? 'red' : COLORS.third} 
        />
        <Text style={{fontSize:11, color:COLORS.gray, marginLeft:8, paddingBottom:4}}>{likes} aprecieri  <Text style={{fontSize:20}}>·</Text>  just now</Text>
      </View>
    </View>
  )
}

export default Comment