import React from 'react'
import { View, Alert, Dimensions, TextInput, SafeAreaView, ScrollView } from 'react-native'
import lodash from 'lodash';
import Header from './Header';
import DGText from '../../../components/DGText';
import Theme from '../../../res/Theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Strings from '../../../res/Strings';
import { getPendingMatches } from '../../../actions/getPendingMatches';
import { getPlayedMatches } from '../../../actions/getPlayedMatches';
import { connect } from 'react-redux'

const Input = React.memo(({value, editable, backgroundColor, color, onValueChange}) => {
  return (
    <TextInput 
      style={{
        width: 50,
        height: 50,
        borderRadius: 8,
        backgroundColor,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color
      }}
      value={value}
      placeholder={"-"}
      keyboardType={'numeric'}
      editable={editable}
      onChangeText={onValueChange}
    />
  )
})

const Text = React.memo(({text}) => {
  return (
    <DGText style={{
      width: 50, 
      color: Theme.textWhite, 
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    }}>{text}</DGText>
  )
})

const GameHeader = React.memo(() => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8, marginVertical: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 50 * 2 + 8}}>
        <Text text={"Match"} />
        <Text text={"Score"} />
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 50 * 2 + 8}}>
        <Text text={"Hole"} />
        <Text text={"Par"} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 50 * 2 + 8}}>
      <Text text={"Score"} />
        <Text text={"Match"} />
      </View>
    </View>
  )
})

class RowItem extends React.PureComponent {
  youMatch = null
  youScore = null

  himMatch = null
  himScore = null

  onYouMatchChange = (v) => {
    this.youMatch = v
  }

  onYouScoreChange = (v) => {
    this.youScore = v
    
    if (this.youScore && this.himScore && this.props.onGameResultUpdate) {
      const game = this.props.game
      this.props.onGameResultUpdate(this.youScore, this.himScore, game.hole, game.par)
    }
  }

  onHimMatchChange = (v) => {
    this.himMatch = v
  }

  onHimScoreChange = (v) => {
    this.himScore = v
    
    if (this.youScore && this.himScore && this.props.onGameResultUpdate) {
      const game = this.props.game
      this.props.onGameResultUpdate(this.youScore, this.himScore, game.hole, game.par)
    }
  }

  render() {
    const game = this.props.game
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8, marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 50 * 2 + 8}}>
          <Input backgroundColor={"#FFFFFF"} color={"#000000"} value={undefined} onValueChange={this.onYouMatchChange}/>
          <Input backgroundColor={"#EC6907"} color={"#FFFFFF"} value={undefined} onValueChange={this.onYouScoreChange}/>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 50 * 2 + 8}}>
          <Input backgroundColor={Theme.buttonPrimary} color={"#FFFFFF"} value={game.hole + ""} editable={false}/>
          <Input backgroundColor={Theme.buttonPrimary} color={"#FFFFFF"} value={game.par + ""} editable={false}/>
        </View>
  
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 50 * 2 + 8}}>
          <Input backgroundColor={"#EC6907"} color={"#FFFFFF"} value={undefined} onValueChange={this.onHimScoreChange}/>
          <Input backgroundColor={"#FFFFFF"} color={"#000000"} value={undefined} onValueChange={this.onHimMatchChange}/>
        </View>
      </View>
    )
  }
}

export default class ScoreCard extends React.PureComponent {

  gameResult = []

  onGameResultUpdate = (youScore, himScore, hole, par) => {
    const gameId = this.props.navigation.getParam("id")
    const youId = this.props.navigation.getParam("youId")
    const himId = this.props.navigation.getParam("himId")
    const item = {
      scheduleId: gameId,
      user_first_id: youId,
      user_second_id: himId,
      score_user_first: youScore,
      score_user_second: himScore,
      hole_number: hole,
      par_number: par,
      status: 1
    }
    
    this.gameResult.push(item)
    this.gameResult = lodash.uniqBy(this.gameResult, 'hole_number')
  }

  onRequestSaveScoreCard = () => {
    const gameInfo = this.props.navigation.getParam("info")
    const gameData = this.props.navigation.getParam("gameData")
    if (this.gameResult.length == gameInfo.count) {
      this.props.navigation.navigate("Final", {game: this.gameResult, data: gameData})
    }
    else {
      Alert.alert(Strings.appName, 'You are not finish the game!')
    }
  }

  onRequestGoBack = () => {
    Alert.alert(
      Strings.appName, 
      'Are you sure to quit the game. You will not able to play this game anymore!',
      [
        {
          text: "Yes",
          style: 'default',
          onPress: () => {
            this.props.getPendingMatches()
            this.props.getPlayedMatches()
            this.props.navigation.popToTop()
          }
        },
        {
          text: "No",
          style: 'cancel'
        }
      ]
    )
  }

  render() {
    const gameInfo = this.props.navigation.getParam("info")
    const gamedata = gameInfo.data.filter(i => i.hole >= gameInfo.start && i.hole < (gameInfo.start + gameInfo.count))
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Theme.mainBackground}}>
        <Header 
          onRequestGoBack={this.onRequestGoBack}
          onRequestSaveScoreCard={this.onRequestSaveScoreCard}
        />
        <GameHeader />
        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={{ minHeight: Dimensions.get('window').height }}>
            {
              gamedata.map(game => <RowItem game={game} onGameResultUpdate={this.onGameResultUpdate}/>)
            }
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}


const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  getPendingMatches: () => dispatch(getPendingMatches()),
  getPlayedMatches: () => dispatch(getPlayedMatches())
})

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCard)