/**
 * was created by tigran at 25.07.23
 */
import { createStackNavigator } from '@react-navigation/stack'
import React, { FC } from 'react'

import { SCREEN } from '~constants'
import { AccountStack } from '~navigation/AccountStack'
import { ForgotPasswordStack } from '~navigation/ForgotPasswordStack'
import { PasswordStack } from '~navigation/PasswordStack'
import { PhoneRegisterStack } from '~navigation/PhoneRegisterStack'
import { Verification } from '~navigation/Verification'
import { SignInScreen } from '~screens'

const { Navigator, Screen } = createStackNavigator()
export const RegistrationAlias: FC = () => {
  return (
    <Navigator>
      <Screen
        name={SCREEN.PHONE_REGISTER}
        component={PhoneRegisterStack}
        options={{ headerShown: false }}
      />
      <Screen
        name={SCREEN.STACK_VERIFICATION}
        component={Verification}
        options={{ headerShown: false }}
      />
      <Screen
        name={SCREEN.STACK_PASSWORD}
        component={PasswordStack}
        options={{ headerShown: false }}
      />
      <Screen
        name={SCREEN.STACK_SIGN_IN}
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Screen
        name={SCREEN.STACK_ACCOUNT}
        component={AccountStack}
        options={{ headerShown: false }}
      />
      <Screen
        name={SCREEN.STACK_FORGOT_PASSWORD}
        component={ForgotPasswordStack}
        options={{ headerShown: false }}
      />
    </Navigator>
  )
}
