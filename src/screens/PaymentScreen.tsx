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
import { getUserData } from '~services/UserService'

export const PaymentScreen: FC = () => {
  const [account, setAccount] = useState<any>([])
  const { userData } = useGlobal()
  const { t } = useTranslation()
  const { isSignedIn } = useAuth()
  const { navigate } = useNavigation<any>()
  useFocusEffect(
    useCallback(() => {
      if (isSignedIn) {
        const getCustomerAccount = async () => {
          const userInfo = await getUserData()
          const data = await SHOP_API.getCustomer(userInfo.id)
          setAccount(data.payload.account)
        }
        getCustomerAccount()
      } else {
        navigate(SCREEN.STACK_SIGN_IN)
      }
    }, [userData.id])
  )

  const handlePay = () => {
    console.log(userData.id, 'IDDDDDD')
    console.log(account, 'payment')
  }

  return (
    <>
      <View style={styles.PaymentScreen_wrapper}>
        <View style={styles.text_wrapper}>
          <Text style={styles.text_title}>{t('deposit')} : </Text>
          <Text style={styles.text_title}>{account.deposit} ₽</Text>
        </View>
        <View style={styles.text_wrapper}>
          <Text style={styles.text_title}>{t('reward')} : </Text>
          <Text style={styles.text_title}>{account.reward} B</Text>
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
