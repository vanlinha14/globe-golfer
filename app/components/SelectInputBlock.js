import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import Theme from '../res/Theme'
import DGText from './DGText'
import DGButton from './DGButton'
import RNPickerSelect from 'react-native-picker-select'
import Strings from '../res/Strings'

export default class SelectInputBlock extends PureComponent {

  state = {
    selectedValue: undefined
  }

  items = []

  constructor(props) {
    super(props)

    if (Array.isArray(props.items)) {
      this.items = props.items.map(i => {
        return {
          label: i,
          value: i
        }
      })
    }
  }

  renderTitle() {
    return <DGText style={styles.messgage}>{this.props.title}</DGText>
  }

  renderInput() {
    return (
      <RNPickerSelect
        placeholder={{}}
        items={this.items}
        onValueChange={(value) => {
            this.setState({
              selectedValue: value,
            })
        }}
        style={{
          inputAndroid: styles.input,
          headlessAndroidPicker: {
            alignSelf: 'center',
            width: '200%'
          },
          headlessAndroidContainer: {
            justifyContent: 'center'
          }
        }}
        value={this.state.selectedValue}
        useNativeAndroidPickerStyle={false}
      />
    )
  }

  render() {
    return(
      <View style={[styles.container, this.props.style]}>
        {this.renderTitle()}
        {this.renderInput()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  input: {
    backgroundColor: Theme.buttonSecondary,
    alignSelf: 'center',
    width: '50%',
    color: Theme.textWhite,
    borderRadius: 8,
    textAlign: 'center'
  },
  messgage: {
    color: Theme.textGray,
    color: Theme.textWhite,
    fontSize: 20,
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center'
  },
})