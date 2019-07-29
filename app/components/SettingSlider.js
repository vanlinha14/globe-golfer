import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import DGText from './DGText'
import Theme from '../res/Theme'
import Slider from '@ptomasroos/react-native-multi-slider'

export default class SettingSlider extends PureComponent {

  state = {
    value: 0
  }

  componentDidMount() {
    this.setState({
      value: this.props.value
    })
  }

  onValueChange = (data) => {
    this.setState({ value: data[0] })
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <View style={styles.subContainer}>
          <DGText style={styles.title}>{this.props.title}</DGText>
          <DGText style={styles.value}>{this.props.valueTemplate.replace("%s", this.state.value)}</DGText>
        </View>
        <Slider 
          min={this.props.min}
          max={this.props.max}
          step={1}
          sliderLength={Dimensions.get('window').width - 32}
          enabledOne={true}
          values={[this.state.value]}
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