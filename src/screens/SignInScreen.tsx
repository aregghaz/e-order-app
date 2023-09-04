import {useFocusEffect, useNavigation } from '@react-navigation/native'
import { Button, Center, Text } from 'native-base'
import { FC, useCallback, useEffect } from 'react'
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import { ControlledField } from '~components'
import { SCREEN } from '~constants'
import { useAuth, useRef, useSignInForm, useTranslation } from '~hooks'

interface IProps {
  route: any
  navigation: any
}

export const SignInScreen: FC<IProps> = (props): JSX.Element => {
  const { navigate } = useNavigation<any>()
  const { t } = useTranslation()
  const passwordInputRef = useRef<TextInput>(null)
  const { control, errors, submit, isSubmitting } = useSignInForm()
  const { isSignedIn } = useAuth()
  const goToRegister = useCallback(() => navigate(SCREEN.PHONE_REGISTER), [navigate])
  const handleCheckRegister = () => {
    submit()
  }

  useEffect(() => {
      console.log(isSignedIn, 'isSignedInisSignedIn')
    navigate(SCREEN.STACK_HOME)
  }, [isSignedIn])


    useFocusEffect(
        useCallback(() => {
            if(isSignedIn){
                navigate(SCREEN.STACK_HOME)
            }

        }, [isSignedIn])
    )



  return (
    <Center p={8} flex={1}>
      <ControlledField.Input
        autoCapitalize="none"
        control={control}
        errors={errors}
        isRequired
        rules={{
          required: t('form.required'),
        }}
        label={t('common.phone_number')}
        name="phone"
        onSubmitEditing={passwordInputRef.current?.focus}
        placeholder={t('common.phone_placeholder')}
        returnKeyType="next"
        testID="phoneInput"
        keyboardType={'phone-pad'}
      />
      <ControlledField.Input
        autoCapitalize="none"
        control={control}
        errors={errors}
        isRequired
        label={t('sign_in_screen.password_label')}
        name="password"
        onSubmitEditing={submit}
        placeholder={t('sign_in_screen.password_placeholder')}
        ref={passwordInputRef}
        returnKeyType="send"
        rules={{
          required: t('form.required'),
        }}
        testID="passwordInput"
        type="password"
      />
      <TouchableOpacity
        style={styles.forgot_password_btn}
        onPress={() => navigate(SCREEN.STACK_FORGOT_PASSWORD)}
      >
        <Text style={styles.forgot_password}>Forgot password ?</Text>
      </TouchableOpacity>
      <Button
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        mb={2}
        mt={4}
        // onPress={submit}
        onPress={handleCheckRegister}
        testID="signInButton"
        style={styles.button}
      >
        {t('sign_in_screen.sign_in')}
      </Button>
      <Button width="64" onPress={goToRegister} variant="ghost">
        <Text bold>{t('sign_in_screen.dont_have_an_account')}</Text>
      </Button>
    </Center>
  )
}
const colors = {
  black: 'black',
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.black,
    width: '100%',
  },
  forgot_password: {
    textDecorationLine: 'underline',
  },
  forgot_password_btn: {
    marginLeft: 'auto',
    marginTop: 10,
  },
})
