import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { SHOP_API } from '~api'
import { ControlledField } from '~components'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import useLoading from '~hooks/useLoading'
import { setToken } from '~services'
import { notification } from '~services/ShopService'

interface IProps {
  route: {
    params: {
      mobile: string
      token: string | number
      reset: undefined | boolean
    }
  }
}

export const PasswordStack: FC<IProps> = ({ route }) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/
  const { t } = useTranslation()
  const { loading, startLoading, stopLoading } = useLoading()
  const { reset, token, mobile } = route.params

  type TEditPassword = {
    edit_new_password: string
    edit_confirm_password: string
  }

  const defaultValues: TEditPassword = {
    edit_new_password: '',
    edit_confirm_password: '',
  }
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<TEditPassword>({
    mode: 'onTouched',
    defaultValues,
  })

  const navigation = useNavigation<any>()
  const handleSubmitForm = async ({ edit_new_password, edit_confirm_password }: TEditPassword) => {
    if (edit_new_password !== edit_confirm_password) {
      alert(t('password.do_not_match'))
      return
    }
    if (!regex.test(edit_new_password)) {
      alert(t('password.valid_password'))
      return
    }
    startLoading()
    let data
    if (reset !== undefined) {
      data = await SHOP_API.resetPassword(token, mobile, edit_new_password)
      stopLoading()
    } else {
      data = await SHOP_API.createCustomerUser(token, mobile, edit_new_password)
      stopLoading()
    }
    if (data) {
      if (reset !== undefined) {
        await notification(t('password.passwordChanged'))
        stopLoading()
        navigation.navigate(SCREEN.STACK_SIGN_IN)
      } else {
        stopLoading()
        const token2 = data.payload.token.accessToken
        await setToken(token2)
        navigation.navigate(SCREEN.PROFILE_EDIT, { typeData: false })
      }
    }
    stopLoading()
  }
  return (
    <View style={styles.PasswordStack_wrapper}>
      <ControlledField.Input
        autoCapitalize="none"
        control={control}
        errors={errors}
        isRequired
        label={reset ? t('password.newPassword') : t('sign_in_screen.password_placeholder')}
        name="edit_new_password"
        onSubmitEditing={handleSubmit(handleSubmitForm)}
        placeholder={reset ? t('password.newPassword') : t('sign_in_screen.password_placeholder')}
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
        name="edit_confirm_password"
        onSubmitEditing={handleSubmit(handleSubmitForm)}
        placeholder={t('password.confirmPassword')}
        returnKeyType="send"
        rules={{
          required: t('form.required'),
        }}
        testID="passwordInput"
        type="password"
      />
      <View style={styles.button_wrapper}>
        <CustomButton
          loading={loading}
          title={reset ? t('password.changePassword') : t('password.create_password')}
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
  button_wrapper: {
    marginTop: 20,
  },
})
