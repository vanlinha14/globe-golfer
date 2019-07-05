import React, { PureComponent } from 'react'
import BaseComponent from '../../components/BaseComponent'

export default class Authentication extends PureComponent {
  static navigationOptions = { header: null }

  componentDidMount() {
    this.props.navigation.replace("Menu")
  }

  render() {
    return null
  }
}