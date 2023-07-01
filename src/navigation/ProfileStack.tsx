import { createStackNavigator } from '@react-navigation/stack'

import { SCREEN } from '~constants'
import { useTranslation } from '~hooks'
import { Header } from '~navigation/Header'
import { optionForScreen } from '~navigation/HeaderGlobalStyles'
import { ProfileScreen } from '~screens'

const { Navigator, Screen } = createStackNavigator()

export const ProfileStack = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <Navigator screenOptions={optionForScreen}>
      <Screen
        // name="ProfileStack"
        name={SCREEN.STACK_PROFILE}
        options={({ navigation }) => ({
          headerTitle: () => (
            <Header navigation={navigation} title={t('navigation.screen_titles.profile')} />
          ),
        })}
        component={ProfileScreen}
      />
    </Navigator>
  )
}
