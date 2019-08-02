import React from 'react'
import WebView from 'react-native-webview'

import BaseComponent from '../../components/BaseComponent';
import Strings from '../../res/Strings';

export default class TnC extends React.PureComponent {
  render() {
    return (
      <BaseComponent toolbar={{
        title: Strings.toolbar.back,
        onBack: () => this.props.navigation.goBack()
      }}>
        <WebView
          source={{ uri: 'https://www.termsfeed.com/blog/sample-terms-and-conditions-template'}}
        />
      </BaseComponent>
    )
  }
}