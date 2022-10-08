import { View, Text, TouchableOpacity } from 'react-native'
import { Entypo, FontAwesome, AntDesign, Ionicons, Feather, FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

import { COLORS } from '../constants'

export const HeartButton = ({handlePress, size=20, color=COLORS.third}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <AntDesign name="heart" size={size} color={color} />
    </TouchableOpacity>
  )
}

export const DM2Button = ({handlePress, size=20}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <View style={{height:36, width:36, alignItems:'center', justifyContent:'center'}}>
        <LinearGradient start={[0, 1]} end={[0.7, 0]}
          colors={[COLORS.violet, COLORS.blue]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom:0,
            height: 36,
            borderRadius:'100%'
          }}
        />
        <Entypo name="paper-plane" size={size} color='white' />
      </View>
    </TouchableOpacity>
  )
}

export const ExitButton = ({handlePress, size=20, color='black'}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <AntDesign name="close" size={size} color={color} />
    </TouchableOpacity>
  )
}

export const CommentButton = ({handlePress}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <FontAwesome name="comment" size={20} color={COLORS.third} />
    </TouchableOpacity>
  )
}

export const DotsButton = ({handlePress, size=18, color=COLORS.gray}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <Entypo name="dots-three-vertical" size={size} color={color}/>
    </TouchableOpacity>
  )
}

export const DMButton = ({handlePress ,size=20, color=COLORS.third}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <Entypo name="paper-plane" size={size} color={color} />
    </TouchableOpacity>
  )
}

export const EventsFeedButton = ({handlePress ,size=20, color=COLORS.gray}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <Feather name="calendar" size={size} color={color} />
    </TouchableOpacity>
  )
}

export const MenuButton = ({handlePress ,size=20, color=COLORS.gray}) => {

  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <FontAwesome5 name="grip-lines" size={size} color={color} />
    </TouchableOpacity>
  )
}

export const BookmarkButton = ({handlePress}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <FontAwesome name="bookmark" size={20} color={COLORS.third} />
    </TouchableOpacity>
  )
}

export const BackButton = ({handlePress, size=20, color=COLORS.gray}) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={{}}
      onPress={() => navigation.goBack()}
    >
      <Ionicons name="chevron-back" size={size} color={color} />
    </TouchableOpacity>
  )
}

export const JoinButton = ({handlePress}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <View style={{padding:8, paddingHorizontal:32, alignContent:'center', justifyContent: 'center', borderRadius: 24, borderColor: COLORS.white, borderWidth: 0, shadowColor: '#171717',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 4}}
      >
        <LinearGradient start={[0, 1]} end={[0.7, 0]}
          colors={[COLORS.violet, COLORS.blue]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom:0,
            height: 34,
            borderRadius:24
          }}
        />
        <Text style={{fontSize: 16, color:COLORS.white}}>APLICĂ</Text>
      </View>
    </TouchableOpacity>
  )
}

export const FollowButton = ({handlePress, color=COLORS.gray, text}) => {
  return (
    <TouchableOpacity style={{right:0, bottom:'25%', position:'absolute', padding:4, paddingHorizontal:24, borderTopStartRadius:'100%', borderBottomLeftRadius:'100%'}}
      onPress={handlePress}
    >
      <LinearGradient start={[0, 1]} end={[0.7, 0]}
          colors={[COLORS.violet, COLORS.blue]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom:0,
            height: 32,
            borderTopStartRadius:'100%', borderBottomLeftRadius:'100%'
          }}
        />
      <Text style={{color:COLORS.white, fontSize:18}}>{text}</Text>
    </TouchableOpacity>
  )
}

export const LoginButton = ({handlePress, size=16, color=COLORS.login}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <View style={{borderRadius:16, backgroundColor:color}}>
        <Text style={{color:COLORS.white, fontSize:size, padding:8, paddingHorizontal:24}}>Intră în cont</Text>
      </View>
    </TouchableOpacity>
  )
}

export const SignUpButton = ({handlePress, size=16, color=COLORS.login}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <View style={{borderRadius:16, backgroundColor:color}}>
        <Text style={{color:COLORS.white, fontSize:size, padding:8, paddingHorizontal:24}}>Înscrie-te</Text>
      </View>
    </TouchableOpacity>
  )
}

