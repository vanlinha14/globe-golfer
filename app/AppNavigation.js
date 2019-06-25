import Authentication from './screens/Authentication'
import SetupAccountStep0 from './screens/Authentication/SetupAccountStep0'
import SetupAccountStep1a from './screens/Authentication/SetupAccountStep1a'
import SetupAccountStep1b from './screens/Authentication/SetupAccountStep1b'

import { createStackNavigator, createAppContainer } from "react-navigation"

const AppNavigator = createStackNavigator({
  Authentication: { screen: Authentication },
  SetupAccountStep0: { screen: SetupAccountStep0 },
  SetupAccountStep1a: { screen: SetupAccountStep1a },
  SetupAccountStep1b: { screen: SetupAccountStep1b }
});

export default createAppContainer(AppNavigator)

