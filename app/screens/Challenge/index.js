import React, { PureComponent } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'

import Theme from '../../res/Theme'

import Header from './components/Header'
import TinderMode from './components/TinderMode'
import GridMode from './components/GridMode'
import { getChallenges } from '../../actions/getChallenges';


class Challenge extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    isGridMode: false,
    showingItemIndex: undefined
  }

  componentDidMount() {
    this.props.getChallenges()
  }

  onViewModeChanged = () => {
    this.setState({
      isGridMode: !this.state.isGridMode
    })
  }

  onCardBasicInfoPress = (index) => {
    this.setState({
      isGridMode: false,
      showingItemIndex: index
    })
  }

  renderContent() {
    if (this.props.challenges.isLoading || this.props.challenges.data == null) {
      return <ActivityIndicator style={{ alignSelf: 'center' }} size='large' color='white' />
    }

    if (this.state.isGridMode) {
      return <GridMode data={this.props.challenges.data} onItemSelected={this.onCardBasicInfoPress} /> 
    }
    else {
      return <TinderMode data={this.props.challenges.data} showingItemIndex={this.state.showingItemIndex} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header isOn={this.state.isGridMode} onViewModeChanged={this.onViewModeChanged} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {this.renderContent()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.mainBackground
  }
})

const mapStateToProps = (state) => ({
  challenges: state.challenges
})

const mapDispatchToProps = (dispatch) => ({
  getChallenges: () => dispatch(getChallenges())
})

export default connect(mapStateToProps, mapDispatchToProps)(Challenge)