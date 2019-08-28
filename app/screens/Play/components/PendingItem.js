import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import { useNavigation } from 'react-navigation-hooks';
import DGText from '../../../components/DGText';

export default PendingItem = React.memo(({item, viewOnly, userAvatar}) => {

  const { navigate } = useNavigation()

  const requestPlayTo = () => {
    navigate("PlayConfiguration", { data: item, user: { avatar: userAvatar } })
  }

  return (
    <View style={{ marginVertical: 16, flexDirection: 'row', justifyContent: 'center' }}>
      <FastImage
        style={{
          width: 100,
          height: 100,
          borderRadius: 50
        }}
        source={{uri: userAvatar}}
      />
      <View style={{ marginHorizontal: 24, justifyContent: 'center', alignItems: 'center' }}>
        <DGText style={{ 
          fontSize: 20,
          marginBottom: 4,
          color: Theme.buttonPrimary 
        }} >VS</DGText>
        {
          viewOnly ? undefined : (
            <TouchableOpacity activeOpacity={0.7} onPress={requestPlayTo}>
              <DGText style={{ 
                backgroundColor: Theme.buttonPrimary,
                color: Theme.textWhite,
                paddingHorizontal: 12,
                paddingVertical: 8
              }}>PLAY NOW</DGText>
            </TouchableOpacity>
          )
        }
      </View>
      <FastImage
        style={{
          width: 100,
          height: 100,
          borderRadius: 50
        }}
        source={{uri: item.avatar}}
      />
    </View>
  )
})