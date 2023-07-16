/**
 * was created by tigran at 15.07.23
 */
import { NoImage } from 'assets/svg'
import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const ImgOrSvg: FC = () => {
  return (
    <View style={styles.ImgOrSvg_wrapper}>
      <Text>ImgOrSvg</Text>
      <NoImage height={200} width={200} fill={'red'} />
    </View>
  )
}

const styles = StyleSheet.create({
  ImgOrSvg_wrapper: {
    flex: 1,
  },
})
