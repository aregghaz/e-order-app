/**
 * was created by tigran at 09.08.23
 */
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { CustomButton } from '~components/molecules/CustomButton'
import { customStyles } from '~utils/style_helpers'

export const ShopCartScreen: FC = () => {
  const [carts, setCarts] = useState<null | any>([])
  // useEffect(() => {
  //  const getShopCarts = async () => {
  //    const data = await SHOP_API.getShopCarts()
  //    setCarts(data.payload.content)
  //   }
  //   getShopCarts()
  // }, []);
  useFocusEffect(
    useCallback(() => {
      const getShopCarts = async () => {
        const data = await SHOP_API.getShopCarts()
        setCarts(data.payload.content)
      }
      getShopCarts()
    }, [])
  )

  const handleDelete = async (id: string) => {
    const del = await SHOP_API.deleteShopCart(id)
    console.log(del, 'delel')
  }

  console.log(carts, 'CARTS')
  return (
    <>
      <ScrollView>
        <View style={styles.ShopCartScreen_wrapper}>
          {carts.length > 0 &&
            carts.map((item: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  {/*<Text>{item?.cartTotal}</Text>*/}
                  <CartItems elem={item.cartItems} onDelete={handleDelete} itemId={item.id} />
                </React.Fragment>
              )
            })}
        </View>
      </ScrollView>
      <View style={styles.btn_wrapper}>
        <CustomButton title={'Go To Checkout'} onPress={() => alert(12)} />
      </View>
    </>
  )
}

const CartItems = ({ elem, onDelete, itemId }: any) => {
  return (
    <>
      {elem &&
        elem.map((item: any, index: number) => {
          return (
            <View key={index} style={styles.cart_wrapper}>
              {/*<View style={styles.image_wrapper}>*/}

              {/*</View>*/}
              <View>
                <Text>{item.product.productName}</Text>
                <Text>Qty: {item.quantity}</Text>
                <Text>Price: {item.price}</Text>
                <Text>Reward: {item.reward}</Text>
                <Text>Discount {item.discount} %</Text>
                <Pressable style={styles.delete_wrapper} onPress={() => onDelete(itemId)}>
                  <Text style={styles.delete}>Delete</Text>
                </Pressable>
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
  ShopCartScreen_wrapper: {
    // alignItems: "center",
    flex: 1,
    justifyContent: 'center',
  },
  btn_wrapper: {
    height: 70,
    paddingHorizontal: 10,
    ...customStyles.border(1, 'solid', colors.borderColor),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cart_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
  },
  // image_wrapper: {
  //   ...customStyles.border(1, "solid", colors.borderColor),
  //   width: 100,
  //   height: 100,
  //   marginRight: 10
  // },
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
