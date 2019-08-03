import React, { PureComponent } from 'react'
import { 
  View, 
  Image,
  StyleSheet
} from 'react-native'

import MenuBlock from './MenuBlock'
import BaseComponent from '../../components/BaseComponent'
import { useNavigation } from 'react-navigation-hooks';
import Header from './components/Header'

const Logo = React.memo(() => (
  <Image
    style={[
      styles.logo,
      {
        width: 120,
        height: 120,
        alignSelf: 'center'
      }
    ]}
    source={require('../../res/images/ic_icon.png')}
  />
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
    </View>
  )
})

export default class Menu extends PureComponent {
  render() {
    return (
      <BaseComponent withDotBackground={true}>
        <Header />
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
    height: '25%'
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