import React from 'react'
import {View, TouchableOpacity} from 'react-native'
import PlayersInfo from '../comps/PlayersInfo'
import Header from '../comps/Header'
import BaseComponent from '../../../../components/BaseComponent'
import DGText from '../../../../components/DGText'
import Theme from '../../../../res/Theme'

const playerA = {
  avatar: "https://ideapod.com/wp-content/uploads/2017/06/stencil.facebook-post-20.jpg",
  name: "Alexandre M"
}

const playerB = {
  avatar: "https://www.midlandsderm.com/wp-content/uploads/2019/04/Rachel-R.-Person.jpg",
  name: "Frencois B"
}

const NumberItem = React.memo(({value, onPress}) => {
  return (
    <TouchableOpacity style={{
      width: 80,
      height: 80,
      borderRadius: 40,
      borderColor: Theme.buttonPrimary,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16
    }} onPress={onPress}>
      <DGText style={{
        color: Theme.buttonPrimary,
        fontSize: 50
        }}>{value}</DGText>
    </TouchableOpacity>
  )
})

const NumberSelector = React.memo(({onChanged}) => {

  const [localState, setLocalState] = React.useState({index: 0})

  const onNumberPress = (n) => {
    if (n != localState.index) {
      onChanged(n)
    }

    setLocalState({index: n})
  }

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <DGText style={{
        color: 'gray',
        fontSize: 20,
        marginTop: 24,
        marginBottom: 16
      }}>{"Numbers of players"}</DGText>
      <NumberItem value={2} onPress={() => onNumberPress(2)}/>
      <NumberItem value={3} onPress={() => onNumberPress(3)}/>
      <NumberItem value={4} onPress={() => onNumberPress(4)}/>
    </View>
  )
})

export default class SelectNumber extends React.PureComponent {

  onSelectionChanged = (index) => {
    alert(index)
  }

  render() {
    return (
      <BaseComponent>
        <Header />
        <PlayersInfo 
          playerA={playerA}
          playerB={playerB}
        />
        <NumberSelector onChanged={this.onSelectionChanged} />
      </BaseComponent>
    )
  }
}