import React from 'react'
import { View, Dimensions, TextInput, SafeAreaView } from 'react-native'
import Header from './Header';
import DGText from '../../../components/DGText';
import Theme from '../../../res/Theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  render() {
    const game = this.props.game
    return (
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8, marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 50 * 2 + 8}}>
          <Input 
            backgroundColor={"#FFFFFF"} 
            color={"#000000"} 
            value={game.up1 + ""} 
            editable={false}
          />
          <Input 
            backgroundColor={"#EC6907"} 
            color={"#FFFFFF"} 
            value={game.score1 + ""} 
            editable={false}
          />
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 50 * 2 + 8}}>
          <Input 
            backgroundColor={Theme.buttonPrimary} 
            color={"#FFFFFF"} 
            value={game.holeNumber + ""} 
            editable={false}
          />
          <Input 
            backgroundColor={Theme.buttonPrimary} 
            color={"#FFFFFF"} 
            value={game.par + ""} 
            editable={false}
          />
        </View>
  
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 50 * 2 + 8}}>
          <Input 
            backgroundColor={"#EC6907"} 
            color={"#FFFFFF"} 
            value={game.score2 + ""} 
            onValueChange={this.onHimScoreChange}
          />
          <Input 
            backgroundColor={"#FFFFFF"} 
            color={"#000000"} 
            value={game.up2 + ""} 
            onValueChange={this.onHimMatchChange}
          />
        </View>
      </View>
    )
  }
}

export default class MatchResult extends React.PureComponent {
  render() {
    const gamedata = this.props.navigation.getParam("data")
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