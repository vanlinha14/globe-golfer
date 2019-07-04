import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import DGText from './DGText'
import Theme from '../res/Theme'

export default class SettingSlider extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <DGText style={styles.title}>ducgao</DGText>
          <DGText style={styles.value}>ducgao</DGText>
        </View>
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
    color: 'white', 
    fontSize: 16
  },
  value: {
    color: Theme.textGray, 
    fontSize: 16, 
    position: 'absolute', 
    right: 0
  }
})