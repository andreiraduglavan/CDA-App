import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { useState, useCallback } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { StateContext } from './context/StateContext'
import { Landing, SignUpScreen } from './screens'
import MainTabNavigator from './screens/MainTabNavigator'
import { COLORS } from './constants'
import { auth } from './firebase/firebaseApp'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

const Stack = createStackNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white
  }
}

const App = () => {
  const [loaded] = useFonts({
    RobotoNormal:'./assets/fonts/Roboto-Regular.ttf',
  })

  const [isSignedIn, setisSignedIn] = useState(true)
  const [appIsReady, setAppIsReady] = useState(false)
  
  onAuthStateChanged(auth, user => {
    if (user != null) {
      setisSignedIn(true)
      setAppIsReady(true)
    }
    else { setisSignedIn(false); setAppIsReady(true) }
  })

  const onLayoutRootView = useCallback(async () => {
    
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady])

  
  if (!appIsReady) {
    return null
  }
  
  return (
      <StateContext>
        <NavigationContainer theme={theme} onReady={onLayoutRootView} >
          <Stack.Navigator > 
            { isSignedIn ? 
                <>
                  <Stack.Screen name='MainTabNavigator' component={MainTabNavigator} options={{headerShown: false}}/>
                </>
              : 
                <>
                  <Stack.Screen name='Landing' component={Landing} options={{headerShown: false}}/>
                  <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{headerShown: false}}/>
                </>            
            }        
          </Stack.Navigator>
        </NavigationContainer>
      </StateContext>
  )
}

export default App
