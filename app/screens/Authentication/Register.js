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
import Modal from 'react-native-modal'
import DGText from '../../components/DGText'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import Intro from '../../components/Intro'

import Icon from 'react-native-vector-icons/Ionicons'

export default class Register extends PureComponent {
  static navigationOptions = { header: null }

  state = {
    visibleModal: undefined
  }

  onRequestGoToInputEmail = () => {
    this.setState({
      visibleModal: undefined
    }, () => this.props.navigation.navigate("SetupAccountStepInputEmail") )
  }

  onRequestConfirmGoToInputEmail = () => {
    this.setState({
      visibleModal: "email"
    })
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
    GoogleSignin.configure({ webClientId: '150393205713-niluqkkcdf6kir5trl7odkfdoe7aeqio.apps.googleusercontent.com' })
    GoogleSignin.signIn().then(user => {
      //got the user info, move on
      this.props.navigation.navigate("SetupAccountStepInputScannedCard")
    }).catch(e => alert(e))
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
      this.onRequestConfirmGoToInputEmail
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

  renderModals() {
    const regularEmailModal = (
      <Modal 
        isVisible={this.state.visibleModal === "email"}
        animationIn='fadeIn'
        animationOut='fadeOut'
        onBackdropPress={() => this.setState({visibleModal: undefined})}
        onBackButtonPress={() => this.setState({visibleModal: undefined})}
        >
          <View style={{
            backgroundColor: 'white',
            borderRadius: 4,
            paddingHorizontal: 16,
            paddingVertical: 12
          }}>
          <DGText style={{
            fontSize: 24,
            fontWeight: 'bold',
          }}>Please accept our conditions</DGText>
          <DGText>By signing up, you agree to our term of use. Remember our condifdentiality policy</DGText>
          <TouchableOpacity 
            style={[
              { height: 44, justifyContent: 'center', alignItems: 'center' },
              { marginTop: 20 },
              { backgroundColor: Theme.buttonPrimary },
              { borderWidth: 0 }
            ]} activeOpacity={0.7} onPress={this.onRequestGoToInputEmail}>
            <DGText style={[styles.socialText, {color: 'white', fontWeight: 'bold'}]}>Accept and Register</DGText>
          </TouchableOpacity>
        </View>
      </Modal>
    )

    return regularEmailModal
  }

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.body, { backgroundColor: Theme.mainBackground }]}>
        {this.renderLogo()}
        {this.renderIntroBlock()}
        {this.renderControls()}
        {this.renderModals()}
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