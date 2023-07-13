import { Box, Button, Center, Text } from 'native-base'
import { StyleSheet, TextInput } from 'react-native'

import { ControlledField } from '~components'
import { useAuth, useCallback, useNavigation, useRef, useSignInForm, useTranslation } from '~hooks'

export const SignInScreen = (): JSX.Element => {
  const { navigate } = useNavigation()
  const { t } = useTranslation()
  const passwordInputRef = useRef<TextInput>(null)
  const { control, errors, submit, isSubmitting } = useSignInForm()
  const { signOut } = useAuth()

  const goToSignUp = useCallback(() => navigate('SignUp'), [navigate])
  console.log(isSubmitting, 'isSubmitting')
  return (
    <Center p={8} flex={1}>
      <ControlledField.Input
        autoCapitalize="none"
        control={control}
        errors={errors}
        isRequired
        // keyboardType="number-pad"
        label={t('common.phone_number')}
        name="phone"
        onSubmitEditing={passwordInputRef.current?.focus}
        placeholder={t('common.phone_placeholder')}
        returnKeyType="next"
        rules={
          {
            // required: t('form.required'),
            // pattern: {
            //   value: REGEX.EMAIL,
            //   message: t('form.invalid_email_format'),
            // },
          }
        }
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
      <Center mt={8}>
        <ControlledField.Checkbox
          control={control}
          errors={errors}
          label={t('sign_in_screen.remember_me')}
          mb={4}
          name="confirm"
          testID="confirmCheckbox"
        />
      </Center>
      <Button
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        mb={8}
        onPress={submit}
        testID="signInButton"
        // width="64"
        style={styles.button}
      >
        {t('sign_in_screen.sign_in')}
      </Button>

      <Text bold mb={4}>
        {t('sign_in_screen.dont_have_an_account')}
      </Text>
      <Button width="64" onPress={goToSignUp} variant="ghost">
        {t('sign_in_screen.sign_up')}
      </Button>
      <Button width="64" onPress={signOut} variant="ghost">
        <Text bold mb={4}>
          sign out
        </Text>
      </Button>
      <Box mt={12} />
      {/* TODO: Remove this after implementing signing in with backend  */}
      {/*<Text bold>Correct credentials</Text>*/}
      {/*<Text color="gray.500" textAlign="center">*/}
      {/*  Email: test@example.com{'\n'}Password: 123456*/}
      {/*</Text>*/}
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
