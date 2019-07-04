import Authentication from './screens/Authentication'
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

import { createStackNavigator, createAppContainer } from "react-navigation"

const AppNavigator = createStackNavigator({
  Authentication: { screen: Authentication },
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
})

export default createAppContainer(AppNavigator)

