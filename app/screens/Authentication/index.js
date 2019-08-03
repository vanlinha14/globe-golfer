import React, { PureComponent } from 'react'
import { AsyncStorage } from 'react-native'
import BaseComponent from '../../components/BaseComponent'
import { ACCESS_TOKEN_STORE_KEY } from '../../utils/constants';

export default class Authentication extends PureComponent {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props)
    AsyncStorage.getItem(ACCESS_TOKEN_STORE_KEY).then(token => {
      if (token) {
        props.navigation.replace("Main")    
      }
      else {
        props.navigation.replace("Register")
      }
    })
    .catch(() => {
      props.navigation.replace("Register")
    })

    // props.navigation.replace("Register")
  }

  render() {
    return null
  }
}