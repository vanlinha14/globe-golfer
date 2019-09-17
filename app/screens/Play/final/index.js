import React from 'react'
import { View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import { getGameMode } from '../../../actions/getGameMode'
import DGText from '../../../components/DGText'
import DialogCombination from '../../../components/DialogCombination';
import Header from '../components/Header';
import PendingItem from '../components/PendingItem'
import Theme from '../../../res/Theme';
import MatchInfo from './MatchInfo'
import CurrentConfiguration from './CurrentConfiguration'
import { useNavigation } from 'react-navigation-hooks';
import BaseComponent from '../../../components/BaseComponent'
import Api from '../../../api'
import { getPendingMatches } from '../../../actions/getPendingMatches'
import { getPlayedMatches } from '../../../actions/getPlayedMatches'

// const COURSES = [
//   "La vallée",
//   "La forêt",
//   "Les coteaux"
// ]

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

const GameConfiguration = React.memo(({challengeId, userId, fromId, toId, game, course, gameMode, courses, onGameSelected, onCourseSelected}) => {

  const { navigate } = useNavigation()

  const gotoScoreCard = () => {
    Api.instance().getMatchInfo(63).then(res => {
      const objToSend = {
        info: res, 
        id: 63,
        youId: userId,
        himId: userId == fromId ? toId : fromId
      }

      navigate("ScoreCard", objToSend)
    })
    // Api.instance().createMatch(game.id, course.id, challengeId)
    // .then(res => {
    //   // alert(JSON.stringify(res))
    //   navigate("ScoreCard")
    // })
    // .catch(ex => {
    //   alert(JSON.stringify(ex))
    // })
  }

  let title = undefined
  if (game === undefined) {
    title = "Select your Game"
  } else if (course === undefined) {
    title = "Select your Course"
  }

  let content = undefined
  if (game === undefined) {
    if (Array.isArray(gameMode)) {
      content = gameMode.map((i, index) => <SelectItem 
        key={`game-item-${index}`} 
        index={index}
        content={i.content}
        onPress={onGameSelected} 
      />)
    }
    else {
      <ActivityIndicator />
    }
  }
  else if (course === undefined) {
    content = courses.map((i, index) => <SelectItem 
      key={`game-item-${index}`} 
      index={index}
      content={i.name} 
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

const SignButton = React.memo(({onPress}) => {
  return (
    <TouchableOpacity style={{
      width: 200,
      height: 44,
      backgroundColor: Theme.buttonPrimary,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
    }} activeOpacity={0.7} onPress={onPress}>
      <DGText style={{color: 'white', fontSize: 18}}>Sign and send</DGText>
    </TouchableOpacity>
  )
})

const Result = React.memo(({gameResult}) => {

  let lScore = 0
  let rScore = 0

  gameResult.forEach(g => {
    if (g.score_user_first < g.score_user_second) {
      lScore++
    }
    else if (g.score_user_first > g.score_user_second) {
      rScore++
    }
  });

  return (
    <View style={{
      width: 180,
      height: 180,
      alignSelf: 'center',
      marginVertical: 20,
      borderRadius : 90,
      backgroundColor: 'gray',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <DGText style={{color: 'white', fontSize: 28}}>{lScore + " & " + rScore}</DGText>
    </View>
  )
})

class Final extends React.PureComponent {

  onSign = () => {
    const game = this.props.navigation.getParam("game")
    
    Api.instance().updateGameResult(game).then(_ => {
      this.props.getPendingMatches()
      this.props.getPlayedMatches()

      this.props.navigation.popToTop()
    })
  }
  
  render() {
    const item = this.props.navigation.getParam("data")
    const game = this.props.navigation.getParam("game")
    return (
      <BaseComponent>
        <Header />
        <DialogCombination>
          <View style={{ minHeight: Dimensions.get('window').height }}>  
            <MatchInfo />
            <Spacing />
            <PendingItem item={item} viewOnly={true} />
            <Result gameResult={game}/>
            <SignButton onPress={this.onSign} />
          </View>
        </DialogCombination>
      </BaseComponent>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.profile.user,
  gameModeData: state.gameMode
})

const mapDispatchToProps = (dispatch) => ({
  getGameMode: () => dispatch(getGameMode()),
  getPendingMatches: () => dispatch(getPendingMatches()),
  getPlayedMatches: () => dispatch(getPlayedMatches())
})

export default connect(mapStateToProps, mapDispatchToProps)(Final)