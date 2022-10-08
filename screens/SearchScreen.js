import { View, Text, SafeAreaView, TouchableOpacity, TouchableHighlight } from 'react-native'
import { useState, useEffect } from 'react'
import { ScreenHeader } from '../components'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebaseApp'
import { Icon } from '../components'
import { COLORS } from '../constants'

const SearchScreen = ({ route, navigation }) => {
  const {input} = route.params
  const [user, setUser] = useState(null)
  const [uid, setUid] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    const q = query(collection(db, 'users'), where('username', '==', input.toLowerCase()))
    const querySnapshot = await getDocs(q)
    
    if(querySnapshot.empty) { setEmpty(true) }

    querySnapshot.forEach((doc) => {
      setUser({id:doc.id, ...doc.data()})
      setUid(doc.id)
    })
    setLoading(false)
  }
  
  useEffect(() => {
    
    fetchData()
    
  }, [])
  

  return (
    <SafeAreaView>
      <ScreenHeader screenName={'Rezultat Căutare'} />
      <View>
        { user ?
          <TouchableHighlight
            onPress={() => navigation.navigate("Profile", { uid })}
            activeOpacity={0.6}
            underlayColor={COLORS.lightGray}
            style={{padding:16}}
          >
            <View style={{ flexDirection:'row', alignItems:'center'}}>
              <Icon URL={user && user.profileImgURL} size={40}/>
              <Text style={{fontSize:18, fontWeight: '500',marginLeft:8}}>{user && user.name}</Text>
            </View>
          </TouchableHighlight> :
          <Text style={{margin:16}}>Cautarea ta nu a avut nicun rezultat.</Text>
        }
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen