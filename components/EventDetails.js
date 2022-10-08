import { View, Text, Image, ScrollView, Dimensions } from 'react-native'
import { Feather, Ionicons, EvilIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { COLORS } from '../constants'
import { JoinButton } from './button'
import { PostFooter } from './misc'
import Comment from './Comment'

const EventDetails = ({data}) => {
  const navigation = useNavigation()
  const username = data.username

  return (
    <ScrollView>
      <View>
        <Image source={{uri: data.imgURLs[0]}} resizeMode='cover' style={{ width: '100%', height: 282, borderBottomLeftRadius: 16, borderBottomLeftRadius: 16}} />
        <View style={{position: 'absolute', bottom:-20, right:40}}>
          <JoinButton handlePress={() => {}}/>
        </View>
      </View>
      
      <View style={{padding:16, marginTop: 8}}>
        <Text style={{fontSize: 20, fontWeight:'bold'}}>{data.title}</Text>

        <Text style={{color:COLORS.gray}}>Hosted by <Text onPress={() => navigation.navigate("Profile", { username })}>{data.username}</Text></Text>
        
        <View style={{flexDirection:'row', marginTop:8, alignItems:'center'}}>
          <EvilIcons name="location" size={16} color={COLORS.gray} />
          <Text style={{color: COLORS.gray}}> Bucuresti</Text>
          <View style={{height:'80%', borderLeftWidth:1, borderColor: COLORS.gray, marginHorizontal:4}}></View>
          <Feather name="calendar" size={14} color={COLORS.gray} />
          <Text style={{color: COLORS.gray}}> 27 feb</Text>
          <View style={{height:'80%', borderLeftWidth:1, borderColor: COLORS.gray, marginHorizontal:4}}></View>
          <Ionicons name="ios-people-outline" size={14} color={COLORS.gray} />
          <Text style={{color: COLORS.gray}}> 16 locuri</Text>
        </View>

        <View style={{padding:4, marginTop:6}}>
            <Text style={{fontSize:14}}>{data.content}</Text>
        </View>
      </View>

      <PostFooter data={data} addGradient={false}/>

      <View style={{borderBottomWidth:1, borderColor: COLORS.gray, opacity:0.1, marginBottom:12}}></View>
    
      { data.comments.map((item, index) => (
        <Comment data={item} key={index}/>
      ))}
    </ScrollView>
  )
}

export default EventDetails