import React from 'react'
import {View, ScrollView} from 'react-native'
import PlayersInfo from '../comps/PlayersInfo'
import Header from '../comps/Header'
import BaseComponent from '../../../../components/BaseComponent'
import Theme from '../../../../res/Theme'
import GameData from '../GameData'
import DGText from '../../../../components/DGText'
import SelectItem from '../comps/CircleButton'

const ResultRow = React.memo(({result}) => {
  return (
    <View style={{width: '80%', height: 30, marginBottom: 8, flexDirection: 'row'}}>
      <View style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        height: 30,
        width: '30%',
        borderColor: 'white',
        backgroundColor: result.result == 1 ? Theme.buttonPrimary : null
      }}/>
      <View style={{
        borderWidth: 1,
        borderColor: 'white',
        height: 30,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: result.result == 0 ? Theme.buttonPrimary : null
      }}><DGText style={{color: 'white'}}>{result.hole}</DGText></View>
      <View style={{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        height: 30,
        width: '30%',
        borderColor: 'white',
        backgroundColor: result.result == 2 ? Theme.buttonPrimary : null
      }}/>
    </View>
  )
})

export default class Overview extends React.PureComponent {

  onRequestRecord = () => {
    alert("TODO: call api to submit result of the game")
  }

  render() {

    const gameData = GameData.instance()
    const gameResults = gameData.gameResults

    return (
      <BaseComponent>
        <Header />
        <PlayersInfo 
          playerA={gameData.playerA}
          playerB={gameData.playerB}
        />
        <ScrollView contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
          {gameResults.map(g => <ResultRow result={g} />)}
          <View style={{height: 20}}/>
          <SelectItem value={"Record"} tint={Theme.buttonPrimary} fixSize onPress={this.onRequestRecord} />
        </ScrollView>
      </BaseComponent>
    )
  }
}