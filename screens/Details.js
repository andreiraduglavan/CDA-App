import { SafeAreaView} from 'react-native'

import { PostDetails, EventDetails, SafeViewAndroid } from '../components'

const Details = ({route, navigation}) => {
  const { data, userData } = route.params
  
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      { data.event ?
        <EventDetails data={data} /> :
        <PostDetails data={data} userData={userData}/>
      }
    </SafeAreaView>
  )
}

export default Details