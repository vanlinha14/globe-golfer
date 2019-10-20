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
import BaseComponent from '../../../components/BaseComponent'
import Api from '../../../api'
import LoadingModal from '../../../components/LoadingModal'
import Ads from '../../../components/Ads'

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

const GameConfiguration = React.memo(({
  gameData, 
  challengeId, 
  userId, 
  fromId, 
  toId, 
  game, 
  course, 
  gameMode, 
  courses, 
  onGameSelected, 
  onCourseSelected,
  onBeginGotoScoreCard,
  onEndGotoScoreCard
}) => {

  const gotoScoreCard = () => {
    onBeginGotoScoreCard();

    Api.instance().createMatch(game.id, course.id, challengeId)
    .then(gameIdInfo => {
      Api.instance().getMatchInfo(gameIdInfo.matchId).then(res => {
        const objToSend = {
          gameData,
          info: res, 
          id: gameIdInfo.matchId,
          youId: userId,
          himId: userId == fromId ? toId : fromId
        }
  
        onEndGotoScoreCard(objToSend)
      })
    })
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

class PlayConfiguration extends React.PureComponent {

  state = {
    game: undefined,
    course: undefined,
    courses: [],
    loading: false
  }

  componentDidMount() {
    this.props.getGameMode()
    this.setState({
      courses: [{id: this.props.user.clubId, name: this.props.user.club}]
    })
  }

  onGameSelected = (index) => {
    this.setState({ game: this.props.gameModeData.data[index] })
  }

  onCourseSelected = (index) => {
    this.setState({ course: this.state.courses[index] })
  }

  onBeginGotoScoreCard = () => {
    this.setState({
      loading: true
    })
  }

  onEndGotoScoreCard = (objToSend) => {
    this.setState({
      loading: false
    }, () => {
      const item = this.props.navigation.getParam("data")
      this.props.navigation.navigate("SimpleScoreCard", {data: item, ...objToSend})
    })
  }

  render() {
    const item = this.props.navigation.getParam("data")
    return (
      <BaseComponent>
        <Header />
        <DialogCombination>
          <View style={{ minHeight: Dimensions.get('window').height - 80, paddingBottom: 32 }}>  
            <MatchInfo />
            <Spacing />
            <PendingItem item={item} viewOnly={true} />
            <CurrentConfiguration 
              game={this.state.game ? this.state.game.content : undefined} 
              course={this.state.course ? this.state.course.name : undefined} 
            />
            <GameConfiguration 
              gameData={item}
              challengeId={item.id}
              userId={this.props.user.id}
              fromId={item.from.id}
              toId={item.to.id}
              game={this.state.game} 
              course={this.state.course} 
              courses={this.state.courses}
              gameMode={this.props.gameModeData.data}
              onGameSelected={this.onGameSelected}
              onCourseSelected={this.onCourseSelected}  
              onBeginGotoScoreCard={this.onBeginGotoScoreCard}
              onEndGotoScoreCard={this.onEndGotoScoreCard}
            />
            <View style={{flex: 1}} />
            <Ads />
          </View>
          <LoadingModal visible={this.state.loading} />
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
  getGameMode: () => dispatch(getGameMode())
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayConfiguration)