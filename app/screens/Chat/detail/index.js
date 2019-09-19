import React from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import Header from './Header'
import Theme from '../../../res/Theme';
import { CHAT_WS } from '../../../api/Endpoints';

// http://ec2-54-251-181-28.ap-southeast-1.compute.amazonaws.com:8080/golfer_api/api/
// ws?access_token=434dd7ed8a7194bb30cc313a995c4a0c
// const webSocketsServerPort = 8080

export default class ChatDetail extends React.PureComponent {
  state = {
    messages: [],
  }

  // constructor(props) {
  //   super(props)

    // this.wss = http.createServer()
    
  // }

  componentDidMount() {

    // alert(CHAT_WS)

    // this.ws.onopen = () => {
    //   console.warn("socket open");
    // }

    // this.ws.onmessage = evt => {
    //   console.warn(evt.data);
    // }

    // this.ws.onclose = () => {
    //   console.warn("socket close");
    // }
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
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