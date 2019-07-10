import React, { PureComponent } from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import BaseComponent from '../../components/BaseComponent'
import DGButton from '../../components/DGButton'
import TextInputBlock from '../../components/TextInputBlock'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import { emailValidationFunction, passwordValidationFunction } from '../../utils'
import { INPUT_TYPE } from '../../components/DGInput'

export default class Login extends PureComponent {
  static navigationOptions = { header: null }

  onRequestGoToMenu = () => {
    this.props.navigation.navigate("Menu")
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
    let email = <TextInputBlock 
      inputStyle={{ width: '80%', paddingLeft: 8 }} 
      title={Strings.login.email}
      placeholder={Strings.input.enterEmail} 
      validateFunction={emailValidationFunction}
      inputAlign="left"
    />
    let password = <TextInputBlock 
      inputStyle={{ width: '80%', paddingLeft: 8 }} 
      placeholder={Strings.input.enterPassword}
      validateFunction={passwordValidationFunction}
      inputType={INPUT_TYPE.PASSWORD}
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
          text={Strings.button.continue}
          onPress={this.onRequestGoToMenu}
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