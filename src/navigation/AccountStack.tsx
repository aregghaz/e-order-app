/**
 * was created by tigran at 26.07.23
 */
import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const AccountStack: FC = () => {
  return (
    <View style={styles.AccountStack_wrapper}>
      <Text>AccountStack</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  AccountStack_wrapper: {
    flex: 1,
  },
})
