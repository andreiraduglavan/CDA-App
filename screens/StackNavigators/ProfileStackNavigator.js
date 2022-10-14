import { createStackNavigator } from '@react-navigation/stack'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { AddPost, CommentSection, Conversation, Details, DM, Followers, Profile, ChangePersonalInf, Settings } from '..'
import { COLORS } from '../../constants'

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white
  }
}

const ProfileStackNavigator = () => {
  return (
    <NavigationContainer theme={theme} independent={true}>
          <Stack.Navigator> 
            <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}} initialParams={{ self:true, userData: { id:'bYpeeuJc8Ae1lO3w8yARGPPuu9E3', username:'andreiradu', name:'Andrei Radu', profileImgURL:'https://firebasestorage.googleapis.com/v0/b/app-ea7ec.appspot.com/o/images%2F5ea47126-0ba7-44fb-997e-62a2e09a7828?alt=media&token=47443a93-dae9-4e33-827e-e6c84e4bd9ab' } }}/>
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