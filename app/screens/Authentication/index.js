import React, { PureComponent } from 'react'
import BaseComponent from '../../components/BaseComponent'

export default class Authentication extends PureComponent {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props)

    props.navigation.replace("Register")
  }

  render() {
    return null
  }
}