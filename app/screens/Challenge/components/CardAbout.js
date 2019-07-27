import React from 'react'
import { View } from 'react-native'
import DGText from '@components/DGText';

const CardAbout = React.memo(({about}) => {
  return (
    <View style={{ alignItems: 'center', paddingHorizontal: 16, marginTop: 20 }}>
      <DGText style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>About</DGText>
      <DGText style={{ textAlign: 'center', color: 'white' }}>{about}</DGText>
    </View>
  )
})

export default CardAbout