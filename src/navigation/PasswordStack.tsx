/**
 * was created by tigran at 26.07.23
 */
import React, { FC, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'

interface IProps {
  route: any
  navigation: any
}

export const PasswordStack: FC<IProps> = ({ route, navigation }) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/
  const token = route?.params?.token.toString()
  const mobile = route?.params?.mobile
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

    const data = await SHOP_API.createCustomerUser(token, mobile, password)
    console.log(data, 'iiiiiii')
    if (data && data.status === 200) {
      navigation.navigate(SCREEN.STACK_SIGN_IN, { pass_from: 'passStack' })
    }
  }
  return (
    <View style={styles.PasswordStack_wrapper}>
      <TextInput
        style={styles.input}
        // onChangeText={setPassword}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        placeholder="Confirm Password"
        secureTextEntry
      />
      <CustomButton title="Create Password" onPress={handleSubmit} />
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
