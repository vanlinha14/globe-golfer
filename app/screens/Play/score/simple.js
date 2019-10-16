import React from 'react'
import { View, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import DialogCombination from '../../../components/DialogCombination';
import Header from '../components/Header';
import PendingItem from '../components/PendingItem'
import MatchInfo from '../configuration/MatchInfo'
import BaseComponent from '../../../components/BaseComponent'
import LoadingModal from '../../../components/LoadingModal'
import Theme from '../../../res/Theme';
import DGText from '../../../components/DGText';
import { showErrorAlert } from '../../../utils';
import Api from '../../../api';

const ScoreInput = React.memo(({onValueChanged}) => {
  return (
    <View style={{
      width: 100,
      height: 100,
      borderRadius: 100,
      backgroundColor: Theme.buttonPrimary
    }}>
      <TextInput style={{
          width: 100,
          height: 100,
          borderRadius: 100,
          textAlign: 'center',
          fontSize: 32,
          color: 'white'
        }} 
        placeholder="-"
        keyboardType='number-pad'
        onChangeText={onValueChanged}
      />
    </View>
  )
})

const Spacing = React.memo(() => {
  return <View style={{ height: 32 }} />
})

const SendButton = React.memo(({onPress}) => {
  return (
    <TouchableOpacity style={{
      width: 200,
      height: 44,
      marginTop: 56,
      backgroundColor: Theme.buttonPrimary,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    }} activeOpacity={0.7} onPress={onPress}>
      <DGText style={{color: 'white', fontSize: 18}}>Submit</DGText>
    </TouchableOpacity>
  )
})

class SimpleScoreCard extends React.PureComponent {

  state = {
    loading: false
  }

  score1 = null
  score2 = null

  onRequestSubmit = () => {
    if (this.score1 == null || this.score2 == null) {
      showErrorAlert("Please enter the scores")
      return
    }

    const gameData = this.props.navigation.getParam("gameData")
    const gameId = this.props.navigation.getParam("id")
    this.props.navigation.navigate("SimpleFinal", {
      score1: this.score1, 
      score2: this.score2, 
      gameData,
      gameId
    })
  }

  onScoreChanged1 = (score) => {
    this.score1 = score
  }

  onScoreChanged2 = (score) => {
    this.score2 = score
  }

  render() {
    const item = this.props.navigation.getParam("data")
    return (
      <BaseComponent>
        <Header />
        <DialogCombination>
          <View style={{ minHeight: Dimensions.get('window').height }}>  
            <MatchInfo title="Match Result"/>
            <Spacing />
            <PendingItem item={item} viewOnly={true} />
            <DGText style={{
              color: 'white', 
              fontSize: 20,
              alignSelf: 'center'
            }}>Enter The Score</DGText>
            <View style={{
              marginTop: 32,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <ScoreInput onValueChanged={this.onScoreChanged1}/>
              <DGText style={{marginHorizontal: 24, color: 'white', fontSize: 24}}>-</DGText>
              <ScoreInput onValueChanged={this.onScoreChanged2}/>
            </View>
            <SendButton onPress={this.onRequestSubmit} />
          </View>
          <LoadingModal visible={this.state.loading} />
        </DialogCombination>
      </BaseComponent>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SimpleScoreCard)