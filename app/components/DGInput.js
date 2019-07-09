import React, { PureComponent } from 'react'
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet
} from 'react-native'
import Theme from '../res/Theme'

export const INPUT_STATUS = {
  NORMAL: "normal",
  ERROR: "error",
  VALID: "valid" 
}

export const INPUT_TYPE = {
  PHONE: "phone-pad",
  NUMBER: "number-pad",
  TEXT: "default",
  PASSWORD: "password"
}

export default class DGInput extends PureComponent {

  state = {
    text: null,
    status: INPUT_STATUS.NORMAL
  }

  getText() {
    return this.state.text
  }

  validateText = (text) => {
    var validateResult = INPUT_STATUS.NORMAL
    if (this.props.validateFunction) {
      validateResult = this.props.validateFunction(text) 
    }
    this.setState({ 
      text,
      status: validateResult
    })
  }

  render() {
    var statusStyle = {}
    if (this.state.status == INPUT_STATUS.VALID) {
      statusStyle = {
        borderWidth: 1,
        borderColor: Theme.valid
      }
    }
    else if (this.state.status == INPUT_STATUS.ERROR) {
      statusStyle = {
        borderWidth: 1,
        borderColor: Theme.error
      }
    }
    return(
      <View style={[styles.container, this.props.style, statusStyle]}>
        <TextInput 
          style={{ 
            color: this.props.textColor ? this.props.textColor : 'white',
            textAlign: this.props.inputAlign ? this.props.inputAlign : 'center'
          }}
          secureTextEntry={this.props.inputType == INPUT_TYPE.PASSWORD}
          keyboardType={this.props.inputType == INPUT_TYPE.PASSWORD ? 'default' : this.props.inputType}
          placeholder={this.props.placeholder} 
          placeholderTextColor={this.props.textColor ? this.props.textColor : 'white'}
          value={this.state.text}
          onChangeText={this.validateText}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 48,
    alignSelf: 'center',
    borderRadius: 8,
    justifyContent: 'center'
  },
  textInput: {
    textAlign: 'center'
  }
})