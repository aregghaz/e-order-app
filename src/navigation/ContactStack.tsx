/**
 * was created by tigran at 23.06.23
 */

import { Text, View } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

export const ContactStack: FC = () => {
  return (
    <View style={styles.contact_wrapper}>
      <Text style={styles.contact_wrapper_title}>Contact</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  contact_wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  contact_wrapper_title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
