import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TextInput, View } from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { notification } from '~services/ShopService'
import { getUserData } from '~services/UserService'

interface IProps {
  route: any
  navigation: any
}

export const ChangePasswordScreen: FC<IProps> = ({ route }) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/

  const { t } = useTranslation()
  useFocusEffect(
    useCallback(() => {
      const getTokenData = async () => {
        const pesdonalData = await getUserData()
        console.log(pesdonalData, 'pesdonalDatapesdonalData')
        // ////   console.log(carts, 'carts')
      }
      getTokenData()
    }, [])
  )

  /// const mobile = route?.params?.mobile
  const navigation = useNavigation<any>()
  const [oldpassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      notification(t('password.doNotMatch'), ALERT_TYPE.WARNING)
      return
    }
    if (oldpassword.trim() === '') {
      notification(t('password.required'), ALERT_TYPE.WARNING)
      // alert('Passwords do not match')
      return
    }
    if (!regex.test(password)) {
      notification(t('password.passError'), ALERT_TYPE.WARNING)
      return
    }

    const data = await SHOP_API.changePassword(oldpassword, password)
    if (data) {
      notification(t('password.passwordChanged'))
      reset()
      navigation.navigate(SCREEN.TAB_HOME)
    }
  }
  const reset = () => {
    setOldPassword('')
    setPassword('')
    setConfirmPassword('')
  }
  return (
    <View style={styles.PasswordStack_wrapper}>
      <TextInput
        style={styles.input}
        onChangeText={setOldPassword}
        value={oldpassword}
        placeholder={t('password.newPassword')}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder={t('password.oldPassword')}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder={t('password.confirmPassword')}
        secureTextEntry
      />
      <CustomButton title={t('password.changePassword')} onPress={handleSubmit} />
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
