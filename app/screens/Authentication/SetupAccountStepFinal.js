import React, { PureComponent } from 'react'
import { View, StyleSheet, Image } from 'react-native'

import { getBottomSpace } from 'react-native-iphone-x-helper'

import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButtonV2 from '../../components/DGButtonV2'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'

export default class SetupAccountStepFinal extends PureComponent {
  static navigationOptions = { header: null }

  goToMainMenu = () => {
    this.props.navigation.navigate("Main")
  }

  renderTitle() {
    return <DGText style={styles.title}>{Strings.registerFinal.title}</DGText>
  }

  renderMessage() {
    return <DGText style={styles.messgage}>{Strings.registerFinal.message}</DGText>
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
        {this.renderMessage()}
      </View>
    )
  }

  renderFooter() {
    return (
      <View style={styles.footerContainer}>
        <DGButtonV2 
          style={{ backgroundColor: Theme.buttonPrimary, marginBottom: 16, width: '60%' }}
          text={Strings.button.discover}
          onPress={this.goToMainMenu}
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
    fontSize: 20,
    marginTop: 24,
    marginLeft: 16, 
    marginRight: 16,
    textAlign: 'center'
  },
  footerContainer: {
    paddingBottom: getBottomSpace() + 32
  }
})