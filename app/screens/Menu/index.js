import React, { PureComponent } from 'react'
import { 
  View, 
  StyleSheet
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { connect } from 'react-redux'
import OneSignal from 'react-native-onesignal'

import MenuBlock from './MenuBlock'
import BaseComponent from '../../components/BaseComponent'
import { useNavigation } from 'react-navigation-hooks';
import Header from './components/Header'
import { getProfile } from '../../actions/getProfile';

const Logo = React.memo(() => (
  <FastImage
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

  const onRequestGoToPlay = () => {
    navigate('Play')
  }

  const onRequestGoToChallenge = () => {
    navigate('Challenge')
  }

  const onRequestGoToScores = () => {
    navigate("LeaderBoard")
  }

  const onInvitePress = () => {
    navigate("Invite")
  }

  const onPremiumPress = () => {
    navigate("Premium")
  }

  return (
    <View style={styles.body}>
      <MenuBlock 
        ref={menuBlock}
        onPlayPress={onRequestGoToPlay}
        onChallengePress={onRequestGoToChallenge}
        onScoresPress={onRequestGoToScores}
        onInvitePress={onInvitePress}
        onPremiumPress={onPremiumPress}
      />
    </View>
  )
})

class Menu extends PureComponent {

  constructor(props) {
    super(props)

    OneSignal.init("316ed61c-0349-4eaf-aa5c-634a7bfad659");
    OneSignal.inFocusDisplaying(2)
  }

  componentDidMount() {
    this.props.getProfile()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.id) {
      OneSignal.sendTag("user_id", nextProps.user.id + "")
    }
  }

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

const mapStateToProps = (state) => ({
  user: state.profile.user
})

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile())
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)