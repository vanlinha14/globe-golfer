import React from 'react'
import { View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from 'react-navigation-hooks'
import FlexSpacing from './FlexSpacing'
import Toggler from '@components/Toggler';
import { shareGG } from '../../../utils'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

const HeaderIcon = React.memo(({name, action}) => (
  <Icon 
    size={32}
    color={'white'}
    name={name}
    onPress={action}
  />
))

const Header = React.memo(({isOn, onViewModeChanged}) => {

  const { goBack, navigate } = useNavigation()

  const onGoToInvite = () => {
    shareGG()
  }

  const onGoToSetting = () => {
    navigate('Profile')
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    }}>
      <HeaderIcon name={"ios-person-add"} action={onGoToInvite}/>
      <FlexSpacing />
      <HeaderIcon name={"ios-settings"} action={onGoToSetting}/>
    </View>
  )
})

export default Header