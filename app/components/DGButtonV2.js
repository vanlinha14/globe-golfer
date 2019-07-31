import React, { PureComponent } from 'react'
import { TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import DGText from './DGText'

export default class DGButtonV2 extends PureComponent {

  renderContent() {
    if (this.props.loading == true) {
      return <ActivityIndicator color='white'/>
    }
    else {
      return <DGText style={styles.text}>{this.props.text}</DGText>
    }
  }

  render() {
    return (
      <TouchableOpacity {...this.props} style={[styles.container, this.props.style]} activeOpacity={0.7}>
        {this.renderContent()}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
})