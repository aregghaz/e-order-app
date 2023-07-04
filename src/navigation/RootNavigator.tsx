import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

import { BottomTabNavigator } from './BottomTabNavigator'

import { SCREEN } from '~constants'
import { useTranslation } from '~hooks'
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
          options={{ title: t('navigation.screen_titles.main_tab'), headerShown: false }}
          component={BottomTabNavigator}
        />
      </Group>
      <Group key="modals" screenOptions={{ presentation: 'modal' }}>
        <Screen
          name={SCREEN.STACK_NOT_FOUND}
          options={{ title: t('navigation.screen_titles.not_found') }}
          component={NotFoundScreen}
        />
      </Group>
    </Navigator>
  )
}
