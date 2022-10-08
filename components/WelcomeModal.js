import { View, Text, Modal, Dimensions } from 'react-native'
import { useState, useEffect } from 'react'
import { COLORS } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'

const WelcomeModal = () => {
  const screenHeigth = Dimensions.get('screen').height

  const [display, setDisplay] = useState(false)

  useEffect(() => {
    setDisplay(true)
    setTimeout(() => {setDisplay(false)}, 2500)
  }, [])

  return (
    <Modal animationType='slide' transparent={true} visible={display}>
      <View style={{alignItems:'center', justifyContent:'center',height:screenHeigth}}>
        <View style={{padding:24, backgroundColor:COLORS.violet, borderRadius:24, minHeight:144, Width:'80%', alignItems:'center', justifyContent:'center'}}>
          <LinearGradient start={[0, 1]} end={[0.7, 0]}
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

          <Text style={{color:'white', fontSize:20}}>Bine ai venit în comunitatea noastră!</Text>
        </View>
      </View>
    </Modal>
  )
}

export default WelcomeModal