import React from 'react'
import {
  View,
  Image
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

import TnC from './screens/Authentication/TnC'

import Settings from './screens/Settings'
import Profile from './screens/Profile'
import Interest from './screens/Interest'

import Challenge from './screens/Challenge'

import Play from './screens/Play'
import PlayConfiguration from './screens/Play/configuration'
import ScoreCard from './screens/Play/score'
import Final from './screens/Play/final'

import Chat from './screens/Chat'
import ChatDetail from './screens/Chat/detail'

import Notification from './screens/Notification'
import NotificationDetail from './screens/Notification/detail'

import Menu from './screens/Menu'
import LeaderBoard from './screens/LeaderBoard'

import Invite from './screens/Invite'

import Premium from './screens/Premium'

import Theme from './res/Theme'

import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation"

const iconStyle = {
  alignSelf: 'center',
  width: 44,
  height: 44
}

const TabBarIcon = React.memo(({selectedIcon, unselectedIcon, isSelected}) => {
  return (
    <View style={{ height: 56, width: 56, justifyContent: 'center' }}>
      <Image
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
  Authentication,
  Main,
  Profile,
  Interest,
  Settings,
  Invite,
  Premium,
  ChatDetail,
  NotificationDetail,
  PlayConfiguration,
  ScoreCard,
  Final,
  ...loginNavigator,
  ...setupAccountNavigator
}, {
  headerMode: 'none'
})

export default createAppContainer(AppNavigator)

