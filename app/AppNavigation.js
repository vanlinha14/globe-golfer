import Authentication from './screens/Authentication'

import Login from './screens/Authentication/Login'
import LoginWithEmail from './screens/Authentication/LoginWithEmail'
import Register from './screens/Authentication/Register'
import SetupAccount from './screens/Authentication/SetupAccount'
import SetupAccountStepInputIndex from './screens/Authentication/SetupAccountStepInputIndex'
import SetupAccountStepInputName from './screens/Authentication/SetupAccountStepInputName'
import SetupAccountStepInputBirthday from './screens/Authentication/SetupAccountStepInputBirthday'
import SetupAccountStepInputGender from './screens/Authentication/SetupAccountStepInputGender'
import SetupAccountStepInputLocation from './screens/Authentication/SetupAccountStepInputLocation'
import SetupAccountStepInputScannedCard from './screens/Authentication/SetupAccountStepInputScannedCard'
import SetupAccountStepInputAvatar from './screens/Authentication/SetupAccountStepInputAvatar'
import SetupAccountStepActiveLocation from './screens/Authentication/SetupAccountStepActiveLocation'
import SetupAccountStepInputEmail from './screens/Authentication/SetupAccountStepInputEmail'
import SetupAccountStepFinal from './screens/Authentication/SetupAccountStepFinal'

import Settings from './screens/Settings'

import Menu from './screens/Menu'

import VeryFirstScreen from './screens/VeryFirst'

import { createStackNavigator, createAppContainer } from "react-navigation"

const loginNavigator = {
  Login: { screen: Login },
  LoginWithEmail: { screen: LoginWithEmail }
}

const setupAccountNavigator = {
  Register: { screen: Register },
  SetupAccount: { screen: SetupAccount },
  SetupAccountStepInputIndex: { screen: SetupAccountStepInputIndex },
  SetupAccountStepInputName: { screen: SetupAccountStepInputName },
  SetupAccountStepInputBirthday: { screen: SetupAccountStepInputBirthday },
  SetupAccountStepInputGender: { screen: SetupAccountStepInputGender },
  SetupAccountStepInputLocation: { screen: SetupAccountStepInputLocation },
  SetupAccountStepInputScannedCard: { screen: SetupAccountStepInputScannedCard },
  SetupAccountStepInputAvatar: { screen: SetupAccountStepInputAvatar },
  SetupAccountStepActiveLocation: { screen: SetupAccountStepActiveLocation },
  SetupAccountStepInputEmail: { screen: SetupAccountStepInputEmail },
  SetupAccountStepFinal: { screen: SetupAccountStepFinal }
}

const AppNavigator = createStackNavigator({
  VeryFirstScreen: { screen: VeryFirstScreen },
  Authentication: { screen: Authentication },
  Menu: { screen: Menu },
  Settings: { screen: Settings },
  ...loginNavigator,
  ...setupAccountNavigator
})

export default createAppContainer(AppNavigator)

