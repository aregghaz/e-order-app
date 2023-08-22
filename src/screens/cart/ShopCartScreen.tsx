/**
 * was created by tigran at 09.08.23
 */
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { CartItems } from '~components/CartItem'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { getShopId } from '~services/ShopService'
import { customStyles } from '~utils/style_helpers'

export const ShopCartScreen: FC = ({ navigation }: any) => {
  const [carts, setCarts] = useState<null | any>([])
  const [trigger, setTrigger] = useState(false)
  useFocusEffect(
    useCallback(() => {
      const getShopCarts = async () => {
        const getID = await getShopId()
        console.log(getID, 'getIDgetID')
        if (getID !== undefined) {
          const data = await SHOP_API.getShopCarts(getID)
          setCarts(data.payload.content)
        }
      }
      getShopCarts()
    }, [trigger])
  )

  const handleDelete = async (IDS: any) => {
    await SHOP_API.deleteFromCart(IDS.cartItemID, IDS.itemId)
    setTrigger(!trigger)
  }
  const handlerCheckOut = () => {
    navigation.navigate(SCREEN.CHECKOUT)
  }
  return (
    <>
      <ScrollView>
        <View style={styles.ShopCartScreen_wrapper}>
          {carts.length > 0 ? (
            carts.map((item: any, index: number) => {
              return (
                <React.Fragment key={index}>
                  {/*<Text>{item?.cartTotal}</Text>*/}
                  <CartItems
                    isDelete={true}
                    elem={item.cartItems}
                    onDelete={handleDelete}
                    cartItemId={item.id}
                  />
                </React.Fragment>
              )
            })
          ) : (
            <View style={styles.no_product}>
              <Text>There is no products here</Text>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={styles.btn_wrapper}>
        <CustomButton title={'Go To Checkout'} onPress={() => handlerCheckOut()} />
      </View>
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

  // image_wrapper: {
  //   ...customStyles.border(1, "solid", colors.borderColor),
  //   width: 100,
  //   height: 100,
  //   marginRight: 10
  // },

  no_product: {
    alignItems: 'center',
    marginTop: 20,
  },
})
