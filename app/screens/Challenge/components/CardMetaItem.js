import React from 'react'
import { View } from 'react-native'
import DGText from '@components/DGText';

const CardMetaItem = React.memo(({data}) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <DGText style={{ color: Theme.buttonPrimary, fontSize: 18 }}>{data.value}</DGText>
      <DGText style={{ color: Theme.buttonPrimary, fontSize: 11 }}>{data.key}</DGText>
    </View>
  )
})

export default CardMetaItem