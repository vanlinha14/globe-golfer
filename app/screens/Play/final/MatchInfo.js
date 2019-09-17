import React from 'react'
import { View } from 'react-native'
import DGText from '../../../components/DGText';
import Theme from '../../../res/Theme';
import moment from 'moment';

export default MatchInfo = React.memo(() => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <DGText style={{ 
        color: Theme.textWhite,
        fontSize: 30,
        marginBottom: 12
      }}>La Boulie</DGText>
      <View style={{ flexDirection: 'row' }}>
        <DGText style={{ 
          color: Theme.textWhite,
          marginRight: 24,
          fontSize: 16
        }}>{moment().format("DD MMMM YYYY")}</DGText>
        <DGText style={{ 
          color: Theme.textWhite,
          marginLeft: 24,
          fontSize: 16
        }}>{moment().format("HH:mm")}</DGText>
      </View>
    </View>
  )
})  