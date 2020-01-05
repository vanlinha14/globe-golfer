import React from 'react'
import { View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from 'react-navigation-hooks'
import Theme from '../../../../res/Theme'

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
    navigate('Profile')
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: Theme.separator
    }}>
      <HeaderIcon name={"ios-arrow-back"} action={onGoBack}/>
      <View style={{flex: 1}} />
      <HeaderIcon name={"ios-settings"} action={onGoToSetting}/>
    </View>
  )
})

export default Header