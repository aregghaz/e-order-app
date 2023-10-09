/**
 * was created by tigran at 09.07.23
 */
import { useNavigation } from '@react-navigation/native'
import React, { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'
import PhoneInput from 'react-native-phone-input'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { notification } from '~services/ShopService'

export const PhoneRegisterStack: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const navigation = useNavigation<any>()
  const { t } = useTranslation()
  const handlePhoneNumberChange = (number: string) => {
    setPhoneNumber(number)
  }

  const handleButtonPress = async () => {
    const data = await SHOP_API.setPhoneNumberRequest(phoneNumber)
    if (data) {
      navigation.navigate(SCREEN.STACK_VERIFICATION, {
        phone: phoneNumber,
        duration: data.payload.duration,
      })
    } else {
      await notification(t('form.numberExist'), ALERT_TYPE.WARNING)
    }
  }

  return (
    <View style={styles.PhoneRegisterStack_wrapper}>
      <PhoneInput
        style={styles.input}
        initialCountry="am"
        onChangePhoneNumber={handlePhoneNumberChange}
        textProps={{ placeholder: '+37491444444' }}
      />
      <CustomButton title={t('register')} onPress={handleButtonPress} />
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN.STACK_SIGN_IN)}>
        <Text style={styles.have_account}>{t('have_account')}</Text>
      </TouchableOpacity>
      <View style={styles.policy_terms}>
        <View style={styles.policy_wrapper}>
          <Text>{t('pt_part_1')}</Text>
          <Pressable onPress={() => navigation.navigate(SCREEN.TERMS)}>
            <Text style={styles.links}>{t('terms_alt')}</Text>
          </Pressable>
          <Text>{t('pt_part_2')}</Text>
          <Pressable onPress={() => navigation.navigate(SCREEN.PRIVACY)}>
            <Text style={styles.links}>{t('privacy_alt')}</Text>
          </Pressable>
          <Text>{t('pt_part_3')}</Text>
        </View>
      </View>
    </View>
  )
}

const colors = {
  border: '#ddd',
  red: 'red',
  link: '#5495ff',
}

const styles = StyleSheet.create({
  PhoneRegisterStack_wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  have_account: {
    marginTop: 20,
  },
  input: {
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: '100%',
  },
  links: {
    color: colors.link,
  },
  policy_terms: {
    marginTop: 20,
    width: '100%',
  },
  policy_wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
})
