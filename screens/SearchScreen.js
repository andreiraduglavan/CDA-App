import { View, Text, SafeAreaView, TouchableOpacity, TouchableHighlight, TextInput, ActivityIndicator } from 'react-native'
import { useState } from 'react'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebaseApp'
import { Icon, SafeViewAndroid } from '../components'
import { COLORS } from '../constants'
import { AntDesign} from '@expo/vector-icons'

export const Search = ({handlepress, input, setInput}) => {

  return (
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:12, marginTop:24}}>
      <TextInput
          placeholder='Caută'
          style={{ backgroundColor:COLORS.lightGray, padding:6, borderRadius:16, width:'80%', fontSize:18}}
          value={input}
          onChangeText={text => setInput(text)}
      />
      <TouchableOpacity onPress={ handlepress }>
        <AntDesign name="search1" size={22} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const SearchScreen = ({ route, navigation }) => {
  const [userData, setUserData] = useState(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    const q = query(collection(db, 'users'), where('username', '==', input.toLowerCase()))
    const querySnapshot = await getDocs(q)
    
    if(querySnapshot.empty) { setEmpty(true) }

    querySnapshot.forEach((doc) => {
      setUserData({id:doc.id, ...doc.data()})
    })
    setLoading(false)
  }

  return (
    <SafeAreaView style={{ justifyContent:'space-between', ...SafeViewAndroid.AndroidSafeArea}}>
      <View>
        <Search handlepress={fetchData} input={input} setInput={setInput} />
        { userData ?
          <View>
            { loading ? <ActivityIndicator /> : 
              <TouchableHighlight
                onPress={() => navigation.navigate("Profile", { userData })}
                activeOpacity={0.6}
                underlayColor={COLORS.lightGray}
                style={{padding:16}}
              >
                <View style={{ flexDirection:'row', alignItems:'center'}}>
                  <Icon URL={userData && userData.profileImgURL} size={40}/>
                  <Text style={{fontSize:18, fontWeight: '500',marginLeft:8}}>{userData && userData.name}</Text>
                </View>
              </TouchableHighlight>
            }
          </View>
           :
          <View>
            { loading ? <ActivityIndicator style={{margin:16}}/> : <Text style={{margin:16}}>Cautarea ta nu a avut nicun rezultat.</Text>}
          </View>
        }
      </View>
    </SafeAreaView>
  )
}

export default SearchScreen