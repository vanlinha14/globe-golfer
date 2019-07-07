import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import BaseComponent from '../../components/BaseComponent'
import DGButton from '../../components/DGButton'
import TextInputBlock from '../../components/TextInputBlock'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'

export default class SetupAccountStepInputEmail extends PureComponent {
  static navigationOptions = { header: null }

  onRequestGoToScanCard = () => {
    this.props.navigation.navigate("SetupAccountStepInputScannedCard")
  }

  renderLogo() {

  }

  renderBody() {
    let email = <TextInputBlock 
      inputStyle={{ width: '80%', paddingLeft: 8 }} 
      title={Strings.registerWithEmail}
      placeholder={Strings.enterEmail} 
      inputAlign="left"
    />
    let password = <TextInputBlock 
      inputStyle={{ width: '80%', paddingLeft: 8 }} 
      placeholder={Strings.enterPassword}
      inputAlign="left"
    />
    return (
      <View style={styles.body}>
        {email}
        {password}
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <DGButton 
          style={{ backgroundColor: Theme.buttonPrimary }}
          text={Strings.continue}
          onPress={this.onRequestGoToScanCard}
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