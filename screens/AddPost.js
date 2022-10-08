import { View, Text, TextInput, SafeAreaView, KeyboardAvoidingView, Dimensions, TouchableOpacity, Image, ActivityIndicator, Switch } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { AntDesign } from '@expo/vector-icons';

import { GaleryButton, ScreenHeader } from '../components'
import { COLORS } from '../constants'
import { addPost, getCurrentUser, getDocData } from '../firebase'
import { useStateContext } from '../context/StateContext'
import { ScrollView } from 'react-native-gesture-handler';

const AddPost = ({route, navigation}) => {
  const { setDisplayPopUpAlert, setPopUpText, setNewPost } = useStateContext()
  const screenHeigth = Dimensions.get('screen').height
  const userFirebase = getCurrentUser()
  
  var user
  getDocData('users', userFirebase.uid).then( docData => user = docData)

  const [images, setImages] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [numberOfVolunteers, setNumberOfVolunteers] = useState(1)
  const [date, setDate] = useState('')
  const [openCalendar, setOpenCalendar] = useState(false)

  const [event, setEvent] = useState(false);
  const toggleSwitch = () => {setEvent(previousState => !previousState) }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setImages([...images, result.uri])
    }
  }

  const handlePopUp = () => {
    
    setPopUpText('Postarea a fost adăugată.')
    setDisplayPopUpAlert(true)
    setTimeout(() => {setDisplayPopUpAlert(false)}, 2000)
  } 

  const handlePost = (userID, name, username, content, images, event, eventFields) => {
    setLoading(true)
    addPost(userID, name, username, content, images, event, eventFields)
    .then((result) => {
      setLoading(false)
      handlePopUp()
      setNewPost(result)
      navigation.goBack()
    })
    .catch( error => {
      console.log(error)
      setLoading(false)
    })

    
  }

  return (
    <SafeAreaView>
      <ScreenHeader screenName={event ? 'Adaugă un eveniment' : 'Adaugă o postare'}/>

      <KeyboardAvoidingView style={{height:screenHeigth-20}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView>

      <View style={{marginTop:16, marginHorizontal:12, flexDirection:'row', alignItems:'center'}}>
        <Text style={{marginRight:8, fontSize:16}}>Vrei să adaugi un eveniment?</Text>
        <Switch
          trackColor={{ false: "#767577", true: COLORS.violet }}
          thumbColor={event ? COLORS.white : COLORS.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={event}
        />
      </View>

      { event &&
        <View style={{marginHorizontal:12}}>
          { !openCalendar ? 
            <View>
              <TextInput 
                placeholder='Numele evenimentului'
                style={{backgroundColor:COLORS.lightGray, padding:10, borderRadius:16, paddingRight:70, marginTop:16}}
                onChangeText={(text) => setName(text)}
                value={name}
              />
              <TextInput 
                placeholder='Locația'
                style={{backgroundColor:COLORS.lightGray, padding:10, borderRadius:16, paddingRight:70, marginTop:8}}
                onChangeText={(text) => setLocation(text)}
                value={location}
              />
              <TextInput 
                placeholder='Numărul de participanți'
                style={{backgroundColor:COLORS.lightGray, padding:10, borderRadius:16, paddingRight:70, marginTop:8}}
                onChangeText={(text) => setNumberOfVolunteers(Number(text))}
                keyboardType='numeric'
                value={numberOfVolunteers}
              />
              <View style={{flexDirection:'row', marginTop:16, alignItems:'center', marginLeft:12}}>
                <AntDesign name="calendar" size={24} color={COLORS.login}  onPress={() => setOpenCalendar(true)} />
                <Text style={{marginRight:8, fontSize:16, marginLeft:8}}>{date =='' ? 'Alege data evenimentului' : date}</Text>
              </View>
            </View> :
            <Calendar onDayPress={day => { setDate(day.dateString); setOpenCalendar(false) }}/>
          }
        </View>
      }

      <TextInput 
        placeholder={event ? 'Adaugă o descriere pentru eveniment' : 'Scrie o postare'} 
        style={{backgroundColor:COLORS.lightGray, padding:6, marginHorizontal:12, borderRadius:16, paddingRight:70, marginTop:16, minHeight:90, maxHeight:130}}
        multiline={true}
        onChangeText={(text) => setContent(text)}
      />

      <View>

        { images && images.map((item, index) => (
          <View style={{margin: 12, flexDirection:'row', alignItems:'center', marginVertical:6}} key={index} >
            <Image source={{uri:item}} style={{ width: 60, height: 45 }} />
            <Text style={{marginLeft:12}} onPress={() => setImages(images.filter((item, i) => i!==index)) }>șterge</Text>
          </View>
        ))
        }

      </View>

      <View style={{flexDirection:'row', margin:12, justifyContent:'space-between', marginTop:16}}>
        <GaleryButton size={24} handlePress={pickImage} />

        { loading ?
          <ActivityIndicator /> :
          <TouchableOpacity onPress={() =>  handlePost(user.id, user.name, user.username, content, images, event, {name, location, numberOfVolunteers, date}) }>
            <Text style={{color:COLORS.login, fontSize:16}}>Postează</Text>
          </TouchableOpacity>
        }

      </View>

      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddPost