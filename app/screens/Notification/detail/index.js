import React from 'react'
import { View, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Header from './Header'
import Theme from '../../../res/Theme';
import DGText from '../../../components/DGText';
import Api from '../../../api';
import { connect } from 'react-redux'
import { getNewNotifications, getHistoryNotifications } from '../../../actions/getNotifications';

const Button = React.memo(({text, backgroundColor, onPress}) => {
  return (
    <TouchableOpacity style={{ 
      flex: 1, 
      backgroundColor,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center'
    }} activeOpacity={0.7} onPress={onPress}>
      <DGText style={{
        color: Theme.textWhite,
        fontWeight: 'bold',
      }}>{text}</DGText>
    </TouchableOpacity>
  )
})

class NotificationDetail extends React.PureComponent {
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

  componentDidMount() {
    const notification = this.props.navigation.getParam("notification")
    Api.instance().updateNotificationStatus(notification.id).then(_ => {
      const tag = this.props.navigation.getParam("tag")
      console.warn(tag);
      
      this.props.getNewNotifications(tag);
      this.props.getHistoryNotifications(tag);
    })
  }

  acceptMath = () => {
    const notification = this.props.navigation.getParam("notification")
    Api.instance().acceptChallenge(notification.challengeId).then(_ => {
      Alert.alert("ACCEPT CHALLENGE", "You just accept the challenge!", [
        {text: 'OK', onPress: () => this.props.navigation.goBack()},
      ], { cancelable: false })
    })
  }

  declineMatch = () => {
    const notification = this.props.navigation.getParam("notification")
    Api.instance().declineChallenge(notification.challengeId)
  }

  renderInput = () => {
    const notification = this.props.navigation.getParam("notification")
    if (notification.type == 1 || notification.type == 11) {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Button text="Accept" backgroundColor={Theme.buttonPrimary} onPress={this.acceptMath}/>
          <Button text="Decline" backgroundColor={Theme.buttonSecondary} onPress={this.declineMatch}/>
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

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = (dispatch) => ({
  getNewNotifications: (tag) => dispatch(getNewNotifications(tag)),
  getHistoryNotifications: (tag) => dispatch(getHistoryNotifications(tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDetail)