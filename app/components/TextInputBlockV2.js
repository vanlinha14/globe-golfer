import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import Theme from '../res/Theme'
import DGText from './DGText'
import DGInput from './DGInput'
import DGInputV2 from './DGInputV2';

export default class TextInputBlockV2 extends PureComponent {

  textInput = undefined

  getText = () => {
    return this.textInput.getText()
  }

  renderTitle() {
    if (this.props.title) {
      return <DGText style={styles.messgage}>{this.props.title}</DGText>
    }
  }

  renderIndexInput() {
    return <DGInputV2 
      ref={ref => this.textInput = ref}
      style={[styles.input, this.props.inputStyle]} 
      placeholder={this.props.placeholder} 
      inputAlign={this.props.inputAlign}
      inputType={this.props.inputType}
      validateFunction={this.props.validateFunction}
    />
  }

  render() {
    return(
      <View style={[styles.container, this.props.style]}>
        {this.renderTitle()}
        {this.renderIndexInput()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
  input: {
    color: Theme.textWhite,
    textAlign: 'center',
    marginTop: 8
  },
  messgage: {
    color: Theme.textGray,
    color: Theme.textWhite,
    fontSize: 16,
    marginTop: 24
  },
})