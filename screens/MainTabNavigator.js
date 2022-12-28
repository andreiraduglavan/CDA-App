import { createNavigationContainerRef, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { EventsStackNavigator, HomeStackNavigator, ProfileStackNavigator, SearchStackNavigator } from './StackNavigators'
import { Octicons, Feather, FontAwesome} from '@expo/vector-icons'
import { useEffect } from 'react'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'

import { COLORS } from '../constants'
import { getCurrentUser, getDocData, updateDocu } from '../firebase'
import { useStateContext } from '../context/StateContext'
import { arrayUnion } from 'firebase/firestore'
import { View } from 'react-native'

const Tab = createBottomTabNavigator()

const navigationRef = createNavigationContainerRef()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white
  }
}

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    
    return {
      shouldShowAlert: false,
      shouldPlaySound: false,
      shouldSetBadge: false
  } }
})

const getPushToken = () => {
  if (!Device.isDevice) {
      return Promise.reject('Must use physical device for Push Notifications');
  }

  try {
      return Notifications.getPermissionsAsync()
          .then((statusResult) => {
              return statusResult.status !== 'granted'
                  ? Notifications.requestPermissionsAsync()
                  : statusResult;
          })
          .then((statusResult) => {
              if (statusResult.status !== 'granted') {
                  throw 'Failed to get push token for push notification!';
              }
              return Notifications.getExpoPushTokenAsync();
          })
          .then((tokenData) => tokenData.data);
  } catch (error) {
      return Promise.reject("Couldn't check notifications permissions");
  }
};

const MainTabNavigator = () => {
  const { currentUser, setCurrentUser, unseenMessages } = useStateContext()
  const { uid } = getCurrentUser()
  const lastNotificationResponse = Notifications.useLastNotificationResponse()

  if( currentUser == null ) {
    getDocData('users', uid)
    .then( user => setCurrentUser(user))
    .catch( error => console.log(error))
  }

  useEffect(() => {
    getPushToken().then((pushToken) => {
      if (pushToken) {
        updateDocu('users', uid, {pushTokens: arrayUnion(pushToken)})
      }
    })
    
  }, [])

  useEffect(() => {
    if (lastNotificationResponse) {
      const tab = lastNotificationResponse.notification.request.content.data.tab
      const screen = lastNotificationResponse.notification.request.content.data.screen
      const participant = lastNotificationResponse.notification.request.content.data.participant
      const conversationID = lastNotificationResponse.notification.request.content.data.conversationID
      const content = lastNotificationResponse.notification.request.content.data.content
      const params = { participant, conversationID, currentUserID:uid}
      
      
      screen && navigationRef.current?.navigate(tab, { screen, params, content })
    }
  }, [lastNotificationResponse])

  return (
    <NavigationContainer theme={theme} independent={true} ref={navigationRef}>
      <Tab.Navigator
      screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
              
              if (route.name === 'HomeStackNavigator') {
                return (
                  <View style={{backgroundColor:route.name ===COLORS.white, height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <FontAwesome name="newspaper-o" size={size} color={color} />
                  </View>
                )
              } else if (route.name === 'EventsStackNavigator') { 
                return (
                  <View style={{backgroundColor:COLORS.white, height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <Feather name="map-pin" size={size} color={color} />
                  </View>
                )
              } else if (route.name === 'ProfileStackNavigator') {
                return (
                  <View style={{backgroundColor:COLORS.white, height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <Octicons name="person" size={size} color={color} />
                  </View>
                ) 
              } else if (route.name === 'SearchStackNavigator') {
                return (
                  <View style={{backgroundColor:COLORS.white, height:'100%', width:'100%', alignItems:'center', justifyContent:'center'}}>
                    <View>
                      <Octicons name="search" size={size} color={color}/>
                      {unseenMessages && !focused && <View style={{position:'absolute', backgroundColor:'red', right:0, borderRadius:100, height:10, width:10}}></View>}
                    </View>
                  </View>
                )
              }
          }, 
          tabBarStyle: { position: 'absolute' },
          tabBarActiveTintColor: COLORS.violet,
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel:false
          
        })
      }
      >
        <Tab.Screen name="SearchStackNavigator" component={SearchStackNavigator} options={{headerShown: false}} initialParams={{screen:null}} />
        <Tab.Screen name="HomeStackNavigator" component={HomeStackNavigator} options={{headerShown: false}}/>
        <Tab.Screen name="EventsStackNavigator" component={EventsStackNavigator} options={{headerShown: false}} />
        <Tab.Screen name="ProfileStackNavigator" component={ProfileStackNavigator} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MainTabNavigator