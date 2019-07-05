import React, { PureComponent } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import DGText from './DGText'
import Theme from '../res/Theme'
import Slider from '@react-native-community/slider'

export default class SettingSlider extends PureComponent {

  state = {
    value: 0
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    })
  }

  onValueChange = (value) => {
    this.setState({ value })
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.subContainer}>
          <DGText style={styles.title}>{this.props.title}</DGText>
          <DGText style={styles.value}>{this.props.valueTemplate.replace("%s", this.state.value)}</DGText>
        </View>
        <Slider 
          style={styles.slider} 
          minimumValue={this.props.min}
          maximumValue={this.props.max}
          value={this.state.value}
          step={1}
          onValueChange={this.onValueChange}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8
  },
  subContainer: {
    flexDirection: 'row'
  },
  title: {
    color: 'white', 
    fontSize: 16
  },
  value: {
    color: Theme.textGray, 
    fontSize: 16, 
    position: 'absolute', 
    right: 0
  },
  slider: {
    marginTop: 8
  }
})