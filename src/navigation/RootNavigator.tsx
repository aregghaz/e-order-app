import { createStackNavigator } from '@react-navigation/stack'
import { FC } from 'react'

import { BottomTabNavigator } from './BottomTabNavigator'

import { useAuth, useTranslation } from '~hooks'
import {
  ApplicationInfoScreen,
  NotFoundScreen,
  SettingsScreen,
  SignInScreen,
  SignUpScreen,
  CategoryInnerScreen,
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
            name="SignIn"
            component={SignInScreen}
            options={{
              title: t('navigation.screen_titles.sign_in'),
            }}
          />
          <Screen
            name="SignUp"
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
            name="MainTab"
            options={{ title: t('navigation.screen_titles.main_tab'), headerShown: false }}
            component={BottomTabNavigator}
          />
          <Screen
            name="Settings"
            options={{ title: t('navigation.screen_titles.settings') }}
            component={SettingsScreen}
          />
          <Screen
            name="CategoryInner"
            options={{ title: t('navigation.screen_titles.category_inner') }}
            component={CategoryInnerScreen}
          />
        </Group>
      )}
      <Group key="modals" screenOptions={{ presentation: 'modal' }}>
        <Screen
          name="ApplicationInfo"
          options={{ title: t('navigation.screen_titles.application_info') }}
          component={ApplicationInfoScreen}
        />
        <Screen
          name="NotFound"
          options={{ title: t('navigation.screen_titles.not_found') }}
          component={NotFoundScreen}
        />
      </Group>
    </Navigator>
  )
}
