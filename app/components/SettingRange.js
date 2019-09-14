import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import DGText from './DGText'
import Theme from '../res/Theme'
import Slider from '@ptomasroos/react-native-multi-slider'

export default class SettingRange extends PureComponent {

  state = {
    left: 0,
    right: 0
  }

  componentDidMount() {
    let value = this.props.value
    this.setState({
      left: value[0],
      right: value[1]
    })
  }

  onValueChange = (value) => {
    const toFixedValue = this.props.step == 1 ? 0 : 1
    min = value[0].toFixed(toFixedValue)
    max = value[1].toFixed(toFixedValue)
    this.setState({
      left: min,
      right: max
    })

    if (this.props.onValueChange) {
      this.props.onValueChange(min, max)
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.subContainer}>
          <DGText style={styles.title}>{this.props.title}</DGText>
          <DGText style={styles.value}>{this.state.left + " - " + this.state.right}</DGText>
        </View>
        <Slider 
          min={this.props.min}
          max={this.props.max}
          step={this.props.step}
          sliderLength={Dimensions.get('window').width - 32}
          values={[this.state.left, this.state.right]}
          onValuesChange={this.onValueChange}
          unselectedStyle={{
            backgroundColor: Theme.separator,
          }}
          selectedStyle={{
            backgroundColor: Theme.sliderColor,
          }}
          markerStyle={{
            backgroundColor: 'white',
          }}
          pressedMarkerStyle={{
            width: 48,
            height: 48,
            borderRadius: 24,
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  subContainer: {
    flexDirection: 'row',
    marginBottom: 8
  },
  title: {
    color: 'white', 
    fontSize: 16,
    fontWeight: '600'
  },
  value: {
    color: Theme.textGray, 
    fontSize: 16, 
    position: 'absolute', 
    right: 0
  },
  slider: {
    flex: 1,
    marginTop: 80,
    marginLeft: 16
  }
})