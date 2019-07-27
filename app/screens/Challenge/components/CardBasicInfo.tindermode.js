import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import DGText from '@components/DGText'
import CardRatingBar from './CardRatingBar'

const windowWidth = Dimensions.get('window').width

const CardBasicInfo = React.memo(({ avatar, name, location, rating }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Image 
        style={{ 
          width: windowWidth - 80, 
          height: windowWidth - 80,
          borderRadius: (windowWidth - 80) / 2
        }}
        source={{ uri: avatar }}
        resizeMethod='resize'
        resizeMode='cover'
      />
      <View style={{ position: 'absolute', bottom: 16 }}>
        <DGText style={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          color: 'white',
          fontSize: 30
        }}>{name}</DGText>
        <DGText style={{ 
          textAlign: 'center', 
          color: 'white',
          fontSize: 20
        }}>{location}</DGText>
        <CardRatingBar star={rating} />
      </View>
    </View>
  )
})

export default CardBasicInfo