import React, { PureComponent } from 'react'
import { StyleSheet, View, Switch } from 'react-native'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Icon from 'react-native-vector-icons/Ionicons'

import DGText from '../../components/DGText'
import { useNavigation } from 'react-navigation-hooks';

const FlexSpacing = React.memo(() => <View style={{ flex: 1 }} />)

const HeaderIcon = React.memo(({name, action}) => (
  <Icon 
    size={32}
    color={'white'}
    name={name}
    onPress={action}
  />
))

const Toggler = React.memo(({isOn, onChanged}) => (
  <Switch 
    tintColor='gray' 
    thumbColor={'white'} 
    onTintColor={Theme.buttonPrimary} 
    value={isOn}
    onValueChange={onChanged}
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

export default class Challenge extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    isGridMode: false,
  }

  onViewModeChanged = () => {
    this.setState({
      isGridMode: !this.state.isGridMode
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header isOn={this.state.isGridMode} onViewModeChanged={this.onViewModeChanged} />
        <View style={{ flex: 1 }}>
          <DGText>Challenge</DGText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.mainBackground,
    justifyContent: 'center',
    alignItems: 'center'
  }
})