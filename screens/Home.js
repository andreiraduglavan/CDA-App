import { View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import { db } from '../firebase/firebaseApp'

import { Header, ItemSeparator, FeedFooter, FeedItem, SafeViewAndroid } from '../components'
import { useStateContext } from '../context/StateContext'

const Home = () => { 
  const { IDToBeRemoved, newPost } = useStateContext()
  const [posts, setPosts] = useState([])
  const postsRef = collection(db, 'posts')
  const [isLoading, setIsLoading] = useState(false)
  const [endReached, setEndReached] = useState(false)

  const fetchInitialData = async () => {
    const newPostsSnap = await getDocs(query(postsRef, orderBy('createdAt', 'desc'), limit(7)))
    const newPosts = newPostsSnap.docs.map((doc)=> ({...doc.data(), id:doc.id}))
    setPosts(newPosts)
  }

  const fetchMoreData = async () => {
    setIsLoading(true)

    if(!endReached && !isLoading) {
      const startIndex = posts[posts.length-1].createdAt
      const newPostsSnap = await getDocs(query(postsRef, orderBy('createdAt', 'desc'), limit(7), startAfter(startIndex)))
      if(newPostsSnap.empty) { setEndReached(true) }
      const newPosts = newPostsSnap.docs.map((doc)=> ({...doc.data(), id:doc.id}))
      setPosts(posts.concat(newPosts))
    }
    setIsLoading(false) 
  }

  useEffect(() => {
    
    fetchInitialData()
  
  }, [])

  useEffect(() => {
    const updatedPosts = posts.filter((item) => item.id!==IDToBeRemoved)
    setPosts(updatedPosts)
  }, [IDToBeRemoved])

  useEffect(() => {
    
    newPost && setPosts([newPost, ...posts])

  }, [newPost])
  
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={{flex:1}}>
        <Header />
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

      { posts.length == 0 &&
        <View style={{ minHeight:500, justifyContent:'center' }}>
          <ActivityIndicator />
        </View>
      }

    </SafeAreaView>
  )
}

export default Home