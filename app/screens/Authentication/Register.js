import React, { PureComponent } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { getBottomSpace } from 'react-native-iphone-x-helper'

import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButton'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'

import Icon from 'react-native-vector-icons/Ionicons'


export default class Register extends PureComponent {
  static navigationOptions = { header: null }

  onRequestGoToScanCard = () => {
    this.props.navigation.navigate("SetupAccountStepInputScannedCard")
  }

  onRequestGoToInputEmail = () => {
    this.props.navigation.navigate("SetupAccountStepInputEmail")
  }

  renderIntroBlock() {
    return (
      <View style={{ flex: 1, backgroundColor: Theme.buttonPrimary }}>

      </View>
    )
  }

  renderLoginFacebookButton() {
    return this.renderSocialButton(
      '#4267b2', 
      <Icon 
        style={styles.socialIcon} 
        name='logo-facebook' 
        size={40} 
        color='white'
      />,
      Strings.registerWithFacebook, 
      'white',
      this.onRequestGoToScanCard
    )
  }

  renderLoginGoogleButton() {
    return this.renderSocialButton(
      'white',
      <Image 
        style={[styles.socialIcon, { width: 30, height: 30 }]} 
        source={require('../../res/images/ic_google.png')}
      />,
      Strings.registerWithGoogle, 
      'black',
      this.onRequestGoToScanCard
    )
  }

  renderEmailButton() {
    return this.renderSocialButton(
      'white', 
      <Icon 
        style={[styles.socialIcon, { width: 40, height: 30, marginLeft: 2 }]} 
        name='md-mail' 
        size={30} 
        color='black'
      />,
      Strings.registerWithEmail, 
      'black',
      this.onRequestGoToInputEmail
    )
  }

  renderSocialButton(background, logo, text, textColor, action) {
    return (
      <TouchableOpacity 
        style={[
          styles.socialButtonContainer, 
          { backgroundColor: background }
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
      }} activeOpacity={0.7}>
        <DGText style={{
          alignSelf: 'center',
          height: 20,
          color: 'white', 
          textAlign: 'center'
        }}>{Strings.alreadyMember}</DGText>
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
      <BaseComponent>
        {this.renderIntroBlock()}
        {this.renderControls()}
      </BaseComponent>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1, 
    justifyContent: 'center'
  },
  socialButtonContainer: {
    height: 44,
    backgroundColor: '#4267b2',
    flexDirection: 'row',
    marginBottom: 12,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'center'
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