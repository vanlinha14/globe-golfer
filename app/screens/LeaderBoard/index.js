import React, { PureComponent } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Icon from 'react-native-vector-icons/Ionicons'

import Header from './components/Header'
import BaseComponent from '../../components/BaseComponent';
import Filter from './components/Filter';
import DGText from '../../components/DGText';

const Favorite = React.memo(({isExpanded, requestToggleExpand}) => {
  return <Board 
    title="FAVORITE PLAYER" 
    isExpanded={isExpanded}
    data={[]}
    requestToggleExpand={requestToggleExpand}
  />
})

const AllPlayer = React.memo(({isExpanded, requestToggleExpand}) => {
  return <Board 
    title="ALL PLAYER"
    isExpanded={isExpanded}
    data={[
      {
        index: 1,
        name: "OLIVER, Sam",
        total: -12
      },
      {
        index: 2,
        name: "Prase, Lee",
        total: -9
      },
      {
        index: 3,
        name: "Jack, Peter",
        total: -6
      },
      {
        index: 4,
        name: "Flash, James",
        total: -3
      },
      {
        index: 5,
        name: "OLIVER, Queen",
        total: 1
      },
      {
        index: 6,
        name: "Justin, Selena",
        total: 12
      }
    ]}
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
  return <DGText style={{ color: Theme.textWhite, fontStyle: 'italic', marginHorizontal: 16 + 30 + 8, fontSize: 12 }}>Empty Data</DGText>
})

const RankingItem = React.memo(({item, isHeader}) => {
  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: 16, height: 44 }}>
      <DGText style={{ marginHorizontal: isHeader ? 0 : 8, color: Theme.textWhite }}>{item.index}</DGText>
      <DGText style={{ 
        flex: 1,
        marginHorizontal: isHeader ? 16 : 16, 
        fontWeight: isHeader ? 'normal' : 'bold',
        color: Theme.textWhite 
      }}>{item.name}</DGText>
      <DGText style={{ marginHorizontal: isHeader ? 0 : 8, color: Theme.textWhite }}>{item.total}</DGText>
    </View>
  )
})

const Ranking = React.memo(({data}) => {
  const items = data.map(item => <RankingItem item={item} />)
  const header = <RankingItem item={{
    index: "Pos",
    name: "Name",
    total: "Total"
  }} isHeader={true} />
  return (
    <>
      {header}
      {items}
    </>
  )
})

const Board = React.memo(({title, isExpanded, data, requestToggleExpand}) => {
  return (
    <>
      <BoardHeader title={title} isExpanded={isExpanded} requestToggleExpand={requestToggleExpand}/>
      {isExpanded ? (data.length == 0 ? <EmptyData/> : <Ranking data={data} />) : undefined}
    </>
  )
})

export default class LeaderBoard extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    isFavoriteExpand: false,
    isAllExpand: true
  }
  
  render() {
    return (
      <BaseComponent>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false} >
          <Filter />
          <Favorite isExpanded={this.state.isFavoriteExpand} requestToggleExpand={() => this.setState({ isFavoriteExpand: !this.state.isFavoriteExpand })}/>
          <AllPlayer isExpanded={this.state.isAllExpand} requestToggleExpand={() => this.setState({ isAllExpand: !this.state.isAllExpand })}/>
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