/**
 * was created by tigran at 06.08.23
 */
import { useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import PhoneInput from 'react-native-phone-input'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'

export const ForgotPasswordStack: FC = ({ route }: any) => {
  const [number, setNumber] = useState('')
  const { navigate } = useNavigation<any>()
  const { t } = useTranslation()
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
      <PhoneInput
        style={styles.input}
        initialCountry="am"
        onChangePhoneNumber={setNumber}
        textProps={{ placeholder: '+37491444444' }}
      />
      <CustomButton title={t('send')} onPress={handleVerify} />
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
