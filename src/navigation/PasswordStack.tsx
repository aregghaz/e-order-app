import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TextInput, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { getToken, setToken } from '~services'
import { notification } from '~services/ShopService'
import { getUserData } from '~services/UserService'

interface IProps {
  route: any
  navigation: any
}

export const PasswordStack: FC<IProps> = ({ route }) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/
  const [tokenData, setTokenData] = useState<any>('')
  const {t} = useTranslation()
  const { reset, token } = route.params
  useFocusEffect(
    useCallback(() => {
      const getTokenData = async () => {
        const tokenUSer = await getToken()
        const pesdonalData = await getUserData()
        console.log(pesdonalData, 'pesdonalDatapesdonalData')
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
    console.log(tokenData,token, mobile, reset, 'resetreset')
    if (reset != undefined) {
      data = await SHOP_API.resetPassword(token, mobile, password)
    } else {
      data = await SHOP_API.createCustomerUser('1111', mobile, password)
    }
    if (data) {
      if (reset != undefined) {
        notification(t('password.passwordChanged'))
        navigation.navigate(SCREEN.STACK_SIGN_IN)
      } else {
        const token2 = data.payload.token.accessToken
        await setToken(token2)
        navigation.navigate(SCREEN.PROFILE_EDIT, { type: false })
        navigation.navigate(SCREEN.PROFILE_EDIT)
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
