import React from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Header from './Header'
import Theme from '../../../res/Theme';
import {StompEventTypes, withStomp} from 'react-stompjs'

import { connect } from 'react-redux'
import Api from '../../../api';
import LoadingModal from '../../../components/LoadingModal';

class ChatDetail extends React.PureComponent {

  user1 = null
  user2 = null

  subscription = []
  
  constructor(props) {
    super(props)

    const data = props.navigation.getParam("data")

    const currentUserId = props.user.id

    this.user1 = {
      id: data.first.id,
      name: data.first.id == currentUserId ? [props.user.firstName, props.user.lastName].join(" ") : data.name,
      avatar: data.first.id == currentUserId ? props.user.avatar : data.avatar,
    }

    this.user2 = {
      id: data.second.id,
      name: data.second.id == currentUserId ? [props.user.firstName, props.user.lastName].join(" ") : data.name,
      avatar: data.second.id == currentUserId ? props.user.avatar : data.avatar,
    }

    const messages = data.message.map(m => {
      const owner = m.sender_id == this.user1.id ? this.user1 : this.user2
      return {
        _id: m.message_id,
        text: m.message,
        createdAt: new Date(),
        user: {
          ...owner,
          _id: owner.id,
        },
      }
    })
    
    this.state = {
      messages,
      connecting: true
    }
  }

  componentDidMount() {
    this.props.stompContext.addStompEventListener(StompEventTypes.Connect, this.onConnected)
    this.props.stompContext.addStompEventListener(StompEventTypes.Disconnect, this.onDisconnected)
    this.props.stompContext.addStompEventListener(StompEventTypes.WebSocketClose, this.onClose)

    const at = Api.instance().getAccessToken()
    this.props.stompContext.newStompClient(
      "http://14.225.5.44:8080/golfer_api/api/ws?access_token=" + at,
      null,
      null,
      "/"
    )
  }
  
  componentWillUnmount() {
    this.props.stompContext.removeStompClient()
  }

  onConnected = () => {
    this.setState({connecting: false}, () => {
      const senderId = this.props.user.id
      const data = this.props.navigation.getParam("data")
      const path = '/channel/' + data.id
      const subscribePath = '/app/chat/' + data.id + '/Subscribe'
      const client = this.props.stompContext.getStompClient()

      client.publish({destination: subscribePath, body: JSON.stringify({sender_id: senderId})});
      this.subscription.push(client.subscribe(path, this.onNewMessageComming))
    })
  }

  onDisconnected = () => {
    this.setState({connecting: true}, () => {
      this.subscription.forEach(s => s.unsubscribe())
    })    
  }

  onClose = () => {
    this.setState({connecting: false}, () => {
      this.props.stompContext.removeStompClient()
    })
  }

  onNewMessageComming = (message) => {
    const messageObject = JSON.parse(message.body)
    if (messageObject.message == null) {
      return
    }

    const owner = messageObject.sender_id == this.user1.id ? this.user1 : this.user2
    const newMessage = {
      _id: (new Date()).getMilliseconds(),
      text: messageObject.message,
      user: {
        ...owner,
        _id: owner.id,
      },
    }

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, newMessage),
    }))
  }

  onSend = (messages = []) => {
    const data = this.props.navigation.getParam("data")
    const senderId = this.props.user.id
    const userTo = senderId == this.user1.id ? this.user2.id : this.user1.id
    const message = {
      conversation_id: data.id,
      sender_id: this.props.user.id,
      message: messages[0].text,
      userto_id: userTo,
      type: 11,
      status: 0
    }

    const client = this.props.stompContext.getStompClient()
    const sendMessagePath = '/app/chat/' + data.id + '/sendMessage'
    client.publish({destination: sendMessagePath, body: JSON.stringify(message)});
  }

  render() {
    const host = this.props.user.id == this.user1.id ? this.user1 : this.user2
    return (
      <View style={{ backgroundColor: Theme.mainBackground, flex: 1 }}>
        <Header />
        <GiftedChat
          listViewProps={{
            style: {
              paddingVertical: 16,
            }
          }}
          alignTop={true}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            ...host,
            _id: host.id
          }}
        />
        <LoadingModal visible={this.state.connecting} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.profile.user
})

const mapDispatchToProps = () => ({})

export default withStomp(connect(mapStateToProps, mapDispatchToProps)(ChatDetail))