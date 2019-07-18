import React, { PureComponent } from 'react'
import { StyleSheet, View, Image, Dimensions } from 'react-native'

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
    let { width, height } = Dimensions.get('window')
    return (
      <View style={styles.baseContainer}>
        <Image 
          style={{ 
            width,
            height,
            flex: 1, 
            position: 'absolute' 
          }}
          resizeMode='repeat'
          source={require('../res/images/bg.jpg')}
        />  
        {this.renderToolbar()}
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    width: '100%',
    height: '100%'
  }
})