import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import Theme from '../res/Theme'
import DGText from './DGText'
import DGInput from './DGInput'

export default class TextInputBlock extends PureComponent {

  renderTitle() {
    return <DGText style={styles.messgage}>{this.props.title}</DGText>
  }

  renderIndexInput() {
    return <DGInput style={[styles.input, this.props.inputStyle]} />
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
    backgroundColor: Theme.buttonSecondary,
    color: Theme.textWhite,
    textAlign: 'center',
    marginTop: 16
  },
  messgage: {
    color: Theme.textGray,
    color: Theme.textWhite,
    fontSize: 20,
    marginTop: 24,
    textAlign: 'center'
  },
})