/**
 * was created by tigran at 06.08.23
 */
import { useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'

export const ForgotPasswordStack: FC = ({ route }: any) => {
  const [number, setNumber] = useState('')
  const { navigate } = useNavigation<any>()
  const handleVerify = async () => {
    const data = await SHOP_API.forgotPassword({ mobile: number })
    navigate(SCREEN.STACK_VERIFICATION, {
      phone: number,
      duration: data.payload.duration,
      reset: true,
    })
  }
  return (
    <View style={styles.ForgotPasswordStack_wrapper}>
      <TextInput
        style={styles.input}
        keyboardType={'phone-pad'}
        placeholder={'+37491444444'}
        value={number}
        onChangeText={(value) => setNumber(value)}
      />
      <CustomButton title="Verify" onPress={handleVerify} />
    </View>
  )
}

const colors = {
  border: '#ddd',
}

const styles = StyleSheet.create({
  ForgotPasswordStack_wrapper: {
    flexGrow: 1,
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
