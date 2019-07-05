import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'

import DGText from './DGText'
import Theme from '../res/Theme'

export default class SettingToggle extends PureComponent {

  renderDescription() {
    let description = this.props.description
    if (description) {
      return <DGText style={styles.description}>{description}</DGText>
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.subContainer}>
          <DGText style={styles.title}>{this.props.title}</DGText>
          <Switch style={styles.value}/>
        </View>
        {this.renderDescription()}
      </View>
    )
  }
}

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