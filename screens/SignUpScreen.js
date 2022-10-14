import { View, Text, SafeAreaView, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import { SignUpButton, Logo2 } from '../components'
import { SignUp } from '../firebase'
import { COLORS } from '../constants'
import { useStateContext } from '../context/StateContext'

const SignUpScreen = () => {
  const { setCurrentUser } = useStateContext()
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [errorMessageStatus, seterrorMessageStatus] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <SafeAreaView>
      <View style={{ alignItems:'center', marginTop:'20%' }}>
        <Logo2 height={80} width={234}/>
        <Text style={{fontSize:24, fontWeight:'300', marginBottom:0}}>Înscrie-te</Text>
        { errorMessageStatus ?
          <View style={{height:32}}>
            <Text style={{color:'red'}}>{errorMessage}</Text>
          </View> :
          <View style={{height:32}}><Text style={{color:'white'}}>peco</Text></View>
        }
        <TextInput placeholder='name' style={{ width:'60%',borderWidth:1, borderColor:COLORS.gray, padding:12, marginHorizontal:12, borderRadius:4, marginBottom:8}} onChangeText={text => setName(text)} />
        <TextInput placeholder='username' style={{ width:'60%',borderWidth:1, borderColor:COLORS.gray, padding:12, marginHorizontal:12, borderRadius:4, marginBottom:8}} onChangeText={text => setUsername(text)} />
        <TextInput placeholder='email' style={{ width:'60%',borderWidth:1, borderColor:COLORS.gray, padding:12, marginHorizontal:12, borderRadius:4, marginBottom:8}} onChangeText={text => setEmail(text)} />
        <TextInput secureTextEntry={true} placeholder='parola' style={{ width:'60%',borderWidth:1, borderColor:COLORS.gray, padding:12, marginHorizontal:12, borderRadius:4, marginBottom:16}} onChangeText={text => setPassword(text)} />
        <SignUpButton handlePress={async () => {
           SignUp(email, password, username, name)
           .then( response => setCurrentUser(response))
           .catch( error => {setErrorMessage(error.slice(10)), seterrorMessageStatus(true)} )
           } } 
        />

        <Text style={{marginTop: 32, color:COLORS.third}}>Ai deja cont? <Text style={{color:COLORS.login, fontWeight:'500'}} onPress={() => navigation.goBack()}>Conectează-te</Text></Text>
      </View>
         
    </SafeAreaView>
  )
}

export default SignUpScreen