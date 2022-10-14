import { createStackNavigator } from '@react-navigation/stack'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import {  CommentSection, Details, Followers, Profile, EventsFeed, DM, Conversation } from '..'
import { COLORS } from '../../constants'

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white
  }
}

const EventsStackNavigator = () => {
  return (
    <NavigationContainer theme={theme} independent={true}>
          <Stack.Navigator> 
          <Stack.Screen name='EventsFeed' component={EventsFeed} options={{headerShown: false}}/>
            <Stack.Screen name='Details' component={Details} options={{headerShown: false}}/>
            <Stack.Screen name='CommentSection' component={CommentSection} options={{headerShown: false}}/>
            <Stack.Screen name='Profile' component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name='DM' component={DM} options={{headerShown: false}}/>
            <Stack.Screen name='Conversation' component={Conversation} options={{headerShown: false}}/>
            <Stack.Screen name='Followers' component={Followers} options={{headerShown: false}}/>      
          </Stack.Navigator>
        </NavigationContainer>
  )
}

export default EventsStackNavigator