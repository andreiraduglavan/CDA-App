import { View, Text, Image, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import { COLORS } from '../constants'
import { JoinButton } from './button'
import { Feather, Ionicons, EvilIcons } from '@expo/vector-icons'
import { getImage } from '../assets/category-icons'

const EventCard = ({data}) => {
  const navigation = useNavigation()
  const [loadingImage, setLoadingImage] = useState(false)

  return (
    <View style={{margin: 8, marginTop:0}}>
      <View style={{margin:-8, justifyContent:'center'}}>
        { loadingImage && <ActivityIndicator style={{alignSelf:'center', position:'absolute'}} /> }
        <Image source={{uri: data.imgURLs[0]}} resizeMode='cover' style={{ width: '100%', height: 160, borderBottomLeftRadius: 16, borderBottomRightRadius: 16}} onLoadStart={() => setLoadingImage(true) } onLoadEnd={() => setLoadingImage(false)} />
        <View style={{position: 'absolute', bottom:-20, right:40, display:'none'}}>
          <JoinButton handlePress={() => {}}/>
        </View>
      </View>
      
      <View style={{padding:16, paddingHorizontal:4}}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginVertical:8}}>
          <View>
            <Text style={{fontSize: 20, fontWeight:'bold'}}>{data.name}</Text>

            <Text style={{color:COLORS.gray, marginTop:4}}>Hosted by <Text onPress={() => navigation.navigate("Profile", { userData:{id:data.userID, username:data.username, profileImgURL:data.profileImgURL} })}>{data.username}</Text></Text>
          </View>
          
          {data.category && <Image source={getImage(data.category)} resizeMode='cover' style={{ width: 36, height: 36, borderRadius:100}} />}
      </View>

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

      </View>

      <View style={{width:'60%', alignSelf:'center', minHeight:40}}>
        <JoinButton handlePress={() => {}} text={'Vezi detalii'}/>
      </View>
    </View>
  )
}

export default EventCard