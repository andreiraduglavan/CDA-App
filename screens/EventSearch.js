import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Dimensions, ScrollView, ActivityIndicator, TouchableHighlight } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { getDocs, query, where, orderBy, limit, collection } from 'firebase/firestore'
import Animated, { SlideInRight, SlideOutRight, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import { Header, Icon, SafeViewAndroid } from '../components'
import { categories, COLORS } from '../constants'
import { getCategory } from '../utils'
import { db } from '../firebase/firebaseApp'
import { EventCard } from '../components'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'

const EventSearch = () => {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get('window').width
  const [keyboardVisible, setKeyboardVisible] = useState(false)
  const textInputRef = useRef()
  const [category, setCategory] = useState('social')
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(false)
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [searchResult, setSearchResult] = useState(null)
  const [searchInput, setSearchInput] = useState('')


  const animation = useSharedValue({width:screenWidth-24})

  const animationStyle = useAnimatedStyle(() => {
    return { width:withTiming(animation.value.width, {
      duration:400
    }) }
  })

  const fetchData = async () => {
    setLoadingEvents(true)
    const EventsSnap = await getDocs(query(collection(db, 'posts'), where('event', '==', true), where('category', '==', category), orderBy('createdAt', 'desc'), limit(5))) 
    const Events = EventsSnap.docs.map((doc)=> ({...doc.data(), id:doc.id}))
    setEvents(Events)
    setLoadingEvents(false)
  }

  useEffect(() => {
    fetchData()
  }, [category])

  const search = async (username) => {
    if(username.length != 0) {
      setLoadingSearch(true)
      const q = query(collection(db, 'users'), where('username', '>=', username.toLowerCase()), limit(7))
      const SearchSnap = await getDocs(q)
      if(SearchSnap.empty) { setSearchResult(null) }

      var searchResult = SearchSnap.docs.map((doc)=>  ({...doc.data(), id:doc.id}) )
      searchResult = searchResult.filter((doc) => (doc.username.includes(username.toLowerCase())))
      
      setSearchResult(searchResult)

      setLoadingSearch(false)
    }
    else { setSearchResult(null) }
    
  }

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <Header showDelimitator={false} />
      
      <View style={{marginHorizontal:12, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
        <Animated.View style={[animationStyle]} >
          <TextInput 
            placeholder='Caută' 
            style={{ backgroundColor:COLORS.lightGray, padding:16, borderRadius:12, fontSize:15}} 
            onFocus={() => {setKeyboardVisible(true); animation.value={width:(screenWidth-24)*0.78}} } 
            ref={textInputRef}
            onChangeText={ username => { setSearchInput(username); search(username) }}
            autoCapitalize={'none'}
            value={searchInput}
          />
        </Animated.View>
        { keyboardVisible &&
          <TouchableOpacity onPress={() => { animation.value={width:screenWidth-24}; textInputRef.current.blur(); setKeyboardVisible(false); setSearchInput(''); setSearchResult(null)} }>
            <Animated.View entering={SlideInRight.duration(400)} exiting={SlideOutRight.duration(400)}>
              <Text style={{fontSize:15}}>Anulează</Text>
            </Animated.View>
          </TouchableOpacity>
        }
      </View>

      { !keyboardVisible &&  
        <View style={{justifyContent:'flex-start'}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginLeft:12, marginVertical:16, minHeight:60}}>
            { categories
              .map( item => (
                <TouchableOpacity onPress={() => setCategory(item)} key={item}>
                  <View style={{padding:12, backgroundColor: category == item ? COLORS.violet : COLORS.lightGray, margin:4, borderRadius:100, 
                    }}
                  >
                    { category == item &&
                        <LinearGradient start={[0, 1]} end={[0.8, 0]}
                        colors={[COLORS.violet, COLORS.blue]}
                        style={{
                          position: 'absolute',
                          left: 0,
                          right: 0,
                          top: 0,
                          bottom:0,
                          borderRadius:24
                        }}
                      />
                    }
                    <Text style={{fontSize:15, color: category == item ? COLORS.white : 'black'}}>{getCategory(item)}</Text>
                  </View>
                </TouchableOpacity>  
              ))
            }
          </ScrollView>
          
          <Text style={{fontSize:24, marginHorizontal:16}}>{getCategory(category)}</Text>

          {
            loadingEvents ?
            <View style={{minHeight:300, alignItems:'center', justifyContent:'center'}}>
              <ActivityIndicator />
            </View> :
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop:24}} snapToInterval={screenWidth-48} decelerationRate='fast'>
              { events.map( item => (
                <View style={{marginHorizontal:12, width:screenWidth-72}} key={item.id}>
                  <EventCard data={item} />
                </View>
              ))}
            </ScrollView>
          }
        </View>
      }

      { keyboardVisible && searchResult && !loadingSearch &&
        searchResult.map((result) => (
          <TouchableHighlight
            onPress={() =>  navigation.navigate("Profile", { userData:result }) }
            activeOpacity={0.6}
            underlayColor={COLORS.lightGray}
            style={{padding:16}}
            key={result.id}
          >
            <View style={{ flexDirection:'row', alignItems:'center'}}>
              <Icon URL={result.profileImgURL} size={40}/>
              <Text style={{fontSize:18, fontWeight: '500',marginLeft:8}}>{result.username}</Text>
            </View>
          </TouchableHighlight> 
        ))
      }

      { loadingSearch && 
        <View style={{minHeight:150, justifyContent:'center'}}>
          <ActivityIndicator />
        </View>
      }

    </SafeAreaView>
  )
}

export default EventSearch