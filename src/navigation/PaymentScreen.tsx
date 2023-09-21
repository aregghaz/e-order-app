/**
 * was created by tigran at 21.09.23
 */
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, StyleSheet } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { useAuth, useGlobal } from '~hooks'

export const PaymentScreen: FC = () => {
  const [payment, setPayment] = useState<any>([])
  const { userData } = useGlobal()
  const { t } = useTranslation()
  const { isSignedIn } = useAuth()
  const { navigate } = useNavigation<any>()
  useFocusEffect(
    useCallback(() => {
      if (isSignedIn) {
        const getPaymentData = async () => {
          const data = await SHOP_API.getPayment()
          setPayment(data.payload.content)
        }
        getPaymentData()
      } else {
        navigate(SCREEN.STACK_SIGN_IN)
      }
    }, [userData.id])
  )

  const handlePay = () => {
    console.log(userData.id, 'IDDDDDD')
    console.log(payment, 'payment')
  }

  return (
    <>
      {/*{payment.length > 0 &&*/}
      {/*  payment.map((el: any) => (*/}
      {/*    <View key={el.id}>*/}
      {/*      <Text>poxos</Text>*/}
      {/*    </View>*/}
      {/*  ))}*/}
      <View style={styles.PaymentScreen_wrapper}>
        <View style={styles.text_wrapper}>
          <Text style={styles.text_title}>{t('deposit')} : </Text>
          <Text style={styles.text_title}>0 ₽</Text>
        </View>
        <View style={styles.text_wrapper}>
          <Text style={styles.text_title}>{t('reward')} : </Text>
          <Text style={styles.text_title}>0 B</Text>
        </View>
        <View style={styles.button_wrapper}>
          <CustomButton width={200} title={t('pay_method')} background="red" onPress={handlePay} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  PaymentScreen_wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  button_wrapper: {
    marginTop: 20,
  },
  text_title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginVertical: 5,
  },
})
