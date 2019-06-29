import Authentication from './screens/Authentication'
import SetupAccount from './screens/Authentication/SetupAccount'
import SetupAccountStep1a from './screens/Authentication/SetupAccountStep1a'
import SetupAccountStepInputIndex from './screens/Authentication/SetupAccountStepInputIndex'
import SetupAccountStepInputName from './screens/Authentication/SetupAccountStepInputName'
import SetupAccountStepInputBirthday from './screens/Authentication/SetupAccountStepInputBirthday'
import SetupAccountStepInputGender from './screens/Authentication/SetupAccountStepInputGender'

import { createStackNavigator, createAppContainer } from "react-navigation"

const AppNavigator = createStackNavigator({
  Authentication: { screen: Authentication },
  SetupAccount: { screen: SetupAccount },
  SetupAccountStep1a: { screen: SetupAccountStep1a },
  SetupAccountStepInputIndex: { screen: SetupAccountStepInputIndex },
  SetupAccountStepInputName: { screen: SetupAccountStepInputName },
  SetupAccountStepInputBirthday: { screen: SetupAccountStepInputBirthday },
  SetupAccountStepInputGender: { screen: SetupAccountStepInputGender }
});

export default createAppContainer(AppNavigator)

