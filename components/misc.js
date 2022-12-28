import { View, Text, Image, TextInput, TouchableOpacity, Modal, ActivityIndicator, Dimensions, StatusBar, StyleSheet, Platform, NativeModules } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/core'
import Animated, { SlideInDown, SlideOutDown, FadeIn, FadeOut, SlideInUp, SlideOutUp } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons'
import { useState } from 'react'

import { COLORS } from '../constants'
import { HeartButton, BookmarkButton, CommentButton, DMButton, PostButton, BackButton } from './button'

import logo from '../assets/Captureapplogo-removebg-preview.png'
import logo2 from '../assets/Captureapplogo-fococlipping-standard-removebg-preview2.png'

export const SafeViewAndroid = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})

export const PostFooter = ({ data, addGradient, handleLike, isLiked, likes }) => {
  const navigation = useNavigation()

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
              <HeartButton handlePress={handleLike}
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


export const Header = ({ showDelimitator=true }) => {
  const navigation = useNavigation()
  /*<EventsFeedButton color={'black'} size={24} handlePress={() => navigation.navigate("EventsFeed") }/>
    <MenuButton color={'black'} size={24} handlePress={() => setDisplaySlideBar(true)}/>
  */
  return (
    <View>
      <View style={{height:68, justifyContent:'center'}}>
        <View style={{margin:8, marginBottom:4, justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
          <Logo />
          <View style={{flexDirection:'row', justifyContent:'space-between', width:56}}>
            <PostButton color={'black'} size={24} handlePress={() => navigation.navigate("AddPost")}/> 
            <DMButton color={'black'} inHeader={true} size={24} handlePress={() => navigation.navigate("DM")}/>
          </View>
        </View>      
      </View>
      { showDelimitator && <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.1, width:'120%', marginTop:0}}></View>}
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

/*export const Footer = () => {
  const navigation = useNavigation()
  const currentUser = getCurrentUser()
  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
    getDocData('users', currentUser.uid).then( response => setUserData(response))
  }, [])
  
  return (
    <View>
      <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.1, width:'100%'}}></View>
      <View style={{height:50, flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:24}}>
        <Octicons name="home" size={24} onPress={() => navigation.navigate("Home")} suppressHighlighting={true}/>
        <Feather name="calendar" size={24} onPress={() => navigation.navigate("EventsFeed")} suppressHighlighting={true} />
        <Octicons name="person" size={24} onPress={() => navigation.navigate("Profile", { userData, self:true })} suppressHighlighting={true}/>
        <Octicons name="search" size={24} onPress={() => { navigation.navigate('SearchScreen') }} suppressHighlighting={true}/>
      </View>
    </View>
  )
}*/

/*export const Searchbar = () => {

  return (
    <View>
      <TextInput placeholder='Caută' style={{ backgroundColor:COLORS.lightGray, padding:4, borderRadius:4, fontSize:18}}/>
    </View>
  )
}*/

export const Icon = ({URL, size=50}) => {
  const [loadingImage, setLoadingImage] = useState(false)

  return (
    <View style={{ width:size, height:size, justifyContent:'center'}}>
      { loadingImage && <ActivityIndicator style={{alignSelf:'center', position:'absolute'}} /> }
      <Image source={{uri: URL}} resizeMode='cover' style={{ width: '100%', height: '100%', borderRadius: 100}} onLoadStart={() => setLoadingImage(true) } onLoadEnd={() => setLoadingImage(false)} />
    </View>
  )
}

export const TextField = ({handlePress, setContent, content}) => {
  const [input, setInput] = useState('')

  return (
    <Animated.View style={{Height:60, justifyContent:'center'}}>
      <View style={{borderBottomWidth:1, borderColor: COLORS.third, opacity:0.1, marginBottom:12}}></View>
      
      <View style={{paddingBottom:12}}>
        <TextInput 
          placeholder='Scrie un mesaj' 
          style={{borderWidth:1, borderColor:COLORS.lightGray, padding:6, marginHorizontal:12, borderRadius:16, paddingRight:70}}
          multiline={true}
          onChangeText={text => setInput(text)}
          value={input}
        />

        <View style={{position:'absolute', right:24, bottom:18}}>
          <TouchableOpacity onPress={() => { handlePress(input); setInput('') } }>
            <Text style={{color:COLORS.login, fontSize:16}}>Trimite</Text>
          </TouchableOpacity>
        </View>
      
      </View>
    </Animated.View>
  )
}

/*export const PopupMenu = ({handlePress}) => {

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
}*/

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

export const Notification = ({display, text}) => {
  const screenHeigth = Dimensions.get('screen').height

  return (
    <View>
      { display &&
        <Animated.View
          entering={SlideInUp.duration(600)}
          exiting={SlideOutUp.duration(600)}  
          style={{position:'absolute', bottom:screenHeigth-90, alignSelf:'center', backgroundColor:COLORS.popupAlert, padding:10, paddingHorizontal:16, borderRadius:10, width:'80%'}}
        >
          <Text style={{color:COLORS.white, fontSize:17, alignSelf:'center'}}>{text}</Text>
        </Animated.View>
      }
    </View>
  )
}

export const Heart = () => {{

  return (
    <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} style={{position:'absolute', alignSelf:'center'}}>
      <View>
        <AntDesign name="heart" size={48} color='red' />
      </View>
    </Animated.View>
  )
}}