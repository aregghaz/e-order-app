/**
 * was created by tigran at 23.06.23
 */

import { Text, View } from 'native-base'
import React, { FC } from 'react'
import { StyleSheet } from 'react-native'

export const ProfileScreen: FC = () => {
  return (
    <View style={styles.profile_wrapper}>
      <Text style={styles.profile_wrapper_title}>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  profile_wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  profile_wrapper_title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})
