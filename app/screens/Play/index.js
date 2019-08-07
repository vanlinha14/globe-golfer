import React, { PureComponent } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Icon from 'react-native-vector-icons/Ionicons'

import Header from './components/Header'
import BaseComponent from '../../components/BaseComponent';
import DGText from '../../components/DGText';

const Title = React.memo(() => {
  return (
    <DGText style={{ 
      color: Theme.textWhite, 
      alignSelf: 'center',
      fontSize: 20
    }}>Select your match</DGText>
  )
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

const PendingItem = React.memo(({item}) => {
  return (
    <View style={{ marginVertical: 16, flexDirection: 'row', justifyContent: 'center' }}>
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50
        }}
        source={{uri: "https://usatgolfweek.files.wordpress.com/2019/07/gettyimages-1163432510.jpg"}}
      />
      <View style={{ marginHorizontal: 24, justifyContent: 'center', alignItems: 'center' }}>
        <DGText style={{ 
          fontSize: 20,
          marginBottom: 4,
          color: Theme.buttonPrimary 
        }} >VS</DGText>
        <TouchableOpacity activeOpacity={0.7} onPress={() => alert("Request play with victim")}>
          <DGText style={{ 
            backgroundColor: Theme.buttonPrimary,
            color: Theme.textWhite,
            paddingHorizontal: 12,
            paddingVertical: 8
          }}>PLAY NOW</DGText>
        </TouchableOpacity>
        
      </View>
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50
        }}
        source={{uri: item.avatar}}
      />
    </View>
  )
})

const PendingItems = React.memo(({data}) => {
  return data.map(item => <PendingItem item={item}/>)
})

const PendingBlock = React.memo(({isExpanded, requestToggleExpand, data}) => {
  return (
    <>
      <BoardHeader title={"PENDING"} isExpanded={isExpanded} requestToggleExpand={requestToggleExpand}/>
      {isExpanded ? <PendingItems data={data} /> : undefined}
    </>
  )
})

const PlayedItem = React.memo(({item}) => {
  return (
    <View style={{ marginVertical: 16, flexDirection: 'row', justifyContent: 'center' }}>
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50
        }}
        source={{uri: "https://usatgolfweek.files.wordpress.com/2019/07/gettyimages-1163432510.jpg"}}
      />
      <View style={{ marginHorizontal: 24, justifyContent: 'center', alignItems: 'center' }}>
        <DGText style={{ 
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 4,
          color: Theme.buttonPrimary 
        }}>{item.result}</DGText>
        <TouchableOpacity activeOpacity={0.7} onPress={() => alert("Request replay with victim")}>
          <DGText style={{ 
            backgroundColor: Theme.buttonPrimary,
            color: Theme.textWhite,
            paddingHorizontal: 12,
            paddingVertical: 8
          }}>REPLAY</DGText>
        </TouchableOpacity>
        
      </View>
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50
        }}
        source={{uri: item.avatar}}
      />
    </View>
  )
})

const PlayedItems = React.memo(({data}) => {
  return data.map(item => <PlayedItem item={item}/>)
})

const PlayedBlock = React.memo(({isExpanded, requestToggleExpand, data}) => {
  return (
    <>
      <BoardHeader title={"PLAYED"} isExpanded={isExpanded} requestToggleExpand={requestToggleExpand}/>
      {isExpanded ? <PlayedItems data={data} /> : undefined}
    </>
  )
})

export default class Profile extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    isPendingExpand: true,
    isPlayedExpand: false
  }
  
  render() {
    return (
      <BaseComponent>
        <Header />
        <Title />
        <PendingBlock 
          data={[
            {
              avatar: "http://www.europeantour.com/mm/photo/tournament/tournaments/33/54/31/335431_m16.jpg",
            },
            {
              avatar: "https://media.golfdigest.com/photos/5d34b6d7800f6d0008f342b4/master/w_2583,h_1723,c_limit/Shane-Lowry.jpg",
            }
          ]}
          isExpanded={this.state.isPendingExpand} 
          requestToggleExpand={() => this.setState({ isPendingExpand: !this.state.isPendingExpand })} 
        />
        <PlayedBlock 
          data={[
            {
              avatar: "http://www.europeantour.com/mm/photo/tournament/tournaments/33/54/31/335431_m16.jpg",
              result: "2 & 1"
            },
            {
              avatar: "https://media.golfdigest.com/photos/5d34b6d7800f6d0008f342b4/master/w_2583,h_1723,c_limit/Shane-Lowry.jpg",
              result: "Halved"
            }
          ]}
          isExpanded={this.state.isPlayedExpand} 
          requestToggleExpand={() => this.setState({ isPlayedExpand: !this.state.isPlayedExpand })} 
        />
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