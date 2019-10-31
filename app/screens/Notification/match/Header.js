import React from 'react'
import { View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from 'react-navigation-hooks'
import DGText from '../../../components/DGText';

const HeaderIcon = React.memo(({name, action}) => (
  <Icon 
    style={{
      opacity: action ? 1 : 0
    }}
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

const Header = React.memo(({onRequestGoBack, onRequestSaveScoreCard}) => {

  const { goBack } = useNavigation()

  const onGoBack = () => {
    goBack()  
  }

  return (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginTop: 20
    }}>
      <HeaderIcon name={"ios-arrow-back"} action={onGoBack} />
      <Title title={"Match"} />
      <HeaderIcon name={"ios-arrow-back"} />
    </View>
  )
})

export default Header