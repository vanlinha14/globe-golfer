import React, { PureComponent } from 'react'
import { 
  View, 
  Image,
  StyleSheet, 
  TouchableOpacity
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import MenuBlock from './MenuBlock'
import BaseComponent from '../../components/BaseComponent'
import { useNavigation } from 'react-navigation-hooks';

const Logo = React.memo(() => (
  <Image
    style={[
      styles.logo,
      {
        marginTop: 60,
        width: 120,
        height: 120,
        alignSelf: 'center'
      }
    ]}
    source={require('../../res/images/ic_icon.png')}
  />
))

const Controller = React.memo(({name, action}) => (
  <TouchableOpacity style={styles.controller} activeOpacity={0.7} onPress={action}>
    <Icon name={name} color="white" size={56} />
  </TouchableOpacity>
))

const ControllerBlock = React.memo(({requestMenuPrevious, requestMenuNext}) => (
  <View style={styles.controllerBlock}>
    <Controller name="md-arrow-dropleft" action={requestMenuPrevious} />
    <Controller name="md-arrow-dropright" action={requestMenuNext} />
  </View>
))

const Ads = React.memo(() => <View style={styles.ads} />)

const Body = React.memo(() => {

  const menuBlock = React.useRef(null)
  const { navigate } = useNavigation()

  const onRequestGoToPlay = () => {}

  const onRequestGoToChallenge = () => {
    navigate('Challenge')
  }

  const onRequestGoToScores = () => {}

  const requestMenuNext = () => {
    if (menuBlock && menuBlock.current && menuBlock.current.requestNext) {
      menuBlock.current.requestNext()
    }
  }

  const requestMenuPrevious = () => {
    if (menuBlock && menuBlock.current && menuBlock.current.requestPrevious) {
      menuBlock.current.requestPrevious()
    }
  }

  return (
    <View style={styles.body}>
      <MenuBlock 
        ref={menuBlock}
        onPlayPress={onRequestGoToPlay}
        onChallengePress={onRequestGoToChallenge}
        onScoresPress={onRequestGoToScores}
      />
      <ControllerBlock requestMenuNext={requestMenuNext} requestMenuPrevious={requestMenuPrevious}/>
    </View>
  )
})

export default class Menu extends PureComponent {
  render() {
    return (
      <BaseComponent>
        <Logo />
        <Body />
        <Ads />
      </BaseComponent>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  logo: {
    height: '30%'
  },
  ads: {
    backgroundColor: '#000000',
    height: '30%'
  },
  controllerBlock: {
    width: "30%",
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  controller: {
    width: 50,
    height: 50,
    alignItems: 'center'
  }
})