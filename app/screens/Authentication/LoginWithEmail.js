import React, { PureComponent } from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'

import { emailValidationFunction, passwordValidationFunction, showErrorAlert } from '../../utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { loginWithEmail } from '../../actions/loginWithEmail'
import { INPUT_TYPE } from '../../components/DGInput'
import { connect } from 'react-redux'

import BaseComponent from '../../components/BaseComponent'
import TextInputBlock from '../../components/TextInputBlock'
import DGButton from '../../components/DGButton'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'

class LoginWithEmail extends PureComponent {
  static navigationOptions = { header: null }

  emailTextInput = undefined
  passwordTextInput = undefined

  componentWillReceiveProps(nextProps) {
    let authenData = nextProps.authenticationData
    if (authenData.isLoading == false && authenData.accessToken) {
      this.props.navigation.navigate("Main")
    }
  }

  onRequestLogin = () => {
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

    this.props.loginWithEmail(email, password)
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
      ref={ref => this.emailTextInput = ref}
      inputStyle={{ width: '80%', paddingLeft: 8 }} 
      title={Strings.login.email}
      placeholder={Strings.input.enterEmail} 
      validateFunction={emailValidationFunction}
      inputAlign="left"
    />
    let password = <TextInputBlock 
      ref={ref => this.passwordTextInput = ref}
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
          onPress={this.onRequestLogin}
          loading={this.props.authenticationData.isLoading}
          />
      </View>
    )
  }

  render() {
    let isDisableViewInteract = this.props.authenticationData.isLoading == true ? 'none' : 'auto' 
    return (
      <BaseComponent>
        <KeyboardAwareScrollView contentContainerStyle={styles.body} pointerEvents={isDisableViewInteract}>
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
  authenticationData: state.authentication
})

const mapDispatchToProps = (dispatch) => ({
  loginWithEmail: (email, password) => dispatch(loginWithEmail(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginWithEmail)