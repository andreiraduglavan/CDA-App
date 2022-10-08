import { View, Text, Image, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/core'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons'
import { arrayRemove, arrayUnion, increment } from 'firebase/firestore'
import { useState } from 'react'

import { COLORS } from '../constants'
import { HeartButton, BookmarkButton, CommentButton, DMButton, EventsFeedButton, MenuButton, PostButton, BackButton } from './button'
import { useStateContext } from '../context/StateContext'
import { updateDocu } from '../firebase'

import logo from '../assets/Captureapplogo-removebg-preview.png'
import logo2 from '../assets/Captureapplogo-fococlipping-standard-removebg-preview2.png'


export const PostFooter = ({ data, addGradient, uid}) => {
  const navigation = useNavigation()
  const [likes, setLikes] = useState(data.likes)
  const [isLiked, setIsLiked] = useState(data.likingUsers.includes(uid))

  return (
    <View style={{minHeight: 16}}>
        { addGradient && 
          <LinearGradient start={[0, 1]} end={[0.7, 0]}
          colors={[COLORS.violet, COLORS.blue]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
            opacity: 0.4,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16
          }}
        />
        }
        
        <View style={{flexDirection:'row', padding:12, justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', justifyContent:'space-between', width:110}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <HeartButton handlePress={ () => {
                if(isLiked) { updateDocu('posts', data.id, {likingUsers: arrayRemove(uid), likes: increment(-1)}); setLikes(likes-1), setIsLiked(!isLiked) }
                else { updateDocu('posts', data.id, {likingUsers: arrayUnion(uid), likes: increment(1)}); setLikes(likes+1); setIsLiked(!isLiked)}
                }}
                color={isLiked ? 'red' : COLORS.third} 
              />
              <Text style={{marginLeft:6, fontWeight:'300', fontSize:14, color: COLORS.gray}}>{likes}</Text>
            </View>
            <CommentButton handlePress={() => navigation.navigate("CommentSection", { data })}/>
            <DMButton />
          </View>
          <BookmarkButton/>
        </View>
      </View>
  )
}

export const Logo = ({height=40, width=77}) => (
  <Image source={logo} style={{height:height, width: width}}/>
)

export const Logo2 = ({height=40, width=117}) => (
  <Image source={logo2} style={{height:height, width: width}}/>
)

export const ItemSeparator = () => (
  <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.1, width:'100%', marginVertical:6}}></View>
)

export const FeedFooter = ({isLoading, endReached}) => (
  <View style={{marginBottom:12}}>
    { isLoading &&
      <ActivityIndicator style={{alignSelf:'center'}}/> 
    }
    { endReached &&
      <Text style={{alignSelf:'center', marginTop:12}}>Ai văzut toate postările.</Text>
    }
  </View>
)


export const Header = () => {
  const { setDisplaySlideBar } = useStateContext()
  const navigation = useNavigation()

  return (
    <View style={{height:68}}>
      <View style={{margin:8, marginTop: 16, marginBottom:4, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
        <Logo />
        <View style={{flexDirection:'row', justifyContent:'space-between', width:130}}>
          <PostButton color={'black'} size={24} handlePress={() => navigation.navigate("AddPost")}/> 
          <EventsFeedButton color={'black'} size={24} handlePress={() => navigation.navigate("EventsFeed") }/>
          <DMButton color={'black'} size={24} handlePress={() => navigation.navigate("DM")}/>
          <MenuButton color={'black'} size={24} handlePress={() => setDisplaySlideBar(true)}/>
        </View>
      </View>
      
      <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.1, width:'120%', marginTop:8}}></View>
    </View>  
  )
}

export const  ScreenHeader = ({screenName}) => {

  return (
    <View style={{}}>
      <View style={{flexDirection:'row', alignItems:'center', margin:12, marginTop:24,justifyContent:'center'}}>
          <View style={{position:'absolute', left:0}}>
            <BackButton size={28} color={COLORS.third}/>
          </View>
          <Text style={{fontSize:20, fontWeight:'300', alignSelf:'center'}}>{screenName}</Text>
        </View>

        <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.1, width:'100%', marginTop:8}}></View>
    </View>  
  )
}

