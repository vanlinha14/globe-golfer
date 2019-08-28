import React from 'react'
import { View, TouchableOpacity, Dimensions, TextInput, SafeAreaView, ScrollView } from 'react-native'
import DialogCombination from '../../../components/DialogCombination';
import Header from '../components/Header';
import DGText from '../../../components/DGText';
import Theme from '../../../res/Theme';

const GAME = [
  { hole: 1, par: 4 },
  { hole: 2, par: 3 },
  { hole: 3, par: 5 },
  { hole: 4, par: 4 },
  { hole: 5, par: 6 },
  { hole: 6, par: 3 },
  { hole: 7, par: 3 },
  { hole: 8, par: 2 },
  { hole: 9, par: 5 }
]

const Input = React.memo(({value, editable, backgroundColor, color}) => {
  return (
    <TextInput 
      style={{
        width: 56,
        height: 56,
        borderRadius: 8,
        backgroundColor,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color
      }}
      value={value}
      editable={editable}
    />
  )
})

const Text = React.memo(({text}) => {
  return (
    <DGText style={{
      width: 56, 
      color: Theme.textWhite, 
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    }}>{text}</DGText>
  )
})

const GameHeader = React.memo(() => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8, marginVertical: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 56 * 2 + 8}}>
        <Text text={"Match"} />
        <Text text={"Score"} />
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 56 * 2 + 8}}>
        <Text text={"Hole"} />
        <Text text={"Par"} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 56 * 2 + 8}}>
      <Text text={"Score"} />
        <Text text={"Match"} />
      </View>
    </View>
  )
})

const RowItem = React.memo(({game}) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 56 * 2 + 8}}>
        <Input backgroundColor={"#FFFFFF"} color={"#000000"} value={"-"} />
        <Input backgroundColor={"#EC6907"} color={"#FFFFFF"} value={"-"} />
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 56 * 2 + 8}}>
        <Input backgroundColor={Theme.buttonPrimary} color={"#FFFFFF"} value={game.hole + ""} editable={false}/>
        <Input backgroundColor={Theme.buttonPrimary} color={"#FFFFFF"} value={game.par + ""} editable={false}/>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 56 * 2 + 8}}>
        <Input backgroundColor={"#EC6907"} color={"#FFFFFF"} value={"-"} />
        <Input backgroundColor={"#FFFFFF"} color={"#000000"} value={"-"} />
      </View>
    </View>
  )
})

export default class ScoreCard extends React.PureComponent {

  state = {
    game: undefined,
    course: undefined
  }

  render() {
    const item = this.props.navigation.getParam("data")
    const user = this.props.navigation.getParam("user")
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: Theme.mainBackground}}>
        <Header />
        <GameHeader />
        <ScrollView style={{flex: 1}}>
          <View style={{ minHeight: Dimensions.get('window').height }}>
            {
              GAME.map(game => <RowItem game={game} />)
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}