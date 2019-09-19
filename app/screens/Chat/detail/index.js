import React from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Header from './Header'
import Theme from '../../../res/Theme';

import { connect } from 'react-redux'

class ChatDetail extends React.PureComponent {
  
  constructor(props) {
    super(props)

    const data = props.navigation.getParam("data")

    const currentUserId = props.user.id

    const user1 = {
      id: data.first.id,
      name: data.first.id == currentUserId ? [props.user.firstName, props.user.lastName].join(" ") : data.name,
      avatar: data.first.id == currentUserId ? props.user.avatar : data.avatar,
    }

    const user2 = {
      id: data.second.id,
      name: data.second.id == currentUserId ? [props.user.firstName, props.user.lastName].join(" ") : data.name,
      avatar: data.second.id == currentUserId ? props.user.avatar : data.avatar,
    }

    const messages = data.message.map(m => {
      return {
        _id: m.message_id,
        text: m.message,
        createdAt: new Date(),
        user: m.sender_id == data.first ? user1 : user2,
      }
    })
    
    this.state = {
      messages
    }
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <View style={{ backgroundColor: Theme.mainBackground, flex: 1 }}>
        <Header />
        <GiftedChat
          alignTop={true}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.profile.user
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetail)