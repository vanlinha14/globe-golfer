import React, { PureComponent } from 'react'
import { 
  View,
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native'
import FastImage from 'react-native-fast-image'

import { GoogleSignin } from 'react-native-google-signin'
import { LoginManager, AccessToken } from "react-native-fbsdk"
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import Intro from '../../components/Intro'
import DGButton from '../../components/DGButton'
import Strings from '../../res/Strings'
import DGText from '../../components/DGText'
import Theme from '../../res/Theme'
import { loginWithFacebook, loginWithGoogle } from '../../actions/login'
import { StackActions, NavigationActions } from 'react-navigation';

class Login extends PureComponent {
  static navigationOptions = { header: null }

  componentWillReceiveProps(nextProps) {
    let authenData = nextProps.authenticationData
    if (authenData.isLoading == false && authenData.accessToken) {
      this.props.navigation.dispatch(StackActions.reset({
        index: 0, 
        key: null, 
        actions: [NavigationActions.navigate({ routeName: 'Main' })]
      }));
    }
  }

  onRequestLoginWithFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (result) => {
        if (result.isCancelled) {
          alert("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              this.props.loginWithFacebook(data.userID, data.accessToken)
            }
          )
        }
      },
      (error) => {
        alert("Login fail with error: " + error)
      }
    )
  }

  onRequestLoginWithGoogle = () => {
    GoogleSignin.configure()
    GoogleSignin.signIn().then(user => {
      this.props.loginWithGoogle(user)
    })
    .catch(e => alert(e))
  }

  onRequestGoToLoginWithEmail = () => {
    this.props.navigation.navigate("LoginWithEmail")
  }

  onRequestGoToRegister = () => {
    this.props.navigation.navigate("Register")
  }

  renderLogo() {
    return (
      <FastImage
        style={{
          marginTop: 20,
          width: 120,
          height: 120,
          alignSelf: 'center'
        }}
        source={require('../../res/images/ic_icon.png')}
      />
    )
  }

  renderIntroBlock() {
    return <Intro />
  }

  renderLoginFacebookButton() {
    return this.renderSocialButton(
      false,
      '#4267b2', 
      <Icon 
        style={styles.socialIcon} 
        name='logo-facebook' 
        size={40} 
        color='white'
      />,
      Strings.login.facebook, 
      'white',
      this.onRequestLoginWithFacebook
    )
  }

  renderLoginGoogleButton() {
    return this.renderSocialButton(
      true,
      Theme.mainBackground,
      <FastImage 
        style={[styles.socialIcon, { width: 30, height: 30 }]} 
        source={require('../../res/images/ic_google.png')}
      />,
      Strings.login.google, 
      'white',
      this.onRequestLoginWithGoogle
    )
  }

  renderEmailButton() {
    return this.renderSocialButton(
      true,
      Theme.mainBackground, 
      <Icon 
        style={[styles.socialIcon, { width: 40, height: 30, marginLeft: 2 }]} 
        name='md-mail' 
        size={30} 
        color='white'
      />,
      Strings.login.email, 
      'white',
      this.onRequestGoToLoginWithEmail
    )
  }

  renderSocialButton(isShowBorder, background, logo, text, textColor, action) {
    return (
      <TouchableOpacity 
        style={[
          styles.socialButtonContainer, 
          { backgroundColor: background },
          { borderWidth: isShowBorder ? 1 : 0 }
        ]} activeOpacity={0.7} onPress={action}>
        {logo}
        <DGText style={[styles.socialText, {color: textColor}]}>{text}</DGText>
      </TouchableOpacity>
    )
  }

  renderSeparator() {
    return (
      <View style={{ 
        justifyContent: 'center', 
        marginBottom: 24, 
        marginTop: 12,
        flexDirection: 'row'
      }}>
        <View style={{ 
          flex: 1,
          marginLeft: 16,
          marginRight: 8,
          height: 1,
          alignSelf: 'center',
          backgroundColor: 'gray' 
        }}/>
        <DGText style={{
          alignSelf: 'center',
          width: 20,
          height: 20,
          color: 'white', 
          textAlign: 'center'
        }}>{Strings.or}</DGText>
        <View style={{ 
          flex: 1,
          marginLeft: 8,
          marginRight: 16,
          height: 1,
          alignSelf: 'center',
          backgroundColor: 'gray' 
        }}/>
      </View>
    )
  }

  renderNote() {
    return (
      <TouchableOpacity style={{
        marginTop: 12, 
        justifyContent: 'center'
      }} activeOpacity={0.7} onPress={this.onRequestGoToRegister}>
        <DGText style={{
          alignSelf: 'center',
          height: 20,
          color: 'white', 
          textAlign: 'center'
        }}>{Strings.login.notMember}</DGText>
      </TouchableOpacity>
    )
  }

  renderControls() {
    return (
      <View style={{
        paddingTop: 24,
        paddingBottom: 24
      }}>
        {this.renderLoginFacebookButton()}
        {this.renderLoginGoogleButton()}
        {this.renderSeparator()}
        {this.renderEmailButton()}
        {this.renderNote()}
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <DGButton 
          style={{ backgroundColor: Theme.buttonPrimary, marginBottom: 16 }}
          text={Strings.scanCard}
          onPress={this.onRequestScanCard}
          />
        <DGButton 
          style={{ backgroundColor: Theme.buttonSecondary }}
          text={Strings.dontHaveCard}
          onPress={this.onRequestEnterManual}
          />
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: 'black' }}>
        <ScrollView 
          style={{ backgroundColor: Theme.mainBackground }}
          contentContainerStyle={[
            styles.body, 
            { backgroundColor: Theme.mainBackground }
          ]}>
          {this.renderLogo()}
          {this.renderIntroBlock()}
          {this.renderControls()}
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center'
  },
  socialButtonContainer: {
    height: 44,
    backgroundColor: '#4267b2',
    flexDirection: 'row',
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white'
  },
  socialIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 8,
    top: null,
    bottom: null,
    alignSelf: 'center'
  },
  socialText: {
    alignSelf: 'center',
    color: 'white'
  }
})

const mapStateToProps = (state) => ({
  authenticationData: state.authentication
})

const mapDispatchToProps = (dispatch) => ({
  loginWithFacebook: (id, token) => dispatch(loginWithFacebook(id, token)),
  loginWithGoogle: (userInfo) => dispatch(loginWithGoogle(userInfo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)