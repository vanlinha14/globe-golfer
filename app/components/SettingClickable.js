import React, { memo } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import DGText from './DGText'
import Theme from '../res/Theme'

export default SettingClickable = memo(({style, titleAlign, title, onPress}) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <DGText style={[styles.title, { alignSelf: titleAlign }]}>{title}</DGText>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16
  },
  subContainer: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    color: 'white', 
    fontSize: 16,
    fontWeight: '600',
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