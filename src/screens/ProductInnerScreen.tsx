/**
 * was created by tigran at 02.07.23
 */
import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { IFeatured } from '~types/featuredProducts'

export const ProductInnerScreen: FC<IFeatured> = ({ item }) => {
  return (
    <View style={styles.ProductInnerScreen_wrapper}>
      <Text style={styles.name}>poxos</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ProductInnerScreen_wrapper: {
    flex: 1,
  },
  name: {
    flex: 1,
  },
})
