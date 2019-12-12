import React from 'react'
import {View, TouchableOpacity, Alert} from 'react-native'
import Theme from '../../../../res/Theme'
import DGText from '../../../../components/DGText'

const ScoreInput = React.memo(({value, onRequestChange}) => {
  return (
    <TouchableOpacity style={{
      width: 60,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: Theme.buttonPrimary,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8
    }} onPress={onRequestChange}>
      <DGText style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
      }}>{value}</DGText>
    </TouchableOpacity>
  )
})

export default React.memo(({
  playerAScore, 
  onPlayerAScoreChanged,
  playerBScore, 
  onPlayerBScoreChanged,
  editable
}) => {

  onRequestAScoreChanged = () => {
    onRequestScoreChanged(onPlayerAScoreChanged)
  }

  onRequestBScoreChanged = () => {
    onRequestScoreChanged(onPlayerBScoreChanged)
  }

  onRequestScoreChanged = (callback) => {
    Alert.alert("Select score", null, [0,1,2,3,4,5,6,7,8,9].map(i => {
      return {
        text: i + "", onPress: () => callback(i)
      }
    }))
  }

  return (
    <View style={{
      height: 60,
      borderRadius: 30,
      borderWidth: 2,
      paddingHorizontal: 10,
      borderColor: Theme.buttonPrimary,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <ScoreInput value={playerAScore} onRequestChange={onRequestAScoreChanged} />
      <ScoreInput value={"&"} />
      <ScoreInput value={playerBScore} onRequestChange={onRequestBScoreChanged} />
    </View>
  )
})