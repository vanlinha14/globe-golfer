import React, { PureComponent } from 'react'
import {
  View,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Theme from '../res/Theme'
import RNPickerSelect from 'react-native-picker-select'

export default class MiniSelectInputBlock extends PureComponent {

  items = []
  isReady = false

  constructor(props) {
    super(props)

    this.items = [
      {
        label: props.hint,
        value: 0
      }
    ]

    this.state = {
      selectedValue: null
    }
  }

  componentWillReceiveProps(nextProps) {
    console.warn("ducgaogaogao", nextProps.data);

    if (Array.isArray(nextProps.data)) {
      if (nextProps.data.length > 0) {
        const additionData = nextProps.data.map(o => {
          return {
            label: o.title,
            value: o.title
          }
        })
        this.isReady = true
        this.items = [
          {
            label: nextProps.hint,
            value: nextProps.hint
          },
          ...additionData
        ]
      }
      else {
        this.isReady = false
        this.items = [
          {
            label: nextProps.hint,
            value: nextProps.hint
          },
          {
            label: nextProps.defaultValue,
            value: nextProps.defaultValue
          }
        ]
      } 
    }
  }

  onValueChange = (value) => {
    if (this.state.selectedValue == null) {
      this.setState({
        selectedValue: this.props.defaultValue
      })
      return
    }

    this.setState({
      selectedValue: value,
    })

    if (this.props.onValueChange) {
      this.props.onValueChange(value)
    }
  }

  renderInput() {
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

  renderProtector() {
    if (this.isReady == true) return

    return (
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%'
        }}
        onPress={() => Alert.alert("Oops!", this.props.notReadyMessage)}
      />
    )
  }

  render() {
    return(
      <View style={[styles.container, this.props.style]}>
        {this.renderInput()}
        {this.renderProtector()}
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