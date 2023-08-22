import React from 'react'
import { Pressable, View, Text, StyleSheet } from 'react-native'

import { customStyles } from '~utils/style_helpers'

export const CartItems = ({ elem, onDelete, cartItemId, isDelete }: any) => {
  return (
    <>
      {elem &&
        elem.map((item: any, index: number) => {
          return (
            <View key={index} style={styles.cart_wrapper}>
              <View>
                <Text>{item.product.productName}</Text>
                <Text>Sky: {item.product.sku}</Text>
                <Text>Qty: {item.quantity}</Text>
                <Text>Price: {item.price}</Text>
                <Text>Reward: {item.reward}</Text>
                <Text>Discount {item.discount} %</Text>
                {isDelete && (
                  <Pressable
                    style={styles.delete_wrapper}
                    onPress={() =>
                      onDelete({
                        cartItemID: cartItemId,
                        itemId: item.id,
                      })
                    }
                  >
                    <Text style={styles.delete}>Delete</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )
        })}
    </>
  )
}
const colors = {
  borderColor: '#d1d1d1',
  red: 'red',
}

const styles = StyleSheet.create({
  cart_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
  },
  delete: {
    ...customStyles.border(1, 'solid', colors.red),
    borderRadius: 4,
    color: colors.red,
    textAlign: 'center',
    width: 80,
  },
  delete_wrapper: {
    marginVertical: 4,
  },
})
