import React, { PureComponent } from 'react'
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions
} from 'react-native'
import Theme from '../res/Theme'
import DGText from './DGText'
import DGButton from './DGButton'
import RNPickerSelect from 'react-native-picker-select'
import Strings from '../res/Strings'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class SelectInputBlockV2 extends PureComponent {

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
      selectedValue: props.hint
    }
  }

  componentWillReceiveProps(nextProps) {
    if (Array.isArray(nextProps.items)) {
      this.items = [
        {
          label: nextProps.hint,
          value: 0
        },
        ...nextProps.items
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

  renderTitle() {
    return <DGText style={styles.messgage}>{this.props.title}</DGText>
  }

  renderInput() {
    if (this.props.isLoading) {
      return <ActivityIndicator style={[styles.input, { paddingRight: 16, alignItems: 'flex-start' }]} color="white" />
    }

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
    width: Dimensions.get('window').width - 32,
    height: 44,
    color: Theme.textWhite,
    borderRadius: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  messgage: {
    color: Theme.textGray,
    fontSize: 16,
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16
  },
})