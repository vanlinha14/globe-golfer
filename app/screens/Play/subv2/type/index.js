import React from 'react'
import {View, TouchableOpacity, Alert} from 'react-native'
import PlayersInfo from '../comps/PlayersInfo'
import Header from '../comps/Header'
import BaseComponent from '../../../../components/BaseComponent'
import Theme from '../../../../res/Theme'
import GameData from '../GameData'
import SelectItem from '../comps/CircleButton'

const gameTypes = [
  "Select the game type",
  "Putting green",
  "Chipping green",
  "Course 9 holes",
  "Course 18 holes"
]

export default class SelectType extends React.PureComponent {

  constructor(props) {
    super(props)

    const gameData = GameData.instance()

    this.state = {
      type: gameData.gameType ? gameData.gameType : 0
    }
  }

  updateGameType(type) {
    const gameData = GameData.instance()
    gameData.setGameType(type)
  
    this.setState({type})
  }

  onRequestChangeGameType = () => {
    Alert.alert(gameTypes[0], null, [
      {
        text: gameTypes[1],
        onPress: () => this.updateGameType(1)
      },
      {
        text: gameTypes[2],
        onPress: () => this.updateGameType(2)
      },
      {
        text: gameTypes[3],
        onPress: () => this.updateGameType(3)
      },
      {
        text: gameTypes[4],
        onPress: () => this.updateGameType(4)
      }
    ])
  }

  onRequestEditScore = () => {
    if (this.state.type == 0) {
      Alert.alert("Oops!", "Please select game type")
      return
    }

    this.props.navigation.navigate("EditResult2Player")
  }

  onRequestEnterScore = () => {
    if (this.state.type == 0) {
      Alert.alert("Oops!", "Please select game type")
      return
    }

    this.props.navigation.navigate("EnterFinalResult")
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
          <SelectItem value={gameTypes[this.state.type]} tint={Theme.buttonPrimary} onPress={this.onRequestChangeGameType} />
          <SelectItem value={"Edit score card"} tint="white" fixSize onPress={this.onRequestEditScore} />
          <SelectItem value={"Enter final result"} tint={Theme.buttonPrimary} fixSize onPress={this.onRequestEnterScore} />
        </View>
      </BaseComponent>
    )
  }
}