/**
 * was created by tigran at 09.08.23
 */
import { useFocusEffect } from '@react-navigation/native'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

import { SHOP_API } from '~api'
import { CartItems } from '~components/CartItem'
import { CustomButton } from '~components/molecules/CustomButton'
import { notification } from '~services/ShopService'
import { customStyles } from '~utils/style_helpers'

export const CheckOutScreen: FC = ({ route }: any) => {
  const [carts, setCarts] = useState<any>({
    totalReward: 0.0,
    cartTotal: 0.0,
    cartItems: [],
    shop: {
      shopName: '',
      companyName: '',
      deliveryAddress: {
        phoneNumber1: '',
      },
    },
    supplier: {
      shopName: '',
      companyName: '',
      __address__: {
        phoneNumber1: '',
      },
    },
  })

  const [comment, setComment] = useState('')
  const { id } = route.params
  const { t } = useTranslation()

  useFocusEffect(
    useCallback(() => {
      const getShopCarts = async () => {
        const data = await SHOP_API.getShopCart(id)
        setCarts(data.payload)
        ////   console.log(carts, 'carts')
      }
      getShopCarts()
    }, [id])
  )

  const handlerCheckOut = async () => {
    console.log('presss')
    const data = await SHOP_API.createOrder({ shoppingCart: id, comment })
    if (data) {
      notification('Ваш заказ успешно размещен')
    }
  }
  return (
    <>
      <ScrollView>
        <View style={styles.ShopCartScreen_wrapper}>
          <React.Fragment key={123123}>
            <CartItems elem={carts.cartItems} isDelete={false} cartItemId={123123213} />
          </React.Fragment>
        </View>
      </ScrollView>
      <View style={styles.parentBox}>
        <View style={styles.boxContainer}>
          <View style={styles.box}>
            <Text>{t('shop.shop')}</Text>
            <Text>{carts.shop.shopName}</Text>
            <Text>{carts.shop.companyName}</Text>
            <Text>{carts.shop.deliveryAddress.phoneNumber1}</Text>
          </View>
          <View style={styles.box}>
            <Text>{t('shop.supplier')}</Text>
            <Text>{carts.supplier.shopName}</Text>
            <Text>{carts.supplier.companyName}</Text>
            <Text>{carts.supplier.__address__.phoneNumber1}</Text>
          </View>
        </View>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => {
              console.log(text, 'texttexttext')
              setComment(text)
            }}
          />
        </View>
      </View>
      <View style={styles.btn_wrapper}>
        <View style={styles.orderView}>
          <Text>Бонус за заказ : {carts.totalReward.toFixed(2)}</Text>
          <Text>Итоговая сумма : {carts.cartTotal.toFixed(2)} </Text>
        </View>
        <CustomButton title={t('order.confirmOrder')} onPress={() => handlerCheckOut()} />
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
  box: {
    /// width:"48%",
    flexDirection: 'column',
    // height: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: 168,

    ...customStyles.border(1, 'solid', colors.borderColor),
    /// width:"48%",
    ///float:'left',
    // marginRight:25
    // backgroundColor: "red"
  },
  boxContainer: {
    // height: 30,
    // backgroundColor: "black",
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
  },

  btn_wrapper: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10,
    // ...customStyles.border(1, 'solid', colors.borderColor),
  },
  // no_product: {
  //     alignItems: 'center',
  //     marginTop: 20,
  // },
  input: {
    // backgroundColor: 'grey'
    minHeight: 80,
    width: 349,
    ...customStyles.border(1, 'solid', colors.borderColor),
    marginHorizontal: 11,
    marginVertical: 4,
  },
  inputBox: {
    paddingVertical: 3,
  },

  orderView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  parentBox: {
    display: 'flex',
    // flexDirection: 'row',
    ...customStyles.border(1, 'solid', colors.borderColor),
    // backgroundColor: 'red',
    paddingVertical: 10,
  },
})
