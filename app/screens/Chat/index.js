import React, { PureComponent } from 'react'
import { ActivityIndicator, ScrollView, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Icon from 'react-native-vector-icons/Ionicons'

import Header from './components/Header'
import BaseComponent from '../../components/BaseComponent';
import Filter from './components/Filter';
import DGText from '../../components/DGText';
import { getMessages } from '../../actions/getMessages';

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

const Message = React.memo(({isLoading, data}) => {
  return <Board 
    title="Message"
    isLoading={isLoading}
    data={data}
  />
})

const EmptyData = React.memo(() => {
  return <DGText style={{ color: Theme.textWhite, fontStyle: 'italic', marginHorizontal: 16 + 30 + 8, fontSize: 12 }}>No Message</DGText>
})

const MessageItem = React.memo(({item}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 16, height: 80, marginTop: 24 }}>
      <Image
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
          fontSize: 20
        }}>{item.name}</DGText>
        <DGText style={{ 
          color: Theme.textWhite
        }} numberOfLines={1}>{item.lastMessage}</DGText>
      </View>
      <DGText style={{ 
        position: 'absolute',
        color: Theme.textWhite,
        fontSize: 12,
        top: 0,
        right: 0
      }}>{item.timeIndicator}</DGText>
    </View>
  )
})

const MessageBlock = React.memo(({data}) => {
  const items = data.map((item, index) => <MessageItem key={`message-item-${index}`} item={item} />)
  return (
    <>
      {items}
    </>
  )
})

const Board = React.memo(({title, isLoading, data}) => {

  let content = undefined;
  if (isLoading || data == null) {
    content = <ActivityIndicator size='large' color={Theme.buttonPrimary} />
  }
  else if (data.length == 0) {
    content = <EmptyData />
  }
  else {
    content = <MessageBlock data={data} />
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

  requestToggleExpand = () => {
    this.setState({ isAllExpand: !this.state.isAllExpand })
  }

  onFilterChanged = (nextValue) => {
    this.props.getMessages(nextValue)
  }
  
  render() {
    return (
      <BaseComponent>
        <Header />
        <Filter onFilterChanged={this.onFilterChanged} />
        <ScrollView showsVerticalScrollIndicator={false} >
          <Challengers data={[
            {
              avatar: "https://usatgolfweek.files.wordpress.com/2019/07/gettyimages-1163432510.jpg"
            },
            {
              avatar: "http://www.europeantour.com/mm/photo/tournament/tournaments/33/54/31/335431_m16.jpg",
            },
            {
              avatar: "https://media.golfdigest.com/photos/5d34b6d7800f6d0008f342b4/master/w_2583,h_1723,c_limit/Shane-Lowry.jpg",
            }
          ]}/>
          <Message 
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
  messagesData: state.messages,
})

const mapDispatchToProps = (dispatch) => ({
  getMessages: (tag) => dispatch(getMessages(tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)