export const Footer = () => {

  return (
    <View>
      <Text>Footer</Text>
    </View>
  )
}

export const Searchbar = () => {

  return (
    <View>
      <TextInput placeholder='Caută' style={{ backgroundColor:COLORS.lightGray, padding:4, borderRadius:4, fontSize:18}}/>
    </View>
  )
}

export const Icon = ({URL, size=50}) => {

  return (
    <View style={{ width:size, height:size}}>
      <Image source={{uri: URL}} resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: '100%'}}/>
    </View>
  )
}

export const TextField = ({handlePress, setContent, content}) => {

  return (
    <Animated.View style={{Height:60, justifyContent:'center'}}>
      <View style={{borderBottomWidth:1, borderColor: COLORS.third, opacity:0.1, marginBottom:12}}></View>
      
      <View style={{paddingBottom:12}}>
        <TextInput 
          placeholder='Scrie un mesaj' 
          style={{borderWidth:1, borderColor:COLORS.lightGray, padding:6, marginHorizontal:12, borderRadius:16, paddingRight:70}}
          multiline={true}
          onChangeText={text => setContent(text)}
          value={content}
        />

        <View style={{position:'absolute', right:24, bottom:18}}>
          <TouchableOpacity onPress={handlePress}>
            <Text style={{color:COLORS.login, fontSize:16}}>Trimite</Text>
          </TouchableOpacity>
        </View>
      
      </View>
    </Animated.View>
  )
}

export const Search = () => {
  const navigation = useNavigation()
  const [input, setInput] = useState('')

  return (
    <View style={{flexDirection:'row', alignItems:'center', marginBottom:12}}>
      <TextInput 
          placeholder='Caută'
          style={{ backgroundColor:COLORS.lightGray, padding:6, marginHorizontal:12, borderRadius:16, width:240, fontSize:18}}
          value={input}
          onChangeText={text => setInput(text)}
      />
      <TouchableOpacity onPress={() => { navigation.navigate('SearchScreen', { input }) }}>
        <AntDesign name="search1" size={22} color="black" />
      </TouchableOpacity>
    </View>
  )
}

export const PopupMenu = ({handlePress}) => {

  return (
    <TouchableOpacity style={{position:'absolute', top:32, right:6}} onPress={handlePress}>
      <View style={{ borderRadius:4, padding:4, paddingHorizontal:12, backgroundColor:COLORS.white, shadowColor: '#171717',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        shadowRadius: 2, }}>
        <Text style={{fontSize:15}}>Șterge postarea</Text>
      </View>
    </TouchableOpacity>
)
}

export const DeletePostModal = ({modalVisible ,handleClose, handleDelete}) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', backgroundColor:COLORS.backgroundModal, paddingBottom:24}}>
        <View style={{backgroundColor:COLORS.white, alignItems:'center', borderRadius:18}}>
          <TouchableOpacity onPress={handleDelete} style={{padding:12, paddingHorizontal:72}}>
            <Text style={{fontSize:18, color:'red'}}>Șterge postarea</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleClose} style={{padding:12, paddingHorizontal:72}}>
            <Text style={{fontSize:18}}>Anulează</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export const PopupAlert = ({display, text}) => {
  return (
    <View>
      { display &&
        <Animated.View
          entering={SlideInDown.duration(600)}
          exiting={SlideOutDown.duration(600)}  
          style={{position:'absolute', bottom:24, alignSelf:'center', backgroundColor:COLORS.popupAlert, padding:10, paddingHorizontal:16, borderRadius:10, width:'80%'}}
        >
          <Text style={{color:COLORS.white, fontSize:17, alignSelf:'center'}}>{text}</Text>
        </Animated.View>
      }
    </View>
  )
}