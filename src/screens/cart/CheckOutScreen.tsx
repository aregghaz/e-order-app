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
import { SCREEN } from '~constants'
import { notification } from '~services/ShopService'
import { screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'

export const CheckOutScreen: FC = ({ route, navigation }: any) => {
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
  console.log(route, 'route===============')
  const { t } = useTranslation()

  useFocusEffect(
    useCallback(() => {
      const getShopCarts = async () => {
        const data = await SHOP_API.getShopCart(id)
        // console.log(id)
        setCarts(data.payload)
        ////   console.log(carts, 'carts')
      }
      getShopCarts()
    }, [id])
  )

  const handlerCheckOut = async () => {
    const data = await SHOP_API.createOrder({ shoppingCart: id, comment })
    if (data) {
      navigation.navigate(SCREEN.STACK_MAIN_TAB)
      await notification('Ваш заказ успешно размещен')
    }
  }
  return (
    <>
      <ScrollView>
        <View style={styles.ShopCartScreen_wrapper}>
          <CartItems elem={carts.cartItems} isDelete={false} cartItemId={123123213} />
        </View>
      </ScrollView>
      <View style={styles.parentBox}>
        {/*<View style={styles.boxContainer}>*/}
        {/*  <View style={styles.box}>*/}
        {/*    <Text>{t('shop.shop')}</Text>*/}
        {/*    <Text>{carts.shop.shopName}</Text>*/}
        {/*    <Text>{carts.shop.companyName}</Text>*/}
        {/*    <Text>{carts.shop.deliveryAddress.phoneNumber1}</Text>*/}
        {/*  </View>*/}
        {/*  <View style={styles.box}>*/}
        {/*    <Text>{t('shop.supplier')}</Text>*/}
        {/*    <Text>{carts.supplier.shopName}</Text>*/}
        {/*    <Text>{carts.supplier.companyName}</Text>*/}
        {/*    <Text>{carts.supplier.__address__.phoneNumber1}</Text>*/}
        {/*  </View>*/}
        {/*</View>*/}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder={t('comment')}
            placeholderTextColor={'black'}
            multiline={true}
            numberOfLines={2}
            onChangeText={(text) => {
              setComment(text)
            }}
          />
        </View>
      </View>
      {/*<View style={styles.orderView}>*/}
      {/*  <Text>Бонус за заказ : {carts.totalReward.toFixed(2)} B</Text>*/}
      {/*  <Text>Итоговая сумма : {carts.cartTotal.toFixed(2)} ₽</Text>*/}
      {/*</View>*/}
      <View>
        <View style={styles.orderView}>
          <View>
            <Text>
              {t('store_name_alt')}: {carts.shop.shopName}{' '}
            </Text>
            <Text>
              {t('navigation.screen_titles.supplier')}: {carts.supplier.companyName}
            </Text>
          </View>
          <View style={styles.right_side}>
            <View style={styles.price_block}>
              <Text style={styles.large_text}>
                {t('sum')}: {carts.cartTotal.toFixed(2)} ₽
              </Text>
            </View>
            <View style={styles.price_block}>
              <Text>{t('reward')}: </Text>
              <Text>{carts.totalReward.toFixed(2)}</Text>
              <Text style={styles.bonus}>B</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.button_double}>
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
  ShopCartScreen_wrapper: {},
  bonus: {
    color: colors.red,
  },
  // box: {
  //   borderRadius: 4,
  //   flexDirection: 'column',
  //   paddingHorizontal: 15,
  //   // width: 180,
  //   paddingVertical: 5,
  //   width: screenWidth / 2 - 22,
  //   ...customStyles.border(1, 'solid', colors.borderColor),
  // },
  // boxContainer: {
  //   flexDirection: 'row',
  //   gap: 12,
  //   justifyContent: 'center',
  //   marginHorizontal: 15,
  // },
  button_double: {
    ...customStyles.borderTop(1, 'solid', colors.borderColor),
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    width: '100%',
  },
  input: {
    // minHeight: 40,
    minWidth: '100%',
    // paddingHorizontal: 15,
    padding: 5,
    ...customStyles.border(1, 'solid', colors.borderColor),
    borderRadius: 4,
    fontSize: 16,
    marginVertical: 4,
    textAlignVertical: 'top',
  },
  inputBox: {
    paddingHorizontal: 5,
    // paddingVertical: 3,
  },
  large_text: {
    fontSize: 18,
    fontWeight: '600',
  },
  orderView: {
    padding: 10,
  },
  parentBox: {
    // alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    ...customStyles.border(1, 'solid', colors.borderColor),
    // gap: 7,
    // paddingVertical: 5,
  },
  price_block: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  right_side: {
    marginLeft: 'auto',
  },
})
