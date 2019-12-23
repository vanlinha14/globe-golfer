import React from 'react'
import {
  View,
  AsyncStorage
} from 'react-native'
import Authentication from './screens/Authentication'

import Login from './screens/Authentication/Login'
import LoginWithEmail from './screens/Authentication/LoginWithEmail'
import Register from './screens/Authentication/Register'
import SetupAccount from './screens/Authentication/SetupAccount'
import SetupAccountStepInputIndex from './screens/Authentication/SetupAccountStepInputIndex'
import SetupAccountStepInputName from './screens/Authentication/SetupAccountStepInputName'
import SetupAccountStepInputBirthday from './screens/Authentication/SetupAccountStepInputBirthday'
import SetupAccountStepInputGender from './screens/Authentication/SetupAccountStepInputGender'
import SetupAccountStepInputLocation from './screens/Authentication/SetupAccountStepInputLocation'
import SetupAccountStepInputScannedCard from './screens/Authentication/SetupAccountStepInputScannedCard'
import SetupAccountStepInputAvatar from './screens/Authentication/SetupAccountStepInputAvatar'
import SetupAccountStepActiveLocation from './screens/Authentication/SetupAccountStepActiveLocation'
import SetupAccountStepActiveEmailContact from './screens/Authentication/SetupAccountStepActiveEmailContact'
import SetupAccountStepInputEmail from './screens/Authentication/SetupAccountStepInputEmail'
import SetupAccountStepFinal from './screens/Authentication/SetupAccountStepFinal'

import ChangePassword from './screens/ChangePassword'

import TnC from './screens/Authentication/TnC'

import Settings from './screens/Settings'
import Profile from './screens/Profile'
import Interest from './screens/Interest'

import Challenge from './screens/Challenge'

import Play from './screens/Play'
import PlayConfiguration from './screens/Play/configuration'
import ScoreCard from './screens/Play/score'
import SimpleScoreCard from './screens/Play/score/simple'
import Final from './screens/Play/final'
import SimpleFinal from './screens/Play/final/SimpleFinal'

import SelectNumber from './screens/Play/subv2/number'
import SelectType from './screens/Play/subv2/type'
import EditResult2Player from './screens/Play/subv2/edit/TwoPlayer'
import EnterFinalResult from './screens/Play/subv2/final'
import Overview from './screens/Play/subv2/overview'

import Select3rdPlayer from './screens/Play/subv2/select/three'
import AddGuest from './screens/Play/subv2/add/guest'
import EditResult3Player from './screens/Play/subv2/edit/ThreePlayer'

import Chat from './screens/Chat'
import ChatDetail from './screens/Chat/detail'

import Notification from './screens/Notification'
import NotificationDetail from './screens/Notification/detail'
import MatchResult from './screens/Notification/match/result'
import ResultSimple from './screens/Notification/match/ResultSimple'

import Menu from './screens/Menu'
import LeaderBoard from './screens/LeaderBoard'

import Premium from './screens/Premium'

import Theme from './res/Theme'

import LotteryList from './screens/Lottery'
import LotteryDetail from './screens/Lottery/detail'
import YouIn from './screens/Lottery/youin'

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation"
import LoadableImage from './components/LoadableImage'
import { withStomp, StompEventTypes } from 'react-stompjs'
import { ACCESS_TOKEN_STORE_KEY } from './utils/constants'
import Api from './api'
import {BASE} from './api/Endpoints';

const iconStyle = {
  alignSelf: 'center',
  width: 44,
  height: 44
}

const TabBarIcon = React.memo(({selectedIcon, unselectedIcon, isSelected}) => {
  return (
    <View style={{ height: 56, width: 56, justifyContent: 'center' }}>
      <LoadableImage
        style={iconStyle}
        source={isSelected ? selectedIcon : unselectedIcon}
      />
    </View>
  )
})

const loginNavigator = {
  Login: { screen: Login },
  LoginWithEmail: { screen: LoginWithEmail }
}

const MainContent = createStackNavigator({
  Menu,
  Challenge
}, {
  headerMode: 'none'
})

