import React from 'react'
import {View, Alert} from 'react-native'
import PlayersInfo from '../comps/PlayersInfo'
import Header from '../comps/Header'
import BaseComponent from '../../../../components/BaseComponent'
import SelectItem from '../comps/CircleButton'
import GameData from '../GameData'
import ScoreBoard from '../comps/ScoreBoard'

export default class EnterFinalResult extends React.PureComponent {

  state = {
    scoreA: 0,
    scoreB: 0,
    relation: "&"
  }

  onRequestSubmit = () => {
    if (this.state.scoreA == 0 && this.state.scoreB == 0) {
      Alert.alert("Oops!", "Please select score for each player!")
      return
    }

    alert("Submit to api")
  }

  render() {

    const gameData = GameData.instance()

    return (
      <BaseComponent>
        <Header />
        <PlayersInfo 
          playerA={gameData.playerA}
          playerB={gameData.playerB}
        />
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 24
        }}>
          <ScoreBoard 
            editable
            playerAScore={this.state.scoreA}
            playerBScore={this.state.scoreB}
            gameRelation={this.state.relation}
            onPlayerAScoreChanged={(score) => this.setState({scoreA: score})}
            onPlayerBScoreChanged={(score) => this.setState({scoreB: score})}
            onGameRelationChanged={(relation) => this.setState({relation})}
          />
          <View style={{height: 24}} />
          <SelectItem value={"submit the result"} tint={Theme.buttonPrimary} fixSize onPress={this.onRequestSubmit} />
        </View>
      </BaseComponent>
    )
  }
}