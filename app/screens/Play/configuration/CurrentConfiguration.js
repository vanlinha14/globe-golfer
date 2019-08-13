import React from 'react'
import { View } from 'react-native'
import Theme from '../../../res/Theme';
import DGText from '../../../components/DGText';

export default CurrentConfiguration = React.memo(({game, course}) => {
  return (
    <View style={{ 
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View style={{ 
        width: 100, 
        justifyContent: 'center',
      alignItems: 'center'
      }}>
        <DGText style={{ color: Theme.buttonPrimary }}>Game</DGText>
        <DGText style={{ color: Theme.textWhite }}>{game || "-"}</DGText>
      </View>
      <View style={{ width: 72 }} />
      <View style={{ 
        width: 100, 
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <DGText style={{ color: Theme.buttonPrimary }}>Golf course</DGText>
        <DGText style={{ color: Theme.textWhite }}>{course || "-"}</DGText>
      </View>
    </View>
  )
})