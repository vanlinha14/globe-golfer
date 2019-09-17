import React from 'react'
import { View, Text } from 'react-native'
import Theme from '../../res/Theme'

class Premium extends React.PureComponent {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: Theme.mainBackground,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={{color: 'white'}}>Premium</Text>
      </View>
    )
  }
}

export default Premium