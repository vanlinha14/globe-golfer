import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButton'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'

export default class Authentication extends PureComponent {
  static navigationOptions = { header: null }

  renderTitle() {
    return <DGText style={styles.title}>{Strings.awesome}</DGText>
  }

  renderMessage() {
    return <DGText style={styles.messgage}>{Strings.setupAccountStep0Message}</DGText>
  }

  renderLogo() {

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
        <DGButton 
          style={{ backgroundColor: Theme.buttonPrimary, marginBottom: 16 }}
          text={Strings.scanCard}
          />
        <DGButton 
          style={{ backgroundColor: Theme.buttonSecondary }}
          text={Strings.dontHaveCard}
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
    textAlign: 'center'
  },
  footerContainer: {
    paddingBottom: 32
  }
})