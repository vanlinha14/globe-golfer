import React from 'react'
import {View, Alert} from 'react-native'
import { connect } from 'react-redux'
import PlayersInfo from '../comps/PlayersInfo'
import Header from '../comps/Header'
import BaseComponent from '../../../../components/BaseComponent'
import SelectItem from '../comps/CircleButton'
import GameData from '../GameData'
import ScoreBoard from '../comps/ScoreBoard'
import Api from '../../../../api'
import { getPendingMatches } from '../../../../actions/getPendingMatches'
import { getPlayedMatches } from '../../../../actions/getPlayedMatches'
import LoadingModal from '../../../../components/LoadingModal'

class EnterFinalResult extends React.PureComponent {

  state = {
    loading: false,
    scoreA: 0,
    scoreB: 0,
    relation: "&"
  }

  onRequestSubmit = () => {
    if (this.state.scoreA == 0 && this.state.scoreB == 0) {
      Alert.alert("Oops!", "Please select score for each player!")
      return
    }

    const gameData = GameData.instance()

    this.setState({loading: true})

    Api.instance().updateMatchResult(
      gameData.gameId,
      gameData.playerA.id, 
      gameData.playerB.id, 
      this.state.scoreA, 
      this.state.scoreB
    ).then(_ => {
      this.props.getPendingMatches()
      this.props.getPlayedMatches()

      this.setState({loading: false})

      setTimeout(() => {
        Alert.alert("Submit successfully!", "Your request has been submitted. Wait for the approval from your competitor.", [
          {
            text: "OK",
            onPress: () => this.props.navigation.popToTop()
          }
        ])
      }, 500)
    })
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
        {/* <LoadingModal visible={true} /> */}
      </BaseComponent>
    )
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = (dispatch) => ({
  getPendingMatches: () => dispatch(getPendingMatches()),
  getPlayedMatches: () => dispatch(getPlayedMatches())
})

export default connect(mapStateToProps, mapDispatchToProps)(EnterFinalResult)