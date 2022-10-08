import { SafeAreaView} from 'react-native'

import { PostDetails, EventDetails } from '../components'

const Details = ({route, navigation}) => {
  const { data, userData } = route.params
  
  return (
    <SafeAreaView>
      { data.event ?
        <EventDetails data={data} /> :
        <PostDetails data={data} userData={userData}/>
      }
    </SafeAreaView>
  )
}

export default Details