const Main = createBottomTabNavigator({
  Chat: {
    screen: Chat,
    navigationOptions: {
      tabBarIcon: props => (
        <TabBarIcon 
          isSelected={props.focused} 
          selectedIcon={require('@images/ic_chat_selected.png')} 
          unselectedIcon={require('@images/ic_chat.png')}
        />
      )
    }
  },
  Notification: {
    screen: Notification,
    navigationOptions: {
      tabBarIcon: props => (
        <TabBarIcon 
          isSelected={props.focused} 
          selectedIcon={require('@images/ic_bell_selected.png')} 
          unselectedIcon={require('@images/ic_bell.png')}
        />
      )
    }
  }, 
  MainContent: {
    screen: MainContent,
    navigationOptions: {
      tabBarIcon: props => (
        <TabBarIcon 
          isSelected={props.focused} 
          selectedIcon={require('@images/ic_main_selected.png')} 
          unselectedIcon={require('@images/ic_main.png')}
        />
      )
    }
  }, 
  Play: {
    screen: Play,
    navigationOptions: {
      tabBarIcon: props => (
        <TabBarIcon 
          isSelected={props.focused} 
          selectedIcon={require('@images/ic_play_selected.png')} 
          unselectedIcon={require('@images/ic_play.png')}
        />
      )
    }
  }, 
  LeaderBoard: {
    screen: LeaderBoard,
    navigationOptions: {
      tabBarIcon: props => (
        <TabBarIcon 
          isSelected={props.focused} 
          selectedIcon={require('@images/ic_leaderboard_selected.png')} 
          unselectedIcon={require('@images/ic_leaderboard.png')}
        />
      )
    }
  }
}, {  
  initialRouteName: 'MainContent',
  tabBarOptions: {
  showIcon: true,
  showLabel: false,
  style: { backgroundColor: Theme.tabBarBackground, height: 60 }
}})

const setupAccountNavigator = {
  Register,
  TnC,
  SetupAccount,
  SetupAccountStepInputIndex,
  SetupAccountStepInputName,
  SetupAccountStepInputBirthday,
  SetupAccountStepInputGender,
  SetupAccountStepInputLocation,
  SetupAccountStepInputScannedCard,
  SetupAccountStepInputAvatar,
  SetupAccountStepActiveLocation,
  SetupAccountStepActiveEmailContact,
  SetupAccountStepInputEmail,
  SetupAccountStepFinal
}

const AppNavigator = createStackNavigator({
  // SelectNumber,
  Authentication,
  Main,
  Profile,
  Interest,
  Settings,
  Premium,
  ChatDetail,
  NotificationDetail,
  MatchResult,
  ResultSimple,
  PlayConfiguration,
  ScoreCard,
  SimpleScoreCard,
  Final,
  SimpleFinal,
  SelectNumber,
  SelectType,
  EnterFinalResult,
  EditResult2Player,
  Overview,
  Select3rdPlayer,
  EditResult3Player,
  AddGuest,
  ChangePassword,
  LotteryList,
  LotteryDetail,
  YouIn,
  ...loginNavigator,
  ...setupAccountNavigator
}, {
  headerMode: 'none'
})

const AppNavigatorInstance = createAppContainer(AppNavigator)

class Container extends React.PureComponent {

  componentDidMount() {
    AsyncStorage.getItem(ACCESS_TOKEN_STORE_KEY).then(token => {
      if (token) {
        Api.instance().setAccessToken(token)

        this.props.stompContext.addStompEventListener(StompEventTypes.Connect, this.onConnected)
        this.props.stompContext.addStompEventListener(StompEventTypes.Disconnect, this.onDisconnected)
        this.props.stompContext.addStompEventListener(StompEventTypes.WebSocketClose, this.onClose)

        this.props.stompContext.newStompClient(
          BASE + "ws?access_token=" + token,
          null,
          null,
          "/"
        )
      }
    })
  }

  onConnected = () => {
    // alert("connected");
  }

  onDisconnected = () => {
    // alert("not connect");
    this.props.stompContext.newStompClient(
      BASE + "ws?access_token=" + token,
      null,
      null,
      "/"
    )
  }

  onClose = () => {
    // alert("close");
    this.props.stompContext.removeStompClient()
  }

  render() {
    return <AppNavigatorInstance />
  }
}

export default withStomp(Container)

