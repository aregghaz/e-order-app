import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'
import { SHOP_API } from '~api'
import { ControlledField } from '~components'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { notification } from '~services/ShopService'

interface IProps {
  route: any
  navigation: any
}

export const ChangePasswordScreen: FC<IProps> = ({ route }) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/

  const { t } = useTranslation()
  // useFocusEffect(
  //   useCallback(() => {
  //     const getTokenData = async () => {
  //       const pesdonalData = await getUserData()
  //     }
  //     getTokenData()
  //   }, [])
  // )

  /// const mobile = route?.params?.mobile
  const navigation = useNavigation<any>()

  const handleSubmitForm = async (data: any) => {
    const { confirmPassword, oldPassword, password } = data
    console.log(data, oldPassword, password)
    if (oldPassword !== confirmPassword) {
      notification(t('password.doNotMatch'), ALERT_TYPE.WARNING)
      return
    }
    if (password.trim() === '') {
      notification(t('password.required'), ALERT_TYPE.WARNING)
      // alert('Passwords do not match')
      return
    }
    if (!regex.test(password)) {
      notification(t('password.passError'), ALERT_TYPE.WARNING)
      return
    }

    const dataRes = await SHOP_API.changePassword(oldPassword, password)
    if (dataRes) {
      notification(t('password.passwordChanged'))
      navigation.navigate(SCREEN.TAB_HOME)
    }
  }
  const defaultValues: any = {
    // TODO: Reset this values when building production app
    password: '',
    oldPassword: '',
    confirmPassword: '',
    confirm: false,
  }
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<any>({
    mode: 'onTouched',
    defaultValues,
  })

  // const onSubmit = async (data: SignInFormValues) => {
  //   try {
  //
  //   } catch (e) {
  //
  //   } finally {
  //
  //   }
  // }

  return (
    <View style={styles.PasswordStack_wrapper}>
      <ControlledField.Input
        autoCapitalize="none"
        control={control}
        errors={errors}
        isRequired
        label={t('sign_in_screen.password_label')}
        name="password"
        onSubmitEditing={handleSubmit(handleSubmitForm)}
        placeholder={t('sign_in_screen.password_placeholder')}
        /// ref={passwordInputRef}
        returnKeyType="send"
        rules={{
          required: t('form.required'),
        }}
        testID="passwordInput"
        type="password"
      />
      <ControlledField.Input
        autoCapitalize="none"
        control={control}
        errors={errors}
        isRequired
        label={t('password.oldPassword')}
        name="oldPassword"
        onSubmitEditing={handleSubmit(handleSubmitForm)}
        placeholder={t('password.oldPassword')}
        ////     ref={passwordInputRef}
        returnKeyType="send"
        rules={{
          required: t('form.required'),
        }}
        testID="passwordInput"
        type="password"
      />
      <ControlledField.Input
        autoCapitalize="none"
        control={control}
        errors={errors}
        isRequired
        label={t('password.confirmPassword')}
        name="confirmPassword"
        onSubmitEditing={handleSubmit(handleSubmitForm)}
        placeholder={t('password.confirmPassword')}
        ////    ref={passwordInputRef}
        returnKeyType="send"
        rules={{
          required: t('form.required'),
        }}
        testID="passwordInput"
        type="password"
      />
      <View style={styles.custom_Button}>
        <CustomButton
          title={t('password.changePassword')}
          onPress={handleSubmit(handleSubmitForm)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  PasswordStack_wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  custom_Button: {
    marginTop: 20,
  },
})
