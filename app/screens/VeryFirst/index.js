import React, { PureComponent } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import DGText from '../../components/DGText'

export default class VeryFirstScreen extends PureComponent {
  static navigationOptions = { header: null }

  requestGoToMenu = () => {
    this.props.navigation.navigate("Login")
  }

  requestGoToRegistration = () => {
    this.props.navigation.navigate("Register")
  }

  renderRegisterBlock() {
    return (
      <TouchableOpacity 
        style={[styles.block, styles.registerBlock]}
        activeOpacity={0.7}
        onPress={this.requestGoToRegistration}
      >
        <DGText style={[styles.text, styles.registerText]}>
          {Strings.registration.toUpperCase()}
        </DGText>
      </TouchableOpacity>
    )
  }

  renderConnectionBlock() {
    return (
      <TouchableOpacity 
        style={[styles.block, styles.connectionBlock]}
        activeOpacity={0.7}
        onPress={this.requestGoToMenu}
      >
        <DGText style={[styles.text, styles.connectionText]}>
          {Strings.connection.toUpperCase()}
        </DGText>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderRegisterBlock()}
        {this.renderConnectionBlock()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  block: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  registerText: {
    color: 'black'
  },
  connectionText: {
    color: Theme.buttonPrimary
  },
  registerBlock: {
    backgroundColor: Theme.buttonPrimary
  },
  connectionBlock: {
    backgroundColor: 'black'
  }
})