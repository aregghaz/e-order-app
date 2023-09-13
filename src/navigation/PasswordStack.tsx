import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TextInput, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { getToken, setToken } from '~services'
import { notification } from '~services/ShopService'

interface IProps {
  route: any
  navigation: any
}

export const PasswordStack: FC<IProps> = ({ route }) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/
  const [tokenData, setTokenData] = useState<any>('')
  const { t } = useTranslation()
  const { reset, token } = route.params
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
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (!regex.test(password)) {
      alert(
        'Password must contain at least one lowercase letter, one uppercase letter, and one digit, and be at least 10 characters long'
      )
      return
    }
    let data
    /// console.log(tokenData, token, mobile, reset, 'resetreset')
    if (reset != undefined) {
      data = await SHOP_API.resetPassword(token, mobile, password)
    } else {
      console.log(token,'tokentoken')
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
      <CustomButton title={reset ? 'Change Password' : 'Create Password'} onPress={handleSubmit} />
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
