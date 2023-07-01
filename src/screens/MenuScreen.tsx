/**
 * was created by tigran at 01.07.23
 */
import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface IProps {
  route: any
}

export const MenuScreen: FC<IProps> = ({ route }) => {
  // console.log(route.params.title, 'props')
  return (
    <View style={styles.menu_wrapper}>
      <Text>{route.params.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  menu_wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})
