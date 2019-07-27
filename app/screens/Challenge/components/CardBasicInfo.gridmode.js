import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import DGText from '@components/DGText'
import CardRatingBar from './CardRatingBar'

const windowWidth = Dimensions.get('window').width

const CardBasicInfo = React.memo(({ avatar, name, location, rating }) => {
  return (
    <View style={{ alignItems: 'center', marginTop: 20, width: windowWidth / 2 }}>
      <Image 
        style={{ 
          width: windowWidth / 2 - 40, 
          height: windowWidth / 2 - 40,
          borderRadius: (windowWidth / 2 - 40) / 2
        }}
        source={{ uri: avatar }}
        resizeMethod='resize'
        resizeMode='cover'
      />
      <View style={{ position: 'absolute', bottom: 12 }}>
        <DGText style={{ 
          textAlign: 'center', 
          fontWeight: 'bold', 
          color: 'white',
          fontSize: 20
        }}>{name}</DGText>
        <DGText style={{ 
          textAlign: 'center', 
          color: 'white',
          fontSize: 10
        }}>{location}</DGText>
        <CardRatingBar small={true} star={rating} />
      </View>
    </View>
  )
})

export default CardBasicInfo