import { View, Dimensions } from 'react-native'
import Animated, {SlideInRight, SlideOutRight} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

import { getCurrentUser, SignOut } from '../firebase'
import { COLORS } from '../constants'
import { useStateContext } from '../context/StateContext'
import { AppliesButton, ExitButton, LogoutButton, MyProfileButton, SavedButton, SettingsButton } from './button'
import { Search } from './misc'

const SlideBar = () => {
  const currentUser = getCurrentUser()
  const screenHeigth = Dimensions.get('screen').height
  const { setDisplaySlideBar } = useStateContext()
  const navigation = useNavigation()

  return (
    <Animated.View 
      entering={SlideInRight.duration(600)}
      exiting={SlideOutRight.duration(600)} 
      style={{backgroundColor:COLORS.white, width:'80%', height:screenHeigth-20, position:'absolute', top:20, right:0, borderTopLeftRadius:16, borderBottomLeftRadius:16, borderWidth:1, borderColor:COLORS.lightGray}}
    >
      <View style={{marginTop:24, margin:16, alignItems:'flex-end'}}>
        <ExitButton handlePress={() => setDisplaySlideBar(false)} size={24} />
      
      </View>

      <View style={{flex:1, justifyContent:'space-between'}}>
        <View>
          <Search />
          <MyProfileButton handlePress={() => { var uid = currentUser.uid; navigation.navigate("Profile", {uid})}}/>
          <SavedButton />
          <AppliesButton />
          <SettingsButton  size={27} handlePress={() => navigation.navigate("Settings")}/>
        </View>

        <View style={{}}>
          <LogoutButton size={27} handlePress={() => SignOut()}/>
        </View>
      </View>           
    </Animated.View>
  )
}

export default SlideBar