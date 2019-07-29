import React, { PureComponent } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'

import Toolbar from './Toolbar'
import Theme from '../res/Theme';

export default class BaseComponent extends PureComponent {

  renderToolbar() {
    let toolbar = this.props.toolbar
    if (toolbar) {
      return (
        <Toolbar 
          title={toolbar.title}
          onBack={toolbar.onBack}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.baseContainer}>
        {this.renderToolbar()}
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.mainBackground
  }
})