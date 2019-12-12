import React from 'react'
import {View, TouchableOpacity, Alert} from 'react-native'
import PlayersInfo from '../comps/PlayersInfo'
import Header from '../comps/Header'
import BaseComponent from '../../../../components/BaseComponent'
import DGText from '../../../../components/DGText'
import Theme from '../../../../res/Theme'
import GameData from '../GameData'

const SelectItem = React.memo(({value, tint, fixSize, onPress}) => {
  return (
    <TouchableOpacity style={{
      width: fixSize ? 90 : null,
      height: fixSize ? 90 : 50,
      borderRadius: 45,
      borderColor: tint,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16
    }} onPress={onPress}>
      <DGText style={{
        color: tint,
        fontSize: 16,
        paddingHorizontal: 16,
        textAlign: 'center'
        }}>{value}</DGText>
    </TouchableOpacity>
  )
})

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

  onRequestChangeGameType = () => {
    Alert.alert(gameTypes[0], null, [
      {
        text: gameTypes[1],
        onPress: () => this.setState({type: 1})
      },
      {
        text: gameTypes[2],
        onPress: () => this.setState({type: 2})
      },
      {
        text: gameTypes[3],
        onPress: () => this.setState({type: 3})
      },
      {
        text: gameTypes[4],
        onPress: () => this.setState({type: 4})
      }
    ])
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
          <SelectItem value={"Edit score card"} tint="white" fixSize />
          <SelectItem value={"Enter final result"} tint={Theme.buttonPrimary} fixSize />
        </View>
      </BaseComponent>
    )
  }
}