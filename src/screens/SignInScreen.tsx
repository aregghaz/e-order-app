import { useNavigation } from '@react-navigation/native'
import { Button, Center, Text } from 'native-base'
import { useCallback } from 'react'
import { StyleSheet, TextInput } from 'react-native'

import { ControlledField } from '~components'
import { SCREEN } from '~constants'
import { useRef, useSignInForm, useTranslation } from '~hooks'

export const SignInScreen = (): JSX.Element => {
  const { navigate } = useNavigation<any>()
  const { t } = useTranslation()
  const passwordInputRef = useRef<TextInput>(null)
  const { control, errors, submit, isSubmitting } = useSignInForm()

  const goToRegister = useCallback(() => navigate(SCREEN.PHONE_REGISTER), [navigate])

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
      <Button
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        mb={2}
        mt={6}
        onPress={submit}
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
})
