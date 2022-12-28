import { SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps'
import { SafeViewAndroid } from '../components'

const Map = () => {
  const screenWidth = Dimensions.get('screen').width
  const screenHeight = Dimensions.get('screen').height
  
  const disablePOIandroid =[
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [
              { visibility: "off" }
        ]
    }
];

  return (
    <SafeAreaView style={{ justifyContent:'center', alignItems:'center', ...SafeViewAndroid.AndroidSafeArea}}>
      <MapView style={{width:screenWidth, height:screenHeight}} userInterfaceStyle={'light'} showsPointsOfInterest={false} customMapStyle={disablePOIandroid} />
    </SafeAreaView>
  )
}

export default Map