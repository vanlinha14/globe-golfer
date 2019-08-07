import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity, Image } from 'react-native'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Icon from 'react-native-vector-icons/Ionicons'

import Header from './components/Header'
import BaseComponent from '../../components/BaseComponent';
import Filter from './components/Filter';
import DGText from '../../components/DGText';

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

  const items = data.map(item => <Challenge item={item} />)

  return (
    <>
      <DGText style={{ 
        marginTop: 12,
        marginBottom: 8,
        fontSize: 18,
        color: Theme.textWhite, 
        marginHorizontal: 16 
      }}>Challengers</DGText>
      <ScrollView style={{ paddingHorizontal: 8 }} showsHorizontalScrollIndicator={false} horizontal={true}>
        {items}
      </ScrollView>
    </>
  )
})

const Message = React.memo(() => {
  return <Board 
    title="Message"
    data={[
      {
        avatar: "https://usatgolfweek.files.wordpress.com/2019/07/gettyimages-1163432510.jpg",
        name: "Zoe",
        lastMessage: "Hey let's schedule a call for the next week so that we can meet and play golf",
        timeIndicator: "2 hours ago"
      },
      {
        avatar: "http://www.europeantour.com/mm/photo/tournament/tournaments/33/54/31/335431_m16.jpg",
        name: "Bernard",
        lastMessage: "Thanks for getting back to me. I think you are the good man.",
        timeIndicator: "5 hours ago"
      },
      {
        avatar: "https://media.golfdigest.com/photos/5d34b6d7800f6d0008f342b4/master/w_2583,h_1723,c_limit/Shane-Lowry.jpg",
        name: "Anna",
        lastMessage: "Great to catch up today. Looing forward for the next meeting.",
        timeIndicator: "Nov 2"
      }
    ]}
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
  const items = data.map(item => <MessageItem item={item} />)
  return (
    <>
      {items}
    </>
  )
})

const Board = React.memo(({title, isExpanded, data, requestToggleExpand}) => {
  return (
    <>
      <DGText style={{ 
        color: Theme.textWhite, 
        marginHorizontal: 16,
        marginTop: 40,
        marginBottom: 8,
        fontSize: 18,
  
      }} >{title}</DGText>
      {data.length == 0 ? <EmptyData/> : <MessageBlock data={data} />}
    </>
  )
})

export default class Chat extends PureComponent {
  static navigationOptions = { header: null }
  
  render() {
    return (
      <BaseComponent>
        <Header />
        <Filter />
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
          <Message requestToggleExpand={() => this.setState({ isAllExpand: !this.state.isAllExpand })}/>
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