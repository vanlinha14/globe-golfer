import { INPUT_STATUS } from "../components/DGInput"

export function isValidEmailFormat(text) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(text)
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