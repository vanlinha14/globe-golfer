import React from 'react'
import { View, ActivityIndicator, FlatList  } from 'react-native'
import Theme from '../../res/Theme'
import BaseComponent from '../../components/BaseComponent'
import LoadingModal from '../../components/LoadingModal'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButtonV2'
import * as RNIap from 'react-native-iap'
import Api from '../../api'
import { connect } from 'react-redux'
import { getProfile } from '../../actions/getProfile'

class Item extends React.PureComponent {
  
  onRequestBuyItem = () => {
    
    const productId = this.props.data.id
    RNIap.requestSubscription(productId).then(result => {
      this.onBuySuccess()
    })
    .catch(error => {
      alert("error: " + JSON.stringify(error))
    })
  }

  onBuySuccess = () => {
    const productId = this.props.data.id
    Api.instance().applySubscription(productId).then(res => {
      res && this.props.onBuySuccess && this.props.onBuySuccess()
    })
  }

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
    loading: false,
    products: []
  }

  componentDidMount() {
    RNIap.getProducts(["4213", "4214"]).then(products => {
      this.setState({
        products: products.map(p => ({
          id: p.productId,
          title: p.title,
          description: p.description,
          price: p.localizedPrice
        }))
      })
    })
    .catch(error => {
      alert("error: " + JSON.stringify(error))
    })
  }

  onBuySuccess = () => {
    this.props.getProfile()
    this.props.navigation.goBack()
  }

  renderItem = ({item}) => {
    return <Item data={item} onBuySuccess={this.onBuySuccess}/>
  }

  renderContent = () => {
    if (this.state.products.length == 0) {
      return (
        <ActivityIndicator 
          style={{
            marginTop: 100
          }}
          size='large'
          color={Theme.buttonPrimary}
        />
      )
    }
    else {
      return (
        <FlatList 
          data={this.state.products}
          renderItem={this.renderItem}
          keyExtractor={(_, index) => `${index}`}
        />
      )
    }
  }

  render() {
    return (
      <BaseComponent toolbar={{
        title: "Global Golfer Premium",
        onBack: this.props.navigation.goBack
      }}>
        {this.renderContent()}
        <LoadingModal visible={this.state.loading} />
      </BaseComponent>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => dispatch(getProfile()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Premium)