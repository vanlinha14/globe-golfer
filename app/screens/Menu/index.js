import React, { PureComponent } from 'react'
import { 
  View, 
  Image,
  StyleSheet, 
  TouchableOpacity
} from 'react-native'

import { getBottomSpace } from 'react-native-iphone-x-helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import Icon from 'react-native-vector-icons/Ionicons'

import BaseComponent from '../../components/BaseComponent'
import DGText from '../../components/DGText'
import DGButton from '../../components/DGButton'
import SettingToggle from '../../components/SettingToggle'
import SettingClickable from '../../components/SettingClickable'
import SettingValueClickable from '../../components/SettingValueClickable'
import SettingRange from '../../components/SettingRange'

import Strings from '../../res/Strings'
import Theme from '../../res/Theme'
import SettingSlider from '../../components/SettingSlider'

import MenuBlock from './MenuBlock'

export default class Menu extends PureComponent {
  static navigationOptions = { header: null }

  menuBlock = undefined

  requestMenuNext = () => {
    if (this.menuBlock) {
      this.menuBlock.requestNext()
    }
  }

  requestMenuPrevious = () => {
    if (this.menuBlock) {
      this.menuBlock.requestPrevious()
    }
  }

  renderLogo() {
    return (
      <Image
        style={[
          styles.logo,
          {
            marginTop: 60,
            width: 120,
            height: 120,
            alignSelf: 'center'
          }
        ]}
        source={require('../../res/images/ic_icon.png')}
      />
    )
  }

  renderAds() {
    return (
      <View style={styles.ads} />
    )
  }

  renderBody() {
    return (
      <View style={styles.body}>
        <MenuBlock ref={ref => this.menuBlock = ref}/>
        {this.renderControllerBlock()}
      </View>
    )
  }

  renderControllerBlock() {
    return (
      <View style={styles.controllerBlock}>
        {this.renderController("md-arrow-dropleft", this.requestMenuPrevious)}
        {this.renderController("md-arrow-dropright", this.requestMenuNext)}
      </View>
    )
  }

  renderController(name, action) {
    return (
      <TouchableOpacity style={styles.controller} activeOpacity={0.7} onPress={action}>
        <Icon name={name} color="white" size={56} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <BaseComponent>
        {this.renderLogo()}
        {this.renderBody()}
        {this.renderAds()}
      </BaseComponent>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  logo: {
    height: '30%'
  },
  ads: {
    backgroundColor: 'white',
    height: '30%'
  },
  controllerBlock: {
    width: "30%",
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  controller: {
    width: 50,
    height: 50,
    alignItems: 'center'
  }
})