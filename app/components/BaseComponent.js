import React, { PureComponent } from 'react'
import { StyleSheet, View, ImageBackground, SafeAreaView } from 'react-native'

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
          rightComponent={toolbar.right}
        />
      )
    }
  }

  renderWithoutBackgroundContent() {
    return (
      <View style={styles.baseContainer}>
        {this.renderToolbar()}
        {this.props.children}
      </View>
    )
  }

  renderWithBackgroundContent() {
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

  render() {
    const { withDotBackground } = this.props
    if (withDotBackground) {
      return (
        <SafeAreaView>
          {this.renderWithBackgroundContent()}
        </SafeAreaView>
      )
    }
    else {
      return (
        <SafeAreaView>
          {this.renderWithoutBackgroundContent()}
        </SafeAreaView>
      ) 
    }
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.mainBackground
  }
})