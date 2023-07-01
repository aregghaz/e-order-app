import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

import { BottomTabNavigator } from './BottomTabNavigator'

import { SCREEN } from '~constants'
import { useAuth, useTranslation } from '~hooks'
import {
  ApplicationInfoScreen,
  NotFoundScreen,
  SettingsScreen,
  SignInScreen,
  SignUpScreen,
} from '~screens'

const { Navigator, Screen, Group } = createStackNavigator()

export const RootNavigator: FC = () => {
  const { t } = useTranslation()
  const { isSignedIn } = useAuth()

  return (
    <Navigator>
      {!isSignedIn ? (
        <Group key="unauthorized">
          <Screen
            name={SCREEN.STACK_SIGN_IN}
            component={SignInScreen}
            options={{
              title: t('navigation.screen_titles.sign_in'),
            }}
          />
          <Screen
            name={SCREEN.STACK_SIGN_UP}
            component={SignUpScreen}
            options={{
              title: t('navigation.screen_titles.sign_up'),
            }}
          />
        </Group>
      ) : (
        <Group key="authorized">
          {/*** after commenting this code, it still works ....***/}
          <Screen
            name={SCREEN.STACK_MAIN_TAB}
            options={{ title: t('navigation.screen_titles.main_tab'), headerShown: false }}
            component={BottomTabNavigator}
          />
          <Screen
            name={SCREEN.STACK_SETTINGS}
            options={{ title: t('navigation.screen_titles.settings') }}
            component={SettingsScreen}
          />
        </Group>
      )}
      <Group key="modals" screenOptions={{ presentation: 'modal' }}>
        <Screen
          name={SCREEN.STACK_APPLICATION_INFO}
          options={{ title: t('navigation.screen_titles.application_info') }}
          component={ApplicationInfoScreen}
        />
        <Screen
          name={SCREEN.STACK_NOT_FOUND}
          options={{ title: t('navigation.screen_titles.not_found') }}
          component={NotFoundScreen}
        />
      </Group>
    </Navigator>
  )
}
