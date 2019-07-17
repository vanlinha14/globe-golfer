import React, { PureComponent } from 'react'
import { Text } from 'react-native'

export default class DGText extends PureComponent {
  render() {
    return (
      <Text {...this.props}/>
    )
  }
}