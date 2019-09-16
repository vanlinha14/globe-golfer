import React from 'react'
import { FlatList } from 'react-native'
import BaseComponent from '../../components/BaseComponent'
import InterestItem from './components/InterestingItem'
import { connect } from 'react-redux'
import Api from '../../api'

class Interest extends React.PureComponent {

  state = {
    selected: []
  }

  componentDidMount() {
    this.setState({ selected: this.props.userInterest })
  }

  onPressItem = (item) => {
    const isSelected = this.state.selected.find(x => x.id === item.id) !== undefined
    if (isSelected) {
      const currentSelected = this.state.selected.slice()
      const index = currentSelected.findIndex(x => x.id === item.id)
      currentSelected.splice(index, 1)

      this.setState({ selected: currentSelected })
      Api.instance().removeInterest(this.props.user.id, item.id)
    }
    else {
      const currentSelected = this.state.selected.slice()
      currentSelected.push(item)

      this.setState({ selected: currentSelected })
      Api.instance().addInterest(this.props.user.id, item.id)
    }
  }

  renderItem = ({item}) => {
    const userInterest = this.state.selected
    
    const isSelected = userInterest.find(x => x.id === item.id) !== undefined
    return (
      <InterestItem 
        name={item.name} 
        selected={isSelected} 
        onPress={() => this.onPressItem(item)} 
      />
    )
  }

  render() {
    return (
      <BaseComponent toolbar={{
        title: "Update Interest Items",
        onBack: this.props.navigation.goBack
      }}>
        <FlatList
          style={{ marginLeft: 12 }}
          data={this.props.interest.interests}
          numColumns={3}
          keyExtractor={(_, index) => index}
          renderItem={this.renderItem}
        />
      </BaseComponent>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.profile.user,
  interest: state.interest,
  userInterest: state.profile.user.interest,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Interest)