import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TextInput, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { getToken, setToken } from '~services'
import { notification } from '~services/ShopService'
// import { ControlledField } from "~components";
// import { useForm } from "react-hook-form";

interface IProps {
  route: any
  navigation: any
}

export const PasswordStack: FC<IProps> = ({ route }) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/
  const [tokenData, setTokenData] = useState<any>('')
  const { t } = useTranslation()
  const { reset, token } = route.params
  // const defaultValues: any = {
  //   // TODO: Reset this values when building production app
  //   password: '',
  //   changePassword: '',
  //   confirm: false,
  // }
  // const {
  //   control,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm<any>({
  //   mode: 'onTouched',
  //   defaultValues,
  // })
  useFocusEffect(
    useCallback(() => {
      const getTokenData = async () => {
        const tokenUSer = await getToken()
        setTokenData(tokenUSer)
      }
      getTokenData()
    }, [])
  )

  const mobile = route?.params?.mobile
  const navigation = useNavigation<any>()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleSubmitForm = async () => {
    console.log(password, 'password')
    console.log(confirmPassword, 'confirmPassword')
    if (password !== confirmPassword) {
      alert(t('password.do_not_match'))
      return
    }
    if (!regex.test(password)) {
      alert(t('password.valid_password'))
      return
    }
    let data
    /// console.log(tokenData, token, mobile, reset, 'resetreset')
    if (reset != undefined) {
      data = await SHOP_API.resetPassword(token, mobile, password)
    } else {
      console.log(token, 'tokentoken')
      data = await SHOP_API.createCustomerUser(token, mobile, password)
    }
    if (data) {
      if (reset != undefined) {
        await notification(t('password.passwordChanged'))
        navigation.navigate(SCREEN.STACK_SIGN_IN)
      } else {
        const token2 = data.payload.token.accessToken
        console.log(token2, 'token__222222')
        await setToken(token2)
        navigation.navigate(SCREEN.PROFILE_EDIT, { typeData: false })
      }
    }
  }
  return (
    <View style={styles.PasswordStack_wrapper}>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder={reset ? 'New Password' : 'Password'}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />
      {/*<ControlledField.Input*/}
      {/*  autoCapitalize="none"*/}
      {/*  control={control}*/}
      {/*  errors={errors}*/}
      {/*  isRequired*/}
      {/*  label={t('sign_in_screen.password_label')}*/}
      {/*  name="password"*/}
      {/*  onSubmitEditing={handleSubmit(handleSubmitForm)}*/}
      {/*  placeholder={t('sign_in_screen.password_placeholder')}*/}
      {/*  /// ref={passwordInputRef}*/}
      {/*  returnKeyType="send"*/}
      {/*  rules={{*/}
      {/*    required: t('form.required'),*/}
      {/*  }}*/}
      {/*  testID="passwordInput"*/}
      {/*  type="password"*/}
      {/*/>*/}
      {/*<ControlledField.Input*/}
      {/*  autoCapitalize="none"*/}
      {/*  control={control}*/}
      {/*  errors={errors}*/}
      {/*  isRequired*/}
      {/*  label={t('password.oldPassword')}*/}
      {/*  name="oldPassword"*/}
      {/*  onSubmitEditing={handleSubmit(handleSubmitForm)}*/}
      {/*  placeholder={t('password.oldPassword')}*/}
      {/*  ////     ref={passwordInputRef}*/}
      {/*  returnKeyType="send"*/}
      {/*  rules={{*/}
      {/*    required: t('form.required'),*/}
      {/*  }}*/}
      {/*  testID="passwordInput"*/}
      {/*  type="password"*/}
      {/*/>*/}
      <CustomButton
        title={reset ? 'Change Password' : 'Create Password'}
        // onPress={handleSubmit(handleSubmitForm)}
        onPress={handleSubmitForm}
      />
    </View>
  )
}
const colors = {
  border: '#ddd',
  red: 'red',
}
const styles = StyleSheet.create({
  PasswordStack_wrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '100%',
  },
})