export const GoogleLogin = ({handlePress, size=16}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <View style={{borderRadius:16, backgroundColor:COLORS.googleLogin, flexDirection:'row', paddingHorizontal:24, alignItems:'center'}}>
        <AntDesign name="google" size={24} color={COLORS.white} />
        <Text style={{color:COLORS.white, fontSize:size, padding:8}}>Conectează-te cu Google</Text>
      </View>

    </TouchableOpacity>
  )
}

export const MyProfileButton = ({handlePress, size=28, color='black'}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <View style={{flexDirection:'row', alignItems:'center', margin:8, marginBottom:12}}>
        <View style={{width:26, alignItems:'center'}}>
          <Ionicons name="ios-person-outline" size={size} color={color} />
        </View>
        <Text style={{fontSize:18, marginLeft:16}}>Profilul Meu</Text>
      </View>
      <View style={{borderTopWidth:1, borderColor: COLORS.gray, opacity:0.2, marginLeft:42}}></View>
    </TouchableOpacity>
  )
}

export const SavedButton = ({handlePress, size=28, color='black'}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    > 
      <View style={{flexDirection:'row', alignItems:'center', margin:8, marginVertical:12}}>
        <View style={{width:26, alignItems:'center'}}>
          <FontAwesome name="bookmark-o" size={size} color={color} />
        </View>
        <Text style={{fontSize:18, marginLeft:16}}>Salvate</Text>
      </View>
      <View style={{borderTopWidth:1, borderColor: COLORS.gray, opacity:0.2, marginLeft:42}}></View>
    </TouchableOpacity>
  )
}

export const SettingsButton = ({handlePress, size=28, color='black'}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    > 
      <View style={{flexDirection:'row', alignItems:'center', margin:8, marginVertical:12}}>
        <View style={{width:26, alignItems:'center'}}>
          <Feather name="settings" size={size} color={color} />
        </View>
        <Text style={{fontSize:18, marginLeft:16}}>Setări</Text>
      </View>
      <View style={{borderTopWidth:1, borderColor: COLORS.gray, opacity:0.2, marginLeft:42}}></View>
    </TouchableOpacity>
  )
}

export const AppliesButton = ({handlePress, size=28, color='black'}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    > 
      <View style={{flexDirection:'row', alignItems:'center', margin:8, marginVertical:12}}>
        <View style={{width:26, alignItems:'center'}}>
          <Feather name="clipboard" size={size} color={color} />
        </View>
        <Text style={{fontSize:18, marginLeft:16}}>Aplicații</Text>
      </View>
      <View style={{borderTopWidth:1, borderColor: COLORS.gray, opacity:0.2, marginLeft:42}}></View>
    </TouchableOpacity>
  )
}

export const LogoutButton = ({handlePress, size=28, color='black'}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    > 
      <View style={{flexDirection:'row', alignItems:'center', margin:8, marginVertical:12}}>
        <View style={{width:26, alignItems:'center'}}>
          <Ionicons name="log-out-outline" size={size} color={color} />
        </View>
        <Text style={{fontSize:18, marginLeft:16}}>Ieși din cont</Text>
      </View>
      
      <View style={{borderTopWidth:1, borderColor: COLORS.gray, opacity:0.2, marginLeft:42}}></View>
    </TouchableOpacity>
  )
}

export const PostButton = ({handlePress ,size=20, color=COLORS.third}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <AntDesign name="pluscircleo" size={size} color={color} />
    </TouchableOpacity>
  )
}

export const GaleryButton = ({handlePress ,size=20, color='black'}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <FontAwesome name="photo" size={size} color={color}/>
    </TouchableOpacity>
  )
}

export const AddBio = ({handlePress, color=COLORS.gray, style}) => {
  return (
    <TouchableOpacity
      style={{}}
      onPress={handlePress}
    >
      <Text style={{fontSize:16, color:color, ...style}}>+Adaugă bio</Text>
    </TouchableOpacity>
  )
}