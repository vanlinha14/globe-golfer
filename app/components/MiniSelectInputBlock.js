import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native'
import Theme from '../res/Theme'
import RNPickerSelect from 'react-native-picker-select'

export default class MiniSelectInputBlock extends PureComponent {

  state = {
    selectedValue: undefined
  }

  items = []

  constructor(props) {
    super(props)

    this.items = [
      {
        label: props.hint,
        value: 0
      }
    ]

    this.state = {
      selectedValue: props.defaultValue
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Array.isArray(nextProps.data)) {
      this.items = [
        {
          label: nextProps.defaultValue,
          value: 0
        },
        ...nextProps.data
      ]
    }
  }

  onValueChange = (value) => {
    this.setState({
      selectedValue: value,
    })

    if (this.props.onValueChange) {
      this.props.onValueChange(value)
    }
  }

  renderInput() {
    console.warn(this.items);
    
    return (
      <RNPickerSelect
        placeholder={{}}
        items={this.items}
        onValueChange={this.onValueChange}
        style={{
          inputIOS: styles.input,
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
        {this.renderInput()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  input: {
    // width: Dimensions.get('window').width - 24,
    // height: 44,
    color: Theme.textWhite,
    fontSize: 16,
    borderRadius: 8,
  },
  messgage: {
    color: Theme.textGray,
    fontSize: 14,
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16
  },
})