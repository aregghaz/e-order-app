/**
 * was created by tigran at 03.09.23
 */
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

import { FailureIcon } from '../../../assets/svg/FailureIcon'

import { SCREEN } from '~constants'
import { screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'

interface IProps {
  route: any
}

const colors = {
  failColor: 'red',
  lightButtonColor: '#E8F9F1',
  white: 'white',
  borderColor: '#f1f1f1',
}
export const OrderFailScreen: FC<IProps> = () => {
  const navigation = useNavigation<any>()

  const goToHome = () => {
    navigation.navigate(SCREEN.TAB_HOME)
  }
  return (
    <View style={styles.SuccessScreen_wrapper}>
      <View style={styles.center_content}>
        <View style={styles.icon_wrapper}>
          <FailureIcon />
        </View>
        <Text style={styles.success_text}>Order Failed!</Text>
        <Text>Please try again</Text>
        <View style={styles.buttons_wrapper}>
          <Pressable style={[styles.button, styles.view_order]} onPress={goToHome}>
            <Text style={[styles.btn_text, styles.orders_text]}>Go to home page</Text>
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
  success_text: {
    color: colors.failColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  view_order: {
    backgroundColor: colors.failColor,
  },
})
