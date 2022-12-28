import { createStackNavigator } from '@react-navigation/stack'
import { createNavigationContainerRef, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { AddPost, CommentSection, Conversation, Details, DM, Followers, Profile, ChangePersonalInf, Settings } from '..'
import { COLORS } from '../../constants'
import { useStateContext } from '../../context/StateContext'

const Stack = createStackNavigator()

const ref = createNavigationContainerRef()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white
  }
}

const ProfileStackNavigator = ({navigation}) => {
  const [routeName, setRouteName] = useState("Home")
  const { currentUser } = useStateContext()

  useLayoutEffect(() => {
    if (['Conversation', 'DM', 'CommentSection', 'AddPost'].includes(routeName)) {
    navigation.setOptions({ tabBarStyle:{display: "none"} })
    } else {
    navigation.setOptions({ tabBarStyle:{display: "flex"} })
    }
  }, [routeName])

  return (
    <NavigationContainer theme={theme} independent={true} ref={ref} onStateChange={() => setRouteName(ref.getCurrentRoute().name)}>
      <Stack.Navigator> 
        <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}} initialParams={{ self:true,  userData:currentUser}}/>
        <Stack.Screen name='Details' component={Details} options={{headerShown: false}}/>
        <Stack.Screen name='CommentSection' component={CommentSection} options={{headerShown: false}}/>
        <Stack.Screen name='DM' component={DM} options={{headerShown: false}}/>
        <Stack.Screen name='Conversation' component={Conversation} options={{headerShown: false}}/>
        <Stack.Screen name='AddPost' component={AddPost} options={{headerShown: false}}/>
        <Stack.Screen name='Followers' component={Followers} options={{headerShown: false}}/>
        <Stack.Screen name='Settings' component={Settings} options={{headerShown: false}}/>
        <Stack.Screen name='ChangePersonalInf' component={ChangePersonalInf} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ProfileStackNavigator