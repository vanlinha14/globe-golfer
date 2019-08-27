import React, { PureComponent } from 'react'
import { ActivityIndicator, ScrollView, View, TouchableOpacity, Image } from 'react-native'
import FastImage from 'react-native-fast-image'

import { connect } from 'react-redux'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Icon from 'react-native-vector-icons/Ionicons'

import Header from './components/Header'
import BaseComponent from '../../components/BaseComponent';
import Filter from './components/Filter';
import DGText from '../../components/DGText';
import { getNewNotifications, getHistoryNotifications } from '../../actions/getNotifications';
import { useNavigation } from 'react-navigation-hooks';

const NewMessages = React.memo(({isExpanded, isLoading, data, requestToggleExpand}) => {
  return <Board 
    title="NEW MESSAGES" 
    isExpanded={isExpanded}
    isLoading={isLoading}
    data={data}
    requestToggleExpand={requestToggleExpand}
  />
})

const History = React.memo(({isExpanded, isLoading, data, requestToggleExpand}) => {
  return <Board 
    title="HISTORY"
    isExpanded={isExpanded}
    isLoading={isLoading}
    data={data}
    requestToggleExpand={requestToggleExpand}
  />
})

const BoardHeader = React.memo(({title, isExpanded, requestToggleExpand}) => {
  const icon = isExpanded ? require('../../res/images/ic_down.png') : require('../../res/images/ic_right.png')
  return (
    <TouchableOpacity style={{ 
      flexDirection: 'row', 
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical:12
      }} activeOpacity={0.7} onPress={requestToggleExpand}>
      <FastImage
        style={{
          width: 30, 
          height: 30, 
        }} 
        source={icon}
      />
      <DGText style={{ color: Theme.textWhite, marginHorizontal: 8 }} >{title}</DGText>
    </TouchableOpacity>
  )
})

const EmptyData = React.memo(() => {
  return <DGText style={{ color: Theme.textWhite, fontStyle: 'italic', marginHorizontal: 16 + 30 + 8, fontSize: 12 }}>No Messages</DGText>
})

const MessageItem = React.memo(({item}) => {

  const { navigate } = useNavigation()

  const onPress = () => {
    navigate("NotificationDetail", { notification: item })
  }

  return (
    <TouchableOpacity 
      style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingHorizontal: 16, 
        height: 80, 
        marginTop: 8 
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <FastImage
        style={{
          width: 60,
          height: 60,
          borderRadius: 30
        }}
        source={{uri: item.avatar}}
      />
      <View style={{
        flex: 1,
        marginLeft: 16,
        height: 60,
        justifyContent: 'center',
      }}>
        <DGText style={{
          color: Theme.textWhite,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 4,
        }}>{item.name}</DGText>
        <DGText style={{ 
          color: Theme.textWhite,
          marginTop: 4,
        }}>{item.lastMessage}</DGText>
      </View>
      <DGText style={{ marginTop: 12, color: Theme.textWhite }}>{item.duration}</DGText>
    </TouchableOpacity>
  )
})

const Messages = React.memo(({data}) => {
  const items = data.map((item, index) => <MessageItem key={`message-item-${index}`} item={item} />)
  return items
})

const Board = React.memo(({title, isLoading, isExpanded, data, requestToggleExpand}) => {
  let content = undefined;

  if (isExpanded) {
    if (isLoading || data == null) {
      content = <ActivityIndicator size='large' color={Theme.buttonPrimary} />
    }
    else {
      content = data.length == 0 ? <EmptyData/> : <Messages data={data} />
    }
  }
  
  return (
    <>
      <BoardHeader title={title} isExpanded={isExpanded} requestToggleExpand={requestToggleExpand}/>
      {content}
    </>
  )
})

class Notification extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    tag: undefined,
    isNewExpand: false,
    isHistoryExpand: true
  }

  onFilterChanged = (tag) => {
    if (this.state.isNewExpand) {
      this.props.getNewNotifications(tag)
    }

    if (this.state.isHistoryExpand) {
      this.props.getHistoryNotifications(tag)
    }

    this.setState({ tag })
  }

  requestToggleExpandNew = () => {
    const newValue = !this.state.isNewExpand

    if (newValue == true) {
      this.props.getNewNotifications(this.state.tag)
    }

    this.setState({ isNewExpand: newValue })
  }

  requestToggleExpandHistory = () => {
    const newValue = !this.state.isHistoryExpand

    if (newValue == true) {
      this.props.getHistoryNotifications(this.state.tag)
    }

    this.setState({ isHistoryExpand: newValue })
  }
  
  render() {
    return (
      <BaseComponent>
        <Header />
        <Filter onFilterChanged={this.onFilterChanged} />
        <ScrollView showsVerticalScrollIndicator={false} >
          <NewMessages 
            isExpanded={this.state.isNewExpand} 
            isLoading={this.props.newNotificationsData.isLoading}
            data={this.props.newNotificationsData.data}
            requestToggleExpand={this.requestToggleExpandNew}
          />
          <History 
            isExpanded={this.state.isHistoryExpand} 
            isLoading={this.props.historyNotificationsData.isLoading}
            data={this.props.historyNotificationsData.data}
            requestToggleExpand={this.requestToggleExpandHistory}
          />
        </ScrollView>
      </BaseComponent>
    )
  }
}

const mapStateToProps = (state) => ({
  newNotificationsData: state.notifications.new,
  historyNotificationsData: state.notifications.history,
})

const mapDispatchToProps = (dispatch) => ({
  getNewNotifications: (tag) => dispatch(getNewNotifications(tag)),
  getHistoryNotifications: (tag) => dispatch(getHistoryNotifications(tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification)