import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { EventsStackNavigator, HomeStackNavigator, ProfileStackNavigator, SearchStackNavigator } from './StackNavigators'
import { Octicons, Feather} from '@expo/vector-icons'
import { COLORS } from '../constants'

const Tab = createBottomTabNavigator()

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white
  }
}

const MainTabNavigator = () => {
  return (
    <NavigationContainer theme={theme} independent={true}>
      <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'HomeStackNavigator') {
                return <Octicons name="home" size={size} color={color}/>
              } else if (route.name === 'EventsStackNavigator') { 
                return <Feather name="calendar" size={size} color={color} />
              } else if (route.name === 'ProfileStackNavigator') {
                return <Octicons name="person" size={size} color={color} />
              } else if (route.name === 'SearchStackNavigator') {
                return <Octicons name="search" size={size} color={color}/>
              }
          },
        })}
        tabBarOptions={{ activeTintColor: COLORS.violet, inactiveTintColor: 'black', showLabel: false }}
      >
        <Tab.Screen name="HomeStackNavigator" component={HomeStackNavigator} options={{headerShown: false}}/>
        <Tab.Screen name="EventsStackNavigator" component={EventsStackNavigator} options={{headerShown: false}}/>
        <Tab.Screen name="ProfileStackNavigator" component={ProfileStackNavigator} options={{headerShown: false}}/>
        <Tab.Screen name="SearchStackNavigator" component={SearchStackNavigator} options={{headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MainTabNavigator