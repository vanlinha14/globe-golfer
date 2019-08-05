import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'

import Theme from '../../res/Theme'
import Strings from '../../res/Strings'

import Header from './components/Header'
import BaseComponent from '../../components/BaseComponent';

export default class Profile extends PureComponent {
  static navigationOptions = { header: null }
  
  render() {
    return (
      <BaseComponent>
        <Header />
      </BaseComponent>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})