/**
 * was created by tigran at 09.08.23
 */
import { useFocusEffect } from '@react-navigation/native'
import { CheckIcon, Select } from 'native-base'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { SHOP_API } from '~api'
import { CartItems } from '~components/CartItem'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { getShopId } from '~services/ShopService'
import { customStyles } from '~utils/style_helpers'

export const ShopCartScreen: FC = ({ navigation }: any) => {
  const [data, setData] = useState<null | any>([])
  const [carts, setCarts] = useState<null | any>([])
  const [trigger, setTrigger] = useState(false)
  const [selectedShops, setSelectedShops] = useState('')
  const [carData, setCarData] = useState({
    selectedShops: '',
    shop: '',
    total: 0,
    totalReward: 0,
  })
  const [loding, setLoading] = useState(true)
  useFocusEffect(
    useCallback(() => {
      setCarts([])
      const getShopCarts = async () => {
        const getID = await getShopId()
        if (getID !== undefined) {
          console.log(getID, 'getIDgetIDgetID')
          const data = await SHOP_API.getShopCarts(getID)

          if (data) {
            console.log(data, '333333')
            const item = data.payload.content
            setSelectedShops(item[0].id)
            setCarData({
              selectedShops: item[0].supplier.companyName,
              shop: item[0].shop.shopName,
              total: item[0].cartTotal,
              totalReward: item[0].totalReward,
            })
            setCarts(item[0].cartItems)
            setData(item)
          }
        }
      }
      getShopCarts()
    }, [trigger])
  )

  useEffect(() => {
    const bootstrap = async () => {
      data.map((item: any) => {
        console.log(data, 'datadata')
        if (item.id === selectedShops) {
          setCarData({
            selectedShops: item.supplier.companyName,
            shop: item.shop.shopName,
            total: item.cartTotal,
            totalReward: item.totalReward,
          })
          setCarts(item.cartItems)
        }
      })
    }
    bootstrap()
  }, [loding])
  const handleDelete = async (IDS: any) => {
    await SHOP_API.deleteFromCart(IDS.cartItemID, IDS.itemId)
    setTrigger(!trigger)
  }
  const handlerCheckOut = (id: string) => {
    navigation.navigate(SCREEN.CHECKOUT, { id })
  }

  return (
    <>
      <View style={styles.ShopCartScreen_wrapper}>
        <View style={styles.ShopListScreen_wrapper}>
          <View style={styles.select_wrapper}>
            {carts.length > 0 && (
              <Select
                selectedValue={selectedShops}
                minWidth="360"
                height="50"
                borderColor="#CCC"
                marginY="2"
                color="#000"
                letterSpacing="1"
                fontSize="17"
                accessibilityLabel="Choose Service"
                placeholder="Choose Service"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />,
                }}
                mt={1}
                onValueChange={(itemValue) => {
                  setSelectedShops(itemValue)
                  setLoading(!loding)
                }}
              >
                {data.map((item: any) => {
                  return (
                    <Select.Item label={item.supplier.companyName} key={item.id} value={item.id} />
                  )
                })}
              </Select>
            )}
          </View>
        </View>
        <View style={styles.scrollView}>
          {carts.length > 0 ? (
            <CartItems isDelete={true} elem={carts} onDelete={handleDelete} cartItemId={carts.id} />
          ) : (
            <View style={styles.no_product}>
              <Text>There is no products here</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.btn_wrapper}>
        <View style={styles.orderViewContainer}>
          <View style={styles.orderView}>
            <Text> Итоги: </Text>
            <View style={styles.hr} />
            <Text>Поставщик: {carData.selectedShops}</Text>
            <Text>Магазин: {carData.shop} </Text>
            <Text>Бонус за заказ : {carData.totalReward.toFixed(2)}</Text>
            <Text>Итоговая сумма : {carData.total.toFixed(2)} </Text>
          </View>
        </View>
        <CustomButton
          width={340}
          padding={10}
          border="grey"
          background="black"
          color="white"
          title={'Go To Checkout'}
          onPress={() => handlerCheckOut(selectedShops)}
        />
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
    justifyContent: 'center',
  },
  ShopListScreen_wrapper: {
    flex: 1,
    position: 'relative',
  },
  btn_wrapper: {
    paddingVertical: 10,
    ...customStyles.border(1, 'solid', colors.borderColor),
    alignItems: 'center',
  },

  hr: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    marginVertical: 3,
    width: 200,
  },
  no_product: {
    alignItems: 'center',
    marginTop: 20,
  },
  // image_wrapper: {
  //   ...customStyles.border(1, "solid", colors.borderColor),
  //   width: 100,
  //   height: 100,
  //   marginRight: 10
  // },
  orderView: {
    // width: 340,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 10,
    // backgroundColor: 'red',
  },
  orderViewContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 340,
  },
  scrollView: {
    marginTop: 68,
  },
  select_wrapper: {
    alignItems: 'center',
  },
})
