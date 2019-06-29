import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import Theme from '../res/Theme'
import DGText from './DGText'
import DGButton from './DGButton'

export default class SelectInputBlock extends PureComponent {

  renderTitle() {
    return <DGText style={styles.messgage}>{this.props.title}</DGText>
  }

  renderInput() {
    return <DGButton style={styles.input} />
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
    color: Theme.textWhite,
    textAlign: 'center',
    marginTop: 16,
    borderRadius: 8
  },
  messgage: {
    color: Theme.textGray,
    fontSize: 20,
    marginTop: 24,
    textAlign: 'center'
  },
})