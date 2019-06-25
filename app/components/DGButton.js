import React, { PureComponent } from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import DGText from './DGText'

export default class DGButton extends PureComponent {
  render() {
    return (
      <TouchableOpacity {...this.props} style={[styles.container, this.props.style]} activeOpacity={0.7}>
        <DGText style={styles.text}>{this.props.text}</DGText>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    alignSelf: 'center',
    width: '50%',
    borderRadius: 22,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
})