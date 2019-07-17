import React, { PureComponent } from 'react'
import { StyleSheet, ImageBackground } from 'react-native'

import Toolbar from './Toolbar'

export default class BaseComponent extends PureComponent {

  renderToolbar() {
    let toolbar = this.props.toolbar
    if (toolbar) {
      return (
        <Toolbar 
          title={toolbar.title}
        />
      )
    }
  }

  render() {
    return (
      <ImageBackground 
        style={styles.baseContainer}
        resizeMode='repeat'
        resizeMethod='auto'
        source={require('../res/images/bg.jpg')}
      >
        {this.renderToolbar()}
        {this.props.children}
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})