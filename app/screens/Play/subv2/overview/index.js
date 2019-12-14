import React from 'react'
import {View, ScrollView, TouchableOpacity} from 'react-native'
import PlayersInfo from '../comps/PlayersInfo'
import Header from '../comps/Header'
import BaseComponent from '../../../../components/BaseComponent'
import Theme from '../../../../res/Theme'
import GameData from '../GameData'
import DGText from '../../../../components/DGText'
import SelectItem from '../comps/CircleButton'
import ScoreBoard from '../comps/ScoreBoard'

const ResultRow = React.memo(({result, requestChangeResult}) => {

  const [localState, setLocalState] = React.useState(result)

  const requestChangeResultTo = (newResult) => {
    if (newResult == localState.result) {
      return
    }

    setLocalState({result: newResult})
    requestChangeResult(result.hole, newResult)
  }

  return (
    <View style={{width: '80%', height: 30, marginBottom: 8, flexDirection: 'row'}}>
      <TouchableOpacity style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        height: 30,
        width: '30%',
        borderColor: 'white',
        backgroundColor: localState.result == 1 ? Theme.buttonPrimary : null
      }} onPress={() => requestChangeResultTo(1)} />
      <TouchableOpacity style={{
        borderWidth: 1,
        borderColor: 'white',
        height: 30,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: localState.result == 0 ? Theme.buttonPrimary : null
      }} onPress={() => requestChangeResultTo(0)}>
        <DGText style={{color: 'white'}}>{result.hole}</DGText>
      </TouchableOpacity>
      <TouchableOpacity style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        height: 30,
        width: '30%',
        borderColor: 'white',
        backgroundColor: localState.result == 2 ? Theme.buttonPrimary : null
      }} onPress={() => requestChangeResultTo(2)} />
    </View>
  )
})

export default class Overview extends React.Component {

  state = {
    mode: "view",
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextState.version != this.state.version) {
      return true
    }

    if (nextState.mode != this.state.mode) {
      return true
    }

    return false
  };

  onRequestRecord = () => {
    if (this.state.mode == "view") {
      alert("TODO: call api to submit result of the game")
    }
    else {
      this.setState({mode: 'view'})
    }
    
  }

  requestChangeResult = (hole, newResult) => {
    const gameData = GameData.instance()
    const gameResults = gameData.gameResults

    gameResults[hole - 1].result = newResult
  }

  renderContent() {
    const gameData = GameData.instance()
    const gameResults = gameData.gameResults

    if (this.state.mode == "view") {

      let sA = 0
      let sB = 0
      
      gameResults.forEach(g => {
        if (g.result == 1) {
          sA++
        }
        else if (g.result == 2) {
          sB++
        }
      });

      return (
        <ScoreBoard
          playerAScore={sA}
          playerBScore={sB}
          gameRelation={"&"}
        />
      )
    }
    else {
      return gameResults.map(g => <ResultRow 
        key={g.hole} 
        result={g} 
        requestChangeResult={this.requestChangeResult}
      />)
    }
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
        <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
          {this.renderContent()}
          <View style={{height: 20}}/>
          <SelectItem 
            value={this.state.mode == "view" ? "Sign" : "Record"} 
            tint={Theme.buttonPrimary} 
            fixSize 
            onPress={this.onRequestRecord} 
          />
          {this.state.mode == "view" ? (<View style={{marginVertical: 4}}>
            <SelectItem 
              value={"Edit full scorecard"} 
              tint={Theme.buttonPrimary} 
              onPress={() => this.setState({mode: "edit"})} 
            />
          </View>) : undefined}
        </ScrollView>
      </BaseComponent>
    )
  }
}