import React, { PureComponent } from 'react'
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

import { emailValidationFunction, passwordValidationFunction, showErrorAlert } from '../../utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { INPUT_TYPE } from '../../components/DGInput'

import TextInputBlockV2 from '../../components/TextInputBlockV2'
import RegistrationHelper from '../../api/RegistrationHelper'
import BaseComponent from '../../components/BaseComponent'
import DGButtonV2 from '../../components/DGButtonV2'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import DGText from '../../components/DGText';

const Title = React.memo(() => {
  return (
    <DGText style={{
      width: '60%',
      fontSize: 26,
      fontWeight: 'bold',
      color: 'white',
      marginHorizontal: 16,
      marginVertical: 12
    }}>Register with Email address</DGText>
  )
})

export default class SetupAccountStepInputEmail extends PureComponent {
  static navigationOptions = { header: null }

  emailTextInput = undefined
  passwordTextInput = undefined

  onRequestGoToScanCard = () => {
    let email = this.emailTextInput.getText()
    let password = this.passwordTextInput.getText()

    if (email == null) {
      showErrorAlert(Strings.input.error.email)
      return
    }

    if (password == null) {
      showErrorAlert(Strings.input.error.password)
      return
    }

    RegistrationHelper.instance().setEmail(email)
    RegistrationHelper.instance().setPassword(password)
    this.props.navigation.navigate("SetupAccountStepInputScannedCard")
  }

  onRequestGoToTnC = () => {
    this.props.navigation.navigate('TnC')
  }

  renderBody() {
    let email = <TextInputBlockV2
      ref={ref => this.emailTextInput = ref}
      title={Strings.input.email}
      placeholder={Strings.input.enterEmail} 
      validateFunction={emailValidationFunction}
      inputAlign="left"
    />
    let password = <TextInputBlockV2 
      ref={ref => this.passwordTextInput = ref}
      title={Strings.input.password}
      placeholder={Strings.input.enterPassword}
      validateFunction={passwordValidationFunction}
      inputType={INPUT_TYPE.PASSWORD}
      inputAlign="left"
    />
    return (
      <View style={{
        paddingHorizontal: 16
      }}>
        {email}
        {password}
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <View style={{ flexDirection: 'row', marginTop: 24 }}>
          <DGText style={{
            color: 'white',
            paddingLeft: 16,
            fontSize: 12
          }}>By registering, you agree to our </DGText>  
          <TouchableOpacity style={{
            borderBottomWidth: 1,
            borderBottomColor: 'white'
          }} activeOpacity={0.7} onPress={this.onRequestGoToTnC}>
            <DGText style={{
              color: 'white',
              fontSize: 12
            }}>Terms of Use</DGText>
          </TouchableOpacity>
        </View>
        <DGText style={{
          color: 'white',
          marginHorizontal: 16,
          marginBottom: 40,
          fontSize: 12
        }}>See our privacy policy</DGText>
        <DGButtonV2
          style={{ 
            width: Dimensions.get('window').width - 32,
            backgroundColor: Theme.buttonPrimary 
          }}
          text={Strings.button.acceptAndContinue}
          onPress={this.onRequestGoToScanCard}
          />
      </View>
    )
  }

  render() {
    return (
      <BaseComponent toolbar={{
        title: Strings.toolbar.back,
        onBack: () => this.props.navigation.goBack()
      }}>
        <KeyboardAwareScrollView contentContainerStyle={styles.body}>
          <View style={styles.body}>
            <Title />
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
    height: windowHeight
  },
  input: {
    backgroundColor: Theme.buttonSecondary,
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
    marginTop: 24
  }
})