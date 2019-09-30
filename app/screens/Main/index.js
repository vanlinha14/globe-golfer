import React, { PureComponent } from 'react'
import { View, Dimensions, Image } from 'react-native'

import { TabView, TabBar, SceneMap } from 'react-native-tab-view'

import Theme from '../../res/Theme'

import Chat from '../Chat'
import Notification from '../Notification'
import Menu from '../Menu'
import LeaderBoard from '../LeaderBoard'
import Profile from '../Profile'
import { getBottomSpace } from 'react-native-iphone-x-helper'

const ChatRoute = () => (<Chat />)
const NotificationRoute = () => (<Notification />)
const PlayRoute = () => (<Menu />)
const LeaderBoardRoute = () => (<LeaderBoard />)
const ProfileRoute = () => (<Profile />)

export default class Main extends PureComponent {
  static navigationOptions = { header: null }

  tabIcons = [
    {
      selected: require('../../res/images/ic_chat_selected.png'),
      unselected: require('../../res/images/ic_chat.png')
    },  
    {
      selected: require('../../res/images/ic_bell_selected.png'),
      unselected: require('../../res/images/ic_bell.png')
    },
    {
      selected: require('../../res/images/ic_play_selected.png'),
      unselected: require('../../res/images/ic_play.png')
    },
    {
      selected: require('../../res/images/ic_leaderboard_selected.png'),
      unselected: require('../../res/images/ic_leaderboard.png')
    },
    {
      selected: require('../../res/images/ic_profile_selected.png'),
      unselected: require('../../res/images/ic_profile.png')
    }
  ]

  state = {
    index: 2,
    routes: [
      { index: 0, key: 'chat', title: 'Chat' },
      { index: 1, key: 'noti', title: 'Notification' },
      { index: 2, key: 'play', title: 'Play' },
      { index: 3, key: 'board', title: 'Leader Board' },
      { index: 4, key: 'profile', title: 'Profile' }
    ]
  }

  renderLabel = (props) => {
    const route = props.route
    const iconSource = this.tabIcons[route.index]
    const icon = this.state.index == route.index ? iconSource.selected : iconSource.unselected

    return this.renderTabIcon(icon)
  }

  renderTabIcon(icon) {
    const iconStyle = {
      alignSelf: 'center',
      width: 50,
      height: 50
    }
    return (
      <View style={{ height: 44, width: 44, justifyContent: 'center' }}>
        <Image
          style={iconStyle}
          source={require('./res/images/ic_profile_selected.png')}
        />
      </View>
    )
  }

  renderTabBar = (props) => {
    return <TabBar
      {...props}
      style={{ backgroundColor: Theme.tabBarBackground, height: 64 + getBottomSpace() }}
      indicatorStyle={{ backgroundColor: null }}
      renderLabel={this.renderLabel}
    />
  }

  onTabIndexChange = (index) => {
    this.setState({ index })
  }

  render() {
    let sceneMap = SceneMap({
      chat: ChatRoute,
      noti: NotificationRoute,
      play: PlayRoute,
      board: LeaderBoardRoute,
      profile: ProfileRoute
    })
    let initialLayout = {
      width: windowWidth,
      height: windowHeight
    }
    return (
      <TabView
        navigationState={this.state}
        onIndexChange={this.onTabIndexChange}
        initialLayout={initialLayout}
        tabBarPosition={'bottom'}
        renderScene={sceneMap}
        renderTabBar={this.renderTabBar}
      />
    )
  }
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height