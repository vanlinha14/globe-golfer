import React from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import DGText from '../../../components/DGText'
import DialogCombination from '../../../components/DialogCombination';
import Header from '../components/Header';
import PendingItem from '../components/PendingItem'
import Theme from '../../../res/Theme';
import MatchInfo from './MatchInfo'
import CurrentConfiguration from './CurrentConfiguration'
import { useNavigation } from 'react-navigation-hooks';

const GAMES = [
  "Front 9",
  "Back 9",
  "18",
  "Putting Green"
]

const COURSES = [
  "La vallée",
  "La forêt",
  "Les coteaux"
]

const SelectItem = React.memo(({index, content, onPress}) => {

  const __onPress = () => {
    onPress(index)
  }

  return (
    <TouchableOpacity style={{
      width: 160,
      height: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Theme.buttonPrimary,
      marginBottom: 2
    }} activeOpacity={0.7} onPress={__onPress}>
      <DGText style={{ color: Theme.textWhite }} >{content}</DGText>
    </TouchableOpacity>
  )
})

const GameConfiguration = React.memo(({game, course, onGameSelected, onCourseSelected}) => {

  const { navigate } = useNavigation()

  const gotoScoreCard = () => {
    navigate("ScoreCard")
  }

  let title = undefined
  if (game === undefined) {
    title = "Select your Game"
  } else if (course === undefined) {
    title = "Select your Course"
  }

  let content = undefined
  if (game === undefined) {
    content = GAMES.map((i, index) => <SelectItem 
      key={`game-item-${index}`} 
      index={index}
      content={i}
      onPress={onGameSelected} 
    />)
  }
  else if (course === undefined) {
    content = COURSES.map((i, index) => <SelectItem 
      key={`game-item-${index}`} 
      index={index}
      content={i} 
      onPress={onCourseSelected} 
    />)
  } else {
    content = <SelectItem 
      content={"Edit your scorecard"} 
      onPress={gotoScoreCard} 
    />
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 24 }}>
      <DGText style={{ fontSize: 20, color: Theme.textWhite, marginBottom: 20 }} >{title}</DGText>
      {content}
    </View>
  )
})

const Spacing = React.memo(() => {
  return <View style={{ height: 32 }} />
})

export default class PlayConfiguration extends React.PureComponent {

  state = {
    game: undefined,
    course: undefined
  }

  onGameSelected = (index) => {
    this.setState({ game: GAMES[index] })
  }

  onCourseSelected = (index) => {
    this.setState({ course: COURSES[index] })
  }

  render() {
    const item = this.props.navigation.getParam("data")
    return (
      <DialogCombination>
        <View style={{ minHeight: Dimensions.get('window').height }}>
          <Header />
          <MatchInfo />
          <Spacing />
          <PendingItem item={item} viewOnly={true} />
          <CurrentConfiguration game={this.state.game} course={this.state.course} />
          <GameConfiguration 
            game={this.state.game} 
            course={this.state.course} 
            onGameSelected={this.onGameSelected}
            onCourseSelected={this.onCourseSelected}  
          />
        </View>
      </DialogCombination>
    )
  }
}