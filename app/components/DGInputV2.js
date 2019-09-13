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

export default class DGInputV2 extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      text: props.initValue,
      status: INPUT_STATUS.NORMAL
    }
  }

  getText() {
    if (this.state.status == INPUT_STATUS.VALID || this.state.status == INPUT_STATUS.NORMAL) {
      return this.state.text
    }

    return null
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
        borderBottomColor: Theme.valid
      }
    }
    else if (this.state.status == INPUT_STATUS.ERROR) {
      statusStyle = {
        borderBottomColor: Theme.error
      }
    }
    return(
      <View style={[styles.container, this.props.style, statusStyle]}>
        <TextInput 
          style={{ 
            color: this.props.textColor ? this.props.textColor : Theme.textWhite,
            textAlign: this.props.inputAlign ? this.props.inputAlign : 'center',
            fontWeight: 'bold',
            fontSize: 16
          }}
          secureTextEntry={this.props.inputType == INPUT_TYPE.PASSWORD}
          keyboardType={this.props.inputType == INPUT_TYPE.PASSWORD ? 'default' : this.props.inputType}
          placeholder={this.props.placeholder} 
          placeholderTextColor={Theme.textWhite}
          value={this.state.text}
          onChangeText={this.validateText}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
  },
  textInput: {
    textAlign: 'center'
  }
})