import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import { getBottomSpace } from 'react-native-iphone-x-helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButton'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'

export default class Settings extends PureComponent {
  static navigationOptions = { header: null }

  onRequestScanCard = () => {
    this.props.navigation.navigate("SetupAccountStepInputScannedCard")
  }

  onRequestEnterManual = () => {
    this.props.navigation.navigate("SetupAccountStepInputIndex")
  }

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

  renderTopBlock() {
    let ggSubscriptionButton = <DGButton 
      key="ggSubscriptionButton"
      style={styles.ggButton}
      text={Strings.getGGSubscription}
      onPress={this.onRequestScanCard}
    />
    let ggCreditButton = <DGButton 
      key="ggCreditButton"
      style={styles.ggButton}
      text={Strings.getGGCredit}
      onPress={this.onRequestScanCard}
    />
    return [ggSubscriptionButton, ggCreditButton]
  }

  renderSeparator() {
    return <View style={styles.separator} />
  }

  render() {
    return (
      <BaseComponent toolbar={{
        title: Strings.settings
      }} >
        <KeyboardAwareScrollView contentContainerStyle={{ paddingTop: 24 }}>
          {this.renderTopBlock()}
          {this.renderSeparator()}
        </KeyboardAwareScrollView>
      </BaseComponent>
    )
  }
}

const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  body: {
    flex: 1, 
    justifyContent: 'center'
  },
  ggButton: {
    backgroundColor: Theme.buttonPrimary,
    width: windowWidth - 32,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 4,
    marginBottom: 16
  },
  separator: {
    marginTop: 8,
    width: '100%',
    height: 1,    
    backgroundColor: Theme.separator
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