import React from 'react'
import { FlatList, ActivityIndicator } from 'react-native'
import { getChallenges } from '../../../../actions/getChallenges'
import CardBasicInfo from '../../../Challenge/components/CardBasicInfo.gridmode';
import { connect } from 'react-redux'
import Header from '../comps/Header';
import BaseComponent from '../../../../components/BaseComponent';
import GameData from '../GameData'

class AddMember extends React.PureComponent {

  gameData = GameData.instance()

  componentDidMount() {
    this.props.getChallenges()
  }

  keyExtractor = (_, index) => "grid item " + index

  renderItem = ({item, index}) => (
    <CardBasicInfo
      index={index}
      avatar={item.avatar} 
      name={item.name} 
      location={item.location} 
      rating={item.rating}
      onPress={(theIndex) => {
        const objectToCatch = this.props.challenges.data[theIndex]
        const player = {
          avatar: objectToCatch.avatar,
          name: objectToCatch.name
        }

        const where = this.props.navigation.getParam('where')

        if (where === "C") {
          this.gameData.playerC = player
        }
        else if (where === "D") {
          this.gameData.playerD = player
        } 

        this.props.navigation.goBack()
      }}
    />
  );

  renderContent() {
    if (this.props.challenges.isLoading || this.props.challenges.data == null) {
      return <ActivityIndicator style={{ marginTop: 40, alignSelf: 'center' }} size='large' color='white' />
    }

    return <FlatList 
      keyExtractor={this.keyExtractor}
      numColumns={2}
      renderItem={this.renderItem}
      data={this.props.challenges.data}
    />
  }

  render() {
    return (
      <BaseComponent>
        <Header />
        {this.renderContent()}
      </BaseComponent>
    )
  }
}

const mapStateToProps = (state) => ({
  challenges: state.challenges
})

const mapDispatchToProps = (dispatch) => ({
  getChallenges: () => dispatch(getChallenges())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddMember)