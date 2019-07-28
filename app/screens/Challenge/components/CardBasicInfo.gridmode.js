import React from 'react'
import { View, Image, Dimensions, TouchableOpacity } from 'react-native'
import DGText from '@components/DGText'
import CardRatingBar from './CardRatingBar'

const windowWidth = Dimensions.get('window').width

const CardBasicInfo = React.memo(({ index, avatar, name, location, rating, onPress }) => {
  return (
    <TouchableOpacity 
      style={{ alignItems: 'center', marginTop: 20, width: windowWidth / 2 }}
      activeOpacity={0.7}
      onPress={() => { onPress(index) }}
    >
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
    </TouchableOpacity>
  )
})

export default CardBasicInfo