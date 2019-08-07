import React from 'react'
import { View, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from 'react-navigation-hooks'
import FlexSpacing from './FlexSpacing'
import DGText from '../../../components/DGText';
import Theme from '../../../res/Theme'

const Item = React.memo(({icon, title, onPress, isSelected}) => {
  return (
    <View style={{
      flex: 1,
      marginHorizontal: 4,
      justifyContent: 'center', 
      alignItems: 'center',
    }}>
      <TouchableOpacity style={{ 
        justifyContent: 'center', 
        alignItems: 'center', 
      }} activeOpacity={0.7} onPress={onPress}>
        <DGText style={{ 
          fontSize: 24,
          color: isSelected ? Theme.buttonPrimary : Theme.textWhite,
          textAlign: 'center',
        }}>{title}</DGText>
      </TouchableOpacity>
    </View>
  )
})

export default class Filter extends React.PureComponent {

  state = {
    selectedIndex: 0
  }

  render() {
    return (
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        paddingVertical: 8,
        borderBottomColor: Theme.separator,
        alignItems: 'flex-start'
      }}>
        <Item 
          title="Players" 
          icon="ios-notifications-outline" 
          isSelected={this.state.selectedIndex == 0}
          onPress={() => this.setState({ selectedIndex: 0 })}
        />
        <Item 
          title="Friends" 
          icon="ios-notifications-outline" 
          isSelected={this.state.selectedIndex == 1}
          onPress={() => this.setState({ selectedIndex: 1 })}
        />
        <Item 
          title="Group" 
          icon="ios-notifications-outline" 
          isSelected={this.state.selectedIndex == 2}
          onPress={() => this.setState({ selectedIndex: 2 })}
        />
      </View>
    )
  }
}