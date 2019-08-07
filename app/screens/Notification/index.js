import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Image } from 'react-native'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Icon from 'react-native-vector-icons/Ionicons'

import Header from './components/Header'
import BaseComponent from '../../components/BaseComponent';
import Filter from './components/Filter';
import DGText from '../../components/DGText';

const NewMessages = React.memo(({isExpanded, requestToggleExpand}) => {
  return <Board 
    title="NEW MESSAGES" 
    isExpanded={isExpanded}
    data={[
      {
        avatar: "https://usatgolfweek.files.wordpress.com/2019/07/gettyimages-1163432510.jpg",
        name: "Gentlemen golfer",
        lastMessage: "Recu",
        duration: "73:34:40"
      },
      {
        avatar: "http://www.europeantour.com/mm/photo/tournament/tournaments/33/54/31/335431_m16.jpg",
        name: "French styles golfer",
        lastMessage: "Envoye",
        duration: "05:21:12"
      },
      {
        avatar: "https://media.golfdigest.com/photos/5d34b6d7800f6d0008f342b4/master/w_2583,h_1723,c_limit/Shane-Lowry.jpg",
        name: "The Piranhas",
        lastMessage: "Recu",
        duration: "42:28:54"
      }
    ]}
    requestToggleExpand={requestToggleExpand}
  />
})

const History = React.memo(({isExpanded, requestToggleExpand}) => {
  return <Board 
    title="HISTORY"
    isExpanded={isExpanded}
    data={[]}
    requestToggleExpand={requestToggleExpand}
  />
})

const BoardHeader = React.memo(({title, isExpanded, requestToggleExpand}) => {
  return (
    <TouchableOpacity style={{ 
      flexDirection: 'row', 
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical:12
      }} activeOpacity={0.7} onPress={requestToggleExpand}>
      <View style={{ 
        width: 30, 
        height: 30, 
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.buttonPrimary
      }}>
        <Icon name={isExpanded ? "ios-arrow-down" : "ios-arrow-forward"} color="white" size={20} />
      </View>
      
      <DGText style={{ color: Theme.textWhite, marginHorizontal: 8 }} >{title}</DGText>
    </TouchableOpacity>
  )
})

const EmptyData = React.memo(() => {
  return <DGText style={{ color: Theme.textWhite, fontStyle: 'italic', marginHorizontal: 16 + 30 + 8, fontSize: 12 }}>No Messages</DGText>
})

const MessageItem = React.memo(({item}) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 16, height: 80, marginTop: 8 }}>
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
        }}>{item.lastMessage}</DGText>
      </View>
      <DGText style={{ marginTop: 12, color: Theme.textWhite }}>{item.duration}</DGText>
    </View>
  )
})

const Messages = React.memo(({data}) => {
  const items = data.map(item => <MessageItem item={item} />)
  return items
})

const Board = React.memo(({title, isExpanded, data, requestToggleExpand}) => {
  return (
    <>
      <BoardHeader title={title} isExpanded={isExpanded} requestToggleExpand={requestToggleExpand}/>
      {isExpanded ? (data.length == 0 ? <EmptyData/> : <Messages data={data} />) : undefined}
    </>
  )
})

export default class Notification extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    isNewExpand: false,
    isHistoryExpand: true
  }
  
  render() {
    return (
      <BaseComponent>
        <Header />
        <Filter />
        <ScrollView showsVerticalScrollIndicator={false} >
          <NewMessages isExpanded={this.state.isNewExpand} requestToggleExpand={() => this.setState({ isNewExpand: !this.state.isNewExpand })}/>
          <History isExpanded={this.state.isHistoryExpand} requestToggleExpand={() => this.setState({ isHistoryExpand: !this.state.isHistoryExpand })}/>
        </ScrollView>
      </BaseComponent>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})