import Authentication from './screens/Authentication'
import { createStackNavigator, createAppContainer } from "react-navigation"

const AppNavigator = createStackNavigator({
  Authentication: {
    screen: Authentication
  }
});

export default createAppContainer(AppNavigator)

