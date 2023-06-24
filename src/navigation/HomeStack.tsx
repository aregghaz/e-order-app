import { createStackNavigator } from '@react-navigation/stack'

import { Header } from '~navigation/Header'
import { optionForScreen } from '~navigation/HeaderGlobalStyles'
import { HomeScreen } from '~screens'

const { Navigator, Screen } = createStackNavigator()

export const HomeStack = (): JSX.Element => {
  return (
    <Navigator screenOptions={optionForScreen}>
      <Screen
        name="HomeStack"
        options={({ navigation }) => ({
          headerTitle: () => <Header navigation={navigation} />,
        })}
        component={HomeScreen}
      />
    </Navigator>
  )
}
