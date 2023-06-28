import { createStackNavigator } from '@react-navigation/stack'
import { useCallback } from 'react'

import { Header } from '~navigation/Header'
import { optionForScreen } from '~navigation/HeaderGlobalStyles'
import { HomeScreen } from '~screens'

const { Navigator, Screen } = createStackNavigator()

export const HomeStack = (): JSX.Element => {
  const homeStackOptions = useCallback(
    ({ navigation }: any) => ({
      headerTitle: () => <Header navigation={navigation} />,
    }),
    []
  )
  return (
    <Navigator screenOptions={optionForScreen}>
      <Screen name="HomeStack" options={homeStackOptions} component={HomeScreen} />
    </Navigator>
  )
}
