import React, { PureComponent } from 'react'
import {
  View,
  TextInput,
  Dimensions,
  StyleSheet
} from 'react-native'

export default class DGInput extends PureComponent {

  state = {
    text: null
  }

  getText() {
    return this.state.text
  }

  render() {
    return(
      <View style={[styles.container, this.props.style]}>
        <TextInput 
          style={{ 
            color: this.props.textColor ? this.props.textColor : 'white',
            textAlign: this.props.inputAlign ? this.props.inputAlign : 'center'
          }}
          keyboardType={this.props.inputType === "phone" ? "phone-pad" : null}
          secureTextEntry={this.props.inputType === "password"}
          placeholder={this.props.placeholder} 
          placeholderTextColor={this.props.textColor ? this.props.textColor : 'white'}
          value={this.state.text}
          onChangeText={(text) => this.setState({ text })}
          onSubmitEditing={this.props.onSubmitEditing}
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