import { View, Text, SafeAreaView, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import { GoogleLogin, LoginButton, Logo2 } from '../components'
import { LogIn } from '../firebase'
import { COLORS } from '../constants'
import { useStateContext } from '../context/StateContext'

const Landing = () => {
  const navigation = useNavigation()
  const { setCurrentUser } = useStateContext()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessageStatus, seterrorMessageStatus] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <SafeAreaView>
      <View style={{ alignItems:'center', marginTop:'20%' }}>
        <Logo2 height={80} width={234}/>
        <Text style={{fontSize:24, fontWeight:'300', marginBottom:32}}>Te conectăm cu ce contează</Text>
        { errorMessageStatus ?
          <View style={{height:32}}>
            <Text style={{color:'red'}}>{errorMessage}</Text>
          </View> :
          <View style={{height:32}}><Text style={{color:'white'}}>peco</Text></View>
        }
        
        <TextInput placeholder='email' style={{ width:'60%',borderWidth:1, borderColor:COLORS.gray, padding:12, marginHorizontal:12, borderRadius:4, marginBottom:8}} onChangeText={text => setEmail(text)} />
        <TextInput placeholder='parola' secureTextEntry={true} style={{ width:'60%',borderWidth:1, borderColor:COLORS.gray, padding:12, marginHorizontal:12, borderRadius:4, marginBottom:16}} onChangeText={text => setPassword(text)} />
        
        <LoginButton handlePress={async () => {
          LogIn(email, password)
          .then( result => setCurrentUser(result))
          .catch( error => { setErrorMessage(error.slice(10)), seterrorMessageStatus(true) } )
          } } 
        />
        
        <View style={{flexDirection:'row', marginHorizontal:16, alignItems:'center', marginVertical:16}}>
          <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.4, width:'40%'}}></View>
          <Text style={{color:COLORS.third}}>   sau   </Text>
          <View style={{borderBottomWidth:1, borderColor:COLORS.third, opacity:0.4, width:'40%'}}></View>
        </View>
        
        <GoogleLogin handlePress={() => {} } />
        
        <Text style={{marginTop: 32, color:COLORS.third}}>Nu ai cont? <Text style={{color:COLORS.login, fontWeight:'500'}} onPress={() => navigation.navigate('SignUpScreen')}>Înscrie-te</Text></Text>
      </View>   
    </SafeAreaView>
  )
}

export default Landing