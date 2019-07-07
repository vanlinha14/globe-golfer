import React, { PureComponent } from 'react'
import { View, Image, StyleSheet, Platform } from 'react-native'

import { getBottomSpace } from 'react-native-iphone-x-helper'
import Icon from 'react-native-vector-icons/Ionicons'

import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButton'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'

export default class SetupAccountStepActiveLocation extends PureComponent {
  static navigationOptions = { header: null }

  onRequestInputAvatar = () => {
    this.props.navigation.navigate("SetupAccountStepInputAvatar")  
  }

  onRequestLearnMore = () => {
    
  }

  renderTitle() {
    return <DGText style={styles.title}>{Strings.activeLocation}</DGText>
  }

  renderLocationIcon() {
    return (
      <View style={styles.iconContainer}>
        <Icon name="ios-pin" color='black' size={80} style={styles.icon} />
      </View>
    )
  }

  renderMessage() {
    return <DGText style={styles.messgage}>{Strings.activeLocationMessage}</DGText>
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
    return (
      <View style={styles.body}>
        {this.renderTitle()}
        {this.renderLocationIcon()}
        {this.renderMessage()}
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <DGButton 
          style={{ backgroundColor: Theme.buttonPrimary, marginBottom: 16 }}
          text={Strings.active}
          onPress={this.onRequestInputAvatar}
          />
        <DGButton 
          style={{ backgroundColor: Theme.buttonSecondary }}
          text={Strings.learnMore}
          onPress={this.onRequestLearnMore}
          />
      </View>
    )
  }

  render() {
    return (
      <BaseComponent>
        {this.renderLogo()}
        {this.renderBody()}
        {this.renderFooter()}
      </BaseComponent>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1, 
    justifyContent: 'center'
  },
  title: {
    color: Theme.textWhite,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  messgage: {
    color: Theme.textGray,
    fontSize: 16,
    marginTop: 24,
    marginLeft: 16, 
    marginRight: 16,
    textAlign: 'center'
  },
  footerContainer: {
    paddingBottom: getBottomSpace() + 32
  },
  iconContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 12,
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center'
  },
  icon: {
    alignSelf: 'center', 
    marginTop: Platform.OS == 'android' ? 6 : 12
  }
})