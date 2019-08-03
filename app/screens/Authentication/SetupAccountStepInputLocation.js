import React, { PureComponent } from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import { showErrorAlert } from '../../utils'
import { getCountries } from '../../actions/getCountries'
import { getRegions } from '../../actions/getRegions'
import { getClubs } from '../../actions/getClubs'
import { connect } from 'react-redux'

import RegistrationHelper from '../../api/RegistrationHelper'
import SelectInputBlock from '../../components/SelectInputBlock'
import BaseComponent from '../../components/BaseComponent'
import DGButtonV2 from '../../components/DGButtonV2';
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import SelectInputBlockV2 from '../../components/SelectInputBlockV2';

class SetupAccountStepInputLocation extends PureComponent {
  static navigationOptions = { header: null }

  selectedCountryId = undefined
  selectedRegionId = undefined
  selectedClubId = undefined

  componentDidMount() {
    this.props.getCountries()
  }

  requestGoToActiveLocation = () => {
    if (this.selectedCountryId == undefined) {
      showErrorAlert(Strings.inputLocation.error.country)
      return
    }

    if (this.selectedRegionId == undefined) {
      showErrorAlert(Strings.inputLocation.error.region)
      return
    }

    if (this.selectedClubId == undefined) {
      showErrorAlert(Strings.inputLocation.error.club)
      return
    }

    RegistrationHelper.instance().setCountry(this.selectedCountryId)
    RegistrationHelper.instance().setRegion(this.selectedRegionId)
    RegistrationHelper.instance().setClub(this.selectedClubId)
    this.props.navigation.navigate("SetupAccountStepActiveLocation")
  }

  onCountrySelectionChange = (newCountryId) => {
    if (newCountryId == 0) {
      this.selectedCountryId = undefined
      return
    }

    this.selectedCountryId = newCountryId
    this.props.getRegions(newCountryId)
  }

  onRegionSelectionChange = (newRegionId) => {
    if (newRegionId == 0) {
      this.selectedRegionId = undefined
      return
    }

    this.selectedRegionId = newRegionId
    this.props.getClubs(newRegionId)
  }

  onClubSelectionChange = (newClubId) => {
    if (newClubId == 0) {
      this.selectedClubId = undefined
      return
    }

    this.selectedClubId = newClubId
  }

  renderSelectCountry() {
    let items = []
    if (this.props.countries.data) {
      items = this.props.countries.data.map(i => {
        return {
          label: i.title,
          value: i.id
        }
      })
    }
      

    return <SelectInputBlockV2
      title={Strings.inputLocation.country} 
      hint={Strings.inputLocation.hint.country}
      isLoading={this.props.countries.isLoading}
      items={items}
      onValueChange={this.onCountrySelectionChange}
    />
  }

  renderSelectRegion() {
    let items = []
    if (this.props.regions.data) {
      items = this.props.regions.data.map(i => {
        return {
          label: i.title,
          value: i.id
        }
      })
    }

    return <SelectInputBlockV2 
      title={Strings.inputLocation.region} 
      hint={Strings.inputLocation.hint.region}
      isLoading={this.props.regions.isLoading}
      items={items}
      onValueChange={this.onRegionSelectionChange}
    />
  }

  renderSelectPlayzone() {
    let items = []
    if (this.props.clubs.data) {
      items = this.props.clubs.data.map(i => {
        return {
          label: i.title,
          value: i.id
        }
      })
    }

    return <SelectInputBlockV2 
      title="Club" 
      hint={Strings.inputLocation.hint.club}
      isLoading={this.props.clubs.isLoading}
      items={items}
      onValueChange={this.onClubSelectionChange}
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

  renderPersonalInfo() {}

  renderMemberShipInfo() {}

  renderLocationInfo() {
    const countries = this.renderSelectCountry();
    const regions = this.renderSelectRegion();
    const clubs = this.renderSelectPlayzone();

    return (
      <>
        {countries}
        {regions}
        {clubs}
      </>
    )
  }

  renderBody() {
    return (
      <View style={styles.body}>
        {this.renderPersonalInfo()}
        {this.renderMemberShipInfo()}
        {this.renderLocationInfo()}
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <DGButtonV2 
          style={{ backgroundColor: Theme.buttonPrimary, width: '50%' }}
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
  countries: state.countries,
  regions: state.regions,
  clubs: state.clubs
})

const mapDispatchToProps = (dispatch) => ({
  getCountries: () => dispatch(getCountries()),
  getRegions: (countryId) => dispatch(getRegions(countryId)),
  getClubs: (regionId) => dispatch(getClubs(regionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SetupAccountStepInputLocation)