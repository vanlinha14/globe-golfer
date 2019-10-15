import React, { PureComponent } from 'react'
import { 
  View, 
  TouchableWithoutFeedback,
  StyleSheet,
  Linking
} from 'react-native'
import { connect } from 'react-redux'
import OneSignal from 'react-native-onesignal'

import MenuBlock from './MenuBlock'
import BaseComponent from '../../components/BaseComponent'
import { useNavigation } from 'react-navigation-hooks';
import Header from './components/Header'
import { getProfile } from '../../actions/getProfile';
import { shareGG } from '../../utils'
import { getNewNotifications, getHistoryNotifications } from '../../actions/getNotifications'
import { getPendingMatches } from '../../actions/getPendingMatches'
import { getPlayedMatches } from '../../actions/getPlayedMatches'
import Api from '../../api'
import { VIEW_ADS } from '../../api/Endpoints'
import LoadableImage from '../../components/LoadableImage'
import DGText from '../../components/DGText'
import Theme from '../../res/Theme'
import moment from 'moment'

const Logo = React.memo(() => (
  <LoadableImage
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

class Lottery extends React.PureComponent {

  constructor(props) {
    super(props);
    
    this.state = {
      endTime: props.endTime
    }
  }
  

  componentDidMount() {
    setInterval(() => {
      this.setState({
        endTime: this.state.endTime - 1
      })
    }, 1000)
  }

  secondToCountDown(t) {
    const s = this.makeUpTimeValue(Math.floor(t % 60));
    const m = this.makeUpTimeValue(Math.floor((t/60) % 60));
    const h = this.makeUpTimeValue(Math.floor((t/(60*60)) % 24));

    return `${h}:${m}:${s}`
  } 

  makeUpTimeValue(v) {
    if (v < 10) {
      return `0${v}`
    }

    return v
  }

  render() {
    return (
      <View style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: Theme.buttonPrimary,
        borderWidth: 4,
        alignItems: 'center'
      }}>
        <DGText style={{
          color: Theme.buttonPrimary,
          fontSize: 24,
          marginTop: 16,
        }}>Lottle</DGText>
        <DGText style={{
          color: 'white',
          fontSize: 16,
          marginTop: 4
        }}>{this.secondToCountDown(this.state.endTime)}</DGText>
      </View>
    )
  }
}

const Ads = React.memo(({ads}) => {
  const renderContent = () => {

    const lottery = <Lottery endTime={30600} />
    let ads = undefined

    if (ads) {
      ads = (
        <LoadableImage 
          style={{
            width: 100,
            height: 100,
            borderRadius: 50
          }}
          resizeMethod='resize'
          resizeMode='cover'
          source={{uri: VIEW_ADS.replace("{image}", ads.image)}}
        />
      )
    }

    return (
      <View style={{flexDirection: 'row'}}>
        {lottery}
        {ads}
      </View>
    )
  }

  return (
    <TouchableWithoutFeedback style={styles.ads} onPress={() => {ads && Linking.openURL(ads.link)}} >
      <View style={styles.ads}>
        {renderContent()}    
      </View>
    </TouchableWithoutFeedback>
  )
})

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
    shareGG()
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

  state = {
    adsImage: null
  }

  constructor(props) {
    super(props)

    OneSignal.init("316ed61c-0349-4eaf-aa5c-634a7bfad659");
    OneSignal.inFocusDisplaying(2)
    OneSignal.addEventListener('received', this.onNotiReceived);
    OneSignal.addEventListener('opened', this.onOpened);
  }

  componentDidMount() {
    this.props.getProfile()

    Api.instance().getAds().then(res => {
      this.setState({
        adsImage: res
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user.id) {
      OneSignal.sendTag("user_id", nextProps.user.id + "")
    }
  }

  onNotiReceived = () => {
    this.props.getNewNotifications(0)
    this.props.getHistoryNotifications(0)

    this.props.getPendingMatches()
    this.props.getPlayedMatches()
  }

  onOpened = () => {
    this.props.navigation.navigate('Notification')
    alert("??")
  }

  render() {
    return (
      <BaseComponent withDotBackground={true}>
        <Header />
        <Logo />
        <Body />
        <Ads ads={this.state.adsImage} />
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
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center'
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
  getProfile: () => dispatch(getProfile()),
  getNewNotifications: (tag) => dispatch(getNewNotifications(tag)),
  getHistoryNotifications: (tag) => dispatch(getHistoryNotifications(tag)),
  getPendingMatches: () => dispatch(getPendingMatches()),
  getPlayedMatches: () => dispatch(getPlayedMatches())
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)