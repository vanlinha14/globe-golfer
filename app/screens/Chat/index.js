import React, { PureComponent } from 'react'
import { ActivityIndicator, ScrollView, View, TouchableOpacity, Image } from 'react-native'

import { connect } from 'react-redux'

import Theme from '../../res/Theme'

import Header from './components/Header'
import BaseComponent from '../../components/BaseComponent';
import Filter from './components/Filter';
import DGText from '../../components/DGText';
import { getMessages } from '../../actions/getMessages';
import { useNavigation } from 'react-navigation-hooks';
import { getPendingMatches } from '../../actions/getPendingMatches'
import { getPlayedMatches } from '../../actions/getPlayedMatches'

const Challenge = React.memo(({item, onPress}) => {
  return (
    <TouchableOpacity style={{ marginHorizontal: 8 }} activeOpacity={0.7} onPress={onPress}>
      <Image
        style={{
          width: 50,
          height: 50,
          borderRadius: 25
        }}
        source={{uri: item.avatar}}
      />
    </TouchableOpacity>
  )
})

const Challengers = React.memo(({data}) => {

  if (!Array.isArray(data) || data.length == 0) {
    return (
      <>
        <DGText style={{ 
          marginTop: 12,
          marginBottom: 8,
          fontSize: 18,
          color: Theme.textWhite, 
          marginHorizontal: 16 
        }}>Challengers</DGText>
        <DGText style={{
          color: Theme.textWhite,
          fontStyle: 'italic',
          marginLeft: 32,
          marginTop: 8
        }}>You have no challenger right now</DGText>
      </>
    )
  }

  const items = data.map((item, index) => <Challenge key={`challenge-${index}`} item={item} />)

  return (
    <>
      <DGText style={{ 
        marginTop: 12,
        marginBottom: 8,
        fontSize: 18,
        color: Theme.textWhite, 
        marginHorizontal: 16 
      }}>Challengers</DGText>
      <ScrollView style={{ 
        paddingHorizontal: 8,
        marginTop: 12
      }} showsHorizontalScrollIndicator={false} horizontal={true}>
        {items}
      </ScrollView>
    </>
  )
})

const Message = React.memo(({isLoading, data, user}) => {
  return <Board 
    user={user}
    title="Message"
    isLoading={isLoading}
    data={data}
  />
})

const EmptyData = React.memo(() => {
  return <DGText style={{ color: Theme.textWhite, fontStyle: 'italic', marginHorizontal: 16 + 30 + 8, fontSize: 12 }}>No Message</DGText>
})

const MessageItem = React.memo(({user, item}) => {

  const { navigate } = useNavigation()

  const onPress = () => {
    navigate("ChatDetail")
  }

  let lastMessage = "draft:"
  if (item.message.length > 0) {
    if (item.message[0].sender_id == user.id) {
      lastMessage = "You: " + item.message[0].message
    }
    else {
      lastMessage = item.message[0].message
    }
  }

  return (
    <TouchableOpacity 
      style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        paddingHorizontal: 16, 
        height: 80, 
        marginTop: 24 
      }}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Image
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: Theme.buttonPrimary
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
          fontSize: 20
        }}>{item.name}</DGText>
        <DGText style={{ 
          color: Theme.textWhite
        }} numberOfLines={1}>{lastMessage}</DGText>
      </View>
    </TouchableOpacity>
  )
})

const MessageBlock = React.memo(({user, data}) => {
  const items = data.map((item, index) => <MessageItem key={`message-item-${index}`} item={item} user={user}/>)
  return (
    <>
      {items}
    </>
  )
})

const Board = React.memo(({user, title, isLoading, data}) => {
  let content = undefined;
  if (isLoading || data == null) {
    content = <ActivityIndicator size='large' color={Theme.buttonPrimary} />
  }
  else if (data.length == 0) {
    content = <EmptyData />
  }
  else {
    content = <MessageBlock data={data} user={user} />
  }


  return (
    <>
      <DGText style={{ 
        color: Theme.textWhite, 
        marginHorizontal: 16,
        marginTop: 40,
        marginBottom: 8,
        fontSize: 18,
  
      }} >{title}</DGText>
      {content}
    </>
  )
})

class Chat extends PureComponent {
  static navigationOptions = { header: null }

  componentDidMount() {
    this.props.getPendingMatches()
    this.props.getPlayedMatches()
  }

  requestToggleExpand = () => {
    this.setState({ isAllExpand: !this.state.isAllExpand })
  }

  onFilterChanged = (nextValue) => {
    this.props.getMessages(nextValue)
  }
  
  render() {
    const challengersData = []
    
    if (Array.isArray(this.props.pendingData.data)) {
      this.props.pendingData.data.forEach(d => {
        challengersData.push(d.to)
      });
    }

    if (Array.isArray(this.props.playedData.data)) {
      this.props.playedData.data.forEach(d => {
        challengersData.push(d.to)
      });
    }

    return (
      <BaseComponent>
        <Header />
        <Filter onFilterChanged={this.onFilterChanged} />
        <ScrollView showsVerticalScrollIndicator={false} >
          <Challengers data={challengersData}/>
          <Message 
            user={this.props.user}
            requestToggleExpand={this.requestToggleExpand}
            isLoading={this.props.messagesData.isLoading}
            data={this.props.messagesData.data}
          />
        </ScrollView>
      </BaseComponent>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.profile.user,
  messagesData: state.messages,
  pendingData: state.matches.pending,
  playedData: state.matches.played
})

const mapDispatchToProps = (dispatch) => ({
  getMessages: (tag) => dispatch(getMessages(tag)),
  getPendingMatches: () => dispatch(getPendingMatches()),
  getPlayedMatches: () => dispatch(getPlayedMatches())
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

