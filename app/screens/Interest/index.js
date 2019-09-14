import React from 'react'
import { FlatList } from 'react-native'
import BaseComponent from '../../components/BaseComponent'
import InterestItem from './components/InterestingItem'
import { connect } from 'react-redux'

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
      alert("remove from list")
    }
    else {
      alert("add to list");
    }
  
  }

  renderItem = ({item}) => {
    const userInterest = this.props.userInterest
    
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
  interest: state.interest,
  userInterest: state.profile.user.interest,
})

const mapDispatchToProps = () => ({})

export default connect(mapStateToProps, mapDispatchToProps)(Interest)