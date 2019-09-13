import React, { PureComponent } from 'react'
import {
  View,
  Dimensions,
  StyleSheet
} from 'react-native'
import Theme from '../res/Theme'
import DGText from './DGText'
import DatePicker from 'react-native-datepicker'
import moment from 'moment'
import Strings from '../res/Strings'

export default class DateInputBlockV2 extends PureComponent {

  state = {
    date: "2000-01-01"
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
        customStyles={{
          dateInput: { 
            borderWidth: 0, 
            paddingHorizontal: 8,
            alignItems: 'flex-start'
          },
          dateText: {
            color: Theme.textWhite,
            fontWeight: 'bold',
            fontSize: 16
          }
        }}
        mode="date"
        placeholder={Strings.tapToSelect}
        format="YYYY-MM-DD"
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
    width: Dimensions.get('window').width - 24,
    height: 44,
    color: Theme.textWhite,
    borderRadius: 8,
    marginHorizontal: -4,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
  },
  messgage: {
    color: Theme.textGray,
    fontSize: 14,
    marginTop: 24,
  },
})