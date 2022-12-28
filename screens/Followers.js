import { View, Text, SafeAreaView, TouchableHighlight } from 'react-native'
import { useState, useEffect } from 'react'

import { Icon, ScreenHeader, FeedFooter, SafeViewAndroid } from '../components'
import { getFollowersDetails } from '../firebase/firestore'
import { FlatList } from 'react-native-gesture-handler'
import { COLORS } from '../constants'

const FollowerContainer = ({details, navigation}) => {
  const uid = details.id

  return (
    <TouchableHighlight onPress={() => navigation.navigate('Profile', { uid })} 
      style={{paddingHorizontal:12, paddingTop:8}} 
      activeOpacity={0.6}
      underlayColor={COLORS.lightGray}
    >
      <View style={{padding:8, flexDirection:'row', alignItems:'center'}}>
        <Icon URL={details && details.profileImgURL}/>
        
        <View style={{marginLeft:8}}>
          <Text style={{}}>{details && details.username}</Text>
        </View>
        
      </View>
    </TouchableHighlight>
  )
}

const Followers = ({route, navigation}) => {
  const { followersIDs } = route.params
  const [followers, setFollowers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [endReached, setEndReached] = useState(false)
  const [fetchedCount, setFetchedCount] = useState(0)
  
  const fetchInitial = () => {
    getFollowersDetails(followersIDs.slice(0, 10))
    .then(followers => {setFollowers(followers); setFetchedCount(fetchedCount+10)} )
    .catch( error => console.log(error))
  }

  const fetchMore = () => {
    if(fetchedCount<=followersIDs.length) {
      setIsLoading(true)
      getFollowersDetails(followersIDs.slice(fetchedCount, fetchedCount+10))
      .then(extraFollowers => {setFollowers(followers.concat(extraFollowers)); setIsLoading(false); setFetchedCount(fetchedCount+10)})
      .catch( error => console.log(error))
    }
  }

  useEffect(() => {
    fetchInitial()
  }, [])

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <ScreenHeader screenName={'Followers'} />
      <FlatList
        data={followers}
        renderItem={({item}) => <FollowerContainer details={item} navigation={navigation} /> }
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => <FeedFooter isLoading={isLoading} endReached={endReached} />}
        onEndReached={fetchMore}
        contentContainerStyle={{minHeight:'100%'}}
      />
    </SafeAreaView>
  )
}

export default Followers