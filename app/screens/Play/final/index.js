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

  state = {
    loading: false
  }

  onSign = () => {
    this.setState({
      loading: true
    })

    const game = this.props.navigation.getParam("game")
    
    Api.instance().updateGameResult(game).then(_ => {
      this.setState({
        loading: false
      })
      
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
          <View style={{ minHeight: Dimensions.get('window').height - 80, paddingBottom: 32 }}>  
            <MatchInfo />
            <Spacing />
            <PendingItem item={item} viewOnly={true} />
            <Result gameResult={game}/>
            <SignButton onPress={this.onSign} />
            <View style={{flex: 1}} />
            <Ads />
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

export default connect(mapStateToProps, mapDispatchToProps)(Final)