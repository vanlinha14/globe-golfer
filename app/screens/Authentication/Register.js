import React, { PureComponent } from 'react'
import { 
  View, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView
} from 'react-native'

import { GoogleSignin } from 'react-native-google-signin'
import { LoginManager, AccessToken } from "react-native-fbsdk"
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButton'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import Intro from '../../components/Intro'

import Icon from 'react-native-vector-icons/Ionicons'

export default class Register extends PureComponent {
  static navigationOptions = { header: null }

  onRequestGoToInputEmail = () => {
    this.props.navigation.navigate("SetupAccountStepInputEmail")
  }

  onRequestLoginWithFacebook = () => {
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (result) => {
        if (result.isCancelled) {
          alert("Login cancelled");
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              //got the user data, move on
              this.props.navigation.navigate("SetupAccountStepInputScannedCard")
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
      //got the user info, move on
      this.props.navigation.navigate("SetupAccountStepInputScannedCard")
    })
  }

  onRequestGoToLogin = () => {
    this.props.navigation.navigate("Login")
  }

  renderLogo() {
    return (
      <Image
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
      Strings.register.facebook, 
      'white',
      this.onRequestLoginWithFacebook
    )
  }

  renderLoginGoogleButton() {
    return this.renderSocialButton(
      true,
      Theme.mainBackground,
      <Image 
        style={[styles.socialIcon, { width: 30, height: 30 }]} 
        source={require('../../res/images/ic_google.png')}
      />,
      Strings.register.google, 
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
      Strings.register.email, 
      'white',
      this.onRequestGoToInputEmail
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
      }} activeOpacity={0.7} onPress={this.onRequestGoToLogin}>
        <DGText style={{
          alignSelf: 'center',
          height: 20,
          color: 'white', 
          textAlign: 'center'
        }}>{Strings.register.alreadyMember}</DGText>
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
      <ScrollView contentContainerStyle={[styles.body, { backgroundColor: Theme.mainBackground }]}>
        {this.renderLogo()}
        {this.renderIntroBlock()}
        {this.renderControls()}
      </ScrollView>
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