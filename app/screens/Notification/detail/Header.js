import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from 'react-navigation-hooks'
import DGText from '../../../components/DGText';
import Theme from '../../../res/Theme'
import FlexSpacing from '../components/FlexSpacing';
import { shareGG } from '../../../utils';

const HeaderIcon = React.memo(({name, action}) => (
  <Icon 
    size={32}
    color={'white'}
    name={name}
    onPress={action}
  />
))

const Title = React.memo(({title}) => {
  return (
    <View style={{ 
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      flexDirection: 'row'
    }}>
      <DGText style={{ 
        color: Theme.buttonPrimary, 
        fontWeight: 'bold',
        fontSize: 20
      }}>{title}</DGText>
    </View>
  )
})

const Header = React.memo(({title}) => {

  const { goBack, navigate } = useNavigation()

  const onGoBack = () => {
    goBack()
  }

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
      marginTop: 20,
      borderBottomWidth: 1,
      borderBottomColor: Theme.separator
    }}>
      <HeaderIcon name={"ios-home"} action={onGoBack}/>
      
      <Title style={{ 
        flex: 1,
        color: Theme.buttonPrimary, 
        fontWeight: 'bold',
        fontSize: 20
      }} title={title} />
      <HeaderIcon name={"ios-settings"} action={onGoToSetting}/>
    </View>
  )
})

export default Header