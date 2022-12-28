import { View, Text, SafeAreaView, TouchableHighlight } from 'react-native'
import { MaterialIcons} from '@expo/vector-icons'

import { SafeViewAndroid, ScreenHeader } from '../components'
import { COLORS } from '../constants'

const Settings = ({route, navigation}) => {

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <ScreenHeader screenName={'Setări'}/>
      
      <TouchableHighlight activeOpacity={0.6} underlayColor={COLORS.lightGray} onPress={() => navigation.navigate("ChangePersonalInf")}>
        <View style={{backgroundColor:COLORS.white, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{padding:12, fontSize:16}}>Informații Personale</Text>
          <MaterialIcons name="keyboard-arrow-right" size={26} color={COLORS.third} />
        </View>
      </TouchableHighlight>
      
      <TouchableHighlight activeOpacity={0.6} underlayColor={COLORS.lightGray} onPress={() => {}}>
        <View style={{backgroundColor:COLORS.white, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{padding:12, fontSize:16}}>Schimbă Parola</Text>
          <MaterialIcons name="keyboard-arrow-right" size={26} color={COLORS.third} />
        </View>
      </TouchableHighlight>
      
      <TouchableHighlight activeOpacity={0.6} underlayColor={COLORS.lightGray} onPress={() => {}}>
        <View style={{backgroundColor:COLORS.white, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{padding:12, fontSize:16}}>Notificări</Text>
          <MaterialIcons name="keyboard-arrow-right" size={26} color={COLORS.third} />
        </View>
      </TouchableHighlight>
    </SafeAreaView>
  )
}

export default Settings