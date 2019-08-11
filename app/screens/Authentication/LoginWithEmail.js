import React, { PureComponent } from 'react'
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'

import { emailValidationFunction, passwordValidationFunction, showErrorAlert } from '../../utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { loginWithEmail } from '../../actions/login'
import { INPUT_TYPE } from '../../components/DGInput'
import { connect } from 'react-redux'

import BaseComponent from '../../components/BaseComponent'
import TextInputBlockV2 from '../../components/TextInputBlockV2'
import DGButtonV2 from '../../components/DGButtonV2'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import DGText from '../../components/DGText';
import { StackActions, NavigationActions } from 'react-navigation';

const Title = React.memo(() => {
  return (
    <DGText style={{
      width: '60%',
      fontSize: 26,
      fontWeight: 'bold',
      color: 'white',
      marginHorizontal: 16,
      marginVertical: 12
    }}>Login with Email address</DGText>
  )
})

class LoginWithEmail extends PureComponent {
  static navigationOptions = { header: null }

  emailTextInput = undefined
  passwordTextInput = undefined

  componentWillReceiveProps(nextProps) {
    let authenData = nextProps.authenticationData
    if (authenData.isLoading == false && authenData.accessToken) {
      this.props.navigation.dispatch(StackActions.reset({
        index: 0, 
        key: null, 
        actions: [NavigationActions.navigate({ routeName: 'Main' })]
      }));
    }

    if (authenData.isLoading == false && authenData.accessToken == null) {
      alert("Your email or password is not valid. Please check and try again!")
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

  onRequestGoToTnC = () => {
    alert("open TnC")
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
          loading={this.props.authenticationData.isLoading}
          text={Strings.button.acceptAndContinue}
          onPress={this.onRequestLogin}
          />
      </View>
    )
  }

  render() {
    let isDisableViewInteract = this.props.authenticationData.isLoading == true ? 'none' : 'auto' 
    return (
      <BaseComponent toolbar={{
        title: Strings.toolbar.back,
        onBack: () => this.props.navigation.goBack()
      }}>
        <KeyboardAwareScrollView contentContainerStyle={styles.body} pointerEvents={isDisableViewInteract}>
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