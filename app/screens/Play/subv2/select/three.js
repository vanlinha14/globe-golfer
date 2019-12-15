import React from 'react'
import {View} from 'react-native'
import Header from '../comps/Header'
import BaseComponent from '../../../../components/BaseComponent'
import Theme from '../../../../res/Theme'
import GameData from '../GameData'
import DGText from '../../../../components/DGText'
import SelectItem from '../comps/CircleButton'
import PlayersInfo3 from '../comps/PlayersInfo3'

export default class Select3rdPlayer extends React.PureComponent {

  onRequestAddGGMember = () => {
    alert("request add gg member")
  }

  onRequestAddGuest = () => {
    this.props.navigation.navigate("AddGuest")
  }

  render() {

    const gameData = GameData.instance()

    return (
      <BaseComponent>
        <Header />
        <PlayersInfo3
          playerA={gameData.playerA}
          playerB={gameData.playerB}
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <DGText style={{color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 16}}>{"Add 3rd Player"}</DGText>
          <SelectItem 
            value={"Global golfer member"} 
            tint={Theme.buttonPrimary} 
            fixSize 
            size={100} 
            onPress={this.onRequestAddGGMember} 
          />
          <SelectItem 
            value={"Guest"} 
            tint={Theme.buttonPrimary} 
            fixSize 
            size={100} 
            onPress={this.onRequestAddGuest} 
          />  
        </View>
      </BaseComponent>
    )
  }
}