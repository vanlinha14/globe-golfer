import React from 'react'
import { View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from 'react-navigation-hooks'
import FlexSpacing from './FlexSpacing'
import Toggler from './Toggler'

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

  const onGoBack = () => {
    goBack()
  }

  const onGoToSetting = () => {
    navigate('Settings')
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12
    }}>
      <HeaderIcon name={"ios-home"} action={onGoBack}/>
      <FlexSpacing />
      <Toggler isOn={isOn} onChanged={onViewModeChanged} />
      <FlexSpacing />
      <HeaderIcon name={"ios-settings"} action={onGoToSetting}/>
    </View>
  )
})

export default Header