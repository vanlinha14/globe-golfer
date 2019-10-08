import React from 'react'
import { View, Text, FlatList  } from 'react-native'
import Theme from '../../res/Theme'
import BaseComponent from '../../components/BaseComponent'
import LoadingModal from '../../components/LoadingModal'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButtonV2'

const DUMMY_DATA = [
  {
    id: 1,
    title: "Subscription 6 months pack",
    description: "Become Premium Golfer in 6 months. Get a lot of awesome features",
    price: "$99.99"
  },
  {
    id: 2,
    title: "Subscription 1 year pack",
    description: "Become Premium Golfer in a year. Get a lot of awesome features",
    price: "$59.99"
  }
]

class Item extends React.PureComponent {
  onRequestBuyItem = () => {}

  render() {
    return (
      <View style={{
        marginHorizontal: 16,
        marginVertical: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        borderColor: Theme.buttonPrimary,
        borderWidth: 1
      }}>
        <DGText style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
        }}>{this.props.data.title}</DGText>
        <DGText style={{
          color: 'white'
        }}>{this.props.data.description}</DGText>
        <DGText style={{
          color: 'white',
          marginTop: 8,
          color: Theme.buttonPrimary
        }}>{`Price: ${this.props.data.price}`}</DGText>
        <DGButton 
          style={{ 
            backgroundColor: Theme.buttonPrimary, 
            width: '100%',
            marginTop: 8,
            height: 40,
            borderRadius: 4
          }}
          text={"Get it"}
          onPress={this.onRequestBuyItem}
          />
      </View>
    )
  }
}

class Premium extends React.PureComponent {

  state = {
    loading: false
  }

  renderItem = ({item}) => {
    return <Item data={item} />
  }

  render() {
    return (
      <BaseComponent toolbar={{
        title: "Global Golfer Premium",
        onBack: this.props.navigation.goBack
      }}>
        <FlatList 
          data={DUMMY_DATA}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => `${index}`}
        />
        <LoadingModal visible={this.state.loading} />
      </BaseComponent>
    )
  }
}

export default Premium