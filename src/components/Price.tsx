/**
 * was created by tigran at 19.09.23
 */
import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface IProps {
  price: number
  discount: number | null
  textStyles?: any
}

const calculateDiscountPrice = (price: number, discount: number | null) => {
  let newPrice
  if (discount && discount > 0) {
    const percentage = (price * discount) / 100
    newPrice = (price - percentage).toFixed(2)
  }
  return {
    oldPrice: price,
    newPrice,
  }
}
export const Price: FC<IProps> = ({ price, discount, textStyles }) => {
  const styleForText = textStyles ? textStyles : {}
  const { oldPrice, newPrice } = calculateDiscountPrice(price, discount)
  return (
    <>
      {discount && discount > 0 ? (
        <View style={styles.prices}>
          <Text style={textStyles}>{newPrice} ₽</Text>
          <Text style={[styleForText, styles.delete_value]}>{oldPrice} ₽</Text>
        </View>
      ) : (
        <View>
          <Text style={textStyles}>{oldPrice} ₽</Text>
        </View>
      )}
    </>
  )
}

const colors = {
  light: '#999999',
}

const styles = StyleSheet.create({
  delete_value: {
    color: colors.light,
    textDecorationLine: 'line-through',
  },
  prices: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
})
