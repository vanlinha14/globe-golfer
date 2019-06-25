import Authentication from './screens/Authentication'
import SetupAccountStep0 from './screens/Authentication/SetupAccountStep0'
import { createStackNavigator, createAppContainer } from "react-navigation"

const AppNavigator = createStackNavigator({
  Authentication: { screen: Authentication },
  SetupAccountStep0: { screen: SetupAccountStep0 }
});

export default createAppContainer(AppNavigator)

