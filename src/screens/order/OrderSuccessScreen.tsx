/**
 * was created by tigran at 03.09.23
 */
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'

import { SuccessIcon } from '../../../assets/svg/SuccessIcon'

import { SCREEN } from '~constants'
import { screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'

interface IProps {
  route: any
}

const colors = {
  successColor: '#1DBF73',
  lightButtonColor: '#E8F9F1',
  white: 'white',
  borderColor: '#f1f1f1',
}
export const OrderSuccessScreen: FC<IProps> = ({ route }) => {
  const navigation = useNavigation<any>()

  const goToOrdersList = () => {
    navigation.navigate(SCREEN.STACK_ORDER_LIST)
  }
  const goToHome = () => {
    navigation.navigate(SCREEN.TAB_HOME)
  }
  return (
    <View style={styles.SuccessScreen_wrapper}>
      <View style={styles.center_content}>
        <View style={styles.icon_wrapper}>
          <SuccessIcon />
        </View>
        <Text style={styles.success_text}>Order Successful!</Text>
        <Text>Thank You!</Text>
        <View style={styles.buttons_wrapper}>
          <Pressable style={[styles.button, styles.view_order]} onPress={goToOrdersList}>
            <Text style={[styles.btn_text, styles.orders_text]}>View Orders</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.shopping]} onPress={goToHome}>
            <Text style={[styles.btn_text, styles.shopping_text]}>Continue Shopping</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  SuccessScreen_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  btn_text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 5,
    marginVertical: 8,
    padding: 15,
    width: screenWidth - 50,
  },
  buttons_wrapper: {
    marginTop: 20,
  },
  center_content: {
    alignItems: 'center',
  },
  icon_wrapper: {
    height: 90,
  },
  orders_text: {
    color: colors.white,
  },
  shopping: {
    backgroundColor: colors.lightButtonColor,
  },
  shopping_text: {
    color: colors.successColor,
  },
  success_text: {
    color: colors.successColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  view_order: {
    backgroundColor: colors.successColor,
  },
})
