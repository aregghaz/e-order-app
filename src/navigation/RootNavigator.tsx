import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

// import { BottomTabNavigator } from './BottomTabNavigator'

import { SCREEN } from '~constants'
import { useTranslation } from '~hooks'
// import { PhoneRegisterStack } from '~navigation/PhoneRegisterStack'
// import { Verification } from '~navigation/Verification'
import { BottomTabNavigator } from '~navigation/BottomTabNavigator'
import {
  /// ApplicationInfoScreen,
  NotFoundScreen,
  // SettingsScreen,
  // SignInScreen,
  // SignUpScreen,
} from '~screens'

const { Navigator, Screen, Group } = createStackNavigator()

export const RootNavigator: FC = () => {
  const { t } = useTranslation()
  /// const { isSignedIn } = useAuth()

  return (
    <Navigator>
      <Group key="authorized">
        <Screen
          name={SCREEN.STACK_MAIN_TAB}
          component={BottomTabNavigator}
          options={{ title: t('navigation.screen_titles.main_tab'), headerShown: false }}
        />
      </Group>
      <Group key="modals" screenOptions={{ presentation: 'modal' }}>
        <Screen
          name={SCREEN.STACK_NOT_FOUND}
          component={NotFoundScreen}
          options={{ title: t('navigation.screen_titles.not_found') }}
        />
      </Group>
    </Navigator>
  )
}
