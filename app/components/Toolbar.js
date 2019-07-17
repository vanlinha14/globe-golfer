import React, { PureComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import DGText from './DGText'
import Theme from '../res/Theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default class Toolbar extends PureComponent {
  render() {
    return (
      <View {...this.props} style={[styles.container, this.props.style]}>
        <DGText style={styles.text}>{this.props.title}</DGText>
        <View style={styles.separator}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 28 + getStatusBarHeight(),
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.toolbarTitle
  },
  separator: {
    width: '100%',
    height: 1,
    marginTop: 8,
    backgroundColor: Theme.separator
  }
})