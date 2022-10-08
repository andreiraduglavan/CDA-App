import { View, FlatList, SafeAreaView } from 'react-native'
import { useState, useEffect } from 'react'
import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'
import { db } from '../firebase/firebaseApp'

import { ItemSeparator, FeedFooter, FeedItem, ScreenHeader } from '../components'

const EventsFeed = () => { 
  const [posts, setPosts] = useState([])
  const postsRef = collection(db, 'posts')
  const [isLoading, setIsLoading] = useState(false)
  const [endReached, setEndReached] = useState(false)

  const fetchInitialData = async () => {
    const newPostsSnap = await getDocs(query(postsRef, where('event', '==', true), orderBy('createdAt', 'desc'), limit(7)))
    const newPosts = newPostsSnap.docs.map((doc)=> ({...doc.data(), id:doc.id}))
    setPosts(newPosts)
  }

  const fetchMoreData = async () => {
    setIsLoading(true)

    if(!endReached && !isLoading) {
      const startIndex = posts[posts.length-1].createdAt
      const newPostsSnap = await getDocs(query(postsRef, orderBy('createdAt', 'desc'), where('event', '==', true), limit(7), startAfter(startIndex)))
      if(newPostsSnap.empty) { setEndReached(true) }
      const newPosts = newPostsSnap.docs.map((doc)=> ({...doc.data(), id:doc.id}))
      setPosts(posts.concat(newPosts))
    }
    setIsLoading(false) 
  }

  useEffect(() => {
  
    fetchInitialData()
  
  }, [])
  
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ flex:1 }}>
        <ScreenHeader screenName={'Evenimente'} />

        <FlatList 
          data={posts}
          ItemSeparatorComponent={ () => <ItemSeparator /> }
          renderItem={({item}) => <FeedItem item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          onRefresh={() => {fetchInitialData(); setEndReached(false)} }
          ListFooterComponent={() => <FeedFooter isLoading={isLoading} endReached={endReached} />}
          onEndReached={fetchMoreData}
        />
      </View>
      
    </SafeAreaView>
  )
}

export default EventsFeed