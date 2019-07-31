import React, { PureComponent } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import DGText from './DGText'
import Theme from '../res/Theme'
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Icon from 'react-native-vector-icons/Ionicons'

export default class Toolbar extends PureComponent {
  render() {
    return (
      <View {...this.props} style={[styles.container, this.props.style]}>
        <View style={styles.contentContainer}>
          <TouchableOpacity onPress={this.props.onBack} activeOpacity={0.7}>
            <Icon name="ios-arrow-back" color={Theme.buttonPrimary} size={30} />
          </TouchableOpacity>
          <DGText style={styles.text}>{this.props.title}</DGText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 12 + getStatusBarHeight(),
    paddingBottom: 12,
    justifyContent: 'center'
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: Theme.toolbarTitle,
    textAlignVertical: 'center',
    marginHorizontal: 16
  },
  separator: {
    width: '100%',
    height: 2,
    marginTop: 8,
    backgroundColor: Theme.separator
  }
})