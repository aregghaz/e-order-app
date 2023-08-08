/**
 * was created by tigran at 08.08.23
 */
import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const WishlistScreen: FC = () => {
  return (
    <View style={styles.WishlistScreen_wrapper}>
      <Text>There is no products here yet</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  WishlistScreen_wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
