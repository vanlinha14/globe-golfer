import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import { getBottomSpace } from 'react-native-iphone-x-helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButton'
import SettingToggle from '../../components/SettingToggle'
import SettingClickable from '../../components/SettingClickable'
import SettingValueClickable from '../../components/SettingValueClickable'

import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import SettingSlider from '../../components/SettingSlider';

export default class Settings extends PureComponent {
  static navigationOptions = { header: null }

  onRequestScanCard = () => {
    this.props.navigation.navigate("SetupAccountStepInputScannedCard")
  }

  onRequestEnterManual = () => {
    this.props.navigation.navigate("SetupAccountStepInputIndex")
  }

  renderTitle() {
    return <DGText style={styles.title}>{Strings.awesome}</DGText>
  }

  renderMessage() {
    return <DGText style={styles.messgage}>{Strings.setupAccountStep0Message}</DGText>
  }

  renderLogo() {

  }

  renderBody() {
    return (
      <View style={styles.body}>
        {this.renderTitle()}
        {this.renderMessage()}
      </View>
    )
  }

  renderTopBlock() {
    let ggSubscriptionButton = <DGButton 
      key="ggSubscriptionButton"
      style={styles.ggButton}
      text={Strings.getGGSubscription}
      onPress={this.onRequestScanCard}
    />
    let ggCreditButton = <DGButton 
      key="ggCreditButton"
      style={styles.ggButton}
      text={Strings.getGGCredit}
      onPress={this.onRequestScanCard}
    />
    return [ggSubscriptionButton, ggCreditButton]
  }

  renderDiscoverBlock() {
    return (
      <View>
        {this.renderSectionTitle(Strings.settingsDiscover)}
        {this.renderValueClickableItem(Strings.settingsLocation, "France, Paris")}
        {this.renderSliderItem(Strings.settingsMaxDistance, "%s km", 1, 100, 40)}
        {this.renderValueClickableItem(Strings.settingsGender, "Male")}
      </View>
    )
  }

  renderVisibilityBlock() {
    let showGG = this.renderToggleItem(Strings.settingsShowMeOnGG, Strings.settingsShowMeOnGGMessage)
    let swipeFriend = this.renderToggleItem(Strings.settingSwipeWithFriends, Strings.settingSwipeWithFriendsMessage)

    return [showGG, swipeFriend]
  }

  renderWebProfileBlock() {
    return (
      <View>
        {this.renderSectionTitle(Strings.settingWebProfile)}
        {this.renderValueClickableItem(Strings.settingsUsername, "Aeron")}
      </View>
    )
  }

  renderNotificationBlock() {
    return (
      <View>
        {this.renderSectionTitle(Strings.settingsNotification)}
        {this.renderToggleItem(Strings.settingsNewChallengesPut)}
        {this.renderToggleItem(Strings.settingsNewChallengesChipAndPut)}
        {this.renderToggleItem(Strings.settingsNewChallenges9Holes)}
        {this.renderToggleItem(Strings.settingsNewChallenges18Holes)}
        {this.renderToggleItem(Strings.settingsMessages)}
        {this.renderToggleItem(Strings.settingsValidationCard)}
      </View>
    )
  }

  renderContactUsBlock() {
    return (
      <View>
        {this.renderSectionTitle(Strings.settingsContactUs)}
        {this.renderClickableItem(Strings.settingsHelpAndSuppport)}
        {this.renderClickableItem(Strings.settingsRateUs)}
        {this.renderClickableItem(Strings.settingShareGG)} 
      </View>
    )
  }

  renderLegalBlock() {
    return (
      <View>
        {this.renderSectionTitle(Strings.settingsLegal)}
        {this.renderClickableItem(Strings.settingsPrivacyPolicy, "flex-start")}
        {this.renderClickableItem(Strings.settingsTermsOfService, "flex-start")}
        {this.renderClickableItem(Strings.settingsLicenses, "flex-start")} 
      </View>
    )
  }

  renderLogoutBlock() {
    return (
      <View>
        {this.renderSeparator()}
        {this.renderClickableItem(Strings.settingLogout)} 
      </View>
    )
  }

  renderDeleteAccountBlock() {
    return (
      <View>
        {this.renderSeparator()}
        {this.renderClickableItem(Strings.settingDeleteAccount)} 
      </View>
    )
  }

  renderSliderItem(title, valueTemplate, min, max, value) {
    let item = <SettingSlider
      key="slider item"
      style={{ paddingBottom: 0 }}
      title={title}
      valueTemplate={valueTemplate}
      min={min}
      max={max}
      value={value}
    />
    return this.renderItemWithSeparator(item)
  }

  renderValueClickableItem(title, value) {
    let item = <SettingValueClickable
      key="value clickable item" 
      style={{ paddingBottom: 4, paddingTop: 12 }}
      title={title}
      value={value}
      />
    return this.renderItemWithSeparator(item)
  }

  renderClickableItem(title, align) {
    let item = <SettingClickable 
      key="clickable item" 
      titleAlign={align ? align : 'center'}
      style={{ paddingBottom: 4, paddingTop: 12 }}
      title={title} />
    return this.renderItemWithSeparator(item)
  }

  renderToggleItem(title, description) {
    let item = <SettingToggle
      key="toggle item"
      style={{ paddingBottom: 0 }}
      title={title}
      description={description}
    />
    return this.renderItemWithSeparator(item)
  }

  renderSectionTitle(title) {
    let item = <DGText key="section title" style={styles.sectionTitle}>{title.toUpperCase()}</DGText>
    return this.renderItemWithSeparator(item)
  }

  renderItemWithSeparator(item) {
    let separator = this.renderSeparator()
    return [item, separator]
  }

  renderSpacing(height) {
    return <View style={{ height }} />
  }

  renderSeparator() {
    return <View key="separator" style={styles.separator} />
  }

  render() {
    return (
      <BaseComponent toolbar={{
        title: Strings.settings
      }} >
        <KeyboardAwareScrollView contentContainerStyle={{ paddingTop: 24 }}>
          {this.renderTopBlock()}
          {this.renderSeparator()}
          {this.renderSpacing(44)}
          {this.renderDiscoverBlock()}
          {this.renderVisibilityBlock()}
          {this.renderSpacing(44)}
          {this.renderWebProfileBlock()}
          {this.renderSpacing(44)}
          {this.renderNotificationBlock()}
          {this.renderSpacing(44)}
          {this.renderContactUsBlock()}
          {this.renderSpacing(44)}
          {this.renderLegalBlock()}
          {this.renderSpacing(44)}
          {this.renderLogoutBlock()}
          {this.renderSpacing(44)}
          {this.renderDeleteAccountBlock()}
        </KeyboardAwareScrollView>
      </BaseComponent>
    )
  }
}

const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  body: {
    flex: 1, 
    justifyContent: 'center'
  },
  ggButton: {
    backgroundColor: Theme.buttonPrimary,
    width: windowWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 4,
    marginBottom: 16
  },
  separator: {
    marginTop: 8,
    width: '100%',
    height: 1,    
    backgroundColor: Theme.separator
  },
  title: {
    color: Theme.textWhite,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  messgage: {
    color: Theme.textGray,
    fontSize: 20,
    marginTop: 24,
    marginLeft: 16, 
    marginRight: 16,
    textAlign: 'center'
  },
  footerContainer: {
    paddingBottom: getBottomSpace() + 32
  },
  sectionTitle: {
    color: Theme.textWhite,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16, 
    marginRight: 16,
  }
})