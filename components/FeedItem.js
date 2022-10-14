import { View } from 'react-native'
import React from 'react'
import Post from './Post'
import Event from './Event'

const FeedItem = ({ item, handleRemove }) => {
  return (
    <View>
      { item.event ? <Event data={item} /> : <Post datA={item} />}
    </View>
  )
}

export default FeedItem