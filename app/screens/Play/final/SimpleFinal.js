import React from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getGameMode } from '../../../actions/getGameMode'
import DGText from '../../../components/DGText'
import DialogCombination from '../../../components/DialogCombination';
import Header from '../components/Header';
import PendingItem from '../components/PendingItem'
import Theme from '../../../res/Theme';
import MatchInfo from './MatchInfo'
import BaseComponent from '../../../components/BaseComponent'
import Api from '../../../api'
import { getPendingMatches } from '../../../actions/getPendingMatches'
import { getPlayedMatches } from '../../../actions/getPlayedMatches'
import LoadingModal from '../../../components/LoadingModal'

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

const Result = React.memo(({score1, score2}) => {

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
      <DGText style={{color: 'white', fontSize: 28}}>{score1 + " & " + score2}</DGText>
    </View>
  )
})

class SimpleFinal extends React.PureComponent {

  state = {
    loading: false
  }

  onSign = () => {
    this.setState({
      loading: true
    })

    const gamedata = this.props.navigation.getParam("gameData")

    const gameId = this.props.navigation.getParam("gameId")
    const score1 = this.props.navigation.getParam("score1")
    const score2 = this.props.navigation.getParam("score2")

    Api.instance().simpleUpdateMatchResult(gameId, gamedata.from.id, gamedata.to.id, score1, score2).then(_ => {
      this.setState({
        loading: false
      })
      
      this.props.getPendingMatches()
      this.props.getPlayedMatches()

      this.props.navigation.popToTop()
    })

    // gameData,
    // info: res, 
    // id: gameIdInfo.matchId,
    // youId: userId,
    // himId: userId == fromId ? toId : fromId
  }
  
  render() {
    const item = this.props.navigation.getParam("gameData")
    const s1 = this.props.navigation.getParam("score1")
    const s2 = this.props.navigation.getParam("score2")
    return (
      <BaseComponent>
        <Header />
        <DialogCombination>
          <View style={{ minHeight: Dimensions.get('window').height }}>  
            <MatchInfo />
            <Spacing />
            <PendingItem item={item} viewOnly={true} />
            <Result score1={s1} score2={s2} />
            <SignButton onPress={this.onSign} />
          </View>
        </DialogCombination>
        <LoadingModal visible={this.state.loading} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SimpleFinal)