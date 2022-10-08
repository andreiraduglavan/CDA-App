import { View, Text, SafeAreaView, TextInput } from 'react-native'

import { ScreenHeader } from '../components'
import { COLORS } from '../constants'

const ChangePersonalInf = () => {
  return (
    <SafeAreaView>
      <ScreenHeader screenName={'Informații Personale'} />

      <View style={{margin:16, flexDirection:'row', alignItems:'center'}}>
        <Text>Name:</Text>
        <TextInput 
          placeholder='Name' 
          style={{borderBottomWidth:1, borderColor:COLORS.lightGray, padding:6, marginHorizontal:12, width:300}}
        />
      </View>

      <View style={{margin:16, flexDirection:'row', alignItems:'center', marginTop:0}}>
        <Text>Username:</Text>
        <TextInput 
          placeholder='username' 
          style={{borderBottomWidth:1, borderColor:COLORS.lightGray, padding:6, marginHorizontal:12, width:268}}
        />
      </View>

      <Text onPress={() => {}} style={{alignSelf:'flex-end', color:COLORS.login, fontSize:16, marginRight:16}}>Modifică</Text>
    </SafeAreaView>
  )
}

export default ChangePersonalInf