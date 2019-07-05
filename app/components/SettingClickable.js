import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'

import DGText from './DGText'
import Theme from '../res/Theme'

export default class SettingClickable extends PureComponent {
  render() {
    let textAlign = this.props.titleAlign
    return (
      <View style={[styles.container, this.props.style]}>
        <DGText style={[styles.title, { alignSelf: textAlign }]}>{this.props.title}</DGText>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  subContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    color: 'white', 
    fontSize: 16,
    alignSelf: 'center'
  },
  value: {
    color: Theme.textGray, 
    fontSize: 16
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    color: Theme.textGray, 
  }
})