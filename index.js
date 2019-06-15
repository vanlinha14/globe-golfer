import { AppRegistry } from 'react-native'
import React from 'react'
import AppNavigation from './app/AppNavigation'
import { name as appName } from './app.json'
import { Provider } from 'react-redux'

import configureStore from './app/store'

const store = configureStore()

const RNRedux = () => (
  <Provider store = { store }>
    <AppNavigation />
  </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux)
