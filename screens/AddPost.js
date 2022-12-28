import { View, Text, TextInput, SafeAreaView, KeyboardAvoidingView, Dimensions, TouchableOpacity, Image, ActivityIndicator, Switch } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { AntDesign } from '@expo/vector-icons';

import { GaleryButton, SafeViewAndroid, ScreenHeader } from '../components'
import { categories, COLORS } from '../constants'
import { addPost, getCurrentUser, getDocData } from '../firebase'
import { useStateContext } from '../context/StateContext'
import { ScrollView } from 'react-native-gesture-handler'
import { getCategory } from '../utils'
import { LinearGradient } from 'expo-linear-gradient';

const AddPost = ({route, navigation}) => {
  const { setDisplayPopUpAlert, setPopUpText, setNewPost } = useStateContext()
  const screenHeigth = Dimensions.get('screen').height
  const userFirebase = getCurrentUser()
  
  var user
  getDocData('users', userFirebase.uid).then( docData => user = docData)

  const [images, setImages] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [numberOfVolunteers, setNumberOfVolunteers] = useState('')
  const [date, setDate] = useState('')
  const [openCalendar, setOpenCalendar] = useState(false)
  const [category, setCategory] = useState('social')

  const [event, setEvent] = useState(false);
  const toggleSwitch = () => {setEvent(previousState => !previousState) }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
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

  const handlePost = (userID, name, profileImgURL, username, content, images, event, eventFields) => {
    setLoading(true)
    addPost(userID, name, username, content, images, event, eventFields, profileImgURL)
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
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <ScreenHeader screenName={event ? 'Adaugă un eveniment' : 'Adaugă o postare'}/>

      <KeyboardAvoidingView style={{height:screenHeigth-20}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView>

      <View style={{marginTop:16, marginHorizontal:12, flexDirection:'row', alignItems:'center'}}>
        <Text style={{marginRight:8, fontSize:16}}>Vrei să adaugi un eveniment?</Text>
        <Switch
          trackColor={{ false: "#767577", true: COLORS.login }}
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
              <Text style={{ fontSize:16, margin:4}}>Categorie: </Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                  { categories
                    .map( item => (
                      <TouchableOpacity onPress={() => setCategory(item)} key={item}>
                        <View style={{padding:4, paddingHorizontal:8, backgroundColor: category == item ? COLORS.violet : COLORS.lightGray, margin:4, borderRadius:100}}>
                          { category == item &&
                            <LinearGradient start={[0, 1]} end={[0.8, 0]}
                              colors={[COLORS.violet, COLORS.blue]}
                              style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom:0,
                                borderRadius:24
                              }}
                            />
                          }
                          <Text style={{fontSize:15, color: category == item ? COLORS.white : 'black'}}>{getCategory(item)}</Text>
                        </View>
                      </TouchableOpacity>  
                    ))
                  }
                </ScrollView>

              <TextInput 
                placeholder='Numele evenimentului'
                style={{backgroundColor:COLORS.lightGray, padding:10, borderRadius:16, paddingRight:70, marginTop:16}}
                onChangeText={(text) => setTitle(text)}
                value={title}
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
                onChangeText={(text) => setNumberOfVolunteers(text)}
                keyboardType='numeric'
                value={numberOfVolunteers}
              />
              <View style={{flexDirection:'row', marginTop:16, alignItems:'center', marginLeft:12}}>
                <TouchableOpacity onPress={() => setOpenCalendar(true)}>
                  <AntDesign name="calendar" size={24} color={COLORS.login} />
                </TouchableOpacity>
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
          <TouchableOpacity onPress={() =>  handlePost(user.id, user.name, user.profileImgURL, user.username, content, images, event, {title, location, numberOfVolunteers: Number(numberOfVolunteers), date, category}) }>
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