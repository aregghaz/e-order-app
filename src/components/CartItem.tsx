import React, { useState } from 'react'
import { Pressable, View, Text, StyleSheet, ScrollView } from 'react-native'

import { SHOP_API } from '~api'
import InputNumber from '~components/molecules/InputNumber'
import { customStyles } from '~utils/style_helpers'

export const CartItems = ({ elem, onDelete, cartItemId, isDelete }: any) => {
  const [value, setValue] = useState<number>(1)

  const handleUpdateQuantity = async (id: string) => {
    await SHOP_API.updateCartQuantity(id, value)
  }
  return (
    <ScrollView>
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
                  <View style={styles.buttons_wrapper}>
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
                    <InputNumber
                      value={value}
                      min={1}
                      onChange={async (e) => {
                        setValue(e)
                        /*** FIXME I don't understand which id to pass to this request!!!! ***/
                        // await handleUpdateQuantity(item.id)
                        await handleUpdateQuantity(cartItemId)
                      }}
                    />
                  </View>
                )}
              </View>
            </View>
          )
        })}
    </ScrollView>
  )
}
const colors = {
  borderColor: '#d1d1d1',
  red: 'red',
}

const styles = StyleSheet.create({
  buttons_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 20,
  },
  cart_wrapper: {
    flexDirection: 'column',
    marginHorizontal: 15,
    marginVertical: 10,
    padding: 10,
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
  },
  delete: {
    borderRadius: 4,
    color: colors.red,
    letterSpacing: 1,
    textAlign: 'center',
  },
  delete_wrapper: {
    ...customStyles.border(1, 'solid', '#781F19'),
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 4,
    paddingVertical: 5,
    width: 140,
  },
})
