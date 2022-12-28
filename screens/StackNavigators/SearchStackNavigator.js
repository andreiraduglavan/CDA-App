import { createStackNavigator } from '@react-navigation/stack'
import { createNavigationContainerRef, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import {  CommentSection, Details, Followers, Profile, DM, Conversation, SearchScreen, EventSearch, AddPost } from '..'
import { COLORS } from '../../constants'
import { useEffect, useLayoutEffect, useState } from 'react'
import { updateDocu } from '../../firebase'

const Stack = createStackNavigator()

const ref = createNavigationContainerRef()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white
  }
}

const SearchStackNavigator = ({navigation, route}) => {
  const [routeName, setRouteName] = useState("Home")
  const { screen, params, content } = route.params

  useLayoutEffect(() => {
    if (['Conversation', 'DM', 'CommentSection', 'AddPost'].includes(routeName)) {
    navigation.setOptions({ tabBarStyle:{display: "none"} })
    } else {
    navigation.setOptions({ tabBarStyle:{display: "flex"} })
    }
  }, [routeName])

  useEffect(() => {
    if(screen) {
      ref.navigate(screen, {...params})
      updateDocu('conversations', params.conversationID, {unseen:false})
    }
    
  }, [screen, content])
  return (
    <NavigationContainer theme={theme} independent={true} ref={ref} onStateChange={() => setRouteName(ref.getCurrentRoute().name)}>
          <Stack.Navigator>
            <Stack.Screen name='EventSearch' component={EventSearch} options={{headerShown: false}}/>
            <Stack.Screen name='SearchScreen' component={SearchScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Details' component={Details} options={{headerShown: false}}/>
            <Stack.Screen name='CommentSection' component={CommentSection} options={{headerShown: false}}/>
            <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name='DM' component={DM} options={{headerShown: false}}/>
            <Stack.Screen name='Conversation' component={Conversation} options={{headerShown: false}}/>
            <Stack.Screen name='Followers' component={Followers} options={{headerShown: false}}/>
            <Stack.Screen name='AddPost' component={AddPost} options={{headerShown: false}}/>      
          </Stack.Navigator>
        </NavigationContainer>
  )
}

export default SearchStackNavigator