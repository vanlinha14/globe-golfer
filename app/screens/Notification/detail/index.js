import React from 'react'
import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Header from './Header'
import Theme from '../../../res/Theme';
import DGText from '../../../components/DGText';

const Button = React.memo(({text, backgroundColor}) => {
  return (
    <TouchableOpacity style={{ 
      flex: 1, 
      backgroundColor,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center'
    }} activeOpacity={0.7}>
      <DGText style={{
        color: Theme.textWhite,
        fontWeight: 'bold',
      }}>{text}</DGText>
    </TouchableOpacity>
  )
})

export default class NotificationDetail extends React.PureComponent {
  constructor(props) {
    super(props)

    const notification = this.props.navigation.getParam("notification")

    this.state = {
      header: notification.name,
      messages: [
        {
          _id: notification.id,
          text: notification.lastMessage,
          createdAt: notification.createAt,
          user: {
            name: notification.name,
            avatar: notification.avatar,
          },
        }
      ],
    }
  }

  renderInput = () => {
    const notification = this.props.navigation.getParam("notification")
    if (notification.type == 1) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Button text="Accept" backgroundColor={Theme.buttonPrimary}/>
          <Button text="Decline" backgroundColor={Theme.buttonSecondary}/>
        </View>
      )
    }
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: Theme.mainBackground, flex: 1 }}>
        <Header title={this.state.header} />
        <GiftedChat
          alignTop={true}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
          renderInputToolbar={this.renderInput}
        />
      </SafeAreaView>
    )
  }
}