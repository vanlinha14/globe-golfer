import { INPUT_STATUS } from "../components/DGInput"
import { Alert } from 'react-native'
import Strings from '../res/Strings'
import Share from 'react-native-share'

export function isValidEmailFormat(text) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(text)
}

export function emailValidationFunction(text) {
  if (text == "") {
    return INPUT_STATUS.NORMAL
  }

  if (isValidEmailFormat(text)) {
    return INPUT_STATUS.VALID
  }
  else {
    return INPUT_STATUS.ERROR
  }
}

export function passwordValidationFunction(text) {
  if (text.length >= 6) {
    return INPUT_STATUS.VALID
  }
  
  return INPUT_STATUS.ERROR
}

export function showErrorAlert(message) {
  Alert.alert(Strings.error, message)
}

export function showErrorAlertWithCallbackAction(message, action) {
  Alert.alert(
    Strings.error, 
    message, 
    [ { text: "OK", onPress: action } ], 
    { onDismiss: action }
  )
}

export function shareGG() {
  Share.open({
    title: 'Share Global Golfer',
    message: 'Share Global Golfer to your friend!',
    url: 'http://www.google.com'
  });
}