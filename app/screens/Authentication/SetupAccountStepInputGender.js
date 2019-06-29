import React, { PureComponent } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getBottomSpace } from 'react-native-iphone-x-helper'

import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButton'
import DGInput from '../../components/DGInput'
import Strings from '../../res/Strings'
import Theme from '../../res/Theme'

export default class SetupAccountStepInputGender extends PureComponent {
  static navigationOptions = { header: null }

  renderTitle() {
    return <DGText style={styles.messgage}>{Strings.myGenderIs}</DGText>
  }

  renderGenderSelector() {
    return (
      <View style={{ marginTop: 16 }}>
        <DGButton 
          style={{ backgroundColor: Theme.buttonPrimary }}
          text={Strings.genderMale}
          />
        <DGButton 
          style={{ 
            backgroundColor: Theme.buttonPrimary2,
            marginTop: 16
          }}
          text={Strings.genderFemale}
          />
      </View>
    )
  }

  renderLogo() {

  }

  renderBody() {
    return (
      <View style={styles.body}>
        {this.renderTitle()}
        {this.renderGenderSelector()}
      </View>
    )
  }

  render() {
    return (
      <BaseComponent>
        <KeyboardAwareScrollView>
          <View style={styles.body}>
            {this.renderLogo()}
            {this.renderBody()}
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
    height: windowHeight,
    justifyContent: 'center'
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