/**
 * was created by tigran at 09.08.23
 */
import { useFocusEffect } from '@react-navigation/native'
import { CheckIcon, Select } from 'native-base'
import React, { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ALERT_TYPE } from 'react-native-alert-notification'

import { SHOP_API } from '~api'
import { CartItems } from '~components/CartItem'
import { CustomButton } from '~components/molecules/CustomButton'
import { SCREEN } from '~constants'
import { useAuth, useGlobal } from '~hooks'
import useLoading from '~hooks/useLoading'
import { getShopId, notification } from '~services/ShopService'
import { screenWidth } from '~utils/breakpoints'
import { customStyles } from '~utils/style_helpers'

export const ShopCartScreen: FC = ({ navigation, route }: any) => {
  // console.log(route, 'ruyyyyyyyyyy')
  const { t } = useTranslation()
  const { isSignedIn } = useAuth()
  const [data, setData] = useState<null | any>([])
  const [carts, setCarts] = useState<null | any>([])
  const [combinedData, setCombinedData] = useState<any>([])
  const [cartID, setCartID] = useState<string>('')
  const [trigger, setTrigger] = useState(false)
  const [selectedShops, setSelectedShops] = useState('')
  const [loding, setLoading] = useState(false)
  const { loading: uLoading, startLoading, stopLoading } = useLoading()
  // const halfWidth = screenWidth / 2 - 20
  const halfWidth = screenWidth - 20
  const [carData, setCarData] = useState({
    selectedShops: '',
    shop: '',
    total: 0,
    totalReward: 0,
  })
  const { setIndicatorCount } = useGlobal()
  useFocusEffect(
    useCallback(() => {
      const getShopCarts = async () => {
        const getID = await getShopId()
        if (getID) {
          const data = await SHOP_API.getShopCarts(getID)
          if (data) {
            const item = data.payload.content
            if (item.length > 0) {
              setIndicatorCount(item.length)
              setSelectedShops(item[0].id)
              const trueCartData = await SHOP_API.getShopCart(item[0].id)
              setCarData({
                selectedShops: item[0].supplier.companyName,
                shop: item[0].shop.shopName,
                total: item[0].cartTotal,
                totalReward: item[0].totalReward,
              })
              // setCarts(item[0].cartItems)
              setCarts(trueCartData.payload.cartItems)
              setLoading(true)
              setData(item)
            } else {
              setIndicatorCount(0)
              setCarts([])
              setLoading(true)
            }
          }
          setLoading(true)
        } else {
          await notification(t('shop.add'), ALERT_TYPE.DANGER)
          navigation.navigate(SCREEN.STACK_SHOP_LIST)
        }
      }
      getShopCarts()
    }, [trigger, isSignedIn])
  )
  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const trueCartData = await SHOP_API.getShopCart(selectedShops)
        // console.log(trueCartData, 'second@@@@@')
        setCarts(trueCartData.payload.cartItems)
        setCombinedData([])
      }
      fetchData()
    }, [selectedShops])
  )

  const handleDelete = async (Ids: { cartItemID: string; itemId: string }) => {
    await SHOP_API.deleteFromCart(Ids.cartItemID, Ids.itemId)
    setTrigger(!trigger)
  }
  const handlerCheckOut = (id: string) => {
    navigation.navigate(SCREEN.CHECKOUT, { id })
  }

  const onDataToParent = (id: string, data: any) => {
    setCartID(id)
    setCombinedData(data)
  }

  const handleUpdateData = async (id: string, data: any) => {
    startLoading()
    await SHOP_API.updateCartQuantity(id, data)
    stopLoading()
    setTrigger(!trigger)
  }

  const handleChangeValue = (value: any) => {
    setSelectedShops(value)
    data.map((item: any) => {
      if (item.id === value) {
        setCarData({
          selectedShops: item.supplier.companyName,
          shop: item.shop.shopName,
          total: item.cartTotal,
          totalReward: item.totalReward,
        })
        // setCarts(item.cartItems)
      }
    })
  }

  return loding ? (
    <>
      <View style={styles.shopListScreen_wrapper}>
        <View style={styles.select_wrapper}>
          {carts.length > 0 && (
            <Select
              selectedValue={selectedShops}
              minWidth="100%"
              height="50"
              borderColor="#CCC"
              marginY="2"
              marginX="4"
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
                // setLoading(false)
                handleChangeValue(itemValue)
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
        <>
          {carts.length > 0 ? (
            <CartItems
              // trigger={trigger}
              // setTrigger={setTrigger}
              isDelete={true}
              elem={carts}
              onDelete={handleDelete}
              cartItemId={selectedShops}
              onDataToParent={onDataToParent}
              total={true}
            />
          ) : (
            <View style={styles.no_product}>
              <Text>{t('notification.no_products')}</Text>
            </View>
          )}
        </>
        {carts.length > 0 && (
          <View style={styles.btn_wrapper}>
            <View>
              <View style={styles.orderView}>
                <View>
                  <Text>
                    {t('store_name_alt')}: {carData.shop}{' '}
                  </Text>
                  <Text>
                    {t('navigation.screen_titles.supplier')}: {carData.selectedShops}
                  </Text>
                </View>
                <View style={styles.right_side}>
                  <View style={styles.price_block}>
                    <Text style={styles.large_text}>
                      {t('sum')}: {carData.total.toFixed(2)} ₽
                    </Text>
                  </View>
                  <View style={styles.price_block}>
                    <Text>{t('reward')}: </Text>
                    <Text>{carData.totalReward.toFixed(2)}</Text>
                    <Text style={styles.bonus}>B</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.button_double}>
              {combinedData.length > 0 ? (
                <CustomButton
                  width={halfWidth}
                  padding={10}
                  border="grey"
                  background="white"
                  color="black"
                  title={t('buttons.update')}
                  onPress={() => {
                    setCombinedData([])
                    handleUpdateData(cartID, combinedData)
                  }}
                  loading={uLoading}
                  disabled={!(combinedData.length > 0)}
                />
              ) : (
                <CustomButton
                  width={halfWidth}
                  padding={10}
                  border="grey"
                  background="black"
                  color="white"
                  title={t('buttons.checkout')}
                  onPress={() => handlerCheckOut(selectedShops)}
                />
              )}
              {/*<CustomButton*/}
              {/*  width={halfWidth}*/}
              {/*  padding={10}*/}
              {/*  border="grey"*/}
              {/*  background="white"*/}
              {/*  color="black"*/}
              {/*  title={t('buttons.update')}*/}
              {/*  onPress={() => handleUpdateData(cartID, combinedData)}*/}
              {/*  loading={uLoading}*/}
              {/*  disabled={!(combinedData.length > 0)}*/}
              {/*/>*/}
              {/*<CustomButton*/}
              {/*  width={halfWidth}*/}
              {/*  padding={10}*/}
              {/*  border="grey"*/}
              {/*  background="black"*/}
              {/*  color="white"*/}
              {/*  title={t('buttons.checkout')}*/}
              {/*  onPress={() => handlerCheckOut(selectedShops)}*/}
              {/*/>*/}
            </View>
          </View>
        )}
      </View>
    </>
  ) : (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  )
}

const colors = {
  borderColor: '#d1d1d1',
  red: 'red',
  white: 'white',
}

const styles = StyleSheet.create({
  bonus: {
    color: colors.red,
  },
  btn_wrapper: {
    ...customStyles.border(1, 'solid', colors.borderColor),
    backgroundColor: colors.white,
    paddingVertical: 10,
    width: '100%',
  },
  button_double: {
    ...customStyles.borderTop(1, 'solid', colors.borderColor),
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingTop: 10,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  large_text: {
    fontSize: 18,
    fontWeight: '600',
  },
  no_product: {
    alignItems: 'center',
    marginTop: 20,
  },
  orderView: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  price_block: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  right_side: {
    marginLeft: 'auto',
  },
  select_wrapper: {
    alignItems: 'center',
  },
  shopListScreen_wrapper: {
    flex: 1,
    position: 'relative',
  },
})
