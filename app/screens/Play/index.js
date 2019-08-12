import React, { PureComponent } from 'react'
import { ActivityIndicator, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Icon from 'react-native-vector-icons/Ionicons'

import Header from './components/Header'
import BaseComponent from '../../components/BaseComponent';
import DGText from '../../components/DGText';
import { getPendingMatches } from '../../actions/getPendingMatches';
import { getPlayedMatches } from '../../actions/getPlayedMatches';
import DialogCombination from '../../components/DialogCombination';

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

const PendingItems = React.memo(({isLoading, data}) => {
  if (isLoading || data == null) {
    return <ActivityIndicator size='large' color={Theme.buttonPrimary} />
  }

  return data.map((item, index) => <PendingItem key={`pending-item-${index}`} item={item}/>)
})

const PendingBlock = React.memo(({isLoading, isExpanded, requestToggleExpand, data}) => {
  return (
    <>
      <BoardHeader title={"PENDING"} isExpanded={isExpanded} requestToggleExpand={requestToggleExpand}/>
      {isExpanded ? <PendingItems isLoading={isLoading} data={data} /> : undefined}
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

const PlayedItems = React.memo(({isLoading, data}) => {
  if (isLoading || data == null) {
    return <ActivityIndicator size='large' color={Theme.buttonPrimary} />
  }

  return data.map((item, index) => <PlayedItem key={`played-item-${index}`} item={item}/>)
})

const PlayedBlock = React.memo(({isLoading, isExpanded, requestToggleExpand, data}) => {
  return (
    <>
      <BoardHeader title={"PLAYED"} isExpanded={isExpanded} requestToggleExpand={requestToggleExpand}/>
      {isExpanded ? <PlayedItems isLoading={isLoading} data={data} /> : undefined}
    </>
  )
})

class Play extends PureComponent {
  static navigationOptions = { header: null }

  componentDidMount() {
    this.props.getPendingMatches()
  }

  state = {
    isPendingExpand: true,
    isPlayedExpand: false
  }

  requestTogglePendingBlock = () => {
    const nextValue = !this.state.isPendingExpand

    if (nextValue == true) {
      this.props.getPendingMatches()
    }

    this.setState({ isPendingExpand: nextValue })
  }

  requestTogglePlayedBlock = () => {
    const nextValue = !this.state.isPlayedExpand

    if (nextValue == true) {
      this.props.getPlayedMatches()
    }

    this.setState({ isPlayedExpand: nextValue })
  }
  
  render() {
    return (
      <BaseComponent>
        <Header />
        <DialogCombination>
          <Title />
          <PendingBlock 
            data={this.props.pendingData.data}
            isExpanded={this.state.isPendingExpand}
            isLoading={this.props.pendingData.isLoading}
            requestToggleExpand={this.requestTogglePendingBlock} 
          />
          <PlayedBlock 
            data={this.props.playedData.data}
            isExpanded={this.state.isPlayedExpand} 
            isLoading={this.props.playedData.isLoading}
            requestToggleExpand={this.requestTogglePlayedBlock} 
          />
        </DialogCombination>
      </BaseComponent>
    )
  }
}

const mapStateToProps = (state) => ({
  pendingData: state.matches.pending,
  playedData: state.matches.played 
})

const mapDispatchToProps = (dispatch) => ({
  getPendingMatches: () => dispatch(getPendingMatches()),
  getPlayedMatches: () => dispatch(getPlayedMatches())
})

export default connect(mapStateToProps, mapDispatchToProps)(Play)