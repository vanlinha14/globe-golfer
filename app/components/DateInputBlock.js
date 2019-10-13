import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet
} from 'react-native'
import Theme from '../res/Theme'
import DGText from './DGText'
import DatePicker from 'react-native-datepicker'
import Strings from '../res/Strings'

export default class DateInputBlock extends PureComponent {

  state = {
    date: null
  }

  onDateChange = (date) => {
    this.setState({date})
    if (this.props.onDateChange) {
      this.props.onDateChange(date)
    }
  }

  renderTitle() {
    return <DGText style={styles.messgage}>{this.props.title}</DGText>
  }

  renderInput() {
    return (
      <DatePicker
        style={styles.input}
        date={this.state.date}
        customStyles={{dateInput: { borderWidth: 0 }}}
        mode="date"
        placeholder={Strings.tapToSelect}
        format="DD-MM-YYYY"
        minDate="1900-01-01"
        confirmBtnText={Strings.confirm}
        cancelBtnText={Strings.cancel}
        showIcon={false}
        onDateChange={this.onDateChange}
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
    width: '50%',
    height: 44,
    marginTop: 16,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  messgage: {
    color: Theme.textGray,
    color: Theme.textWhite,
    fontSize: 20,
    marginTop: 24,
    textAlign: 'center'
  },
})