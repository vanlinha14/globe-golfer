import React, { PureComponent } from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import BaseComponent from '../../components/BaseComponent'
import SelectInputBlock from '../../components/SelectInputBlock'
import DGButton from '../../components/DGButton'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'

import { getCountries } from '../../actions/getCountries'
import { connect } from 'react-redux'

class SetupAccountStepInputLocation extends PureComponent {
  static navigationOptions = { header: null }

  componentDidMount() {
    this.props.getCountries()
  }

  onCountrySelectionChange = (newCountry) => {
    alert(newCountry)
  }

  requestGoToActiveLocation = () => {
    this.props.navigation.navigate("SetupAccountStepActiveLocation")
  }

  renderSelectCountry() {
    let items = []
    if (this.props.countries.data) {
      items = this.props.countries.data.map(i => i.title)
    }

    return <SelectInputBlock 
      title={Strings.inputLocation.country} 
      hint={Strings.inputLocation.hintSelectCountry}
      isLoading={this.props.countries.isLoading}
      items={items}
      onValueChange={this.onCountrySelectionChange}
    />
  }

  renderSelectRegion() {
    return <SelectInputBlock 
      title={Strings.inputLocation.region} 
      hint={Strings.inputLocation.hintSelectRegion}
    />
  }

  renderSelectPlayzone() {
    return <SelectInputBlock 
      title={Strings.inputLocation.playGolfAt} 
      hint={Strings.inputLocation.hintSelectClub}
    />
  }

  renderLogo() {
    return (
      <Image
        style={{
          marginTop: 60,
          width: 120,
          height: 120,
          alignSelf: 'center'
        }}
        source={require('../../res/images/ic_icon.png')}
      />
    )
  }

  renderBody() {
    return (
      <View style={styles.body}>
        {this.renderSelectCountry()}
        {this.renderSelectRegion()}
        {this.renderSelectPlayzone()}
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <DGButton 
          style={{ backgroundColor: Theme.buttonPrimary }}
          text={Strings.button.continue}
          onPress={this.requestGoToActiveLocation}
          />
      </View>
    )
  }

  render() {
    return (
      <BaseComponent>
        <KeyboardAwareScrollView contentContainerStyle={styles.body}>
          <View style={styles.body}>
            {this.renderLogo()}
            {this.renderBody()}
            {this.renderFooter()}
          </View>
          
        </KeyboardAwareScrollView>
      </BaseComponent>
    )
  }
}

const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
  body: {
    flex: 1, 
    height: windowHeight,
    justifyContent: 'center'
  },
  input: {
    backgroundColor: Theme.buttonSecondary,
    width: '80%',
    color: Theme.textWhite,
    textAlign: 'center',
    marginTop: 16
  },
  messgage: {
    color: Theme.textGray,
    fontSize: 20,
    marginTop: 24,
    textAlign: 'center'
  },
  footerContainer: {
    paddingBottom: getBottomSpace() + 32
  }
})

const mapStateToProps = (state) => ({
  countries: state.countries
})

const mapDispatchToProps = (dispatch) => ({
  getCountries: () => dispatch(getCountries())
})

export default connect(mapStateToProps, mapDispatchToProps)(SetupAccountStepInputLocation)