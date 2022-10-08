import { View, FlatList, SafeAreaView } from 'react-native'
import { useState, useEffect } from 'react'
import { collection, getDocs, limit, orderBy, query, startAfter } from 'firebase/firestore'
import { db } from '../firebase/firebaseApp'

import { Header, SlideBar, ItemSeparator, FeedFooter, FeedItem, PopupAlert } from '../components'
import { useStateContext } from '../context/StateContext'

const Home = () => { 
  const { displaySlideBar, displayPopUpAlert, IDToBeRemoved, popUpText, newPost } = useStateContext()
  var opacity = displaySlideBar ? 0.1 : 1
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
    <SafeAreaView style={{flex:1}}>
      <View style={{opacity:opacity, flex:1}}>
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
      { displaySlideBar && 
        <SlideBar />
      }
      <PopupAlert display={displayPopUpAlert} text={popUpText}/> 
    </SafeAreaView>
  )
}

export default Home