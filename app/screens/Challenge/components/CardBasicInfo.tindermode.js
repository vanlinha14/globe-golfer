import React from 'react'
import { View, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'

import DGText from '@components/DGText'
import CardRatingBar from './CardRatingBar'
import LinearGradient from 'react-native-linear-gradient'

const windowWidth = Dimensions.get('window').width

const CardBasicInfo = React.memo(({ avatar, name, location, rating }) => {
  const avatarSource = avatar ? { uri: avatar } : require('../../../res/images/golfer_placeholder.png')
  return (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <FastImage 
        style={{ 
          width: windowWidth - 80, 
          height: windowWidth - 80,
          borderRadius: (windowWidth - 80) / 2
        }}
        source={avatarSource}
        resizeMethod='resize'
        resizeMode='cover'
      />
      <LinearGradient 
        colors={['#00000000', '#000000']} 
        style={{ 
          position: 'absolute', 
          bottom: 0,
          width: '100%', 
          height: '40%'
        }}
      >
        <View style={{ position: 'absolute', bottom: 24, alignSelf: 'center' }}>
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
      </LinearGradient>
    </View>
  )
})

export default CardBasicInfo