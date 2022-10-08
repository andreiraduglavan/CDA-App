import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated'

import { COLORS } from '../constants'

const PopUpDemo = () => {
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    setDisplay(true)
    setTimeout(() => {setDisplay(false)}, 2000)
  }, [])

  return (
    <View>
      { display &&
        <Animated.View
          entering={SlideInDown.duration(600)}
          exiting={SlideOutDown.duration(600)}  
          style={{position:'absolute', bottom:24, alignSelf:'center', backgroundColor:COLORS.popupAlert, padding:10, paddingHorizontal:16, borderRadius:10, width:'80%'}}
        >
          <Text style={{color:COLORS.white, fontSize:17, alignSelf:'center'}}>Hello World!</Text>
        </Animated.View>
      }
    </View>
  )
}

export default PopUpDemo